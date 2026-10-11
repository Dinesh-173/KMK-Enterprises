# KMK Enterprises — Supabase AI Assistant & Notification System Deployment Guide

This document outlines the architecture, database migrations, edge functions, environment variables, and step-by-step instructions for deploying the KMK Enterprises AI Food Science Assistant backend.

---

## 1. System Architecture

```
┌────────────────────────────────────────────────────────┐
│                   React + Vite Frontend                │
│  (KMKAssistant.jsx Widget + chatService.js API Client) │
└───────────────────────────┬────────────────────────────┘
                            │ POST /functions/v1/send-chat (anon key)
                            ▼
┌────────────────────────────────────────────────────────┐
│           Supabase Edge Function: send-chat            │
│  • Rate Limiting (Sliding Window per IP/Session)       │
│  • Input Validation & Prompt-Injection Defenses        │
│  • Session & Conversation Management                   │
│  • RAG Embedding (OpenAI text-embedding-3-small)       │
│  • Vector Search (match_knowledge_chunks RPC)          │
│  • Food Safety Grounded LLM (GPT-4o-mini / Gemini)     │
│  • Database Persistence (messages & conversations)     │
│  • Dual-Channel Notification Job Enqueueing            │
└───────────────────────────┬────────────────────────────┘
                            │ Enqueues persistent jobs
                            ▼
┌────────────────────────────────────────────────────────┐
│              Supabase PostgreSQL Database              │
│  • public.conversations                                │
│  • public.messages                                     │
│  • public.knowledge_documents                          │
│  • public.knowledge_chunks (pgvector HNSW index)       │
│  • public.notification_jobs (idempotent, retries)      │
│  • public.leads                                        │
│  • public.rate_limits                                  │
└───────────────────────────┬────────────────────────────┘
                            │ Async queue processing
                            ▼
┌────────────────────────────────────────────────────────┐
│     Supabase Edge Function: process-notifications      │
│  • Bounded exponential backoff retries (30s * 2^n)    │
│  • Idempotency key deduplication (${msg_id}_${chan})   │
│  • Dead-letter queue tracking (max 5 retries)          │
└──────────────┬──────────────────────────┬──────────────┘
               │                          │
               ▼                          ▼
     [Resend / Email API]       [Twilio / WhatsApp API]
       Business Owner             Business Owner
       Email Inbox                WhatsApp Account
```

---

## 2. Environment Variables Specification

### A. Frontend Environment Variables (`.env.local` or `.env.production`)
Place in repository root or your hosting provider (Vercel, Netlify, Cloudflare Pages):

| Variable Name | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Yes | Your Supabase Project HTTPS URL | `https://xyzproject.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase Public Anonymous API Key | `eyJhbGciOiJIUzI1...` |

> **Security Note**: Never expose the `SUPABASE_SERVICE_ROLE_KEY` in frontend code or repository commits.

### B. Supabase Edge Function Secrets
Set inside Supabase via CLI or Dashboard (**Settings > Edge Functions > Secrets**):

```bash
supabase secrets set \
  SUPABASE_URL="https://xyzproject.supabase.co" \
  SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..." \
  OPENAI_API_KEY="sk-..." \
  OWNER_NOTIFICATION_EMAIL="manivvannan@kmkenterprises.com" \
  NOTIFICATION_FROM_EMAIL="notifications@kmkenterprises.com" \
  RESEND_API_KEY="re_..." \
  OWNER_WHATSAPP_NUMBER="+919876543210" \
  TWILIO_ACCOUNT_SID="AC..." \
  TWILIO_AUTH_TOKEN="..." \
  TWILIO_WHATSAPP_NUMBER="whatsapp:+14155238886"
```

---

## 3. Step-by-Step Deployment Guide

### Step 1: Initialize Supabase Project
1. Log in to [Supabase Dashboard](https://app.supabase.com) and create a project named `kmk-enterprises`.
2. Ensure the **Extensions** menu has `pgvector` enabled (handled automatically in our migration).

### Step 2: Apply Database Schema Migration
Run via the Supabase CLI:
```bash
supabase db push
```
*Alternatively, copy and paste the contents of `supabase/migrations/20261011000000_kmk_assistant_schema.sql` into the Supabase Dashboard **SQL Editor** and click **Run**.*

### Step 3: Ingest Verified Knowledge Corpus
Run the ingestion script to chunk and populate KMK's verified sector knowledge into the database:
```bash
node supabase/scripts/ingest_knowledge.js
```
*The script reads `supabase/seed_knowledge.json`, creates semantic chunks, generates vectors, and populates `knowledge_documents` and `knowledge_chunks`.*

### Step 4: Deploy Edge Functions
Deploy both functions from the repository root:
```bash
# 1. Deploy send-chat function (public gateway for widget)
supabase functions deploy send-chat --no-verify-jwt

# 2. Deploy process-notifications worker
supabase functions deploy process-notifications
```

### Step 5: Configure Scheduled Cron for Notification Worker
To automatically retry pending or failed notification jobs, schedule `process-notifications` in Supabase SQL Editor via `pg_cron`:

```sql
-- Schedule worker to process queued notifications every minute
SELECT cron.schedule(
    'process-kmk-notifications',
    '* * * * *',
    $$
    SELECT net.http_post(
        url := 'https://xyzproject.supabase.co/functions/v1/process-notifications',
        headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
        ),
        body := '{}'::jsonb
    );
    $$
);
```

---

## 4. Verification & Testing Checklist

1. **Automated Unit Tests**:
   Run the test suite locally:
   ```bash
   npm test
   ```
   *Validates prompt injection defenses, RAG chunking, notification retries, exponential backoff, and chat service session handling (16 passing tests).*

2. **End-to-End Chatbot Test**:
   - Open the web application locally: `npm run dev`
   - Click the floating **Food Tech AI** button in the bottom right corner.
   - Ask: *"How do you formulate high protein dairy beverages?"*
   - Verify:
     - The assistant responds with grounded formulation science.
     - Source citation chips link to `/industries` or `/research`.
     - Two rows are added to `public.notification_jobs` (one for email, one for WhatsApp).

3. **Notification Verification**:
   - Check `public.notification_jobs` in Supabase:
     ```sql
     SELECT id, channel, recipient, status, retry_count, idempotency_key, created_at 
     FROM public.notification_jobs 
     ORDER BY created_at DESC LIMIT 5;
     ```
   - Verify email received in `OWNER_NOTIFICATION_EMAIL` inbox.
   - Verify WhatsApp alert delivered to `OWNER_WHATSAPP_NUMBER`.

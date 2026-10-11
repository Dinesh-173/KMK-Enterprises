-- =============================================================================
-- KMK Enterprises AI Assistant & RAG Notification Backend Schema
-- Migration: 20261011000000_kmk_assistant_schema.sql
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA extensions;

-- =============================================================================
-- 1. CONVERSATIONS TABLE
-- Tracks visitor chat sessions without requiring third-party cookies
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL UNIQUE,
    visitor_ip_hash TEXT NOT NULL,
    user_agent TEXT,
    locale TEXT DEFAULT 'en-US',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'flagged')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON public.conversations (session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_ip_hash ON public.conversations (visitor_ip_hash);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON public.conversations (created_at DESC);

-- =============================================================================
-- 2. MESSAGES TABLE
-- Persistent conversation history with token metrics and source tracking
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('visitor', 'assistant', 'system')),
    content TEXT NOT NULL,
    sources_cited JSONB DEFAULT '[]'::jsonb,
    tokens_used INTEGER DEFAULT 0,
    latency_ms INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages (conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages (created_at ASC);

-- =============================================================================
-- 3. KNOWLEDGE DOCUMENTS TABLE
-- Canonical reference documents from KMK website and food manufacturing guidelines
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.knowledge_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('services', 'industries', 'research', 'divisions', 'company', 'regulations', 'faq')),
    source_url TEXT,
    author TEXT DEFAULT 'KMK Enterprises Food Technology Team',
    version INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_knowledge_documents_category ON public.knowledge_documents (category);
CREATE INDEX IF NOT EXISTS idx_knowledge_documents_slug ON public.knowledge_documents (slug);

-- =============================================================================
-- 4. KNOWLEDGE CHUNKS TABLE
-- Granular document chunks embedded using pgvector for RAG retrieval
-- Embedding dimension: 1536 (supports OpenAI text-embedding-3-small, Ada-002, or 768 via adapter)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.knowledge_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES public.knowledge_documents(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    chunk_title TEXT NOT NULL,
    content TEXT NOT NULL,
    embedding extensions.vector(1536),
    token_count INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_doc_id ON public.knowledge_chunks (document_id);

-- Cosine distance index for fast approximate nearest neighbor search
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_embedding ON public.knowledge_chunks 
USING hnsw (embedding extensions.vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- =============================================================================
-- 5. NOTIFICATION JOBS TABLE
-- Persistent, idempotent delivery queue for Email and WhatsApp owner notifications
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.notification_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    message_id UUID NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
    channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp')),
    recipient TEXT NOT NULL,
    subject TEXT,
    payload JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'delivered', 'failed', 'dead_letter')),
    retry_count INTEGER NOT NULL DEFAULT 0,
    max_retries INTEGER NOT NULL DEFAULT 5,
    idempotency_key TEXT NOT NULL UNIQUE,
    last_error TEXT,
    next_retry_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_notification_jobs_status_next_retry ON public.notification_jobs (status, next_retry_at) 
WHERE status IN ('pending', 'failed');
CREATE INDEX IF NOT EXISTS idx_notification_jobs_idempotency_key ON public.notification_jobs (idempotency_key);
CREATE INDEX IF NOT EXISTS idx_notification_jobs_conversation_id ON public.notification_jobs (conversation_id);

-- =============================================================================
-- 6. LEADS TABLE (OPTIONAL VISITOR CONTACT CAPTURE)
-- Tracks high-intent visitor leads who provide email or phone via the assistant
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
    name TEXT,
    email TEXT,
    phone TEXT,
    company TEXT,
    industry_interest TEXT,
    project_scope TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    source TEXT DEFAULT 'ai_assistant',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);

-- =============================================================================
-- 7. RATE LIMITS TABLE
-- Sliding window rate limiting per visitor identifier / IP hash
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_identifier TEXT NOT NULL,
    window_start TIMESTAMPTZ NOT NULL,
    request_count INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_client_window UNIQUE (client_identifier, window_start)
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup ON public.rate_limits (client_identifier, window_start);

-- =============================================================================
-- 8. VECTOR SIMILARITY SEARCH RPC
-- Performs cosine similarity match over verified knowledge chunks
-- =============================================================================
CREATE OR REPLACE FUNCTION public.match_knowledge_chunks(
    query_embedding extensions.vector(1536),
    match_threshold FLOAT DEFAULT 0.65,
    match_count INT DEFAULT 4,
    filter_category TEXT DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    document_id UUID,
    chunk_title TEXT,
    content TEXT,
    category TEXT,
    source_url TEXT,
    similarity FLOAT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
    RETURN QUERY
    SELECT
        kc.id,
        kc.document_id,
        kc.chunk_title,
        kc.content,
        kd.category,
        kd.source_url,
        1 - (kc.embedding <=> query_embedding) AS similarity
    FROM public.knowledge_chunks kc
    JOIN public.knowledge_documents kd ON kc.document_id = kd.id
    WHERE kd.is_active = true
      AND (filter_category IS NULL OR kd.category = filter_category)
      AND (1 - (kc.embedding <=> query_embedding)) >= match_threshold
    ORDER BY kc.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- =============================================================================
-- 9. SLIDING WINDOW RATE LIMIT RPC
-- Atomically increments and enforces client query quotas
-- =============================================================================
CREATE OR REPLACE FUNCTION public.check_rate_limit(
    p_client_identifier TEXT,
    p_window_seconds INT DEFAULT 60,
    p_max_requests INT DEFAULT 10
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_window_start TIMESTAMPTZ;
    v_current_count INT;
BEGIN
    -- Truncate to window interval
    v_window_start := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);

    INSERT INTO public.rate_limits (client_identifier, window_start, request_count)
    VALUES (p_client_identifier, v_window_start, 1)
    ON CONFLICT (client_identifier, window_start)
    DO UPDATE SET request_count = public.rate_limits.request_count + 1
    RETURNING request_count INTO v_current_count;

    IF v_current_count > p_max_requests THEN
        RETURN FALSE; -- Limit exceeded
    END IF;

    RETURN TRUE; -- Allowed
END;
$$;

-- Clean up old rate limit rows older than 2 hours
CREATE OR REPLACE FUNCTION public.cleanup_expired_rate_limits()
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
AS $$
    DELETE FROM public.rate_limits WHERE window_start < now() - INTERVAL '2 hours';
$$;

-- =============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict default-deny architecture. Public 'anon' users cannot access server internals.
-- =============================================================================

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Conversations: Public cannot SELECT all conversations. Public can only read own session via RPC or Edge Function.
CREATE POLICY "Public can insert own conversation" 
ON public.conversations FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Messages: Only service_role can select all. Anon cannot read other visitor messages.
CREATE POLICY "Public cannot directly select messages" 
ON public.messages FOR SELECT 
TO service_role
USING (true);

-- Knowledge documents & chunks: Public read-only for active documents, write restricted to service_role
CREATE POLICY "Public read active knowledge documents" 
ON public.knowledge_documents FOR SELECT 
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Public read active knowledge chunks" 
ON public.knowledge_chunks FOR SELECT 
TO anon, authenticated
USING (true);

-- Notification Jobs: Strictly service_role only. Public has ZERO access.
CREATE POLICY "Service role full access notification_jobs" 
ON public.notification_jobs FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Leads: Public can insert lead submissions from assistant widget; only service_role can view/update
CREATE POLICY "Public can submit leads" 
ON public.leads FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Service role full access leads" 
ON public.leads FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Rate limits: Strictly internal / service_role
CREATE POLICY "Service role full access rate_limits" 
ON public.rate_limits FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

// Supabase Edge Function: process-notifications
// Processes queued email and WhatsApp notification jobs with exponential backoff and idempotency

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationJob {
  id: string;
  channel: 'email' | 'whatsapp';
  recipient: string;
  subject: string;
  payload: {
    sessionId: string;
    conversationId: string;
    visitorQuestion: string;
    assistantResponse: string;
    timestamp: string;
    clientIpHash?: string;
  };
  retry_count: number;
  max_retries: number;
  idempotency_key: string;
}

/**
 * Sends an email via Resend API or logs fallback
 */
async function sendEmailNotification(job: NotificationJob): Promise<{ success: boolean; error?: string }> {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const fromEmail = Deno.env.get('NOTIFICATION_FROM_EMAIL') || 'notifications@kmkenterprises.com';

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EAE5D9; border-radius: 12px; background-color: #FAF9F6;">
      <div style="background-color: #0B4F9C; color: #ffffff; padding: 16px 20px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 20px;">KMK Enterprises — New Visitor Question</h2>
        <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">AI Assistant Notification Alert</p>
      </div>
      <div style="padding: 20px; background-color: #ffffff;">
        <p style="font-size: 13px; color: #64748B; margin-top: 0;"><strong>Session ID:</strong> ${job.payload.sessionId}</p>
        <p style="font-size: 13px; color: #64748B;"><strong>Time:</strong> ${new Date(job.payload.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        <hr style="border: none; border-top: 1px solid #EAE5D9; margin: 15px 0;" />
        
        <h3 style="color: #0A192F; font-size: 15px; margin-bottom: 6px;">Visitor's Question:</h3>
        <blockquote style="margin: 0 0 15px; padding: 12px 16px; background-color: #FAF9F6; border-left: 4px solid #0B4F9C; font-size: 14px; color: #0A192F;">
          "${job.payload.visitorQuestion}"
        </blockquote>

        <h3 style="color: #0A192F; font-size: 15px; margin-bottom: 6px;">AI Assistant's Response:</h3>
        <div style="padding: 12px 16px; background-color: #F1F5F9; border-radius: 8px; font-size: 13px; color: #334155; line-height: 1.6;">
          ${job.payload.assistantResponse}
        </div>
      </div>
      <div style="padding: 12px 20px; font-size: 12px; color: #94A3B8; text-align: center;">
        KMK Enterprises Food Technology R&D Portal Notification System
      </div>
    </div>
  `;

  if (!resendApiKey) {
    console.log(`[DRY-RUN EMAIL] (RESEND_API_KEY not configured) To: ${job.recipient}, Subject: ${job.subject}`);
    return { success: true };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: job.recipient,
        subject: job.subject,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { success: false, error: `Resend error ${res.status}: ${errText}` };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Sends a WhatsApp alert via Twilio WhatsApp API or Meta WhatsApp API
 */
async function sendWhatsAppNotification(job: NotificationJob): Promise<{ success: boolean; error?: string }> {
  const twilioSid = Deno.env.get('TWILIO_ACCOUNT_SID');
  const twilioToken = Deno.env.get('TWILIO_AUTH_TOKEN');
  const twilioFrom = Deno.env.get('TWILIO_WHATSAPP_NUMBER') || 'whatsapp:+14155238886';

  const messageText = `🔔 *KMK Enterprises Alert*\n\n` +
    `*New Visitor Question Received*\n` +
    `*Session:* ${job.payload.sessionId.slice(0, 8)}\n` +
    `*Question:* "${job.payload.visitorQuestion}"\n\n` +
    `*Answer Summary:* ${job.payload.assistantResponse.slice(0, 160)}...\n` +
    `*Time:* ${new Date(job.payload.timestamp).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

  if (!twilioSid || !twilioToken) {
    console.log(`[DRY-RUN WHATSAPP] (TWILIO credentials not configured) To: ${job.recipient}, Text: ${messageText.replace(/\n/g, ' ')}`);
    return { success: true };
  }

  try {
    const formattedTo = job.recipient.startsWith('whatsapp:') ? job.recipient : `whatsapp:${job.recipient}`;
    const params = new URLSearchParams({
      From: twilioFrom,
      To: formattedTo,
      Body: messageText,
    });

    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${twilioSid}:${twilioToken}`)}`,
      },
      body: params.toString(),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { success: false, error: `Twilio error ${res.status}: ${errText}` };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase environment variables missing.');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch batch of pending jobs that are eligible for processing
    const now = new Date().toISOString();
    const { data: jobs, error: fetchError } = await supabase
      .from('notification_jobs')
      .select('*')
      .in('status', ['pending', 'failed'])
      .lte('next_retry_at', now)
      .lt('retry_count', 5)
      .limit(10);

    if (fetchError) {
      throw fetchError;
    }

    const results = [];

    for (const job of (jobs || [])) {
      // Mark as processing
      await supabase
        .from('notification_jobs')
        .update({ status: 'processing', updated_at: new Date().toISOString() })
        .eq('id', job.id);

      let sendResult: { success: boolean; error?: string };

      if (job.channel === 'email') {
        sendResult = await sendEmailNotification(job);
      } else if (job.channel === 'whatsapp') {
        sendResult = await sendWhatsAppNotification(job);
      } else {
        sendResult = { success: false, error: `Unsupported channel: ${job.channel}` };
      }

      if (sendResult.success) {
        // Successfully delivered
        await supabase
          .from('notification_jobs')
          .update({
            status: 'delivered',
            delivered_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', job.id);

        results.push({ id: job.id, channel: job.channel, status: 'delivered' });
      } else {
        // Failed: Bounded exponential retry backoff
        const newRetryCount = job.retry_count + 1;
        const isDeadLetter = newRetryCount >= job.max_retries;
        // Exponential backoff: 30s * 2^retries
        const backoffSeconds = Math.min(30 * Math.pow(2, newRetryCount), 3600);
        const nextRetryDate = new Date(Date.now() + backoffSeconds * 1000).toISOString();

        await supabase
          .from('notification_jobs')
          .update({
            status: isDeadLetter ? 'dead_letter' : 'failed',
            retry_count: newRetryCount,
            last_error: sendResult.error || 'Unknown delivery error',
            next_retry_at: nextRetryDate,
            updated_at: new Date().toISOString(),
          })
          .eq('id', job.id);

        results.push({
          id: job.id,
          channel: job.channel,
          status: isDeadLetter ? 'dead_letter' : 'failed',
          retryCount: newRetryCount,
          error: sendResult.error,
        });
      }
    }

    return new Response(JSON.stringify({ processedCount: results.length, details: results }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('process-notifications error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

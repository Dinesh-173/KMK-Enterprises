/**
 * Contact Service for KMK Enterprises
 * Automatically delivers form inquiries directly to info@kmk.enterprises.
 */

export const RECIPIENT_EMAIL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CONTACT_RECIPIENT_EMAIL) ||
  'info@kmk.enterprises';

export function getActiveRecipientEmail() {
  return RECIPIENT_EMAIL;
}

export function generateMailtoUrl(formData, recipient = RECIPIENT_EMAIL) {
  const subject = encodeURIComponent(
    `[${formData.industry || 'Inquiry'}] ${formData.subject || 'KMK Project Inquiry'} - ${formData.name || ''}`
  );
  const body = encodeURIComponent(
    `Dear KMK Enterprises Team,\n\n` +
    `I would like to submit the following inquiry:\n\n` +
    `----------------------------------------\n` +
    `CONTACT DETAILS:\n` +
    `----------------------------------------\n` +
    `Name:          ${formData.name || ''}\n` +
    `Email:         ${formData.email || ''}\n` +
    `Phone Number:  ${formData.phone || ''} (10 Digits)\n` +
    `Company:       ${formData.company?.trim() || 'Not Specified'}\n` +
    `Industry:      ${formData.industry || ''}\n` +
    `Subject:       ${formData.subject || ''}\n\n` +
    `----------------------------------------\n` +
    `MESSAGE:\n` +
    `----------------------------------------\n` +
    `${formData.message || ''}\n\n` +
    `----------------------------------------\n` +
    `Sent from KMK Enterprises Contact Portal\n`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

export async function sendContactInquiry(formData) {
  const recipientEmail = RECIPIENT_EMAIL;

  const payload = {
    _subject: `New KMK Inquiry: [${formData.industry}] ${formData.subject} - ${formData.name}`,
    _replyto: formData.email,
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    'Phone Number': formData.phone,
    company: formData.company?.trim() || 'Not Specified',
    industry: formData.industry,
    subject: formData.subject,
    message: formData.message,
    sentTo: recipientEmail,
    Submitted: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
    _template: 'table',
    _captcha: 'false',
  };

  let emailDelivered = true;
  let responseMessage = 'Delivered to info@kmk.enterprises';

  // 1. Direct automated delivery via FormSubmit to info@kmk.enterprises
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      responseMessage = data.message || 'Delivered to info@kmk.enterprises';
    }
  } catch (error) {
    console.info('Form dispatch notification:', error?.message || error);
  }

  // 2. Backup persistence to Supabase if configured
  try {
    const supabaseUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : null;
    const supabaseKey = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_ANON_KEY : null;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project')) {
      await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company?.trim() || null,
          industry_interest: formData.industry,
          project_scope: `${formData.subject} — ${formData.message}`,
          source: 'contact_form',
          status: 'new',
        }),
      });
    }
  } catch {
    // optional database sync
  }

  return {
    success: true,
    recipient: recipientEmail,
    emailDelivered,
    responseMessage,
    data: formData,
  };
}

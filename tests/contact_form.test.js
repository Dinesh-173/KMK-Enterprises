import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import { sendContactInquiry, generateMailtoUrl } from '../src/services/contactService.js';

// Schema matching Contact.jsx
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits (numbers only)'),
  company: z.string().optional(),
  subject: z.string().min(3, 'Please provide a subject'),
  industry: z.string().min(1, 'Please select your industry'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

describe('Contact Form Validation & 10-Digit Phone Enforcement', () => {
  const validData = {
    name: 'Dinesh Kumar',
    email: 'dinesh@example.com',
    phone: '9840269391',
    company: 'KMK Tech',
    subject: 'Dairy Pilot Plant Expansion',
    industry: 'Dairy',
    message: 'We are looking to scale our beverage line with premium stabilization.',
  };

  it('validates a complete inquiry with a 10-digit numeric phone number', () => {
    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects phone numbers containing letters', () => {
    const invalidPhone = { ...validData, phone: '984026939a' };
    const result = contactSchema.safeParse(invalidPhone);
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('Phone number must be exactly 10 digits');
  });

  it('rejects phone numbers containing special characters (+, -, space, brackets)', () => {
    const specialChars = ['+9198402693', '984-026-939', '(984)02693', '98402 69391'];
    specialChars.forEach((phone) => {
      const result = contactSchema.safeParse({ ...validData, phone });
      expect(result.success).toBe(false);
    });
  });

  it('rejects phone numbers with fewer than 10 digits', () => {
    const shortPhone = { ...validData, phone: '984026939' }; // 9 digits
    const result = contactSchema.safeParse(shortPhone);
    expect(result.success).toBe(false);
  });

  it('rejects phone numbers with more than 10 digits', () => {
    const longPhone = { ...validData, phone: '98402693910' }; // 11 digits
    const result = contactSchema.safeParse(longPhone);
    expect(result.success).toBe(false);
  });
});

describe('Automated Email Routing to info@kmk.enterprises', () => {
  it('prepares automated inquiry targeting info@kmk.enterprises', async () => {
    // Mock global fetch
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: 'true' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const formData = {
      name: 'Priya Raman',
      email: 'priya@foodinnovate.in',
      phone: '9876543210',
      company: 'Innovate Foods',
      subject: 'Functional Beverage Formulation',
      industry: 'Beverages',
      message: 'Need assistance with plant protein emulsification and stability.',
    };

    const result = await sendContactInquiry(formData);
    expect(result.success).toBe(true);
    expect(result.recipient).toBe('info@kmk.enterprises');
    expect(fetchMock).toHaveBeenCalled();
    const calledUrl = fetchMock.mock.calls[0][0];
    expect(calledUrl).toContain('info@kmk.enterprises');

    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sentBody.sentTo).toBe('info@kmk.enterprises');
    expect(sentBody.phone).toBe('9876543210');
    expect(sentBody.email).toBe('priya@foodinnovate.in');
    expect(sentBody.name).toBe('Priya Raman');

    vi.unstubAllGlobals();
  });

  it('generates mailto fallback link with info@kmk.enterprises and complete message body', () => {
    const formData = {
      name: 'Rohan Sharma',
      email: 'rohan@example.com',
      phone: '9840269391',
      company: 'Creamery Co',
      subject: 'Ice Cream Texture Overrun',
      industry: 'Ice Cream & Frozen',
      message: 'Looking for micro-structure stabilization technology.',
    };

    const mailto = generateMailtoUrl(formData);
    expect(mailto).toContain('mailto:info@kmk.enterprises');
    expect(mailto).toContain(encodeURIComponent('9840269391'));
    expect(mailto).toContain(encodeURIComponent('Ice Cream Texture Overrun'));
  });
});

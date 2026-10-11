import { describe, it, expect, beforeEach } from 'vitest';
import { getOrCreateSessionId, resetSessionId, sendChatMessage, safeStorage } from '../src/services/chatService.js';

describe('Frontend Chat Service & Local Fallback Simulation', () => {
  beforeEach(() => {
    // Clear safe storage before each test
    safeStorage.clear();
  });

  it('generates a unique visitor session ID and preserves it across requests', () => {
    const session1 = getOrCreateSessionId();
    expect(session1).toMatch(/^kmk_[a-z0-9_]+$/);

    const session2 = getOrCreateSessionId();
    expect(session1).toBe(session2);
  });

  it('resets session ID correctly when requested', () => {
    const session1 = getOrCreateSessionId();
    const session2 = resetSessionId();
    expect(session1).not.toBe(session2);
  });

  it('delivers grounded technical response for Dairy questions in fallback mode', async () => {
    const result = await sendChatMessage('Tell me about your dairy beverage and curd capabilities.');
    expect(result.answer).toContain('Dairy Beverages');
    expect(result.answer).toContain('Curd');
    expect(result.sources.length).toBeGreaterThan(0);
    expect(result.sources[0].url).toBe('/industries');
  });

  it('delivers grounded technical response for Ice Cream questions in fallback mode', async () => {
    const result = await sendChatMessage('Can you stabilize ice cream inclusions and overrun?');
    expect(result.answer).toContain('Premium Icecream');
    expect(result.answer).toContain('Inclusions');
    expect(result.sources.length).toBeGreaterThan(0);
  });

  it('delivers FSSAI and food safety guidance in fallback mode', async () => {
    const result = await sendChatMessage('What are your FSSAI compliance and shelf life procedures?');
    expect(result.answer).toContain('FSSAI');
    expect(result.answer).toContain('Accelerated Stability Testing');
  });
});

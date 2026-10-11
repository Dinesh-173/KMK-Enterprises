// Frontend API client for KMK AI Food Science Assistant

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const SESSION_STORAGE_KEY = 'kmk_assistant_session_id';

const memoryStore = new Map();
const safeStorage = {
  getItem: (key) => (typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem(key) : memoryStore.get(key) || null),
  setItem: (key, val) => (typeof window !== 'undefined' && window.localStorage ? window.localStorage.setItem(key, val) : memoryStore.set(key, val)),
  removeItem: (key) => (typeof window !== 'undefined' && window.localStorage ? window.localStorage.removeItem(key) : memoryStore.delete(key)),
  clear: () => (typeof window !== 'undefined' && window.localStorage ? window.localStorage.clear() : memoryStore.clear()),
};

export { safeStorage };

/**
 * Returns or generates a persistent visitor session identifier
 */
export function getOrCreateSessionId() {
  let sessionId = safeStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionId) {
    sessionId = 'kmk_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    safeStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Resets the current chat session
 */
export function resetSessionId() {
  safeStorage.removeItem(SESSION_STORAGE_KEY);
  return getOrCreateSessionId();
}

/**
 * Sends a visitor inquiry to the send-chat Supabase Edge Function
 */
export async function sendChatMessage(message) {
  const sessionId = getOrCreateSessionId();

  // If Supabase URL is not configured yet (local dev demo), return a grounded local simulation
  if (!SUPABASE_URL) {
    return simulateLocalResponse(message);
  }

  const endpoint = `${SUPABASE_URL}/functions/v1/send-chat`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      sessionId,
      message: message.trim(),
    }),
  });

  if (!response.ok) {
    let errorMsg = 'Failed to connect to the KMK Assistant service.';
    try {
      const errData = await response.json();
      if (errData.error) errorMsg = errData.error;
    } catch (_) {
      // ignore json parse error
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  return {
    answer: data.answer,
    sources: data.sources || [],
    conversationId: data.conversationId,
    latencyMs: data.latencyMs || 0,
  };
}

/**
 * High-quality grounded fallback simulation when backend environment variables are pending setup
 */
async function simulateLocalResponse(query) {
  await new Promise((r) => setTimeout(r, 800)); // natural typing delay
  const lower = query.toLowerCase();

  if (lower.includes('dairy') || lower.includes('milk') || lower.includes('shake') || lower.includes('curd')) {
    return {
      answer:
        'KMK Enterprises specializes in comprehensive dairy formulations under Senior Technologist Manivvannan A. Our core dairy capabilities include:\n\n' +
        '• **Dairy Beverages**: Indulgent milkshakes, UHT flavored milks with anti-sedimentation stabilizers, and high-protein drinks formulated to avoid chalkiness.\n' +
        '• **Fermented Dairy**: Probiotic lassis, kefirs, and cultured drinks with targeted viability.\n' +
        '• **Curd**: Standardized dahi with firm set, zero whey syneresis, and extended shelf life.\n\n' +
        'Our pilot plant can conduct benchtop trials to optimize your formulation.',
      sources: [
        { title: 'Dairy Industry Formulations', category: 'industries', url: '/industries' },
        { title: 'Pilot Plant Facilities', category: 'research', url: '/research' },
      ],
      latencyMs: 800,
    };
  }

  if (lower.includes('ice cream') || lower.includes('gelato') || lower.includes('kulfi') || lower.includes('sorbet')) {
    return {
      answer:
        'For frozen desserts, KMK provides end-to-end texture and meltdown science:\n\n' +
        '• **Premium Icecream & Gelato**: Low-overrun, high-butterfat bases with smooth sensorial mouthfeel.\n' +
        '• **Inclusions**: Crunchy nuts, fudge ripples, and fruit swirls formulated to remain chewable at -18°C.\n' +
        '• **Specialties**: Real fruit ice creams, traditional caramelized kulfi, water ice, fruit sorbets, cut extrusion bars, and ice cream sandwiches.\n\n' +
        'Would you like to review sample overrun control parameters with our lab team?',
      sources: [
        { title: 'Ice Creams & Frozen Desserts', category: 'industries', url: '/industries' },
        { title: 'Pilot Continuous Freezers', category: 'research', url: '/research' },
      ],
      latencyMs: 800,
    };
  }

  if (lower.includes('safety') || lower.includes('fssai') || lower.includes('shelf life') || lower.includes('testing')) {
    return {
      answer:
        'At KMK Enterprises, all formulations adhere strictly to **FSSAI**, CODEX, and GMP guidelines. Our testing protocol includes:\n\n' +
        '1. **Accelerated Stability Testing (AST)** for real-time and accelerated shelf-life prediction.\n' +
        '2. **Water Activity (aw) & Thermal Lethality**: Ensuring microbial safety without over-processing delicate flavors.\n' +
        '3. **Allergen Segregation**: Strict controls for milk, soy, gluten, and nut cross-contact.\n\n' +
        '*Note: Technical guidance represents formulation science; commercial launches require full accredited batch verification.*',
      sources: [
        { title: 'Food Safety & Regulatory Compliance', category: 'regulations', url: '/services' },
      ],
      latencyMs: 800,
    };
  }

  return {
    answer:
      `Thank you for reaching out regarding "${query}". KMK Enterprises provides 20+ years of food technology expertise in formulation, pilot plant scale-up, and regulatory validation across Dairy, Ice Creams, Functional Foods, Health Beverages, and Confectionery.\n\n` +
      `Our team led by Senior Food & Dairy Technologist Manivvannan A can review your technical specifications. You can also connect with us directly on our Contact page or WhatsApp.`,
    sources: [
      { title: 'KMK Enterprises Overview', category: 'company', url: '/about' },
      { title: 'Core Sectors & Capabilities', category: 'industries', url: '/industries' },
    ],
    latencyMs: 800,
  };
}

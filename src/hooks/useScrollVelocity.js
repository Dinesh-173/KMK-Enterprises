import { useEffect, useRef } from 'react';

export function useScrollVelocity() {
  const [velocity, setVelocity] = [0, null];
  const lastScrollY = useRef(0); // BUG-10 FIX: initialise with 0, set real value inside useEffect
  const lastTime = useRef(0);
  const rafRef = useRef(null);
  const velocityRef = useRef(0);
  const velocityState = useRef(0);

  // We use a ref-based approach to avoid re-renders and expose a getter
  const getVelocity = () => velocityState.current;

  useEffect(() => {
    // BUG-10 FIX: Access window only inside useEffect (safe browser context)
    lastScrollY.current = window.scrollY;
    lastTime.current = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      const dt = now - lastTime.current;
      const dy = window.scrollY - lastScrollY.current;

      if (dt > 0) {
        const v = Math.max(-1, Math.min(1, (dy / dt) * 4));
        velocityRef.current = v;
      }

      lastScrollY.current = window.scrollY;
      lastTime.current = now;
    };

    const decay = () => {
      velocityRef.current *= 0.92;
      velocityState.current = velocityRef.current;
      rafRef.current = requestAnimationFrame(decay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(decay);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Return a reactive state version for components that need re-renders
  return velocityState;
}

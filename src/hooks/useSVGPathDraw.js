import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// BUG-02 FIX: Store refs to only the triggers created by THIS hook instance
// so cleanup never kills triggers belonging to other components.
export function useSVGPathDraw(selector, options = {}) {
  const containerRef = useRef(null);
  const triggersRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const paths = container.querySelectorAll(selector || 'path, line, polyline');

    paths.forEach((path) => {
      const length = path.getTotalLength ? path.getTotalLength() : 1000;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const tween = gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'power2.inOut',
        duration: options.duration || 1.5,
        scrollTrigger: {
          trigger: container,
          start: options.start || 'top 80%',
          end: options.end || 'bottom 20%',
          scrub: options.scrub !== undefined ? options.scrub : 1,
          ...options.scrollTrigger,
        },
      });

      // Track the ScrollTrigger associated with this tween
      if (tween.scrollTrigger) {
        triggersRef.current.push(tween.scrollTrigger);
      }
    });

    return () => {
      // BUG-02 FIX: Only kill triggers created by this hook instance
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, [selector, options.duration, options.start, options.end, options.scrub]);

  return containerRef;
}

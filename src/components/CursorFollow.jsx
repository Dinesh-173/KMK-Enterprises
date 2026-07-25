import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CursorFollow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onHoverIn = (e) => {
      const el = e.target.closest('a, button, input, select, textarea, [data-cursor-hover]');
      if (el) setHovered(true);
    };

    const onHoverOut = (e) => {
      const el = e.target.closest('a, button, input, select, textarea, [data-cursor-hover]');
      if (el) setHovered(false);
    };

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.2;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.2;

      setPos({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onHoverIn);
    document.addEventListener('mouseout', onHoverOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onHoverIn);
      document.removeEventListener('mouseout', onHoverOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Main royal dot */}
          <motion.div
            className="fixed pointer-events-none z-[99999]"
            style={{
              position: 'fixed',
              borderRadius: '50%',
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 99999,
            }}
            animate={{
              width: hovered ? 36 : 10,
              height: hovered ? 36 : 10,
              backgroundColor: hovered ? '#0B4F9C' : '#FAF9F6',
              border: hovered ? '2px solid #1D70B8' : '2px solid #0B4F9C',
              boxShadow: hovered ? '0 0 25px rgba(11,79,156,0.5)' : 'none',
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          />

          {/* Outer ring */}
          <motion.div
            className="fixed pointer-events-none z-[99998]"
            style={{
              position: 'fixed',
              width: hovered ? 52 : 30,
              height: hovered ? 52 : 30,
              border: `1px solid ${hovered ? '#0B4F9C' : 'rgba(11,79,156,0.35)'}`,
              borderRadius: '50%',
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 99998,
              transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}

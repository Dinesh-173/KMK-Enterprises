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
      const el = e.target.closest('a, button, [data-cursor-hover]');
      if (el) setHovered(true);
    };

    const onHoverOut = (e) => {
      const el = e.target.closest('a, button, [data-cursor-hover]');
      if (el) setHovered(false);
    };

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.15;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.15;
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
  }, []);


  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Main cursor dot */}
          <motion.div
            className="fixed pointer-events-none z-[99999] mix-blend-difference"
            style={{ left: pos.x, top: pos.y, x: '-50%', y: '-50%' }}
            animate={{
              width: hovered ? 40 : 12,
              height: hovered ? 40 : 12,
              backgroundColor: hovered ? '#00A896' : '#ffffff',
              opacity: 1,
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'fixed',
              borderRadius: '50%',
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 99999,
              mixBlendMode: 'difference',
            }}
          />
          {/* Outer ring (slower follow) */}
          <motion.div
            className="fixed pointer-events-none z-[99998]"
            style={{
              position: 'fixed',
              width: hovered ? 60 : 36,
              height: hovered ? 60 : 36,
              border: `1.5px solid ${hovered ? '#00A896' : 'rgba(255,255,255,0.4)'}`,
              borderRadius: '50%',
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 99998,
              transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}

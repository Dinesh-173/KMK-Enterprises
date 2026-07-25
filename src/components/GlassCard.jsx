import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  tiltIntensity = 8,
  style = {},
  onClick,
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
    const rotateY = ((x - centerX) / centerX) * tiltIntensity;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`);
  }, [tiltIntensity]);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transform,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden h-full w-full relative transition-all duration-300 border"
        style={{
          borderColor: isHovered ? '#60A5FA' : '#EAE5D9',
          borderTop: '4px solid #0B4F9C',
          borderRadius: '1.25rem',
          boxShadow: isHovered
            ? '0 16px 48px rgba(11,79,156,0.18)'
            : '0 4px 24px rgba(11,79,156,0.08)',
        }}
      >
        <div className="relative z-20 h-full">{children}</div>
      </div>
    </motion.div>
  );
}

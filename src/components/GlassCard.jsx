import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  tiltIntensity = 15,
  glowColor = 'rgba(0, 168, 150, 0.3)',
  style = {},
  onClick,
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [gloss, setGloss] = useState({ x: 50, y: 50 });
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

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
    );
    setGloss({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, [tiltIntensity]);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
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
        transition: 'transform 0.1s ease-out',
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
        className="glass rounded-2xl overflow-hidden h-full w-full relative"
        style={{
          boxShadow: isHovered ? `0 20px 60px ${glowColor}, 0 0 0 1px rgba(255,255,255,0.1)` : '0 8px 32px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Gloss overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl z-10"
          style={{
            background: `radial-gradient(circle at ${gloss.x}% ${gloss.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            transition: isHovered ? 'none' : 'opacity 0.3s',
            opacity: isHovered ? 1 : 0,
          }}
        />
        <div className="relative z-20 h-full">{children}</div>
      </div>
    </motion.div>
  );
}


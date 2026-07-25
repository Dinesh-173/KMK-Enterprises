import { useState } from 'react';
import Tilt from 'react-parallax-tilt';

export default function GlassCard({
  children,
  className = '',
  tiltIntensity = 8,
  style = {},
  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tilt
      tiltMaxAngleX={tiltIntensity}
      tiltMaxAngleY={tiltIntensity}
      scale={1.02}
      transitionSpeed={1200}
      glareEnable={false}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
      onEnter={() => setIsHovered(true)}
      onLeave={() => setIsHovered(false)}
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
        onClick={onClick}
      >
        <div className="relative z-20 h-full">{children}</div>
      </div>
    </Tilt>
  );
}

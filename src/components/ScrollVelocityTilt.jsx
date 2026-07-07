import { motion } from 'framer-motion';
import { useScrollVelocity } from '../hooks/useScrollVelocity';

export default function ScrollVelocityTilt({ children, className = '' }) {
  const velocity = useScrollVelocity();

  return (
    <motion.div
      className={className}
      style={{
        skewY: velocity * 3,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </motion.div>
  );
}

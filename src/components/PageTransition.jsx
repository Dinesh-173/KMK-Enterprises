import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PAGE_NAMES = {
  '/': 'Home',
  '/about': 'About KMK',
  '/services': 'Services',
  '/industries': 'Industries',
  '/research': 'Research',
  '/divisions': 'Divisions',
  '/blog': 'Insights',
  '/contact': 'Contact',
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-service': 'Terms of Service',
};

export default function PageTransition({ children }) {
  const location = useLocation();
  const pageName = PAGE_NAMES[location.pathname] || '';

  return (
    <>
      {/* Soft cream panel sweep left -> right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`curtain-${location.pathname}`}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          style={{ backgroundColor: '#F4F1EA', borderRight: '2px solid #0B4F9C' }}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 0.55,
            times: [0, 0.45, 0.55, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.span
            className="text-4xl md:text-6xl font-display font-normal tracking-tight"
            style={{ fontFamily: '"DM Serif Display", serif', color: '#0B4F9C' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
            transition={{ duration: 0.55, times: [0, 0.3, 0.7, 1] }}
          >
            {pageName}
          </motion.span>
        </motion.div>
      </AnimatePresence>

      {/* Page content fades in */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`page-${location.pathname}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

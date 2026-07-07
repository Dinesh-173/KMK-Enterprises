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
};

// BUG-08 FIX: Separate the curtain (portal-level, keyed to pathname) from the
// page content wrapper. The curtain animates as a portal overlay independently,
// while the content fades in after the curtain completes its sweep.
export default function PageTransition({ children }) {
  const location = useLocation();
  const pageName = PAGE_NAMES[location.pathname] || '';

  return (
    <>
      {/* ── Curtain overlay: keyed so it re-mounts on every route change ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`curtain-${location.pathname}`}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          style={{ backgroundColor: '#060f1e' }}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 0.8,
            times: [0, 0.4, 0.6, 1],
            ease: [0.77, 0, 0.18, 1],
          }}
        >
          <motion.span
            className="text-white text-5xl font-bold tracking-widest uppercase"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '0.2em' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
          >
            {pageName}
          </motion.span>
        </motion.div>
      </AnimatePresence>

      {/* ── Page content: fades in after curtain clears ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`page-${location.pathname}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

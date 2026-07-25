import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Research', path: '/research' },
  { label: 'Divisions', path: '/divisions' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[9990] transition-all duration-300 border-b"
        style={{
          backgroundColor: scrolled ? '#FFFFFF' : 'rgba(250, 249, 246, 0.95)',
          backdropFilter: 'blur(12px)',
          borderColor: scrolled ? '#EAE5D9' : 'transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(11,79,156,0.08)' : 'none',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Badge Container */}
            <Link to="/">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex items-center gap-3 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-sm"
              >
                <img
                  src="/logo.png"
                  alt="KMK Enterprises Logo"
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </motion.div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1.5 relative">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                const textColor = isActive ? '#0B4F9C' : '#334155';

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative px-3 py-1.5 text-xs md:text-sm font-bold tracking-wide uppercase transition-colors duration-200 hover:text-royal-primary"
                    style={{ color: textColor }}
                  >
                    <span>{item.label}</span>

                    {isActive && (
                      <motion.div
                        layoutId="nav-line"
                        className="absolute bottom-0 left-2 right-2 h-1 rounded-full"
                        style={{ backgroundColor: '#0B4F9C' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </Link>
                );
              })}

              <Link to="/contact" className="ml-3">
                <motion.button
                  className="btn-primary-royal text-xs md:text-sm uppercase tracking-wider font-bold py-2.5 px-5"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get in Touch
                </motion.button>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <motion.button
              className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-navy shadow-sm"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                    <X className="w-6 h-6 text-royal-primary" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                    <Menu className="w-6 h-6 text-navy" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[9989] lg:hidden bg-white border-b border-cream-divider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 pt-16">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={item.path}
                    className="text-2xl md:text-3xl font-display font-normal uppercase tracking-wider transition-colors"
                    style={{
                      fontFamily: '"DM Serif Display", serif',
                      color: location.pathname === item.path ? '#0B4F9C' : '#0A192F',
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" className="mt-4">
                <button className="btn-primary-royal text-sm font-bold uppercase tracking-wider">
                  Get in Touch
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

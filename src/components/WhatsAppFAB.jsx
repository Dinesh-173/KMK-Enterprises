import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const WA_PHONE = '919876543210';
const WA_MESSAGE = encodeURIComponent("Hello KMK Enterprises, I'd like to enquire about your services.");
const WA_URL = `https://wa.me/${WA_PHONE}?text=${WA_MESSAGE}`;

export default function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Desktop FAB */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed bottom-8 right-8 z-[9998] hidden md:block"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Tooltip */}
              <AnimatePresence>
                {tooltip && (
                  <motion.div
                    className="absolute right-18 bottom-2 bg-white text-navy text-xs font-bold px-3.5 py-2 rounded-xl whitespace-nowrap shadow-card border border-slate-200"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    Chat on WhatsApp
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FAB Button */}
              <motion.a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-card bg-royal-primary text-white border border-royal-light"
                whileHover={{ scale: 1.1, backgroundColor: '#1D70B8', boxShadow: '0 0 35px rgba(11,79,156,0.45)' }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setTooltip(true)}
                onMouseLeave={() => setTooltip(false)}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom Bar */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[9998] md:hidden"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 bg-royal-primary text-white font-bold text-base uppercase tracking-wider w-full shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Enquire Now on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

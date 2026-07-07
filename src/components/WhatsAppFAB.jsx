import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

// BUG-11 FIX: Centralise WhatsApp number — update this when you have the real number
const WA_PHONE = '919876543210'; // Format: country code + number, no +
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
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="relative">
              {/* Tooltip */}
              <AnimatePresence>
                {tooltip && (
                  <motion.div
                    className="absolute right-16 bottom-2 bg-white text-navy text-sm font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-lg"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    Chat with us on WhatsApp
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-pulse w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: '#25D366' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setTooltip(true)}
                onMouseLeave={() => setTooltip(false)}
              >
                <MessageCircle className="w-7 h-7 text-white fill-white" />
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
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.2 }}
          >
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 text-white font-bold text-base w-full"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Enquire Now on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

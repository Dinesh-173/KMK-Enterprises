import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { staggerContainer, slideUp } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
// BUG-13 FIX: Removed unused 'Package' and 'Star' imports
import { ChevronDown, IceCream2, ArrowRight } from 'lucide-react';

const IceCreamModel = lazy(() => import('../three/IceCreamModel'));
const MoleculeScene = lazy(() => import('../three/MoleculeScene'));

// Typewriter hook
function useTypewriter(text, speed = 60) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let i = 0;
          const interval = setInterval(() => {
            if (i < text.length) {
              setDisplayed(text.slice(0, i + 1));
              i++;
            } else {
              setIsComplete(true);
              clearInterval(interval);
            }
          }, speed);
        }
      },
      { threshold: 0.5 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [text, speed]);

  return { displayed, isComplete, ref };
}

const SABROSA_PRODUCTS = [
  { name: 'Millet Crunch', tag: 'Millet Range', desc: 'Jowar & ragi-based ice cream with caramel swirls', color: '#9B4FDE' },
  { name: 'Heritage Kulfi', tag: 'Kulfi Collection', desc: 'Traditional kesar-pista kulfi with artisanal finish', color: '#7B2FBE' },
  { name: 'Almond Joy Bar', tag: 'Premium Bars', desc: 'Belgian chocolate coated almond nougat ice cream', color: '#9B4FDE' },
  { name: 'Mango Sriracha', tag: 'Fusion Series', desc: 'Sweet Alphonso mango with a smoky chilli kick', color: '#7B2FBE' },
  { name: 'Coconut Lychee', tag: 'Tropical Range', desc: 'Creamy coconut base with lychee ripple and basil', color: '#9B4FDE' },
  { name: 'Charcoal Mint', tag: 'Artisan Series', desc: 'Activated charcoal base with fresh peppermint', color: '#7B2FBE' },
];

const RKV_CATEGORIES = [
  {
    title: 'Dairy Ingredients',
    items: ['Whey Protein Concentrates', 'Milk Protein Isolates', 'Caseinates', 'Lactose & Permeate', 'Butter Oil & AMF'],
  },
  {
    title: 'Functional Additives',
    items: ['Emulsifiers & Stabilizers', 'Natural Flavor Enhancers', 'Colour Solutions', 'Antioxidants', 'Preservatives'],
  },
  {
    title: 'Bakery Ingredients',
    items: ['Specialty Fats & Shortening', 'Bread Improvers', 'Malt Extracts', 'Egg Substitutes', 'Baking Enzymes'],
  },
  {
    title: 'Health & Nutrition',
    items: ['Prebiotic Fibres', 'Plant Protein Blends', 'Vitamin & Mineral Premixes', 'Omega-3 Oils', 'Collagen Peptides'],
  },
];

function RKVAccordion({ category, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border rounded-xl overflow-hidden"
      style={{ borderColor: 'rgba(244,161,0,0.2)' }}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        style={{ backgroundColor: open ? 'rgba(244,161,0,0.08)' : 'transparent' }}
        onClick={() => setOpen(!open)}
      >
        <span className="text-base font-bold text-white">{category.title}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5" style={{ color: '#F4A100' }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              {category.items.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3 py-2.5 border-b last:border-0"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#F4A100' }} />
                  <span className="text-sm" style={{ color: '#8896A5' }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Divisions() {
  const sabrosaTagline = useTypewriter('Crafting Moments of Pure Delight', 65);
  const rkvTagline = useTypewriter('Powering Products with Premium Ingredients', 55);
  const [activeSection, setActiveSection] = useState('sabrosa');
  const sabrosaRef = useRef(null);
  const rkvRef = useRef(null);

  // Scroll-synced section indicator
  useEffect(() => {
    const onScroll = () => {
      if (rkvRef.current) {
        const rkvTop = rkvRef.current.getBoundingClientRect().top;
        setActiveSection(rkvTop < window.innerHeight / 2 ? 'rkv' : 'sabrosa');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-navy min-h-screen" style={{ backgroundColor: '#0B1F3A' }}>
      {/* Scroll-synced indicator */}
      <motion.div
        className="fixed top-24 right-6 z-50 hidden md:flex flex-col gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {[
          { id: 'sabrosa', label: 'Sabrosa', color: '#7B2FBE' },
          { id: 'rkv', label: 'RKV', color: '#F4A100' },
        ].map((sec) => (
          <div key={sec.id} className="flex items-center gap-2">
            <span className="text-xs font-semibold"
              style={{ color: activeSection === sec.id ? '#fff' : '#8896A5' }}>
              {sec.label}
            </span>
            <div className="w-2 h-2 rounded-full"
              style={{ backgroundColor: activeSection === sec.id ? sec.color : 'rgba(255,255,255,0.2)' }} />
          </div>
        ))}
      </motion.div>

      {/* ══ SABROSA SECTION ══ */}
      <section ref={sabrosaRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(123,47,190,0.15) 0%, #060f1e 60%)' }} />

        <Suspense fallback={null}>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 md:block hidden">
            <IceCreamModel />
          </div>
        </Suspense>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 pt-36">

          <div className="max-w-lg">
            <motion.div
              className="inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{ backgroundColor: 'rgba(123,47,190,0.2)', color: '#9B4FDE', border: '1px solid rgba(123,47,190,0.4)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Division 01
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4">Sabrosa<br />Ice Creams</h2>


            <p ref={sabrosaTagline.ref} className="text-xl font-semibold mb-6 typewriter-cursor"
              style={{ color: '#9B4FDE', minHeight: '1.5em' }}>
              {sabrosaTagline.displayed}
            </p>

            <p className="text-base mb-10" style={{ color: '#8896A5' }}>
              Sabrosa is KMK's flagship ice cream brand — known for pioneering 
              millet-based functional ice creams and traditional Indian kulfi experiences.
            </p>

            {/* BUG-03 FIX: Use React Router Link to avoid full page reload */}
            <Link to="/contact">
              <motion.div
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #7B2FBE, #5a1f8e)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(123,47,190,0.5)' }}>
                Partner with Sabrosa <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Sabrosa Product Portfolio */}
      <section className="section-padding" style={{ backgroundColor: '#060f1e' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h3 className="text-2xl font-black text-white mb-10">Product Portfolio</h3>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {SABROSA_PRODUCTS.map((product) => (
              <motion.div key={product.name} variants={slideUp}>
                <motion.div
                  className="glass rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                  style={{ border: `1px solid ${product.color}25` }}
                  whileHover={{
                    borderColor: `${product.color}60`,
                    boxShadow: `0 0 30px ${product.color}25`,
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: `linear-gradient(135deg, ${product.color}08, transparent)` }} />

                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${product.color}18` }}>
                      <IceCream2 className="w-5 h-5" style={{ color: product.color }} />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-full"
                      style={{ backgroundColor: `${product.color}15`, color: product.color }}>
                      {product.tag}
                    </span>
                  </div>

                  {/* BUG-17 FIX: text-purple-light doesn't exist; use inline style on hover via motion */}
                  <h4 className="text-lg font-bold text-white mb-2 transition-colors"
                    style={{ transition: 'color 0.2s ease' }}>
                    {product.name}
                  </h4>
                  <p className="text-sm" style={{ color: '#8896A5' }}>{product.desc}</p>

                  {/* Hover zoom effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: product.color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ RKV SECTION ══ */}
      <section ref={rkvRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(244,161,0,0.1) 0%, #060f1e 60%)' }} />

        <Suspense fallback={null}>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
            <MoleculeScene color="#F4A100" />
          </div>
        </Suspense>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 pt-36">

          <div className="max-w-lg">
            <motion.div
              className="inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{ backgroundColor: 'rgba(244,161,0,0.15)', color: '#F4A100', border: '1px solid rgba(244,161,0,0.4)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Division 02
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4">RKV<br />Enterprises</h2>


            <p ref={rkvTagline.ref} className="text-xl font-semibold mb-6 typewriter-cursor"
              style={{ color: '#F4A100', minHeight: '1.5em' }}>
              {rkvTagline.displayed}
            </p>

            <p className="text-base mb-10" style={{ color: '#8896A5' }}>
              RKV Enterprises is KMK's B2B ingredient solutions arm — sourcing, 
              blending, and distributing premium food ingredients to manufacturers 
              across dairy, bakery, and beverage industries.
            </p>

            {/* BUG-03 FIX: Use React Router Link to avoid full page reload */}
            <Link to="/contact">
              <motion.div
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #F4A100, #c07d00)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(244,161,0,0.5)' }}>
                Source Ingredients <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* RKV Product Categories */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <h3 className="text-2xl font-black text-white mb-10">Ingredient Categories</h3>
          </AnimatedSection>

          <div className="space-y-4">
            {RKV_CATEGORIES.map((cat, i) => (
              <RKVAccordion key={cat.title} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { staggerContainer, slideUp } from '../components/AnimatedSection';
import { ChevronDown, IceCream2, ArrowRight } from 'lucide-react';

const IceCreamModel = lazy(() => import('../three/IceCreamModel'));
const MoleculeScene = lazy(() => import('../three/MoleculeScene'));

const SABROSA_PRODUCTS = [
  { name: 'Millet Crunch', tag: 'Millet Range', desc: 'Jowar & ragi-based ice cream with caramel swirls', image: '/images/icecream_millet_crunch.png' },
  { name: 'Heritage Kulfi', tag: 'Kulfi Collection', desc: 'Traditional kesar-pista kulfi with artisanal finish', image: '/images/icecream_heritage_kulfi.png' },
  { name: 'Almond Joy Bar', tag: 'Premium Bars', desc: 'Belgian chocolate coated almond nougat ice cream', image: '/images/icecream_almond_bar.png' },
  { name: 'Mango Sriracha', tag: 'Fusion Series', desc: 'Sweet Alphonso mango with a smoky chilli kick', image: '/images/icecream_mango_sriracha.png' },
  { name: 'Coconut Lychee', tag: 'Tropical Range', desc: 'Creamy coconut base with lychee ripple and basil', image: '/images/icecream_coconut_lychee.png' },
  { name: 'Charcoal Mint', tag: 'Artisan Series', desc: 'Activated charcoal base with fresh peppermint', image: '/images/icecream_charcoal_mint.png' },
];

const RKV_CATEGORIES = [
  {
    title: 'Dairy Ingredients',
    tag: 'Category 01',
    image: '/images/dairy_ingredients.png',
    items: ['Whey Protein Concentrates', 'Milk Protein Isolates', 'Caseinates', 'Lactose & Permeate', 'Butter Oil & AMF'],
  },
  {
    title: 'Functional Additives',
    tag: 'Category 02',
    image: '/images/service_regulatory.png',
    items: ['Emulsifiers & Stabilizers', 'Natural Flavor Enhancers', 'Colour Solutions', 'Antioxidants', 'Preservatives'],
  },
  {
    title: 'Bakery Ingredients',
    tag: 'Category 03',
    image: '/images/service_food_tech.png',
    items: ['Specialty Fats & Shortening', 'Bread Improvers', 'Malt Extracts', 'Egg Substitutes', 'Baking Enzymes'],
  },
  {
    title: 'Health & Nutrition',
    tag: 'Category 04',
    image: '/images/rd_laboratory.png',
    items: ['Prebiotic Fibres', 'Plant Protein Blends', 'Vitamin & Mineral Premixes', 'Omega-3 Oils', 'Collagen Peptides'],
  },
];

function RKVAccordion({ category, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border rounded-2xl overflow-hidden bg-white shadow-card border-cream-divider border-t-4 border-t-royal-primary"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 items-center">
        {/* Category Image */}
        <div className="h-56 md:h-full w-full overflow-hidden relative group">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-navy/90 text-white text-xs font-mono px-3.5 py-1.5 rounded-full uppercase tracking-wider font-bold">
            {category.tag}
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-2 p-6 md:p-10">
          <button
            className="w-full flex items-center justify-between text-left"
            onClick={() => setOpen(!open)}
          >
            <h4 className="text-2xl md:text-3xl font-bold text-navy">{category.title}</h4>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown className="w-6 h-6 text-royal-primary" />
            </motion.div>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-cream-divider space-y-3">
                  {category.items.map((item, i) => (
                    <motion.div
                      key={item}
                      className="flex items-center gap-3 py-2 border-b border-cream-divider/60 last:border-0"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-royal-primary" />
                      <span className="text-base font-semibold text-text-body">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Divisions() {
  const sabrosaRef = useRef(null);
  const rkvRef = useRef(null);

  return (
    <div className="bg-base min-h-screen grain-overlay">
      {/* Hero Banner */}
      <section className="relative min-h-[40vh] flex items-center page-hero-pt pb-20 md:pb-24 bg-base border-b border-cream-divider">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase mb-4 inline-block tag-royal">
              Our Portfolio
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-normal text-navy mb-6" style={{ fontFamily: '"DM Serif Display", serif' }}>
              Our Business Divisions
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl text-text-body font-medium leading-relaxed">
              Discover how KMK Enterprises leads both in B2C artisanal food innovation and B2B specialty ingredient sourcing.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ SABROSA SECTION ══ */}
      <section ref={sabrosaRef} className="relative overflow-hidden py-20 bg-soft border-b border-cream-divider">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Info */}
            <div className="max-w-xl">
              <span className="inline-block px-4 py-2 rounded-full text-xs md:text-sm font-mono uppercase tracking-widest mb-6 tag-royal font-bold">
                Division 01 • Sabrosa Ice Creams
              </span>

              <h2 className="text-4xl sm:text-6xl font-display font-normal text-navy mb-4" style={{ fontFamily: '"DM Serif Display", serif' }}>Sabrosa Ice Creams</h2>
              <p className="text-xl md:text-2xl font-mono text-royal-primary font-bold mb-6">Fresh, Natural, Artisanal Ice Creams</p>
              <p className="text-base md:text-lg text-text-body mb-10 leading-relaxed font-medium">
                Sabrosa is KMK's flagship ice cream brand — known for pioneering millet-based functional ice creams, gourmet artisanal bars, and traditional Indian kulfi experiences.
              </p>

              <Link to="/contact">
                <motion.button className="btn-primary-royal text-base font-bold" whileHover={{ scale: 1.03 }}>
                  Partner with Sabrosa <ArrowRight className="w-5 h-5 ml-1" />
                </motion.button>
              </Link>
            </div>

            {/* 3D Scene */}
            <div className="h-[340px] sm:h-[450px] w-full relative bg-white rounded-2xl p-6 border border-slate-200 shadow-card">
              <Suspense fallback={null}>
                <IceCreamModel />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Sabrosa Product Portfolio */}
      <section className="section-padding-royal bg-base border-b border-cream-divider">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="mb-14 text-center">
              <span className="text-xs font-mono uppercase tracking-widest tag-royal font-bold">Sabrosa Lineup</span>
              <h3 className="text-4xl md:text-5xl font-display font-normal text-navy mt-3" style={{ fontFamily: '"DM Serif Display", serif' }}>Artisanal Product Portfolio</h3>
            </div>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {SABROSA_PRODUCTS.map((product) => (
              <motion.div key={product.name} variants={slideUp}>
                <motion.div
                  className="card-royal p-6 h-full flex flex-col justify-between"
                  whileHover={{ y: -6 }}
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden rounded-xl mb-6 border border-slate-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/95 border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                        <IceCream2 className="w-4 h-4 text-royal-primary" />
                        <span className="text-xs font-mono font-bold text-royal-primary">{product.tag}</span>
                      </div>
                    </div>

                    <h4 className="text-2xl font-bold text-navy mb-2">{product.name}</h4>
                    <p className="text-base text-text-body font-medium">{product.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-cream-divider flex items-center justify-between">
                    <span className="text-xs font-mono text-silver-dark uppercase font-bold">Artisanal Range</span>
                    <span className="w-3 h-3 rounded-full bg-royal-primary" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ RKV SECTION ══ */}
      <section ref={rkvRef} className="relative overflow-hidden py-20 bg-base border-b border-cream-divider">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Info */}
            <div className="max-w-xl">
              <span className="inline-block px-4 py-2 rounded-full text-xs md:text-sm font-mono uppercase tracking-widest mb-6 tag-muted font-bold">
                Division 02 • RKV Enterprises
              </span>

              <h2 className="text-4xl sm:text-6xl font-display font-normal text-navy mb-4" style={{ fontFamily: '"DM Serif Display", serif' }}>RKV Enterprises</h2>
              <p className="text-xl md:text-2xl font-mono text-silver-dark font-bold mb-6">Premium Specialty Ingredient Solutions</p>
              <p className="text-base md:text-lg text-text-body mb-10 leading-relaxed font-medium">
                RKV Enterprises is KMK's B2B ingredient solutions arm — sourcing, blending, and distributing premium food ingredients to manufacturers across dairy, bakery, and beverage industries.
              </p>

              <Link to="/contact">
                <motion.button className="btn-ghost-royal text-base font-bold text-navy" whileHover={{ scale: 1.03 }}>
                  Source Ingredients <ArrowRight className="w-5 h-5 ml-1" />
                </motion.button>
              </Link>
            </div>

            {/* 3D Prism Scene */}
            <div className="h-[340px] sm:h-[450px] w-full relative bg-soft rounded-2xl p-6 border border-slate-200 shadow-card">
              <Suspense fallback={null}>
                <MoleculeScene isPrism={true} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* RKV Accordions */}
      <section className="section-padding-royal bg-soft">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="mb-14 text-center">
              <span className="text-xs font-mono uppercase tracking-widest tag-muted font-bold">B2B Portfolio</span>
              <h3 className="text-4xl md:text-5xl font-display font-normal text-navy mt-3" style={{ fontFamily: '"DM Serif Display", serif' }}>Ingredient Categories</h3>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {RKV_CATEGORIES.map((cat, i) => (
              <RKVAccordion key={cat.title} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

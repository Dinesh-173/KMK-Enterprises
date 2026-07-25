import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { Milk, IceCream2, Leaf, Coffee, Candy, Croissant, ShoppingBag, Heart } from 'lucide-react';

const INDUSTRIES = [
  { id: 'dairy', label: 'Dairy', icon: Milk, category: 'food', desc: 'Fermented dairy, cheese, butter, ghee, yogurt innovations.' },
  { id: 'ice-cream', label: 'Ice Creams', icon: IceCream2, category: 'frozen', desc: 'Artisanal, functional, and millet-based frozen desserts.' },
  { id: 'functional', label: 'Functional Foods', icon: Heart, category: 'health', desc: 'Nutraceuticals, fortified foods, and health-first products.' },
  { id: 'beverages', label: 'Health Beverages', icon: Coffee, category: 'health', desc: 'Plant-based drinks, health shots, and functional beverages.' },
  { id: 'confectionery', label: 'Confectionery', icon: Candy, category: 'food', desc: 'Chocolates, gummies, sugar-free and premium candies.' },
  { id: 'bakery', label: 'Bakery', icon: Croissant, category: 'food', desc: 'Breads, pastries, gluten-free, and artisan baked goods.' },
  { id: 'fmcg', label: 'FMCG', icon: ShoppingBag, category: 'retail', desc: 'Mass-market consumer foods, snacks, and packaged products.' },
  { id: 'nutritional', label: 'Nutritional', icon: Leaf, category: 'health', desc: 'Sports nutrition, infant foods, and therapeutic diets.' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Industries' },
  { id: 'food', label: 'Food & Dairy' },
  { id: 'health', label: 'Health & Wellness' },
  { id: 'frozen', label: 'Frozen' },
  { id: 'retail', label: 'FMCG & Retail' },
];

function HexCard({ industry, isActive, onClick, index }) {
  return (
    <motion.div
      layout
      className="flex flex-col items-center gap-3 cursor-pointer select-none"
      initial={{ opacity: 0, scale: 0.8, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onClick={onClick}
    >
      <motion.div
        className="hex-clip flex items-center justify-center relative overflow-hidden shadow-card border transition-all duration-300"
        style={{
          width: 120,
          height: 138,
          backgroundColor: isActive ? '#0B4F9C' : '#FFFFFF',
          borderColor: isActive ? '#1D70B8' : '#EAE5D9',
          opacity: isActive === false ? 0.45 : 1,
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <industry.icon
          className="w-10 h-10 relative z-10 transition-colors"
          style={{ color: isActive ? '#FFFFFF' : '#0B4F9C' }}
        />
      </motion.div>

      <span className="text-xs md:text-sm font-mono font-bold text-center leading-tight text-navy uppercase">
        {industry.label}
      </span>
    </motion.div>
  );
}

export default function Industries() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndustry, setActiveIndustry] = useState(null);

  const filtered = INDUSTRIES.filter(
    (ind) => activeCategory === 'all' || ind.category === activeCategory
  );

  const activeData = INDUSTRIES.find((i) => i.id === activeIndustry);

  return (
    <div className="bg-base min-h-screen grain-overlay">
      {/* Hero Header */}
      <section className="relative min-h-[40vh] flex items-center page-hero-pt pb-20 md:pb-24 bg-base border-b border-cream-divider">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase mb-4 inline-block tag-royal">
              Where We Operate
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-normal text-navy mb-6" style={{ fontFamily: '"DM Serif Display", serif' }}>
              Industries Served
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl text-text-body font-medium leading-relaxed">
              Deep food technology expertise across 8 major food and beverage sectors.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-soft border-b border-cream-divider">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                className="px-5 py-2.5 rounded-full text-xs md:text-sm font-mono uppercase font-bold transition-all"
                style={{
                  backgroundColor: activeCategory === cat.id ? '#0B4F9C' : '#FFFFFF',
                  color: activeCategory === cat.id ? '#FFFFFF' : '#334155',
                  border: activeCategory === cat.id ? '1px solid #0B4F9C' : '1px solid #EAE5D9',
                }}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveIndustry(null);
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Hex Grid Section */}
      <section className="section-padding-royal bg-soft border-b border-cream-divider">
        <div className="max-w-5xl mx-auto px-6">
          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 justify-items-center"
            >
              <AnimatePresence>
                {filtered.map((industry, i) => (
                  <HexCard
                    key={industry.id}
                    industry={industry}
                    index={i}
                    isActive={activeIndustry === null ? null : activeIndustry === industry.id}
                    onClick={() => setActiveIndustry(activeIndustry === industry.id ? null : industry.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {/* Detail panel */}
          <AnimatePresence>
            {activeData && (
              <motion.div
                className="mt-16 bg-white rounded-2xl p-8 md:p-10 border border-slate-200 shadow-card border-t-4 border-t-royal-primary"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-6">
                  <div className="hex-clip flex items-center justify-center flex-shrink-0 shadow-md bg-royal-primary"
                    style={{ width: 80, height: 90 }}>
                    <activeData.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-navy mb-2">{activeData.label}</h3>
                    <p className="text-base md:text-lg text-text-body font-medium leading-relaxed">{activeData.desc}</p>
                    <p className="text-xs md:text-sm font-mono font-bold mt-4 text-royal-primary uppercase">
                      KMK's experts bring 20+ years of sector-specific knowledge to deliver compliant, market-ready products.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-base">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: '8+', label: 'Industries' },
              { val: '500+', label: 'Products' },
              { val: '20+', label: 'Years Experience' },
              { val: '100+', label: 'Clients Served' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="card-royal text-center p-8"
                whileHover={{ y: -4 }}
              >
                <div className="text-4xl md:text-5xl font-display font-normal mb-2 text-royal-primary" style={{ fontFamily: '"DM Serif Display", serif' }}>{stat.val}</div>
                <div className="text-xs md:text-sm font-mono font-bold uppercase text-silver-dark">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

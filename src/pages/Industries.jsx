import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import AnimatedSection, { staggerContainer, slideUp } from '../components/AnimatedSection';
import { Milk, IceCream2, Leaf, Coffee, Candy, Croissant, ShoppingBag, Heart } from 'lucide-react';

const INDUSTRIES = [
  { id: 'dairy', label: 'Dairy', icon: Milk, category: 'food', color: '#00A896', desc: 'Fermented dairy, cheese, butter, ghee, yogurt innovations.' },
  { id: 'ice-cream', label: 'Ice Creams', icon: IceCream2, category: 'frozen', color: '#7B2FBE', desc: 'Artisanal, functional, and millet-based frozen desserts.' },
  { id: 'functional', label: 'Functional Foods', icon: Heart, category: 'health', color: '#00A896', desc: 'Nutraceuticals, fortified foods, and health-first products.' },
  { id: 'beverages', label: 'Health Beverages', icon: Coffee, category: 'health', color: '#F4A100', desc: 'Plant-based drinks, health shots, and functional beverages.' },
  { id: 'confectionery', label: 'Confectionery', icon: Candy, category: 'food', color: '#7B2FBE', desc: 'Chocolates, gummies, sugar-free and premium candies.' },
  { id: 'bakery', label: 'Bakery', icon: Croissant, category: 'food', color: '#F4A100', desc: 'Breads, pastries, gluten-free, and artisan baked goods.' },
  { id: 'fmcg', label: 'FMCG', icon: ShoppingBag, category: 'retail', color: '#00A896', desc: 'Mass-market consumer foods, snacks, and packaged products.' },
  { id: 'nutritional', label: 'Nutritional', icon: Leaf, category: 'health', color: '#7B2FBE', desc: 'Sports nutrition, infant foods, and therapeutic diets.' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Industries' },
  { id: 'food', label: 'Food & Dairy' },
  { id: 'health', label: 'Health & Wellness' },
  { id: 'frozen', label: 'Frozen' },
  { id: 'retail', label: 'FMCG & Retail' },
];

function HexCard({ industry, isActive, onClick, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      className="flex flex-col items-center gap-4 cursor-pointer select-none"
      initial={{ opacity: 0, scale: 0.5, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.07 }}
      onClick={onClick}
    >
      <motion.div
        className="hex-clip flex items-center justify-center relative overflow-hidden"
        style={{
          width: 120,
          height: 138,
          backgroundColor: isActive ? industry.color : 'rgba(17,40,72,0.8)',
          border: `2px solid ${isActive ? industry.color : 'rgba(255,255,255,0.08)'}`,
          // BUG-09 FIX: Use a clear boolean — dim only when something else is active (not null/undefined)
          opacity: isActive === false ? 0.35 : 1,
        }}
        animate={{ opacity: isActive === false ? 0.35 : 1 }}
        whileHover={{ scale: 1.12, rotate: 8 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >

        {/* Radial fill on hover */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${industry.color}60, transparent 70%)`,
            scale: hovered ? 1.5 : 0,
          }}
          animate={{ scale: hovered ? 2 : 0 }}
          transition={{ duration: 0.4 }}
        />

        <industry.icon
          className="w-10 h-10 relative z-10"
          style={{ color: isActive || hovered ? '#fff' : industry.color }}
        />
      </motion.div>

      <span className="text-xs font-bold text-center leading-tight"
        style={{ color: isActive ? '#fff' : '#8896A5' }}>
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
    <div className="bg-navy min-h-screen" style={{ backgroundColor: '#0B1F3A' }}>
      {/* ══ HERO ══ */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-28" style={{ background: 'linear-gradient(180deg, #060f1e 0%, #0B1F3A 100%)' }}>

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,168,150,0.07) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <AnimatedSection>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#00A896' }}>
              Where We Operate
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Industries <span className="gradient-text-teal">Served</span>
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: '#8896A5' }}>
              Deep expertise across 8 food and beverage sectors — from dairy to nutraceuticals.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12" style={{ backgroundColor: '#060f1e' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                className="px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                style={{
                  backgroundColor: activeCategory === cat.id ? '#00A896' : 'rgba(255,255,255,0.06)',
                  color: activeCategory === cat.id ? '#fff' : '#8896A5',
                  border: activeCategory === cat.id ? '1px solid #00A896' : '1px solid rgba(255,255,255,0.1)',
                }}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveIndustry(null);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Hex Grid */}
      <section className="section-padding relative">
        <div className="dot-matrix-bg absolute inset-0 opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6">
          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center"
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
                className="mt-16 glass rounded-2xl p-8"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="flex items-start gap-6">
                  <div className="hex-clip flex items-center justify-center flex-shrink-0"
                    style={{ width: 80, height: 92, backgroundColor: activeData.color }}>
                    <activeData.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">{activeData.label}</h3>
                    <p className="text-base" style={{ color: '#8896A5' }}>{activeData.desc}</p>
                    <p className="text-sm mt-4" style={{ color: activeData.color }}>
                      KMK's experts bring 20+ years of sector-specific knowledge to deliver 
                      compliant, market-ready products for this industry.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24" style={{ backgroundColor: '#060f1e' }}>
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
                className="text-center glass rounded-xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-black mb-2 gradient-text-teal">{stat.val}</div>
                <div className="text-xs font-medium" style={{ color: '#8896A5' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

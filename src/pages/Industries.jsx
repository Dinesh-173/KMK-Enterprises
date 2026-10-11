import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import {
  Milk,
  IceCreamBowl,
  Heart,
  Coffee,
  Candy,
  Leaf,
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const INDUSTRIES = [
  {
    id: 'dairy',
    label: 'DAIRY',
    heading: 'Dairy',
    icon: Milk,
    subtitle: 'Dairy Beverages, Cultured & Fermented Formulations',
    description: 'Advanced dairy processing, microbial shelf-life stabilization, and high-protein emulsion formulations tailored for commercial scale.',
    items: [
      {
        title: 'Dairy beverage',
        isNested: true,
        subItems: ['Milk shake', 'Flavoured Milk', 'High protein beverage'],
      },
      {
        title: 'Fermented dairy beverages',
        isNested: false,
        desc: 'Probiotic lassis, kefirs, and cultured milk drinks formulated with targeted strain viability.',
      },
      {
        title: 'Curd',
        isNested: false,
        desc: 'Traditional and standardized dahi with firm set, zero whey syneresis, and extended shelf freshness.',
      },
    ],
  },
  {
    id: 'ice-creams',
    label: 'ICE CREAMS',
    heading: 'Icecreams',
    icon: IceCreamBowl,
    subtitle: 'Artisanal, Novelty & Industrial Frozen Formulations',
    description: 'Crystal size minimization, meltdown rate control, and innovative dairy and plant-based matrices engineered for supreme indulgence.',
    items: [
      { title: 'Premium Icecream', desc: 'Low overrun, rich butterfat formulations with velvety texture.' },
      { title: 'Gelato', desc: 'Slow-churned, dense Italian bases with rich flavor release.' },
      { title: 'Inclusion development', desc: 'Ripples, fruit chunks, swirls, and bits that stay soft and crunchy at -18°C.' },
      { title: 'Fruit based Icecreams', desc: 'Real fruit purees stabilized against icy crystallization.' },
      { title: 'Kulfi', desc: 'Caramelized, rabdi-rich traditional recipes with authentic graininess.' },
      { title: 'Water ice', desc: 'Refreshing non-dairy freeze pops with bleed-free colors.' },
      { title: 'Sorbet', desc: 'Silky fruit sorbets with natural pectin stabilization.' },
      { title: 'Cut extrusion Icecreams', desc: 'Novelty shapes and slices with superior extrusion integrity.' },
      { title: 'Sandwich and cake Icecreams', desc: 'Moisture-barrier wafers and cakes assembled with frozen layers.' },
    ],
  },
  {
    id: 'functional-foods',
    label: 'FUNCTIONAL FOODS',
    heading: 'Functional foods',
    icon: Heart,
    subtitle: 'Nutraceuticals, Bioactive Delivery & Fortification',
    description: 'Combining functional nutritional science with appetizing snacks and breakfast matrices for daily wellness and satiety.',
    items: [
      {
        title: 'Nutritional bars',
        desc: 'High-protein, prebiotic, and energy bars formulated to stay soft throughout shelf life.',
      },
      {
        title: 'Breakfast cereals with millet and vitamins',
        desc: 'Nutrient-dense extruded flakes and clusters featuring ancient millets and microencapsulated vitamins.',
      },
    ],
  },
  {
    id: 'health-beverages',
    label: 'HEALTH BEVERAGES',
    heading: 'Health beverages',
    icon: Coffee,
    subtitle: 'Sugar-Free Innovation & Fruit Suspension Formulations',
    description: 'Refreshing functional drinks engineered for clean mouthfeel, active nutrient stability, and appealing visual presentation.',
    items: [
      {
        title: 'No sugar beverages',
        desc: 'Stevia, monk fruit, and natural sweetener blends providing clean mouthfeel without bitter notes.',
      },
      {
        title: 'Fruit suspended beverages',
        desc: 'Hydrocolloid suspension networks providing uniform fruit cells and pulp without precipitation.',
      },
    ],
  },
  {
    id: 'confectionery',
    label: 'CONFECTIONERY',
    heading: 'Confectionery',
    icon: Candy,
    subtitle: 'Boiled Sweets, Toffees & Coated Delights',
    description: 'Mastering cooking temperatures, sugar inversion control, and confectionery texture stabilization for tropical climates.',
    items: [
      { title: 'Hard boils confectionery', desc: 'Glassy, non-sticky hard candies with vibrant flavor release.' },
      { title: 'Toffee', desc: 'Rich butter-cooked dairy toffees with authentic Maillard caramelization.' },
      { title: 'Lollipops', desc: 'Crystal-clear, bubble-free molded & deposited pops with center filling.' },
      { title: 'Chewy toffee', desc: 'Soft-eating, non-sticking elastic toffees engineered with emulsifiers.' },
      { title: 'Panned confectionery', desc: 'Hard and soft panned dragees with uniform shine and protective coating.' },
    ],
  },
  {
    id: 'nutritional',
    label: 'NUTRITIONAL',
    heading: 'Nutritional',
    icon: Leaf,
    subtitle: 'Specialized Wellness, Protein & Fortified Nutrition',
    description: 'Formulations engineered for targeted nutritional profiles, bioavailable vitamins, and condition-specific dietary benefits.',
    items: [
      { title: 'Nutritional bars', desc: 'High-protein, meal replacement, and endurance energy bars.' },
      { title: 'Breakfast cereals with millet and vitamins', desc: 'Ancient millet flakes fortified with essential vitamins and minerals.' },
      { title: 'Sports & Clinical Nutrition', desc: 'Whey and plant isolate powders, recovery drinks, and clinical meal premixes.' },
    ],
  },
];

export default function Industries() {
  const [activePopup, setActivePopup] = useState(null);

  // Close popup with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePopup(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (activePopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePopup]);

  return (
    <div className="bg-base min-h-screen grain-overlay">
      {/* Hero Header */}
      <section className="relative min-h-[35vh] flex items-center page-hero-pt pb-12 md:pb-16 bg-base border-b border-cream-divider">
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase mb-4 inline-block tag-royal">
              Where We Operate
            </span>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-display font-normal text-navy mb-5"
              style={{ fontFamily: '"DM Serif Display", serif' }}
            >
              Industries Served
            </h1>
            <p className="text-base md:text-xl max-w-2xl mx-auto text-text-body font-medium leading-relaxed">
              Explore our core food science and formulation sectors.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal-subtle/80 border border-blue-200/60 text-royal-primary text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Click or tap any icon to pop open product details
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Clean Icon Grid Section — Exactly matching the layout of Image 2 */}
      <section className="py-20 md:py-28 bg-soft border-b border-cream-divider relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-items-center">
            {INDUSTRIES.map((industry, index) => {
              const IconComp = industry.icon;

              return (
                <motion.div
                  key={industry.id}
                  className="flex flex-col items-center cursor-pointer select-none group w-full max-w-[180px]"
                  initial={{ opacity: 0, scale: 0.85, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  onClick={() => setActivePopup(industry)}
                >
                  {/* Square Card Box (Clean White, crisp border and soft shadow as in Image 2) */}
                  <motion.div
                    className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-white rounded-2xl flex flex-col items-center justify-center relative border border-[#EAE5D9] shadow-[0_6px_24px_rgba(11,79,156,0.06)] hover:border-royal-mid hover:shadow-[0_16px_36px_rgba(11,79,156,0.18)] transition-all duration-300 group-hover:bg-blue-50/20"
                    whileHover={{ scale: 1.08, y: -6 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    {/* Blue Line Icon */}
                    <IconComp
                      className="w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: '#0B4F9C', strokeWidth: 1.8 }}
                    />

                    {/* Subtle pulse hint badge */}
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-royal-primary"></span>
                      </span>
                    </div>

                    <span className="absolute bottom-2 text-[10px] font-mono text-royal-mid opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider font-bold">
                      Tap to view
                    </span>
                  </motion.div>

                  {/* Uppercase Heading Label under the card */}
                  <span className="mt-4 text-xs md:text-sm font-mono font-bold text-center tracking-widest text-navy uppercase group-hover:text-royal-primary transition-colors">
                    {industry.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* POP-UP MODAL (When clicking/touching any icon) */}
      <AnimatePresence>
        {activePopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#0A192F]/65 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePopup(null)}
            />

            {/* Pop-up Dialog Card with Spring Pop Animation */}
            <motion.div
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.75, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            >
              {/* Top Accent Strip */}
              <div className="h-2 w-full bg-gradient-to-r from-royal-primary via-royal-bright to-royal-mid" />

              {/* Modal Header */}
              <div className="p-6 md:p-8 pb-4 flex items-start justify-between border-b border-slate-100 bg-[#FAF9F6]">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-[#EAE5D9] shadow-md flex items-center justify-center flex-shrink-0">
                    <activePopup.icon
                      className="w-9 h-9"
                      style={{ color: '#0B4F9C', strokeWidth: 1.8 }}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-royal-primary uppercase tracking-widest block">
                      {activePopup.label}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-display font-normal text-navy"
                      style={{ fontFamily: '"DM Serif Display", serif' }}
                    >
                      {activePopup.heading}
                    </h3>
                    <p className="text-xs md:text-sm text-text-muted mt-0.5 font-medium">
                      {activePopup.subtitle}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActivePopup(null)}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-navy hover:bg-slate-100 flex items-center justify-center transition-all shadow-sm cursor-pointer flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Scrollable list of items */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-4">
                <p className="text-xs md:text-sm text-silver-dark leading-relaxed">
                  {activePopup.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-mono font-bold text-navy uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-royal-primary" />
                    Key Formulations & Products
                  </h4>

                  {/* Dairy Special Grouping */}
                  {activePopup.id === 'dairy' ? (
                    <div className="space-y-3">
                      {/* Dairy beverage group */}
                      <div className="bg-[#FAF9F6] border border-[#EAE5D9] rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-royal-primary" />
                          <h5 className="font-bold text-base text-navy">Dairy beverage</h5>
                        </div>

                        <div className="space-y-2.5 pl-3 border-l-2 border-royal-primary ml-1">
                          {activePopup.items[0]?.subItems?.map((sub, sIdx) => (
                            <div
                              key={sIdx}
                              className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center gap-3 shadow-xs"
                            >
                              <CheckCircle2 className="w-4 h-4 text-royal-primary flex-shrink-0" />
                              <span className="text-sm font-semibold text-navy">{sub}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Standalone items */}
                      {activePopup.items.slice(1).map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-[#FAF9F6] border border-[#EAE5D9] rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:border-royal-primary/40 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-royal-primary flex-shrink-0" />
                          <div>
                            <h5 className="font-bold text-sm md:text-base text-navy">{item.title}</h5>
                            {item.desc && (
                              <p className="text-xs text-silver-dark mt-0.5">{item.desc}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Other categories (Icecreams, Functional foods, Health beverages, Confectionery, Nutritional) */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activePopup.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-[#FAF9F6] border border-[#EAE5D9] rounded-xl p-3.5 flex items-start gap-2.5 hover:border-royal-primary/40 hover:bg-white transition-all shadow-xs"
                        >
                          <CheckCircle2 className="w-4 h-4 text-royal-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-bold text-sm text-navy">{item.title}</h5>
                            {item.desc && (
                              <p className="text-xs text-silver-dark mt-0.5 leading-relaxed">
                                {item.desc}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 md:p-6 bg-[#FAF9F6] border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-silver-dark uppercase tracking-wider">
                  KMK Food Science & Technology
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActivePopup(null)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 hover:bg-white transition-all cursor-pointer"
                  >
                    Close
                  </button>
                  <Link
                    to="/contact"
                    onClick={() => setActivePopup(null)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-royal-primary text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-royal-mid transition-all shadow-btn"
                  >
                    Enquire Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-base">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { val: '6+', label: 'Core Sectors' },
              { val: '500+', label: 'Formulations' },
              { val: '20+', label: 'Years Experience' },
              { val: '100+', label: 'Clients Served' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 md:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm"
                whileHover={{ y: -4 }}
              >
                <div
                  className="text-4xl md:text-5xl font-display font-normal mb-2 text-royal-primary"
                  style={{ fontFamily: '"DM Serif Display", serif' }}
                >
                  {stat.val}
                </div>
                <div className="text-xs md:text-sm font-mono font-bold uppercase text-silver-dark">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Consultation CTA */}
          <div className="mt-16 text-center">
            <h3
              className="text-2xl md:text-3xl font-display text-navy mb-3"
              style={{ fontFamily: '"DM Serif Display", serif' }}
            >
              Need a Custom Food or Beverage Formulation?
            </h3>
            <p className="text-sm md:text-base text-text-muted mb-6 max-w-xl mx-auto font-medium">
              Consult with Senior Technologist Manivvannan A and our food science team.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-royal-primary text-white font-mono text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-royal-mid transition-all shadow-btn"
            >
              Start Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

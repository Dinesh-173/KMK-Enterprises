import { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Beaker, ShieldCheck, Lightbulb, Rocket, Leaf } from 'lucide-react';
import AnimatedSection, { staggerContainer, slideUp } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { useCountUp } from '../hooks/useCountUp';

const HeroScene = lazy(() => import('../three/HeroScene'));

function useTextScramble(finalText, trigger = true) {
  const [text, setText] = useState('');
  const CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    let rafId;
    let queue = finalText.split('').map((char, i) => ({
      from: char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)],
      to: char,
      start: Math.floor(i * 0.7),
      end: Math.floor(i * 0.7) + Math.floor(Math.random() * 15) + 5,
    }));

    const update = () => {
      let output = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          output += from;
        }
      }
      setText(output);
      if (complete < queue.length) {
        frame++;
        rafId = requestAnimationFrame(update);
      }
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [finalText, trigger]);

  return text;
}

function StatCard({ value, suffix, label }) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div ref={ref} className="bg-white p-8 md:p-10 rounded-2xl border border-cream-divider shadow-card text-center">
      <div className="text-5xl lg:text-7xl font-display font-normal text-navy mb-2" style={{ fontFamily: '"DM Serif Display", serif' }}>
        <span>{count}</span>
        <span className="text-royal-primary">{suffix}</span>
      </div>
      <div className="text-sm font-mono uppercase tracking-widest text-royal-primary font-bold mb-4">{label}</div>
      <div className="h-1.5 w-24 mx-auto rounded-full bg-soft overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-royal-primary"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}

const SERVICES = [
  { icon: Beaker, title: 'Product Development', desc: 'From concept to shelf — we engineer breakthrough food products with precision formulation.' },
  { icon: ShieldCheck, title: 'Regulatory & Quality', desc: 'Navigate complex compliance landscapes with our expert regulatory and quality systems.' },
  { icon: Lightbulb, title: 'Food Tech Consulting', desc: 'Strategic advisory that unlocks hidden value across your food technology value chain.' },
  { icon: Rocket, title: 'R&D Innovation', desc: 'Cutting-edge research translating consumer insights into market-ready innovations.' },
  { icon: Leaf, title: 'Startup Incubation', desc: 'Mentoring food-tech entrepreneurs from idea-stage to successful market launch.' },
];

export default function Home() {
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const heroTitle = useTextScramble('Pioneering the Future of Food Technology', scrambleTrigger);

  useEffect(() => {
    const t = setTimeout(() => setScrambleTrigger(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-base min-h-screen grain-overlay bg-pattern-overlay">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-base border-b border-cream-divider page-hero-pt">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs md:text-sm font-mono tracking-widest uppercase mb-8 tag-royal"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-royal-primary animate-pulse" />
            KMK Enterprises — Royal Blue Precision Food Tech
          </motion.div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-normal text-navy mb-8 leading-[1.08]"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            {heroTitle || 'Pioneering the Future of Food Technology'}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed text-text-body font-medium"
          >
            KMK Enterprises transforms bold food ideas into world-class products. 
            From formulation R&D to retail, we power innovation across 12+ industries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link to="/services">
              <motion.button
                className="btn-primary-royal text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Services <ArrowRight className="w-5 h-5 ml-1" />
              </motion.button>
            </Link>

            <Link to="/about">
              <motion.button
                className="btn-ghost-royal text-base"
                whileTap={{ scale: 0.97 }}
              >
                Our Story
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs font-mono tracking-widest uppercase text-silver-dark font-bold">Scroll</span>
          <ChevronDown className="w-4 h-4 text-royal-primary" />
        </motion.div>
      </section>

      {/* 2. COMPANY SHOWCASE & STATS */}
      <section className="section-padding-royal bg-soft/80 border-b border-cream-divider">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-slate-200 group">
                <img
                  src="/images/rd_laboratory.png"
                  alt="KMK Food Science Lab"
                  className="w-full h-[380px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent flex items-end p-8">
                  <div>
                    <span className="bg-royal-primary text-white text-xs font-mono px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-2 inline-block shadow-sm">
                      State-of-the-Art R&D Center
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-normal text-white" style={{ fontFamily: '"DM Serif Display", serif' }}>
                      Pioneering Food Technology & Research
                    </h3>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest tag-royal inline-block mb-4">
                  Why Choose KMK
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-normal text-navy mb-6" style={{ fontFamily: '"DM Serif Display", serif' }}>
                  Trusted by 100+ Food Brands Nationwide
                </h2>
                <p className="text-base md:text-lg text-text-body leading-relaxed mb-6 font-medium">
                  We bridge the gap between laboratory science and commercial product success. With 20+ years of domain expertise, KMK Enterprises equips businesses with robust formulations, regulatory safety, and high-efficiency production processes.
                </p>
                <Link to="/about">
                  <span className="btn-secondary-royal text-sm font-bold">
                    Learn About Our Approach <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </AnimatedSection>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={slideUp}>
              <StatCard value={20} suffix="+" label="Years of Expertise" />
            </motion.div>
            <motion.div variants={slideUp}>
              <StatCard value={500} suffix="+" label="Products Developed" />
            </motion.div>
            <motion.div variants={slideUp}>
              <StatCard value={12} suffix="+" label="Industries Served" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section className="section-padding-royal bg-base border-b border-cream-divider">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-mono tracking-widest uppercase text-royal-primary tag-royal">What We Do</span>
              <h2 className="text-4xl md:text-6xl font-display font-normal text-navy mt-3 mb-4" style={{ fontFamily: '"DM Serif Display", serif' }}>
                Core Services
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-text-body font-medium">
                End-to-end food technology expertise that takes your product from concept to market dominance.
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            className="flex flex-wrap justify-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {SERVICES.map((service) => (
              <motion.div
                key={service.title}
                variants={slideUp}
                className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
              >
                <GlassCard className="p-8 md:p-10 h-full">
                  <div className="flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full icon-circle-royal mb-6 text-royal-primary">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy mb-3">{service.title}</h3>
                    <p className="text-base leading-relaxed text-text-body font-medium flex-1">{service.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection className="text-center mt-14">
            <Link to="/services">
              <motion.button className="btn-secondary-royal text-base">
                View All Services <ArrowRight className="w-5 h-5 ml-1" />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. BUSINESS DIVISIONS */}
      <section className="section-padding-royal bg-soft/80 border-b border-cream-divider">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-mono tracking-widest uppercase text-royal-primary tag-royal">Our Portfolio</span>
              <h2 className="text-4xl md:text-6xl font-display font-normal text-navy mt-3" style={{ fontFamily: '"DM Serif Display", serif' }}>
                Business Divisions
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sabrosa Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="card-royal p-10 md:p-12 h-96 flex flex-col justify-between relative group">
                <div>
                  <span className="inline-block text-xs font-mono uppercase tracking-widest mb-4 tag-royal">
                    Ice Cream Division
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-normal text-navy mb-4" style={{ fontFamily: '"DM Serif Display", serif' }}>Sabrosa Ice Creams</h3>
                  <p className="text-base text-text-body font-medium leading-relaxed">
                    Artisanal ice creams including Millet-based health ranges and traditional Kulfi collections crafted for pure delight.
                  </p>
                </div>
                <Link to="/divisions">
                  <div className="flex items-center gap-2 font-mono text-sm text-royal-primary font-bold uppercase">
                    Explore Sabrosa <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* RKV Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="card-royal p-10 md:p-12 h-96 flex flex-col justify-between relative group" style={{ borderTop: '4px solid #1D70B8' }}>
                <div>
                  <span className="inline-block text-xs font-mono uppercase tracking-widest mb-4 tag-muted">
                    Ingredients Division
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-normal text-navy mb-4" style={{ fontFamily: '"DM Serif Display", serif' }}>RKV Enterprises</h3>
                  <p className="text-base text-text-body font-medium leading-relaxed">
                    Premium food ingredient solutions powering manufacturers across dairy, bakery, and beverage sectors.
                  </p>
                </div>
                <Link to="/divisions">
                  <div className="flex items-center gap-2 font-mono text-sm text-silver-dark font-bold uppercase">
                    Explore RKV <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. CTA STRIP */}
      <section className="py-28 relative overflow-hidden bg-navy text-base border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-normal mb-6 text-white" style={{ fontFamily: '"DM Serif Display", serif' }}>
            Ready to Build Something Extraordinary?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
            Let's create your next breakthrough food product together with KMK Enterprises.
          </p>

          <Link to="/contact">
            <motion.button
              className="btn-primary-royal text-base font-bold px-10 py-4"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Start a Project <ArrowRight className="w-5 h-5 ml-1" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}

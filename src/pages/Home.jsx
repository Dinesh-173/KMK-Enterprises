import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, Beaker, ShieldCheck, Lightbulb, Rocket, Leaf } from 'lucide-react';
import { Suspense, lazy } from 'react';
import AnimatedSection, { staggerContainer, slideUp, slideLeft, slideRight } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { useCountUp } from '../hooks/useCountUp';

const HeroScene = lazy(() => import('../three/HeroScene'));

// Text Scramble Hook
function useTextScramble(finalText, trigger = true) {
  const [text, setText] = useState('');
  const CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    // BUG-18 FIX: Track RAF ID so we can cancel on cleanup (prevents setState on unmounted component)
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

    // BUG-18 FIX: Cancel the RAF loop on cleanup
    return () => cancelAnimationFrame(rafId);
  }, [finalText, trigger]);

  return text;
}


// Stat card
function StatCard({ value, suffix, label, progress }) {
  const { count, ref } = useCountUp(value, 2200);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl lg:text-6xl font-black text-white mb-2">
        <span className="gradient-text-teal">{count}</span>
        <span className="text-teal" style={{ color: '#00A896' }}>{suffix}</span>
      </div>
      <div className="text-sm font-medium mb-3" style={{ color: '#8896A5' }}>{label}</div>
      <div className="h-0.5 w-24 mx-auto rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #00A896, #7B2FBE)' }}
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  );
}

const SERVICES = [
  {
    icon: Beaker,
    title: 'Product Development',
    desc: 'From concept to shelf — we engineer breakthrough food products with precision formulation.',
    color: '#00A896',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory & Quality',
    desc: 'Navigate complex compliance landscapes with our expert regulatory and quality systems.',
    color: '#7B2FBE',
  },
  {
    icon: Lightbulb,
    title: 'Food Tech Consulting',
    desc: 'Strategic advisory that unlocks hidden value across your food technology value chain.',
    color: '#F4A100',
  },
  {
    icon: Rocket,
    title: 'R&D Innovation',
    desc: 'Cutting-edge research translating consumer insights into market-ready innovations.',
    color: '#00A896',
  },
  {
    icon: Leaf,
    title: 'Startup Incubation',
    desc: 'Mentoring food-tech entrepreneurs from idea-stage to successful market launch.',
    color: '#7B2FBE',
  },
];

export default function Home() {
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const heroTitle = useTextScramble('Pioneering the Future of Food Technology', scrambleTrigger);

  useEffect(() => {
    const t = setTimeout(() => setScrambleTrigger(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-navy min-h-screen" style={{ backgroundColor: '#0B1F3A' }}>
      {/* ══════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Three.js Background */}
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(11,31,58,0.3) 0%, rgba(11,31,58,0.85) 70%)' }} />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #0B1F3A, transparent)' }} />

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-8"
            style={{
              background: 'rgba(0, 168, 150, 0.12)',
              border: '1px solid rgba(0, 168, 150, 0.3)',
              color: '#00A896',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" style={{ backgroundColor: '#00A896' }} />
            Premium Food Technology Company
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            {heroTitle || 'Pioneering the Future of Food Technology'}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#8896A5' }}
          >
            KMK Enterprises transforms bold food ideas into world-class products. 
            From R&D to retail, we power innovation across 12+ industries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA */}
            <Link to="/services">
              <motion.button
                className="btn-glow-teal px-8 py-4 rounded-xl font-bold text-white text-base flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #00A896, #007a6e)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,168,150,0.6)' }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Services
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            {/* Ghost CTA */}
            <Link to="/about">
              <motion.button
                className="border-animated px-8 py-4 rounded-xl font-bold text-white text-base"
                style={{ border: '1.5px solid rgba(0,168,150,0.4)' }}
                whileHover={{ borderColor: '#00A896', color: '#00A896' }}
                whileTap={{ scale: 0.97 }}
              >
                Our Story
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: '#8896A5' }}>Scroll</span>
          <ChevronDown className="w-5 h-5 scroll-indicator" style={{ color: '#00A896' }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          COMPANY STATS
          ══════════════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundColor: '#060f1e' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#00A896' }}>By the Numbers</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Trusted by Industry Leaders</h2>
            </div>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={slideUp}>
              <StatCard value={20} suffix="+" label="Years of Expertise" progress={80} />
            </motion.div>
            <motion.div variants={slideUp}>
              <StatCard value={500} suffix="+" label="Products Developed" progress={95} />
            </motion.div>
            <motion.div variants={slideUp}>
              <StatCard value={12} suffix="+" label="Industries Served" progress={70} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CORE SERVICES
          ══════════════════════════════════════════ */}
      <section className="section-padding relative">
        <div className="dot-matrix-bg absolute inset-0 opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#00A896' }}>What We Do</p>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Core Services</h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: '#8896A5' }}>
                End-to-end food technology expertise that takes your product from concept to market.
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                variants={slideUp}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <GlassCard
                  className="p-8 h-full group"
                  glowColor={`${service.color}40`}
                >
                  <div className="flex flex-col h-full">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      style={{ backgroundColor: `${service.color}20`, border: `1px solid ${service.color}40` }}
                    >
                      <service.icon className="w-6 h-6" style={{ color: service.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: '#8896A5' }}>{service.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>




          <AnimatedSection className="text-center mt-12">
            <Link to="/services">
              <motion.button
                className="px-8 py-4 rounded-xl font-bold text-sm border"
                style={{ borderColor: 'rgba(0,168,150,0.3)', color: '#00A896' }}
                whileHover={{ backgroundColor: 'rgba(0,168,150,0.1)', borderColor: '#00A896' }}
              >
                View All Services
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BUSINESS DIVISIONS
          ══════════════════════════════════════════ */}
      <section className="section-padding relative" style={{ backgroundColor: '#060f1e' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#F4A100' }}>Our Portfolio</p>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Business Divisions</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sabrosa Card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <GlassCard
                className="p-10 h-80 flex flex-col justify-between cursor-pointer overflow-hidden relative group"
                glowColor="rgba(123,47,190,0.4)"
                style={{
                  background: 'linear-gradient(135deg, rgba(123,47,190,0.15) 0%, rgba(11,31,58,0.8) 100%)',
                  border: '1px solid rgba(123,47,190,0.3)',
                }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(123,47,190,0.2) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div>
                  <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                    style={{ backgroundColor: 'rgba(123,47,190,0.2)', color: '#9B4FDE', border: '1px solid rgba(123,47,190,0.3)' }}>
                    Ice Cream Division
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3">Sabrosa<br />Ice Creams</h3>
                  <p className="text-sm" style={{ color: '#8896A5' }}>
                    Premium artisanal ice creams including Millet-based health ranges and traditional Kulfi collections.
                  </p>
                </div>
                <Link to="/divisions">
                  <motion.div
                    className="flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all"
                    style={{ color: '#9B4FDE' }}
                  >
                    Explore Sabrosa <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </GlassCard>
            </motion.div>

            {/* RKV Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <GlassCard
                className="p-10 h-80 flex flex-col justify-between cursor-pointer overflow-hidden relative group"
                glowColor="rgba(244,161,0,0.4)"
                style={{
                  background: 'linear-gradient(135deg, rgba(244,161,0,0.12) 0%, rgba(11,31,58,0.8) 100%)',
                  border: '1px solid rgba(244,161,0,0.3)',
                }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(244,161,0,0.15) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div>
                  <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                    style={{ backgroundColor: 'rgba(244,161,0,0.15)', color: '#F4A100', border: '1px solid rgba(244,161,0,0.3)' }}>
                    Ingredients Division
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3">RKV<br />Enterprises</h3>
                  <p className="text-sm" style={{ color: '#8896A5' }}>
                    Premium food ingredient solutions powering manufacturers across dairy, bakery, and beverage sectors.
                  </p>
                </div>
                <Link to="/divisions">
                  <motion.div
                    className="flex items-center gap-2 font-bold text-sm group-hover:gap-4 transition-all"
                    style={{ color: '#F4A100' }}
                  >
                    Explore RKV <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA STRIP
          ══════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #071520 50%, #0B1F3A 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,168,150,0.08) 0%, transparent 70%)' }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {['Ready', 'to', 'Build', 'Something', 'Extraordinary?'].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block text-4xl md:text-6xl lg:text-7xl font-black text-white mr-4 mb-2"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <AnimatedSection delay={0.3}>
            <p className="text-lg mt-6 mb-10" style={{ color: '#8896A5' }}>
              Let's build your next breakthrough food product together.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <Link to="/contact">
              <motion.button
                className="btn-ripple-amber px-10 py-5 rounded-xl font-black text-white text-lg"
                style={{ background: 'linear-gradient(135deg, #F4A100, #c07d00)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(244,161,0,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                Start a Project
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

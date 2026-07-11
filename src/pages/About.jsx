import { useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer, slideUp, slideLeft, slideRight } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { useSVGPathDraw } from '../hooks/useSVGPathDraw';
import { Award, Users, Globe, TrendingUp, Star, Target } from 'lucide-react';

const TIMELINE = [
  { year: '2004', title: 'Foundation', desc: 'KMK Enterprises founded with a vision to revolutionize food technology consulting in India.' },
  { year: '2008', title: 'R&D Lab Established', desc: 'State-of-the-art research and development facility commissioned in Mumbai.' },
  { year: '2012', title: 'Sabrosa Launch', desc: 'Sabrosa Ice Creams launched, pioneering millet-based premium ice cream ranges.' },
  { year: '2016', title: 'RKV Expansion', desc: 'RKV Enterprises division expanded into premium food ingredient solutions.' },
  { year: '2020', title: 'Digital Innovation', desc: 'Integrated AI-powered formulation tools accelerating product development by 3x.' },
  { year: '2024', title: 'Global Reach', desc: 'Serving 500+ products across 12+ industry verticals with international partnerships.' },
];

const TEAM = [
  { name: 'Rajesh Kumar', role: 'Founder & CEO', expertise: 'Food Science PhD, 20+ years in dairy & functional foods formulation. Former R&D head at leading FMCG conglomerate.' },
  { name: 'Meera Krishnan', role: 'Chief Technology Officer', expertise: 'Biotechnology MSc, expert in fermentation technology and clean-label product development.' },
  { name: 'Ankit Verma', role: 'Head of Regulatory Affairs', expertise: 'FSSAI certified expert with extensive knowledge of international food safety standards and certifications.' },
  { name: 'Priya Nair', role: 'Innovation Director', expertise: 'Consumer insights specialist driving trend-to-product pipelines across health & wellness segments.' },
  { name: 'Sanjay Mehta', role: 'Director — Sabrosa', expertise: 'Ice cream technology expert with deep expertise in artisanal and functional frozen dessert development.' },
  { name: 'Kavitha Rao', role: 'Quality Systems Lead', expertise: 'ISO 22000 & HACCP practitioner ensuring gold-standard quality across all KMK product lines.' },
];

// BUG-16 FIX: Renamed from INDUSTRIES to EXPERTISE_AREAS to avoid shadowing Industries.jsx's same-named export
const EXPERTISE_AREAS = [
  { label: 'Dairy', pct: 92 },
  { label: 'Functional Foods', pct: 85 },
  { label: 'Ice Creams', pct: 95 },
  { label: 'Beverages', pct: 78 },
  { label: 'Confectionery', pct: 72 },
  { label: 'Bakery', pct: 80 },
];


function ProgressRing({ label, pct, color = '#00A896' }) {
  const r = 36;
  const circ = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
          <motion.circle
            cx="45" cy="45" r={r}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - (circ * pct) / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            style={{ transformOrigin: '45px 45px', rotate: '-90deg' }}
          />
          <text x="45" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{pct}%</text>
        </svg>
      </motion.div>
      <span className="text-xs font-medium text-center" style={{ color: '#8896A5' }}>{label}</span>
    </div>
  );
}

export default function About() {
  const timelineRef = useSVGPathDraw('line', { scrub: 1, start: 'top 60%' });

  return (
    <div className="bg-navy min-h-screen" style={{ backgroundColor: '#0B1F3A' }}>
      {/* ══ PAGE HERO ══ */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-28"

        style={{ background: 'linear-gradient(180deg, #060f1e 0%, #0B1F3A 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,168,150,0.08) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <AnimatedSection>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#00A896' }}>Who We Are</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 max-w-3xl leading-tight">
              About <span className="gradient-text-teal">KMK Enterprises</span>
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: '#8896A5' }}>
              Two decades of pioneering food technology, building bridges between innovation and industry.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ COMPANY PROFILE ══ */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#00A896' }}>Our Profile</p>
              {['KMK Enterprises is a premier food technology company trusted by leading brands across India and beyond.',
                'We combine cutting-edge science with deep industry knowledge to deliver product development, regulatory consulting, R&D, and startup incubation services.',
                'Our multidisciplinary team of food scientists, technologists, and regulatory experts works seamlessly to bring breakthrough products to market — faster, smarter, and better.',
              ].map((para, i) => (
                <motion.p
                  key={i}
                  className="text-base leading-relaxed mb-5"
                  style={{ color: '#8896A5' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  {para}
                </motion.p>
              ))}

              <div className="flex gap-8 mt-8">
                {[{ icon: Award, label: '20+ Awards' }, { icon: Users, label: '50+ Experts' }, { icon: Globe, label: '12+ Industries' }].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(0,168,150,0.15)', border: '1px solid rgba(0,168,150,0.3)' }}>
                      <Icon className="w-5 h-5" style={{ color: '#00A896' }} />
                    </div>
                    <span className="text-xs font-semibold text-white">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden aspect-square relative"
                style={{ background: 'linear-gradient(135deg, rgba(0,168,150,0.2), rgba(123,47,190,0.2))' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-2xl flex items-center justify-center font-black text-7xl text-white mx-auto mb-6"
                      style={{ background: 'linear-gradient(135deg, #00A896, #7B2FBE)' }}>
                      K
                    </div>
                    <p className="text-white font-bold text-2xl">KMK Enterprises</p>
                    <p className="text-sm mt-2" style={{ color: '#00A896' }}>Est. 2004 • Mumbai, India</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 flex items-center gap-3">
                <TrendingUp className="w-8 h-8" style={{ color: '#00A896' }} />
                <div>
                  <p className="text-white font-bold text-sm">Industry Leader</p>
                  <p className="text-xs" style={{ color: '#8896A5' }}>Top 10 Food Tech Firms</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ MISSION & VISION ══ */}
      <section className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-80">
          <motion.div
            className="p-16 flex flex-col justify-center"
            style={{ backgroundColor: '#060f1e' }}
            initial={{ x: 0 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6" style={{ color: '#00A896' }} />
                <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#00A896' }}>Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                To be the trusted bridge between food science and market success.
              </h2>
              <p className="text-base" style={{ color: '#8896A5' }}>
                We empower food entrepreneurs and corporations alike with the expertise, 
                tools, and insights needed to create products that consumers love — while 
                meeting the highest standards of safety, quality, and sustainability.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="p-16 flex flex-col justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(0,168,150,0.15) 0%, rgba(11,31,58,0.9) 100%)' }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6" style={{ color: '#00A896' }} />
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#00A896' }}>Vision</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              A world where every food product is safer, healthier, and more innovative.
            </h2>
            <p className="text-base" style={{ color: '#8896A5' }}>
              We envision leading India's food technology renaissance — driving a future 
              where clean-label, nutritionally rich, and sustainably produced foods are 
              accessible to all.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section className="section-padding" style={{ backgroundColor: '#060f1e' }}>
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#00A896' }}>Our Journey</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Company Timeline</h2>
            </div>
          </AnimatedSection>

          <div className="relative" ref={timelineRef}>
            {/* SVG vertical line */}
            <svg
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px"
              style={{ height: '100%', transform: 'translateX(-50%)' }}
              viewBox="0 0 1 1000"
              preserveAspectRatio="none"
            >
              <line x1="0.5" y1="0" x2="0.5" y2="1000"
                stroke="#00A896" strokeWidth="2" strokeDasharray="8 4" />
            </svg>

            <div className="space-y-16">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 flex-shrink-0"
                    style={{ backgroundColor: '#00A896', boxShadow: '0 0 12px rgba(0,168,150,0.6)' }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.2 }}
                  />

                  {/* Card */}
                  <div className={`ml-16 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <motion.div
                      className="glass rounded-xl p-6"
                      initial={{ rotateY: 90, opacity: 0 }}
                      whileInView={{ rotateY: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                      style={{ transformPerspective: 800 }}
                    >
                      <span className="text-xs font-bold tracking-widest" style={{ color: '#00A896' }}>{item.year}</span>
                      <h3 className="text-lg font-bold text-white mt-1 mb-2">{item.title}</h3>
                      <p className="text-sm" style={{ color: '#8896A5' }}>{item.desc}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#00A896' }}>Our Experts</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Team Expertise</h2>
            </div>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {TEAM.map((member) => (
              <motion.div key={member.name} variants={slideUp} className="flip-card h-48 cursor-pointer">
                <div className="flip-card-inner w-full h-full">
                  {/* Front */}
                  <div className="flip-card-front glass rounded-xl p-6 flex flex-col justify-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-white mb-3"
                      style={{ background: 'linear-gradient(135deg, #00A896, #7B2FBE)' }}>
                      {member.name[0]}
                    </div>
                    <h3 className="text-base font-bold text-white">{member.name}</h3>
                    <p className="text-xs mt-1" style={{ color: '#00A896' }}>{member.role}</p>
                    <p className="text-xs mt-2" style={{ color: '#8896A5' }}>Hover to see expertise →</p>
                  </div>
                  {/* Back */}
                  <div className="flip-card-back rounded-xl p-6 flex flex-col justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(0,168,150,0.15), rgba(11,31,58,0.95))', border: '1px solid rgba(0,168,150,0.3)' }}>
                    <p className="text-xs font-bold mb-3" style={{ color: '#00A896' }}>{member.role}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#8896A5' }}>{member.expertise}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ INDUSTRY RINGS ══ */}
      <section className="section-padding" style={{ backgroundColor: '#060f1e' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#00A896' }}>Industry Depth</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Sector Expertise</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
            {EXPERTISE_AREAS.map((ind, i) => (
              <motion.div key={ind.label} variants={slideUp}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}>
                <ProgressRing label={ind.label} pct={ind.pct} color={i % 2 === 0 ? '#00A896' : '#7B2FBE'} />
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

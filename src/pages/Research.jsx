import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer, slideUp } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { useSVGPathDraw } from '../hooks/useSVGPathDraw';
import { Dna, Leaf, Users, Globe, FlaskConical, Zap } from 'lucide-react';

const MoleculeScene = lazy(() => import('../three/MoleculeScene'));

const FLOW_NODES = [
  { x: 60, y: 60, label: 'Innovation Focus', sub: 'Market & consumer trend analysis' },
  { x: 340, y: 60, label: 'Product Research', sub: 'Applied food science & R&D' },
  { x: 620, y: 60, label: 'Sustainable Solutions', sub: 'Clean-label & eco formulations' },
  { x: 900, y: 60, label: 'Consumer Development', sub: 'Launch-ready products' },
];

const RESEARCH_AREAS = [
  {
    icon: Dna,
    title: 'Functional Ingredients',
    desc: 'Bioactives, probiotics, prebiotics, and nutraceutical ingredients for health-forward products.',
    color: '#00A896',
  },
  {
    icon: Leaf,
    title: 'Sustainable Formulation',
    desc: 'Clean-label, plant-based, and zero-waste formulation approaches for a sustainable future.',
    color: '#7B2FBE',
  },
  {
    icon: FlaskConical,
    title: 'Process Innovation',
    desc: 'Novel processing technologies from cold-press to HPP and microencapsulation.',
    color: '#F4A100',
  },
  {
    icon: Zap,
    title: 'Rapid Prototyping',
    desc: 'Fast-cycle product development reducing iteration time from months to weeks.',
    color: '#00A896',
  },
  {
    icon: Users,
    title: 'Consumer Science',
    desc: 'Sensory panels, preference mapping, and co-creation workshops with target consumers.',
    color: '#7B2FBE',
  },
  {
    icon: Globe,
    title: 'Global Trends Translation',
    desc: 'Translating macro food trends into India-market product opportunities.',
    color: '#F4A100',
  },
];

function InnovationFlow() {
  const flowRef = useSVGPathDraw('path, line, circle', { scrub: 1.5, start: 'top 70%' });

  return (
    <div ref={flowRef} className="w-full overflow-x-auto">
      <svg viewBox="0 0 960 140" className="w-full min-w-[600px]" style={{ height: 140 }}>
        {/* Connecting path */}
        <path
          d="M 60 60 L 340 60 L 620 60 L 900 60"
          stroke="#00A896"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 4"
        />

        {/* Nodes */}
        {FLOW_NODES.map((node, i) => (
          <g key={i}>
            {/* BUG-21 FIX: Animate SVG 'r' attribute instead of CSS 'scale'.
                CSS transform scale on SVG elements requires transform-box:fill-box
                which is unsupported in older Firefox/Safari. Animating 'r' is universally safe. */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              fill="rgba(0,168,150,0.15)"
              stroke="#00A896"
              strokeWidth="2"
              initial={{ r: 0 }}
              whileInView={{ r: 18 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3 + 0.5, type: 'spring', stiffness: 300 }}
            />

            <text x={node.x} y={node.y + 5} textAnchor="middle" fill="#00A896" fontSize="10" fontWeight="bold">
              {i + 1}
            </text>
            <text x={node.x} y={node.y + 38} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
              {node.label}
            </text>
            <text x={node.x} y={node.y + 52} textAnchor="middle" fill="#8896A5" fontSize="7.5">
              {node.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function Research() {
  return (
    <div className="bg-navy min-h-screen" style={{ backgroundColor: '#0B1F3A' }}>
      {/* Hero with Three.js */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-28"
        style={{ background: 'linear-gradient(180deg, #060f1e 0%, #0B1F3A 100%)' }}>


        <Suspense fallback={null}>
          <MoleculeScene color="#00A896" />
        </Suspense>

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(6,15,30,0.5) 0%, rgba(6,15,30,0.9) 80%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <AnimatedSection>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#00A896' }}>Science & Innovation</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 max-w-3xl">
              Research &<br /><span className="gradient-text-teal">Innovation</span>
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: '#8896A5' }}>
              At the intersection of food science and consumer insight — where breakthrough products are born.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Innovation Flow */}
      <section className="section-padding" style={{ backgroundColor: '#060f1e' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#00A896' }}>Our Process</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Innovation Pipeline</h2>
            </div>
          </AnimatedSection>

          <div className="glass rounded-2xl p-8">
            <InnovationFlow />
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#00A896' }}>Focus Areas</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Research Domains</h2>
            </div>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {RESEARCH_AREAS.map((area, i) => (
              <motion.div key={area.title} variants={slideUp}>
                <GlassCard
                  className="p-8 h-full relative overflow-hidden glass-teal group"
                  glowColor={`${area.color}25`}
                  tiltIntensity={10}
                >
                  {/* Parallax icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 relative z-10"
                    style={{ backgroundColor: `${area.color}18`, border: `1px solid ${area.color}35` }}
                    whileHover={{ y: -8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <area.icon className="w-7 h-7" style={{ color: area.color }} />
                  </motion.div>

                  {/* Inner glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${area.color}10, transparent 60%)` }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <h3 className="text-lg font-bold text-white mb-3 relative z-10">{area.title}</h3>
                  <p className="text-sm leading-relaxed relative z-10" style={{ color: '#8896A5' }}>{area.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lab Fact Strip */}
      <section className="py-20" style={{ backgroundColor: '#060f1e' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="glass rounded-2xl p-10 text-center"
              style={{ border: '1px solid rgba(0,168,150,0.2)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(135deg, #00A896, #7B2FBE)' }}>
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                Our R&D Lab is Open to Collaborators
              </h2>
              <p className="text-base max-w-xl mx-auto mb-8" style={{ color: '#8896A5' }}>
                Partner with KMK's research team on joint innovation projects, 
                sponsored research, or contract R&D engagements.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #00A896, #007a6e)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,168,150,0.5)' }}
              >
                Partner with Us
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

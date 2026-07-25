import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer, slideUp } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { useSVGPathDraw } from '../hooks/useSVGPathDraw';
import { Dna, Leaf, Users, Globe, FlaskConical, Zap, CheckCircle2 } from 'lucide-react';

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
  },
  {
    icon: Leaf,
    title: 'Sustainable Formulation',
    desc: 'Clean-label, plant-based, and zero-waste formulation approaches for a sustainable future.',
  },
  {
    icon: FlaskConical,
    title: 'Process Innovation',
    desc: 'Novel processing technologies from cold-press to HPP and microencapsulation.',
  },
  {
    icon: Zap,
    title: 'Rapid Prototyping',
    desc: 'Fast-cycle product development reducing iteration time from months to weeks.',
  },
  {
    icon: Users,
    title: 'Consumer Science',
    desc: 'Sensory panels, preference mapping, and co-creation workshops with target consumers.',
  },
  {
    icon: Globe,
    title: 'Global Trends Translation',
    desc: 'Translating macro food trends into India-market product opportunities.',
  },
];

function InnovationFlow() {
  const flowRef = useSVGPathDraw('path, line, circle', { scrub: 1.5, start: 'top 70%' });

  return (
    <div ref={flowRef} className="w-full overflow-x-auto">
      <svg viewBox="0 0 960 140" className="w-full min-w-[600px]" style={{ height: 140 }}>
        <path
          d="M 60 60 L 340 60 L 620 60 L 900 60"
          stroke="#0B4F9C"
          strokeWidth="3"
          fill="none"
          strokeDasharray="6 4"
        />

        {FLOW_NODES.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              fill="#FFFFFF"
              stroke="#0B4F9C"
              strokeWidth="3"
              initial={{ r: 0 }}
              whileInView={{ r: 18 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 + 0.3, type: 'spring', stiffness: 300 }}
            />

            <text x={node.x} y={node.y + 4} textAnchor="middle" fill="#0B4F9C" fontSize="11" fontWeight="bold">
              {i + 1}
            </text>
            <text x={node.x} y={node.y + 38} textAnchor="middle" fill="#0A192F" fontSize="10" fontWeight="bold">
              {node.label}
            </text>
            <text x={node.x} y={node.y + 52} textAnchor="middle" fill="#64748B" fontSize="8">
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
    <div className="bg-base min-h-screen grain-overlay">
      {/* Hero Header */}
      <section className="relative min-h-[45vh] flex items-center page-hero-pt pb-20 md:pb-24 bg-base border-b border-cream-divider">
        <Suspense fallback={null}>
          <MoleculeScene isPrism={false} />
        </Suspense>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase mb-4 inline-block tag-royal">
              Science & Innovation
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-normal text-navy mb-6 max-w-4xl leading-tight" style={{ fontFamily: '"DM Serif Display", serif' }}>
              Research & Innovation
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl text-text-body font-medium leading-relaxed">
              At the intersection of food science and consumer insight — where breakthrough products are born.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Facility Showcase */}
      <section className="py-20 bg-soft border-b border-cream-divider">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-slate-200">
                <img
                  src="/images/rd_laboratory.png"
                  alt="KMK R&D Laboratory Facility"
                  className="w-full h-[380px] md:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent flex items-end p-8">
                  <div className="text-base">
                    <span className="bg-royal-primary text-white text-xs font-mono px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-2 inline-block shadow-sm">
                      State-of-the-Art Facility
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-normal text-white" style={{ fontFamily: '"DM Serif Display", serif' }}>KMK Food Science R&D Lab</h3>
                    <p className="text-sm text-slate-300 mt-1 font-medium">Equipped for rheology, sensory profiling, and pilot batching</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest tag-royal inline-block mb-4">
                  R&D Excellence
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-normal text-navy mb-6" style={{ fontFamily: '"DM Serif Display", serif' }}>
                  Advanced Food Research Laboratory
                </h2>
                <p className="text-base md:text-lg text-text-body leading-relaxed mb-6 font-medium">
                  Our laboratory features cutting-edge analytical tools, ISO sensory testing booths, and pilot scaling gear to bridge the gap between initial formula concept and large-scale manufacturing.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'Analytical & Rheological Testing Instruments',
                    'Standardized ISO Sensory Evaluation Booths',
                    'Benchtop Pilot Production Lines for Dairy & Bakery',
                    'Accelerated Shelf-Life & Stability Incubators'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-royal-primary flex-shrink-0" />
                      <span className="text-base font-semibold text-navy">{item}</span>
                    </div>
                  ))}
                </div>

                <a href="/contact" className="btn-primary-royal text-sm uppercase tracking-wider inline-flex">
                  Book a Lab Tour or Demo
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Innovation Pipeline */}
      <section className="section-padding-royal bg-base border-b border-cream-divider">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-mono tracking-widest uppercase text-royal-primary tag-royal">Our Process</span>
              <h2 className="text-4xl md:text-6xl font-display font-normal text-navy mt-3" style={{ fontFamily: '"DM Serif Display", serif' }}>
                Innovation Pipeline
              </h2>
            </div>
          </AnimatedSection>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-card border border-cream-divider">
            <InnovationFlow />
          </div>
        </div>
      </section>

      {/* Research Domains */}
      <section className="section-padding-royal bg-soft border-b border-cream-divider">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-mono tracking-widest uppercase text-royal-primary tag-royal">Focus Areas</span>
              <h2 className="text-4xl md:text-6xl font-display font-normal text-navy mt-3" style={{ fontFamily: '"DM Serif Display", serif' }}>
                Research Domains
              </h2>
            </div>
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {RESEARCH_AREAS.map((area) => (
              <motion.div key={area.title} variants={slideUp}>
                <GlassCard className="p-8 md:p-10 h-full">
                  <div className="w-14 h-14 rounded-full icon-circle-royal mb-6 text-royal-primary">
                    <area.icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-bold text-navy mb-3">{area.title}</h3>
                  <p className="text-base leading-relaxed text-text-body font-medium">{area.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lab Collaboration */}
      <section className="py-24 bg-navy text-base">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="bg-slate-900 rounded-2xl p-10 md:p-14 shadow-2xl border border-slate-800">
              <div className="w-16 h-16 rounded-full icon-circle-royal mx-auto mb-6 bg-slate-800 border-slate-700 text-royal-primary">
                <FlaskConical className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-normal text-white mb-6" style={{ fontFamily: '"DM Serif Display", serif' }}>
                Our R&D Lab is Open to Collaborators
              </h2>
              <p className="text-base md:text-lg max-w-xl mx-auto mb-8 text-slate-300 font-medium">
                Partner with KMK's research team on joint innovation projects, 
                sponsored research, or contract R&D engagements.
              </p>
              <a href="/contact" className="btn-primary-royal text-sm font-bold uppercase tracking-wider inline-flex">
                Partner with Us
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

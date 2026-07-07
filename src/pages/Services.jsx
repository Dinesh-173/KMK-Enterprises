import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { staggerContainer, slideUp } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { ChevronDown, Beaker, ShieldCheck, Lightbulb, Rocket, Leaf, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    id: 'product-dev',
    icon: Beaker,
    title: 'Product Development',
    tagline: 'From concept to commercialization',
    color: '#00A896',
    description: 'We architect food products from the ground up — combining sensory science, nutritional engineering, and market insights. Our rapid prototyping approach cuts your time-to-market by up to 40%.',
    features: [
      'Concept ideation and feasibility studies',
      'Formulation R&D and prototype development',
      'Sensory evaluation and consumer testing',
      'Scale-up from bench to pilot to commercial production',
      'Shelf-life and stability testing',
      'Packaging development and optimization',
    ],
  },
  {
    id: 'consulting',
    icon: Lightbulb,
    title: 'Food Technology Consulting',
    tagline: 'Strategic intelligence for food businesses',
    color: '#F4A100',
    description: 'Unlock hidden value in your supply chain, improve operational efficiency, and gain competitive intelligence with our comprehensive food technology consulting practice.',
    features: [
      'Food business strategy and market entry consulting',
      'Process optimization and efficiency audits',
      'Ingredient sourcing and vendor evaluation',
      'Cost reduction without compromising quality',
      'Technology licensing and IP strategy',
      'M&A due diligence for food companies',
    ],
  },
  {
    id: 'regulatory',
    icon: ShieldCheck,
    title: 'Regulatory & Quality Systems',
    tagline: 'Navigate compliance with confidence',
    color: '#7B2FBE',
    description: 'India and global food regulations are complex and constantly evolving. Our regulatory experts ensure your product is fully compliant from day one — preventing costly recalls or market delays.',
    features: [
      'FSSAI registration, licensing and compliance',
      'HACCP and food safety management systems',
      'ISO 22000 / FSSC 22000 implementation',
      'Label review and nutrition claim verification',
      'Export compliance (EU, US FDA, Gulf standards)',
      'Regulatory intelligence and horizon scanning',
    ],
  },
  {
    id: 'rnd',
    icon: Rocket,
    title: 'Research & Development',
    tagline: 'Science-driven innovation at scale',
    color: '#00A896',
    description: 'Our in-house R&D team operates at the frontier of food science, translating emerging research and consumer trends into tangible product innovations that capture market share.',
    features: [
      'Applied food science research programs',
      'Functional ingredient identification and testing',
      'Clean-label and natural reformulation',
      'Plant-based and alternative protein development',
      'Nutritional enhancement and fortification',
      'Texture, flavor, and color innovation',
    ],
  },
  {
    id: 'incubation',
    icon: Leaf,
    title: 'Startup Incubation',
    tagline: 'Turning food entrepreneurs into market leaders',
    color: '#F4A100',
    description: 'We mentor early-stage food brands through our structured incubation program — providing hands-on technical guidance, regulatory support, and market access strategy.',
    features: [
      '6-month structured incubation curriculum',
      "Access to KMK's R&D labs and equipment",
      'Mentorship from seasoned food industry veterans',
      'Investor connections and pitch preparation',
      'Co-manufacturing partner network',
      'FSSAI fast-track support and launch readiness',
    ],
  },
];

function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <GlassCard
        className="overflow-hidden relative"
        glowColor={`${service.color}30`}
        tiltIntensity={8}
      >
        {/* Color accent left border */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
          style={{ backgroundColor: service.color }}
          initial={{ scaleY: 0, transformOrigin: 'bottom' }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
        />

        <div className="p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-5 flex-1">
              <motion.div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${service.color}18`, border: `1px solid ${service.color}35` }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
              >
                <service.icon className="w-7 h-7" style={{ color: service.color }} />
              </motion.div>

              <div className="flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: service.color }}>
                  {service.tagline}
                </p>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
              </div>
            </div>

            <motion.button
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
              style={{ backgroundColor: `${service.color}15`, border: `1px solid ${service.color}30` }}
              onClick={() => setExpanded(!expanded)}
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" style={{ color: service.color }} />
            </motion.button>
          </div>

          <p className="text-sm leading-relaxed mt-5" style={{ color: '#8896A5' }}>{service.description}</p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-white/10">

                  <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: service.color }}>
                    What's Included
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm" style={{ color: '#8896A5' }}>
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: service.color }} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className="mt-6 flex items-center gap-2 text-sm font-bold"
                    style={{ color: service.color }}
                    whileHover={{ gap: '16px' }}
                  >
                    Request a Consultation <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="bg-navy min-h-screen" style={{ backgroundColor: '#0B1F3A' }}>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #060f1e 0%, #0B1F3A 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(244,161,0,0.06) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#F4A100' }}>What We Offer</p>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Our <span className="gradient-text-amber">Services</span>
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: '#8896A5' }}>
              Five pillars of food technology expertise delivering end-to-end support for your product journey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding relative">
        {/* Dot matrix background */}
        <div className="dot-matrix-bg absolute inset-0 opacity-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex flex-col gap-12">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>

      </section>


      {/* CTA */}
      <section className="py-24" style={{ backgroundColor: '#060f1e' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Not Sure Which Service Fits?
            </h2>
            <p className="text-lg mb-10" style={{ color: '#8896A5' }}>
              Our consultants will analyze your product brief and recommend the ideal service pathway — free of charge.
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-white text-lg"
              style={{ background: 'linear-gradient(135deg, #00A896, #007a6e)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,168,150,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              Get a Free Consultation <ArrowRight className="w-5 h-5" />
            </motion.a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

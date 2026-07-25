import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { ChevronDown, Beaker, ShieldCheck, Lightbulb, Rocket, Leaf, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    id: 'product-dev',
    icon: Beaker,
    title: 'Product Development',
    tagline: 'From concept to commercialization',
    image: '/images/service_product_dev.png',
    description: 'From initial concept ideation to final commercial formula. We handle ingredient selection, flavor profiling, and nutritional optimization to create market-ready food products.',
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
    title: 'Food Technology & Processing',
    tagline: 'Strategic intelligence for food businesses',
    image: '/images/service_food_tech.png',
    description: 'Optimizing manufacturing processes for better yield, consistency, and energy efficiency. We translate lab-scale success into robust factory floor procedures.',
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
    image: '/images/service_regulatory.png',
    description: 'India and global food regulations are complex and constantly evolving. Our regulatory experts ensure your product is fully compliant from day one.',
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
    image: '/images/rd_laboratory.png',
    description: 'Our in-house R&D team operates at the frontier of food science, translating emerging research and consumer trends into tangible product innovations.',
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
    image: '/images/service_incubation.png',
    description: 'We mentor early-stage food brands through our structured incubation program — providing hands-on technical guidance, regulatory support, and market access.',
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <GlassCard className="p-8 md:p-10">
        <div>
          {/* Image Banner */}
          <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden rounded-xl mb-8 group border border-slate-200">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <motion.div
              className="absolute top-5 right-5 w-12 h-12 rounded-full icon-circle-royal shadow-md bg-white text-royal-primary"
              whileHover={{ rotate: 8, scale: 1.05 }}
            >
              <service.icon className="w-6 h-6" />
            </motion.div>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="inline-block text-xs font-mono uppercase tracking-widest mb-2 tag-royal font-bold">
                {service.tagline}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-navy mb-3">{service.title}</h3>
              <p className="text-base md:text-lg text-text-body font-medium leading-relaxed">{service.description}</p>
            </div>

            <motion.button
              className="w-10 h-10 rounded-full icon-circle-royal flex-shrink-0 mt-1"
              onClick={() => setExpanded(!expanded)}
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              aria-label="Expand service details"
            >
              <ChevronDown className="w-5 h-5 text-royal-primary" />
            </motion.button>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="mt-8 pt-8 border-t border-cream-divider">
                  <p className="text-xs font-mono tracking-widest uppercase mb-4 text-royal-primary font-bold">
                    What's Included
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-base text-text-body font-medium">
                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-royal-primary" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-mono uppercase font-bold text-royal-primary hover:gap-3 transition-all"
                  >
                    Request Consultation <ArrowRight className="w-4 h-4" />
                  </a>
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
    <div className="bg-base min-h-screen grain-overlay">
      {/* Hero Header */}
      <section className="relative min-h-[40vh] flex items-center page-hero-pt pb-20 md:pb-24 bg-base border-b border-cream-divider">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase mb-4 inline-block tag-royal">
              What We Offer
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-normal text-navy mb-6" style={{ fontFamily: '"DM Serif Display", serif' }}>
              Our Services
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl text-text-body font-medium leading-relaxed">
              Five pillars of food technology expertise delivering end-to-end support for your product journey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding-royal bg-base border-b border-cream-divider">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-soft text-navy">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl font-display font-normal text-navy mb-6" style={{ fontFamily: '"DM Serif Display", serif' }}>
              Not Sure Which Service Fits?
            </h2>
            <p className="text-lg md:text-xl text-text-body mb-10 max-w-2xl mx-auto font-medium">
              Our consultants will analyze your product brief and recommend the ideal service pathway — free of charge.
            </p>
            <a href="/contact">
              <motion.button
                className="btn-primary-royal text-base font-bold"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get a Free Consultation <ArrowRight className="w-5 h-5 ml-1" />
              </motion.button>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

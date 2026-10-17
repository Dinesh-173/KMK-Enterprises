import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { useSVGPathDraw } from '../hooks/useSVGPathDraw';
import { Award, Users, Globe, Target, Star, TrendingUp } from 'lucide-react';

const TIMELINE = [
  { year: '2020', title: 'Foundation', desc: 'KMK Enterprises founded by Manivvannan A with a vision to revolutionize food technology consulting in India.' },
  { year: '2020', title: 'R&D Lab Established', desc: 'State-of-the-art research and development facility commissioned for dairy & food formulation.' },
  { year: '2021', title: 'Sabrosa Launch', desc: 'Sabrosa Ice Creams launched, pioneering millet-based premium ice cream ranges.' },
  { year: '2022', title: 'RKV Expansion', desc: 'RKV Enterprises division expanded into premium food ingredient solutions.' },
  { year: '2023', title: 'Digital Innovation', desc: 'Integrated AI-powered formulation tools accelerating product development by 3x.' },
  { year: '2024', title: 'Global Reach', desc: 'Serving 500+ products across 12+ industry verticals with international partnerships.' },
];

const TEAM = [
  {
    name: 'Manivvannan A',
    role: 'CEO, KMK Enterprises | Senior Food Technologist',
    expertise: 'Food Technologist with 20+ years of experience in dairy and confectionery, specializing in R&D, product innovation, process optimization, and prototype development.',
    isCeo: true,
  },
  {
    name: 'Bhaurao Nikhade, PhD',
    role: 'R&D, Product & Process Development',
    expertise: '19+ years of expertise in R&D, Product & Process Development, and Project Management across Nutrition, Regulatory, Supply Chain, and Operations. Formulations expert in food, dairy, snacks, sauces, and beverages.',
  },
  {
    name: 'Ajayakumar S. A.',
    role: 'R&D, Quality & Regulatory Affairs',
    expertise: 'Food industry professional with 27+ years of experience in R&D, Product Development, Quality, and Regulatory Affairs. Specializes in Confectionery, Beverages, Flavours, and Commercialization across global organizations.',
  },
  {
    name: 'Debashis DasGupta',
    role: 'Founder — Packaging Development',
    expertise: 'Packaging Development professional with 30+ years of experience across FMCG, Pharma, Food & Beverage, and Healthcare. Specializes in packaging innovation, sustainability, regulatory compliance, and value engineering.',
  },
  {
    name: 'Shubhada Prabhu',
    role: 'Quality & Product Innovation',
    expertise: 'Quality & Product Innovation leader with 18+ years across PepsiCo, Unilever, and McDonald’s. Expert in Quality Management, Food Safety, Regulatory Compliance, and Audits across India and global markets.',
  },
  {
    name: 'Suresh Kumar',
    role: 'Sales Partner',
    expertise: 'Suresh Kumar is a B.Sc. qualified professional with 30 years of experience in the Beverage, Food, and Dairy industries. He has extensive practical experience in industry operations, business development, sales, product knowledge, and customer relationships.',
  },
];

export default function About() {
  const timelineRef = useSVGPathDraw('line', { scrub: 1, start: 'top 60%' });

  return (
    <div className="bg-base min-h-screen grain-overlay bg-pattern-overlay">
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[40vh] flex items-center page-hero-pt pb-20 md:pb-24 bg-base border-b border-cream-divider">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase mb-4 inline-block tag-royal font-bold">
              Who We Are
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-normal text-navy mb-6 max-w-4xl leading-tight" style={{ fontFamily: '"DM Serif Display", serif' }}>
              About KMK Enterprises
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl text-text-body font-medium leading-relaxed">
              Two decades of pioneering food technology, building bridges between science and market success.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. COMPANY PROFILE */}
      <section className="section-padding-royal bg-soft/80 border-b border-cream-divider">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-mono uppercase tracking-widest tag-royal inline-block mb-4 font-bold">
                Our Profile
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-normal text-navy mb-6" style={{ fontFamily: '"DM Serif Display", serif' }}>
                Leading Food Science & Technology Innovators
              </h2>
              {['KMK Enterprises is a premier food technology company trusted by leading brands across India and beyond.',
                'We combine cutting-edge science with deep industry knowledge to deliver product development, regulatory consulting, R&D, and startup incubation services.',
                'Under the leadership of Senior Food & Dairy Technologist Manivvannan A, our multidisciplinary team brings breakthrough food solutions to market.',
              ].map((para, i) => (
                <p key={i} className="text-base md:text-lg text-text-body leading-relaxed mb-4 font-medium">
                  {para}
                </p>
              ))}

              <div className="flex gap-8 mt-8">
                {[{ icon: Award, label: '20+ Years Exp.' }, { icon: Users, label: '50+ Experts' }, { icon: Globe, label: '12+ Industries' }].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full icon-circle-royal text-royal-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs md:text-sm font-bold text-navy">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Profile Image Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative space-y-6"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-cream-divider group">
                <div className="relative h-[260px] md:h-[280px] overflow-hidden">
                  <img
                    src="/images/service_consulting.png"
                    alt="KMK Product Advisory"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8 bg-white border-t border-cream-divider">
                  <span className="inline-block bg-royal-subtle text-royal-primary border border-royal-light text-xs font-mono font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
                    Food & Dairy Technology
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-normal text-navy" style={{ fontFamily: '"DM Serif Display", serif' }}>
                    Product Strategy & Advisory
                  </h3>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-cream-divider shadow-card text-center relative flex items-center justify-between">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-14 h-14 rounded-full bg-royal-subtle border border-royal-light flex items-center justify-center font-display text-3xl text-royal-primary" style={{ fontFamily: '"DM Serif Display", serif' }}>
                    K
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-normal text-navy" style={{ fontFamily: '"DM Serif Display", serif' }}>KMK Enterprises</h3>
                    <p className="text-xs font-mono tracking-widest text-royal-primary uppercase font-bold mt-1">Est. 2020 • Chennai, India</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-royal-subtle text-royal-primary text-xs font-mono font-bold px-3 py-1.5 rounded-full border border-royal-light">
                  <TrendingUp className="w-4 h-4" /> Top Food Technologists
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="overflow-hidden border-b border-cream-divider">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Mission Left Panel */}
          <div className="p-12 md:p-20 bg-base flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-cream-divider">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-royal-primary" />
              <span className="text-xs font-mono uppercase tracking-widest text-royal-primary font-bold">Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-navy mb-6 leading-snug" style={{ fontFamily: '"DM Serif Display", serif' }}>
              To be the trusted bridge between food science and market success.
            </h2>
            <p className="text-base md:text-lg text-text-body leading-relaxed font-medium">
              We empower food entrepreneurs and corporations alike with the expertise, 
              tools, and insights needed to create products consumers love — while 
              meeting the highest standards of safety, quality, and sustainability.
            </p>
          </div>

          {/* Vision Right Panel */}
          <div className="p-12 md:p-20 bg-soft flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-royal-primary" />
              <span className="text-xs font-mono uppercase tracking-widest text-royal-primary font-bold">Vision</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-navy mb-6 leading-snug" style={{ fontFamily: '"DM Serif Display", serif' }}>
              A world where every food product is safer, healthier, and more innovative.
            </h2>
            <p className="text-base md:text-lg text-text-body leading-relaxed font-medium">
              We envision leading India's food technology renaissance — driving a future 
              where clean-label, nutritionally rich, and sustainably produced foods are 
              accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TIMELINE */}
      <section className="section-padding-royal bg-base border-b border-cream-divider">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-royal-primary tag-royal">Our Journey</span>
              <h2 className="text-4xl md:text-6xl font-display font-normal text-navy mt-3" style={{ fontFamily: '"DM Serif Display", serif' }}>
                Company Timeline
              </h2>
            </div>
          </AnimatedSection>

          <div className="relative" ref={timelineRef}>
            <svg
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px"
              style={{ height: '100%', transform: 'translateX(-50%)' }}
              viewBox="0 0 1 1000"
              preserveAspectRatio="none"
            >
              <line x1="0.5" y1="0" x2="0.5" y2="1000" stroke="#0B4F9C" strokeWidth="2" strokeDasharray="6 4" />
            </svg>

            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <div
                  key={`${item.year}-${item.title}`}
                  className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                >
                  <div className="absolute left-8 md:left-1/2 w-5 h-5 rounded-full -translate-x-1/2 z-10 flex-shrink-0 bg-royal-primary border-2 border-white shadow-md" />

                  <div className={`ml-16 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    <div className="bg-white border border-cream-divider rounded-2xl p-6 md:p-8 shadow-card border-t-4 border-t-royal-primary">
                      <span className="text-sm font-mono tracking-widest text-royal-primary font-bold">{item.year}</span>
                      <h3 className="text-xl font-bold text-navy mt-1 mb-2">{item.title}</h3>
                      <p className="text-base text-text-body font-medium">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEAM LEADERSHIP SECTION */}
      <section className="section-padding-royal bg-soft">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-royal-primary tag-royal font-bold">Executive Leadership</span>
              <h2 className="text-4xl md:text-6xl font-display font-normal text-navy mt-3" style={{ fontFamily: '"DM Serif Display", serif' }}>
                Team Leadership
              </h2>
            </div>
          </AnimatedSection>

          {/* Uniform Team Grid — 6 cards in a balanced 2x3 layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member, index) => (
              <motion.div
                key={member.name}
                className="card-royal p-7 md:p-8 flex flex-col justify-start h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                  {/* Top: Avatar & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-display text-2xl font-bold flex-shrink-0"
                      style={{
                        fontFamily: '"DM Serif Display", serif',
                        backgroundColor: member.isCeo ? '#0B4F9C' : '#E0F2FE',
                        color: member.isCeo ? '#FFFFFF' : '#0B4F9C',
                        border: member.isCeo ? 'none' : '1px solid #93C5FD',
                      }}
                    >
                      {member.name[0]}
                    </div>

                    {member.isCeo && (
                      <span className="inline-flex items-center gap-1.5 bg-royal-subtle text-royal-primary font-mono text-[0.68rem] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-royal-light shadow-xs">
                        <Award className="w-3.5 h-3.5" /> CEO & Founder
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-navy tracking-tight">{member.name}</h3>

                  {/* Role with uniform min-height */}
                  <div className="min-h-[2.5rem] flex items-center mt-1 mb-3">
                    <p className="text-xs font-mono text-royal-primary font-bold uppercase tracking-wider leading-snug">
                      {member.role}
                    </p>
                  </div>

                  <div className="w-full h-px bg-cream-divider mb-4" />

                  {/* Expertise */}
                  <p className="text-sm text-text-body leading-relaxed font-normal">
                    {member.expertise}
                  </p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

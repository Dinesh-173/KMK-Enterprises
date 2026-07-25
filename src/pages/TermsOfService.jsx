import AnimatedSection from '../components/AnimatedSection';
import { FileText, Mail, MapPin } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="bg-base min-h-screen grain-overlay">
      {/* Hero Header */}
      <section className="relative min-h-[35vh] flex items-center page-hero-pt pb-16 md:pb-20 bg-base border-b border-cream-divider">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="w-16 h-16 rounded-full icon-circle-royal mx-auto mb-6">
              <FileText className="w-7 h-7 text-royal-primary" />
            </div>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase mb-3 inline-block tag-royal font-bold">Legal Terms</span>
            <h1 className="text-4xl md:text-6xl font-display font-normal text-navy mb-4" style={{ fontFamily: '"DM Serif Display", serif' }}>
              Terms of Service
            </h1>
            <p className="text-xs md:text-sm font-mono text-silver-dark font-bold">
              Last Updated: July 25, 2026
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-soft text-navy border-b border-cream-divider">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-8 md:p-12 space-y-8 border border-slate-200 shadow-card border-t-4 border-t-royal-primary text-text-body leading-relaxed font-medium text-base md:text-lg">
              <div>
                <p>
                  Welcome to the KMK Enterprises website. By accessing or using this website, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of this website.
                </p>
              </div>

              {[
                {
                  num: '1',
                  title: 'About KMK Enterprises',
                  content: 'KMK Enterprises is a food ingredient distribution and technology company based in Chennai, India. This website is intended to provide information about our company, products, services, and industry-related blog content.'
                },
                {
                  num: '2',
                  title: 'Acceptance of Terms',
                  content: 'By accessing this website, you confirm that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations.'
                },
                {
                  num: '3',
                  title: 'Use of the Website',
                  content: 'You agree to use this website only for lawful purposes. You must not:',
                  list: [
                    'Violate any applicable law or regulation.',
                    'Attempt to gain unauthorized access to our systems or networks.',
                    'Introduce viruses, malware, or other harmful software.',
                    'Use automated means to extract data without permission.'
                  ]
                },
                {
                  num: '4',
                  title: 'Intellectual Property',
                  content: 'All content on this website, including text, graphics, logos, images, and branding, is the property of KMK Enterprises and is protected by copyright and intellectual property laws.'
                },
                {
                  num: '5',
                  title: 'Contact Information',
                  content: 'If you have any questions about these Terms of Service, please contact us at:'
                }
              ].map((item) => (
                <div key={item.num} className="pt-6 border-t border-cream-divider">
                  <h2 className="text-2xl font-display font-normal text-navy mb-3 flex items-center gap-2" style={{ fontFamily: '"DM Serif Display", serif' }}>
                    <span className="text-royal-primary font-bold font-mono">{item.num}.</span> {item.title}
                  </h2>
                  <p>{item.content}</p>
                  {item.list && (
                    <ul className="list-disc pl-6 mt-3 space-y-1.5 font-mono text-sm text-text-body font-bold">
                      {item.list.map((li, i) => (
                        <li key={i}>{li}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="bg-soft rounded-xl p-6 border border-cream-divider space-y-3 font-mono text-sm text-navy">
                <div className="flex items-center gap-3 font-bold">
                  <Mail className="w-4 h-4 text-royal-primary" />
                  <span>kmkenterprises@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 font-bold">
                  <MapPin className="w-4 h-4 text-royal-primary" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

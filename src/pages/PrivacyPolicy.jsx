import AnimatedSection from '../components/AnimatedSection';
import { Shield, Mail, MapPin } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-base min-h-screen grain-overlay">
      {/* Hero Header */}
      <section className="relative min-h-[35vh] flex items-center page-hero-pt pb-16 md:pb-20 bg-base border-b border-cream-divider">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="w-16 h-16 rounded-full icon-circle-royal mx-auto mb-6">
              <Shield className="w-7 h-7 text-royal-primary" />
            </div>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase mb-3 inline-block tag-royal font-bold">Legal & Security</span>
            <h1 className="text-4xl md:text-6xl font-display font-normal text-navy mb-4" style={{ fontFamily: '"DM Serif Display", serif' }}>
              Privacy Policy
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
                <h2 className="text-2xl md:text-3xl font-display font-normal text-navy mb-4" style={{ fontFamily: '"DM Serif Display", serif' }}>Welcome</h2>
                <p>
                  Welcome to KMK Enterprises. We value your privacy and are committed to protecting any information you share with us.
                </p>
              </div>

              <div className="pt-6 border-t border-cream-divider">
                <h2 className="text-2xl md:text-3xl font-display font-normal text-navy mb-4" style={{ fontFamily: '"DM Serif Display", serif' }}>Information We Collect</h2>
                <p className="mb-4">
                  We may collect information that you voluntarily provide through our contact forms, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-mono text-sm text-text-body font-bold">
                  <li>Name</li>
                  <li>Email Address</li>
                  <li>Phone Number (if provided)</li>
                  <li>Message content</li>
                </ul>
              </div>

              <div className="pt-6 border-t border-cream-divider">
                <h2 className="text-2xl md:text-3xl font-display font-normal text-navy mb-4" style={{ fontFamily: '"DM Serif Display", serif' }}>How We Use Your Information</h2>
                <p className="mb-4">
                  The information submitted through our website may be used to:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-mono text-sm text-text-body font-bold">
                  <li>Respond to inquiries or service requests</li>
                  <li>Provide details about our product offerings</li>
                  <li>Improve customer support and website experience</li>
                </ul>
              </div>

              <div className="pt-6 border-t border-cream-divider">
                <h2 className="text-2xl md:text-3xl font-display font-normal text-navy mb-4" style={{ fontFamily: '"DM Serif Display", serif' }}>Contact Us</h2>
                <p className="mb-4">
                  If you have questions about this Privacy Policy, feel free to reach out:
                </p>
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
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

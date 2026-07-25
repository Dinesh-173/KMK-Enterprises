import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AnimatedSection from '../components/AnimatedSection';
import { Mail, Phone, MapPin, Clock, Send, AlertCircle, Check } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  subject: z.string().min(3, 'Please provide a subject'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  industry: z.string().min(1, 'Please select your industry'),
});

const FIELDS = [
  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Rajesh Sharma' },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@company.com' },
  { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Optional' },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Project Development Inquiry' },
];

const INDUSTRIES = [
  'Dairy', 'Ice Cream & Frozen', 'Functional Foods', 'Beverages',
  'Confectionery', 'Bakery', 'FMCG', 'Nutritional', 'Startup', 'Other'
];

function FloatingInputField({ name, label, type = 'text', placeholder, register, error, delay = 0 }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <label
        className={`block text-xs md:text-sm font-mono uppercase tracking-widest mb-2 transition-colors font-bold ${
          isFocused ? 'text-royal-primary' : 'text-silver-dark'
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="input-royal w-full"
      />
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 font-bold">
          <AlertCircle className="w-3.5 h-3.5" /> {error.message}
        </p>
      )}
    </motion.div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="bg-base min-h-screen grain-overlay">
      {/* Hero Header */}
      <section className="relative min-h-[40vh] flex items-center page-hero-pt pb-16 md:pb-20 bg-base border-b border-cream-divider">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase mb-4 inline-block tag-royal">
              Let's Connect
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-normal text-navy mb-6" style={{ fontFamily: '"DM Serif Display", serif' }}>
              Get in Touch
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl text-text-body font-medium leading-relaxed">
              Ready to start your food innovation journey? Our team responds within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Split Layout — Left Dark Navy #0A192F / Right Warm Base #FAF9F6 */}
      <section className="bg-base">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Panel */}
            <div className="p-8 md:p-16 bg-navy text-white space-y-8 flex flex-col justify-between" style={{ backgroundColor: '#0A192F' }}>
              <AnimatedSection className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-normal text-white mb-6" style={{ fontFamily: '"DM Serif Display", serif' }}>
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    {[
                      { icon: Mail, label: 'Email', value: 'kmkenterprises@gmail.com', href: 'mailto:kmkenterprises@gmail.com' },
                      { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
                      { icon: MapPin, label: 'Address', value: 'Chennai, Tamil Nadu, India' },
                      { icon: Clock, label: 'Hours', value: 'Monday – Saturday, 9:00 AM – 7:00 PM' },
                    ].map(({ icon: Icon, label, value, href }) => (
                      <div key={label} className="flex gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-800 border border-slate-700 text-royal-light">
                          <Icon className="w-5 h-5 text-royal-light" style={{ color: '#60A5FA' }} />
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1 font-bold">{label}</p>
                          {href ? (
                            <a href={href} className="text-base md:text-lg font-bold text-white hover:text-royal-light transition-colors">{value}</a>
                          ) : (
                            <p className="text-base md:text-lg font-bold text-white">{value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden h-60 border border-slate-800 shadow-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.922904588722!2d80.2206775!3d13.0826802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x82e4b038e247de17!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1720118400000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="KMK Location Map"
                  />
                </div>
              </AnimatedSection>
            </div>

            {/* Right Panel */}
            <div className="p-8 md:p-16 bg-base flex items-center">
              <div className="w-full max-w-xl mx-auto">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center text-center border border-cream-divider shadow-card border-t-4 border-t-royal-primary"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-18 h-18 rounded-full bg-royal-subtle border border-royal-light flex items-center justify-center mb-6 text-royal-primary">
                        <Check className="w-9 h-9 text-royal-primary" />
                      </div>
                      <h3 className="text-3xl font-display font-normal text-navy mb-3" style={{ fontFamily: '"DM Serif Display", serif' }}>Message Sent!</h3>
                      <p className="text-base text-text-body font-medium max-w-sm mb-8">
                        Thank you for reaching out. Our team will respond within 24 hours.
                      </p>
                      <button
                        className="btn-primary-royal text-xs font-mono uppercase tracking-wider font-bold"
                        onClick={() => setSubmitted(false)}
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      className="bg-white rounded-2xl p-8 md:p-10 border border-cream-divider shadow-card border-t-4 border-t-royal-primary flex flex-col gap-6"
                      onSubmit={handleSubmit(onSubmit)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <h2 className="text-3xl font-display font-normal text-navy mb-2" style={{ fontFamily: '"DM Serif Display", serif' }}>Send Us a Message</h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {FIELDS.slice(0, 2).map((field, i) => (
                          <FloatingInputField
                            key={field.name}
                            {...field}
                            register={register}
                            error={errors[field.name]}
                            delay={i * 0.05}
                          />
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {FIELDS.slice(2).map((field, i) => (
                          <FloatingInputField
                            key={field.name}
                            {...field}
                            register={register}
                            error={errors[field.name]}
                            delay={i * 0.05 + 0.1}
                          />
                        ))}
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-mono uppercase tracking-widest text-silver-dark mb-2 font-bold">
                          Industry
                        </label>
                        <select
                          {...register('industry')}
                          className="input-royal w-full text-base"
                        >
                          <option value="">Select Your Industry</option>
                          {INDUSTRIES.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                        {errors.industry && (
                          <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 font-bold">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.industry.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-mono uppercase tracking-widest text-silver-dark mb-2 font-bold">
                          Message
                        </label>
                        <textarea
                          {...register('message')}
                          placeholder="Tell us about your project, product idea, or inquiry..."
                          rows={4}
                          className="input-royal w-full text-base resize-none"
                        />
                        {errors.message && (
                          <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 font-bold">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.message.message}
                          </p>
                        )}
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="btn-primary-royal w-full flex items-center justify-center gap-2 mt-2 uppercase font-mono text-sm tracking-wider font-bold py-4"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

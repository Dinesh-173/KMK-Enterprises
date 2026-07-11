import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AnimatedSection from '../components/AnimatedSection';
// BUG-14 FIX: Removed unused 'CheckCircle' import
import { Mail, Phone, MapPin, Clock, Send, AlertCircle } from 'lucide-react';

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

// BUG-07 FIX: FloatingLabelInput correctly threads RHF's onChange alongside local state setter
function FloatingLabelInput({ name, label, type = 'text', placeholder, register, error, delay = 0 }) {
  const [focused, setFocused] = useState(false);
  const { onChange: rhfOnChange, onBlur: rhfOnBlur, ref, name: fieldName } = register(name);

  return (
    <motion.div
      className={`relative ${error ? 'shake' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <input
        type={type}
        name={fieldName}
        ref={ref}
        placeholder={focused ? placeholder : ' '}
        onChange={rhfOnChange}
        onBlur={async (e) => {
          await rhfOnBlur(e);
          setFocused(false);
        }}
        onFocus={() => setFocused(true)}
        className={`floating-input w-full rounded-xl text-white text-sm bg-transparent outline-none transition-all duration-200 ${error ? 'has-error' : ''}`}
        style={{
          border: `1.5px solid ${focused ? '#00A896' : error ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
          boxShadow: focused ? '0 0 20px rgba(0,168,150,0.15)' : 'none',
          backgroundColor: 'rgba(255,255,255,0.03)',
          padding: '1rem 1.25rem',
        }}
      />
      <label
        className="floating-label font-medium"
        style={{
          color: focused ? '#00A896' : error ? '#ef4444' : '#8896A5',
        }}
      >
        {label}
      </label>
      {error && (
        <p className="flex items-center gap-1.5 text-xs mt-1.5" style={{ color: '#ef4444' }}>
          <AlertCircle className="w-3 h-3" /> {error.message}
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

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="bg-navy min-h-screen" style={{ backgroundColor: '#0B1F3A' }}>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-28" style={{ background: 'linear-gradient(180deg, #060f1e 0%, #0B1F3A 100%)' }}>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

          <AnimatedSection>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#00A896' }}>Let's Connect</p>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Get in <span className="gradient-text-teal">Touch</span>
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: '#8896A5' }}>
              Ready to start your food innovation journey? Our team responds within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Split Layout */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Contact Info + Map */}
            <AnimatedSection className="space-y-8">
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-6">Contact Information</h2>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: 'Email', value: 'MANIVVANNANA@GMAIL.COM', href: 'mailto:MANIVVANNANA@GMAIL.COM' },
                    { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
                    { icon: MapPin, label: 'Address', value: 'Pinnacle Tower, Chennai, Tamilnadu, India' },
                    { icon: Clock, label: 'Hours', value: 'Monday – Saturday, 9:00 AM – 7:00 PM' },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(0,168,150,0.15)', border: '1px solid rgba(0,168,150,0.25)' }}>
                        <Icon className="w-5 h-5" style={{ color: '#00A896' }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: '#8896A5' }}>{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-white hover:text-teal transition-colors"
                            style={{ color: '#ffffff' }}>{value}</a>
                        ) : (
                          <p className="text-sm text-white">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BUG-12 FIX: Use a real, valid Google Maps embed URL for BKC, Mumbai */}
              <motion.div
                className="rounded-2xl overflow-hidden h-64"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.922904588722!2d80.2206775!3d13.0826802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x82e4b038e247de17!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1720118400000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KMK Enterprises Location — Chennai, Tamilnadu"
                />
              </motion.div>
            </AnimatedSection>

            {/* Right: Contact Form */}
            <div>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="glass rounded-2xl p-10 flex flex-col items-center justify-center h-full text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
                    >
                      <svg className="w-20 h-20" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="#00A896" strokeWidth="4" />
                        <motion.path
                          d="M 28 52 L 44 68 L 72 36"
                          fill="none"
                          stroke="#00A896"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                        />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-black text-white mt-6 mb-3">Message Sent!</h3>
                    <p className="text-sm" style={{ color: '#8896A5' }}>
                      Thank you for reaching out. Our team will respond within 24 hours.
                    </p>
                    <motion.button
                      className="mt-8 px-6 py-3 rounded-xl font-bold text-sm border"
                      style={{ borderColor: 'rgba(0,168,150,0.3)', color: '#00A896' }}
                      whileHover={{ backgroundColor: 'rgba(0,168,150,0.1)' }}
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="glass rounded-2xl p-8 flex flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h2 className="text-2xl font-black text-white mb-2">Send Us a Message</h2>

                    {FIELDS.map((field, i) => (
                      <FloatingLabelInput
                        key={field.name}
                        {...field}
                        register={register}
                        error={errors[field.name]}
                        delay={i * 0.08}
                      />
                    ))}

                    {/* Industry Select */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32 }}
                    >
                      <select
                        {...register('industry')}
                        className="w-full rounded-xl text-sm outline-none"
                        style={{
                          border: `1.5px solid ${errors.industry ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          color: '#ffffff',
                          padding: '1rem 1.25rem',
                        }}
                      >
                        <option value="" style={{ backgroundColor: '#0B1F3A' }}>Select Your Industry</option>
                        {INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind} style={{ backgroundColor: '#0B1F3A' }}>{ind}</option>
                        ))}
                      </select>
                      {errors.industry && (
                        <p className="flex items-center gap-1.5 text-xs mt-1.5" style={{ color: '#ef4444' }}>
                          <AlertCircle className="w-3 h-3" /> {errors.industry.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Message Textarea */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <textarea
                        {...register('message')}
                        placeholder="Tell us about your project, product idea, or inquiry..."
                        rows={5}
                        className="w-full rounded-xl text-white text-sm resize-none outline-none"
                        style={{
                          border: `1.5px solid ${errors.message ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          padding: '1rem 1.25rem',
                        }}
                      />
                      {errors.message && (
                        <p className="flex items-center gap-1.5 text-xs mt-1.5" style={{ color: '#ef4444' }}>
                          <AlertCircle className="w-3 h-3" /> {errors.message.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3"
                      style={{ background: 'linear-gradient(135deg, #00A896, #007a6e)' }}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0,168,150,0.4)' }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.48 }}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
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
      </section>

      {/* Quick Stats */}
      <section className="py-16" style={{ backgroundColor: '#060f1e' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: '< 24h', label: 'Response Time' },
              { val: '100%', label: 'Confidential' },
              { val: 'Free', label: 'Initial Consult' },
              { val: 'Pan India', label: 'Service Area' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center glass rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-black mb-1 gradient-text-teal">{stat.val}</div>
                <div className="text-xs" style={{ color: '#8896A5' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

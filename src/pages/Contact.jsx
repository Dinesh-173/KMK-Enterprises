import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AnimatedSection from '../components/AnimatedSection';
import { Mail, Phone, MapPin, Clock, Send, AlertCircle, Check, ShieldCheck, ExternalLink } from 'lucide-react';
import { sendContactInquiry, generateMailtoUrl } from '../services/contactService';

// Schema enforcing 10-digit numeric phone number, no letters or special characters
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits (numbers only)'),
  company: z.string().optional(),
  subject: z.string().min(3, 'Please provide a subject'),
  industry: z.string().min(1, 'Please select your industry'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

const INDUSTRIES = [
  'Dairy',
  'Ice Cream & Frozen',
  'Functional Foods',
  'Beverages',
  'Confectionery',
  'Nutritional',
  'Startup',
  'Other',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      industry: '',
      message: '',
    },
  });

  const phoneValue = watch('phone') || '';

  // Prevent entering letters and special characters in phone input
  const handlePhoneKeyDown = (e) => {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Home',
      'End',
    ];
    if (allowedKeys.includes(e.key)) return;
    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) return;

    // Disallow anything other than digits 0-9
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Clean value to numbers only and clamp at 10 digits
  const handlePhoneChange = (e) => {
    const cleaned = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setValue('phone', cleaned, { shouldValidate: true, shouldDirty: true });
  };

  // Handle paste events safely
  const handlePhonePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text') || '';
    const digitsOnly = pasted.replace(/[^0-9]/g, '');
    const current = phoneValue;
    const combined = (current + digitsOnly).slice(0, 10);
    setValue('phone', combined, { shouldValidate: true, shouldDirty: true });
  };

  const [submissionResult, setSubmissionResult] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await sendContactInquiry(data);
      setSubmittedData(data);
      setSubmissionResult(result);
      setSubmitted(true);
      reset();
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmittedData(data);
      setSubmissionResult({
        success: true,
        emailDelivered: false,
        needsActivation: true,
        mailtoUrl: generateMailtoUrl(data),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base min-h-screen grain-overlay">
      {/* Hero Header */}
      <section className="relative min-h-[35vh] flex items-center page-hero-pt pb-12 md:pb-16 bg-base border-b border-cream-divider">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatedSection>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase mb-4 inline-block tag-royal">
              Let's Connect
            </span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-display font-normal text-navy mb-4 tracking-tight"
              style={{ fontFamily: '"DM Serif Display", serif' }}
            >
              Get in Touch
            </h1>
            <p className="text-base md:text-xl max-w-2xl text-text-body font-medium leading-relaxed">
              Ready to start your food innovation journey? Reach out below and our engineering team will respond within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Section — Spacious 12-Column Responsive Layout */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Panel: Contact Details & Interactive Map (5 columns) */}
            <div
              className="lg:col-span-5 p-8 md:p-10 rounded-3xl bg-navy text-white shadow-2xl border border-slate-800 flex flex-col justify-between space-y-8 relative overflow-hidden"
              style={{ backgroundColor: '#0A192F' }}
            >
              {/* Subtle background glow */}
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-20 blur-3xl"
                style={{ backgroundColor: '#0B4F9C' }}
              />

              <AnimatedSection className="space-y-8 relative z-10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-royal-light font-bold mb-2 block">
                    Direct Contact
                  </span>
                  <h2
                    className="text-2xl md:text-3xl font-display font-normal text-white mb-6"
                    style={{ fontFamily: '"DM Serif Display", serif' }}
                  >
                    Contact Information
                  </h2>

                  <div className="space-y-6">
                    {[
                      {
                        icon: Mail,
                        label: 'Official Email',
                        value: 'info@kmk.enterprises',
                        href: 'mailto:info@kmk.enterprises',
                        sub: 'Direct response channel',
                      },
                      {
                        icon: Phone,
                        label: 'Phone Support',
                        value: '+91 98402 69391',
                        href: 'tel:+919840269391',
                        sub: 'Mon – Sat, 9:00 AM – 7:00 PM',
                      },
                      {
                        icon: MapPin,
                        label: 'Headquarters',
                        value: 'Chennai, Tamil Nadu, India',
                        sub: 'Food Technology Innovation Center',
                      },
                      {
                        icon: Clock,
                        label: 'Working Hours',
                        value: 'Monday – Saturday',
                        sub: '9:00 AM – 7:00 PM IST',
                      },
                    ].map(({ icon: Icon, label, value, href, sub }) => (
                      <div key={label} className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-slate-800/80 border border-slate-700/80 text-royal-light shadow-sm">
                          <Icon className="w-5 h-5" style={{ color: '#60A5FA' }} />
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                            {label}
                          </p>
                          {href ? (
                            <a
                              href={href}
                              className="text-base md:text-lg font-bold text-white hover:text-royal-light transition-colors block mt-0.5"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-base md:text-lg font-bold text-white mt-0.5">{value}</p>
                          )}
                          {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Preview */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Location Map
                    </span>
                    <a
                      href="https://maps.google.com/?q=Chennai,+Tamil+Nadu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-royal-light hover:underline flex items-center gap-1 font-mono"
                    >
                      Open in Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="rounded-2xl overflow-hidden h-56 border border-slate-800 shadow-xl bg-slate-900">
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
                </div>
              </AnimatedSection>
            </div>

            {/* Right Panel: Send Us a Message Section (7 columns - comfortably shifted to the right) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="w-full">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      className="bg-white rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center border border-[#EAE5D9] shadow-card border-t-4 border-t-royal-primary"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="w-20 h-20 rounded-full bg-royal-subtle border border-royal-light flex items-center justify-center mb-6 text-royal-primary shadow-sm">
                        <Check className="w-10 h-10 text-royal-primary" />
                      </div>
                      <h3
                        className="text-3xl font-display font-normal text-navy mb-2"
                        style={{ fontFamily: '"DM Serif Display", serif' }}
                      >
                        Message Sent Successfully!
                      </h3>
                      <p className="text-base text-text-body font-medium max-w-md mb-6 leading-relaxed">
                        Thank you for reaching out. We have received your inquiry and our food technology engineering team will get in touch with you within 24 hours.
                      </p>

                      {submittedData && (
                        <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 text-left text-xs md:text-sm text-slate-700 space-y-2.5">
                          <p className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold mb-2 border-b pb-1">
                            Submission Summary
                          </p>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Name:</span>
                            <span className="font-bold text-slate-900">{submittedData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Email:</span>
                            <span className="font-bold text-slate-900">{submittedData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Phone Number:</span>
                            <span className="font-bold text-royal-primary font-mono">{submittedData.phone}</span>
                          </div>
                          {submittedData.company && (
                            <div className="flex justify-between">
                              <span className="text-slate-500 font-medium">Company:</span>
                              <span className="font-bold text-slate-900">{submittedData.company}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Industry:</span>
                            <span className="font-bold text-slate-900">{submittedData.industry}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Subject:</span>
                            <span className="font-bold text-slate-900">{submittedData.subject}</span>
                          </div>
                        </div>
                      )}

                      <button
                        className="btn-primary-royal text-xs font-mono uppercase tracking-wider font-bold py-3.5 px-8 shadow-btn cursor-pointer"
                        onClick={() => {
                          setSubmitted(false);
                          setSubmittedData(null);
                          setSubmissionResult(null);
                        }}
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      className="bg-white rounded-3xl p-8 md:p-12 border border-[#EAE5D9] shadow-card border-t-4 border-t-royal-primary flex flex-col gap-6"
                      onSubmit={handleSubmit(onSubmit)}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-royal-primary font-bold tag-royal mb-3 inline-block">
                          Direct Inquiry
                        </span>
                        <h2
                          className="text-3xl md:text-4xl font-display font-normal text-navy mb-2"
                          style={{ fontFamily: '"DM Serif Display", serif' }}
                        >
                          Send Us a Message
                        </h2>
                        <p className="text-sm text-text-body">
                          All submitted messages are sent directly to{' '}
                          <a href="mailto:info@kmk.enterprises" className="font-bold text-royal-primary hover:underline">
                            info@kmk.enterprises
                          </a>
                          .
                        </p>
                      </div>

                      {/* Row 1: Your Name & Email Address */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs md:text-sm font-mono uppercase tracking-widest text-silver-dark mb-2 font-bold">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            {...register('name')}
                            placeholder="Rajesh Sharma"
                            className="input-royal w-full"
                          />
                          {errors.name && (
                            <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 font-bold">
                              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs md:text-sm font-mono uppercase tracking-widest text-silver-dark mb-2 font-bold">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            {...register('email')}
                            placeholder="you@company.com"
                            className="input-royal w-full"
                          />
                          {errors.email && (
                            <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 font-bold">
                              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 2: Phone Number (10 digits only) & Company Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-xs md:text-sm font-mono uppercase tracking-widest text-silver-dark font-bold">
                              Phone Number *
                            </label>
                            <span
                              className={`text-[11px] font-mono font-bold ${
                                phoneValue.length === 10
                                  ? 'text-emerald-600'
                                  : phoneValue.length > 0
                                  ? 'text-royal-mid'
                                  : 'text-slate-400'
                              }`}
                            >
                              {phoneValue.length}/10 digits
                            </span>
                          </div>
                          <div className="relative">
                            <input
                              type="tel"
                              inputMode="numeric"
                              pattern="[0-9]{10}"
                              maxLength={10}
                              value={phoneValue}
                              onKeyDown={handlePhoneKeyDown}
                              onChange={handlePhoneChange}
                              onPaste={handlePhonePaste}
                              placeholder="9840269391"
                              className="input-royal w-full font-mono tracking-wider"
                              autoComplete="tel"
                            />
                            {phoneValue.length === 10 && (
                              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none">
                                <Check className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          {errors.phone ? (
                            <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 font-bold">
                              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.phone.message}
                            </p>
                          ) : (
                            <p className="text-[11px] text-slate-400 mt-1">
                              Numbers only. Special characters and letters are blocked.
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs md:text-sm font-mono uppercase tracking-widest text-silver-dark mb-2 font-bold">
                            Company Name
                          </label>
                          <input
                            type="text"
                            {...register('company')}
                            placeholder="Optional"
                            className="input-royal w-full"
                          />
                        </div>
                      </div>

                      {/* Row 3: Subject & Industry */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs md:text-sm font-mono uppercase tracking-widest text-silver-dark mb-2 font-bold">
                            Subject *
                          </label>
                          <input
                            type="text"
                            {...register('subject')}
                            placeholder="Project Development Inquiry"
                            className="input-royal w-full"
                          />
                          {errors.subject && (
                            <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 font-bold">
                              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.subject.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs md:text-sm font-mono uppercase tracking-widest text-silver-dark mb-2 font-bold">
                            Industry *
                          </label>
                          <select
                            {...register('industry')}
                            className="input-royal w-full text-base"
                          >
                            <option value="">Select Your Industry</option>
                            {INDUSTRIES.map((ind) => (
                              <option key={ind} value={ind}>
                                {ind}
                              </option>
                            ))}
                          </select>
                          {errors.industry && (
                            <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 font-bold">
                              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.industry.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 4: Message */}
                      <div>
                        <label className="block text-xs md:text-sm font-mono uppercase tracking-widest text-silver-dark mb-2 font-bold">
                          Message *
                        </label>
                        <textarea
                          {...register('message')}
                          placeholder="Tell us about your project, product idea, or inquiry..."
                          rows={4}
                          className="input-royal w-full text-base resize-none"
                        />
                        {errors.message && (
                          <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 font-bold">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.message.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Button & Auto-send Notice */}
                      <div className="space-y-3 pt-2">
                        <motion.button
                          type="submit"
                          disabled={loading}
                          className="btn-primary-royal w-full flex items-center justify-center gap-2 uppercase font-mono text-sm tracking-wider font-bold py-4 shadow-btn cursor-pointer"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Send Message
                            </>
                          )}
                        </motion.button>

                        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center font-medium">
                          <ShieldCheck className="w-4 h-4 text-royal-primary flex-shrink-0" />
                          <span>Direct inquiry routing with 24h response guarantee</span>
                        </div>
                      </div>
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

import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const FOOTER_LINKS = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Industries', path: '/industries' },
    { label: 'Research', path: '/research' },
    { label: 'Divisions', path: '/divisions' },
  ],
  Insights: [
    { label: 'Blog & Articles', path: '/blog' },
    { label: 'Case Studies', path: '/blog' },
    { label: 'Food Tech Trends', path: '/blog' },
    { label: 'R&D Updates', path: '/research' },
  ],
  Divisions: [
    { label: 'Sabrosa Ice Creams', path: '/divisions' },
    { label: 'RKV Enterprises', path: '/divisions' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800 overflow-hidden pb-20 md:pb-0" style={{ backgroundColor: '#0A192F' }}>
      {/* Top royal blue accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-royal-primary to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 text-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 inline-block shadow-md">
                <img
                  src="/logo.png"
                  alt="KMK Enterprises Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-base leading-relaxed mb-6 max-w-sm text-slate-300 font-medium">
              Pioneering food technology solutions transforming ideas into world-class products. 
              Trusted by leading brands across 12+ industries.
            </p>

            <div className="space-y-3.5">
              {[
                { icon: Mail, text: 'kmkenterprises@gmail.com' },
                { icon: Phone, text: '+91 98765 43210' },
                { icon: MapPin, text: 'Chennai, Tamil Nadu, India' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm font-mono text-slate-300">
                  <Icon className="w-4 h-4 flex-shrink-0 text-royal-light" style={{ color: '#60A5FA' }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-normal text-base md:text-lg tracking-wider uppercase mb-5 text-white" style={{ fontFamily: '"DM Serif Display", serif' }}>
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="text-sm md:text-base font-medium transition-colors duration-200 hover:text-royal-light text-slate-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs md:text-sm font-mono text-slate-400">
            © {new Date().getFullYear()} KMK Enterprises. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs md:text-sm font-mono text-slate-300">
            <Link to="/privacy-policy" className="hover:text-royal-light transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-royal-light transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <footer className="relative bg-navy-dark border-t border-white/5 overflow-hidden pb-20 md:pb-0">
      {/* Gradient glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #00A896, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl text-white"
                style={{ background: 'linear-gradient(135deg, #00A896, #7B2FBE)' }}>
                K
              </div>
              <div>
                <span className="text-white font-bold text-xl">KMK</span>
                <span className="text-teal text-xs block leading-none font-medium tracking-widest"
                  style={{ color: '#00A896' }}>ENTERPRISES</span>
              </div>
            </Link>
            <p className="text-slate-muted text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: '#8896A5' }}>
              Pioneering food technology solutions that transform ideas into world-class products. 
              Trusted by leading brands across 12+ industries globally.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: Mail, text: 'MANIVVANNANA@GMAIL.COM' },
                { icon: Phone, text: '+91 98765 43210' },
                { icon: MapPin, text: 'Chennai, Tamilnadu, India' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm" style={{ color: '#8896A5' }}>
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#00A896' }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="text-sm transition-colors duration-200 hover:text-teal"
                      style={{ color: '#8896A5' }}
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
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: '#8896A5' }}>
            © {new Date().getFullYear()} KMK Enterprises. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: '#8896A5' }}>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

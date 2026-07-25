import { Suspense, lazy, useEffect, useContext, createContext, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorFollow from './components/CursorFollow';
import WhatsAppFAB from './components/WhatsAppFAB';
import PageTransition from './components/PageTransition';

// BUG-04 FIX: Expose Lenis instance via context so child components can call lenis.scrollTo(0)
export const LenisContext = createContext(null);
export function useLenis() { return useContext(LenisContext); }

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Industries = lazy(() => import('./pages/Industries'));
const Research = lazy(() => import('./pages/Research'));
const Divisions = lazy(() => import('./pages/Divisions'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: '#060f1e' }}>
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 animate-spin"
          style={{ borderColor: 'rgba(0,168,150,0.2)', borderTopColor: '#00A896' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-xl">K</span>
        </div>
      </div>
    </div>
  );
}

function AppInner() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // BUG-04 FIX: Use lenis.scrollTo(0) instead of window.scrollTo to stay in sync with Lenis
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, lenis]);

  return (
    <div className="grain-overlay">
      <CursorFollow />
      <Navbar />
      <PageTransition>
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/research" element={<Research />} />
              <Route path="/divisions" element={<Divisions />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
            </Routes>
          </Suspense>
        </main>
      </PageTransition>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    let rafId;

    // BUG-20 FIX: Track RAF id so we can properly cancel it when tab is hidden
    const animate = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(animate);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        lenis.stop();
        // BUG-20 FIX: Cancel the RAF loop when tab is hidden to stop unnecessary ticks
        cancelAnimationFrame(rafId);
      } else {
        lenis.start();
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <AppInner />
      </LenisProvider>
    </BrowserRouter>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X,
  Send,
  RotateCcw,
  Bot,
  ExternalLink,
  AlertCircle,
  ArrowRight,
  Minus,
  Sparkles,
  Volume2,
  VolumeX,
  MessageCircle,
  Copy,
  Check,
  Calendar,
  ChevronLeft,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { sendChatMessage, resetSessionId } from '../../services/chatService';

// Comprehensive starter question bubbles covering KMK's core food technology domains
const STARTER_OPTIONS = [
  {
    prefix: 'Formulate',
    rest: 'dairy beverages and curd with zero syneresis',
    prompt: 'Tell me about your dairy beverage and curd capabilities.',
  },
  {
    prefix: 'Stabilize',
    rest: 'ice cream overrun, meltdown and -18°C inclusions',
    prompt: 'Can you stabilize ice cream inclusions and overrun?',
  },
  {
    prefix: 'Develop',
    rest: 'clean-label sugar-free beverages with stevia or monk fruit',
    prompt: 'Do you formulate sugar-free beverages with stevia or monk fruit?',
  },
  {
    prefix: 'Engineer',
    rest: 'anti-hardening high-protein bars & extruded cereals',
    prompt: 'How do you formulate high-protein bars and extruded millet cereals?',
  },
  {
    prefix: 'Cook',
    rest: 'tropical anti-graining candies & center-filled toffees',
    prompt: 'What confectionery and candy formulations do you provide?',
  },
  {
    prefix: 'Simulate',
    rest: 'pilot continuous UHT & 500-bar homogenization',
    prompt: 'What pilot plant facilities and homogenizers do you operate?',
  },
  {
    prefix: 'Scale',
    rest: '4-stage commercial product roadmap, timeline & costing',
    prompt: 'What is your 4-stage process, timeline, and pricing roadmap to launch?',
  },
  {
    prefix: 'Verify',
    rest: 'FSSAI compliance and accelerated shelf-life testing',
    prompt: 'What are your FSSAI compliance and shelf life procedures?',
  },
  {
    prefix: 'Consult',
    rest: 'directly with Senior Technologist Manivvannan A',
    prompt: 'How can I connect with Senior Technologist Manivvannan A for project consulting?',
  },
];

// Motion animation variants for container and children
const listContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 26,
    },
  },
};

export default function KMKAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      if (messages.length > 0) {
        scrollToBottom();
      }
    }
  }, [messages, isOpen, isMinimized, loading]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const copyToClipboard = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (_) {}
  };

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || loading) return;

    setError(null);
    setInputMessage('');

    const userMessageObj = {
      id: 'user_' + Date.now(),
      sender: 'visitor',
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessageObj]);
    setLoading(true);

    try {
      const response = await sendChatMessage(query);
      const assistantMessageObj = {
        id: 'asst_' + Date.now(),
        sender: 'assistant',
        content: response.answer,
        category: response.category,
        parameters: response.parameters || [],
        followUps: response.followUps || [],
        sources: response.sources || [],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessageObj]);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    resetSessionId();
    setMessages([]);
    setError(null);
  };

  // Clean formatted content renderer with enhanced typography contrast
  const renderContent = (content) => {
    if (!content) return null;
    const paragraphs = content.split('\n\n');

    return (
      <div className="space-y-3 font-sans">
        {paragraphs.map((p, pIdx) => {
          const lines = p.split('\n');
          return (
            <div key={pIdx} className="space-y-2">
              {lines.map((line, lIdx) => {
                const trimmed = line.trim();
                if (!trimmed) return null;

                // Dedicated inline question bubble (when line ends with ?)
                if (trimmed.endsWith('?') && !trimmed.startsWith('•') && !trimmed.startsWith('-') && !trimmed.match(/^\d+\./)) {
                  return (
                    <div
                      key={lIdx}
                      className="my-2 p-3 rounded-xl bg-gradient-to-r from-indigo-50/90 to-purple-50/70 border border-indigo-200/90 shadow-2xs"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 shadow-xs">
                          ?
                        </span>
                        <span className="flex-1 text-[13px] font-semibold text-[#0F172A] leading-snug">
                          {renderInline(trimmed)}
                        </span>
                      </div>
                    </div>
                  );
                }

                // Bullet point with glowing blue dot
                if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                  const text = trimmed.replace(/^[•-]\s*/, '');
                  return (
                    <div key={lIdx} className="flex items-start gap-2.5 pl-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] flex-shrink-0 mt-2 shadow-[0_0_6px_rgba(79,70,229,0.5)]" />
                      <span className="flex-1 text-[13.5px] leading-relaxed text-[#1E293B] font-sans">
                        {renderInline(text)}
                      </span>
                    </div>
                  );
                }

                // Numbered list item
                const numMatch = trimmed.match(/^(\d+)\.\s*(.+)/);
                if (numMatch) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2.5 pl-0.5">
                      <span className="w-4 h-4 rounded-full bg-indigo-50 text-[#4338CA] font-mono text-[10.5px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-200">
                        {numMatch[1]}
                      </span>
                      <span className="flex-1 text-[13.5px] leading-relaxed text-[#1E293B] font-sans">
                        {renderInline(numMatch[2])}
                      </span>
                    </div>
                  );
                }

                return (
                  <p key={lIdx} className="text-[13.5px] leading-relaxed text-[#1E293B] font-sans">
                    {renderInline(trimmed)}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const renderInline = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-[#0F172A]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Launcher Button with pulsing glow and smooth hover bounce */}
      {!isOpen && (
        <div className="fixed bottom-[74px] right-4 md:bottom-[96px] md:right-8 z-[9995]">
          <div className="relative">
            {/* Ambient Pulse Ring */}
            <span className="absolute -inset-1 rounded-full bg-indigo-500/30 animate-ping opacity-60 pointer-events-none" />

            <motion.button
              onClick={() => {
                setIsOpen(true);
                setIsMinimized(false);
              }}
              className="h-13 px-4 rounded-full bg-gradient-to-r from-[#4338CA] via-[#4F46E5] to-[#6366F1] text-white shadow-[0_10px_30px_rgba(79,70,229,0.4)] flex items-center gap-2.5 cursor-pointer relative group border border-white/20"
              aria-label="Open Ask KMK Food Tech Assistant"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -3, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                scale: { duration: 0.3 },
                opacity: { duration: 0.3 },
              }}
              whileHover={{
                scale: 1.08,
                boxShadow: '0 16px 36px rgba(79,70,229,0.5)',
              }}
              whileTap={{ scale: 0.92 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                whileHover={{ rotate: 18 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
              <div className="text-left font-sans pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-white tracking-tight">Ask KMK</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      )}

      {/* Floating Chatbot Window (Ask AWS Layout with Architectural Depth) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chatbot-window fixed z-[100000] bg-[#FAFBFD] border border-slate-200/90 shadow-[0_24px_65px_rgba(15,23,42,0.25)] flex flex-col overflow-hidden font-sans select-text
              ${
                isMinimized
                  ? 'bottom-[74px] right-4 md:bottom-[96px] md:right-8 w-72 h-14 rounded-2xl bg-gradient-to-r from-[#4338CA] to-[#6366F1] text-white shadow-xl flex items-center justify-between px-4 cursor-pointer'
                  : 'inset-x-3 bottom-3 top-12 md:inset-auto md:bottom-6 md:right-8 md:w-[410px] md:h-[650px] md:max-h-[90vh] rounded-3xl'
              }`}
            initial={{ opacity: 0, scale: 0.88, y: 25, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(4px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            role="dialog"
            aria-label="Ask KMK AI Assistant"
          >
            {/* Minimized Bar State */}
            {isMinimized ? (
              <motion.div
                onClick={() => setIsMinimized(false)}
                className="flex-1 flex items-center justify-between cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-sm tracking-tight text-white">Ask KMK AI</span>
                </div>
                <span className="text-xs text-white/80 font-medium">Click to resume ↑</span>
              </motion.div>
            ) : (
              <>
                {/* Header: Compact Toolbar during Conversation, Full Hero in Home View */}
                {messages.length > 0 ? (
                  <div className="bg-gradient-to-r from-[#3730A3] via-[#4F46E5] to-[#6366F1] text-white px-4 py-3 flex-shrink-0 shadow-md relative z-20 flex items-center justify-between border-b border-indigo-400/20">
                    <div className="flex items-center gap-2.5">
                      <motion.button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 text-xs font-semibold !text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl backdrop-blur-md transition-colors cursor-pointer border border-white/25 shadow-xs"
                        title="Return to questions"
                        whileHover={{ scale: 1.04, x: -2 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>All Topics</span>
                      </motion.button>
                      <div className="flex items-center gap-2 pl-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                        <span className="text-[15px] font-bold !text-white tracking-tight font-sans">
                          Ask KMK AI
                        </span>
                      </div>
                    </div>

                    {/* Window Controls Inset with Safe Margin */}
                    <div className="flex items-center gap-2 pr-2">
                      <motion.button
                        onClick={() => setIsMinimized(true)}
                        className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center !text-white transition-colors cursor-pointer border border-white/20 shadow-2xs"
                        aria-label="Minimize"
                        title="Minimize"
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </motion.button>
                      <motion.button
                        onClick={() => setIsOpen(false)}
                        className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center !text-white transition-colors cursor-pointer border border-white/20 shadow-2xs"
                        aria-label="Close"
                        title="Close"
                        whileHover={{ scale: 1.12, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-[#3730A3] via-[#4F46E5] to-[#6366F1] text-white p-5 pb-4.5 flex-shrink-0 shadow-md relative overflow-hidden">
                    {/* Subtle Ambient Light Reflections */}
                    <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/15 blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-indigo-300/20 blur-xl pointer-events-none" />

                    {/* Top Right Window Controls: Safely Inset with Clear Padding */}
                    <div className="absolute top-4 right-5 z-30 flex items-center gap-2">
                      <motion.button
                        onClick={() => setIsMinimized(true)}
                        className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center !text-white transition-colors cursor-pointer border border-white/30 shadow-2xs"
                        aria-label="Minimize"
                        title="Minimize"
                        whileHover={{ scale: 1.15, y: 1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </motion.button>
                      <motion.button
                        onClick={() => setIsOpen(false)}
                        className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center !text-white transition-colors cursor-pointer border border-white/30 shadow-2xs"
                        aria-label="Close"
                        title="Close"
                        whileHover={{ scale: 1.15, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      </motion.button>
                    </div>

                    {/* Centered Hero Header Text Block */}
                    <div className="flex flex-col items-center text-center pt-2 pb-1 relative z-10">
                      {/* Title Row: Ask KMK + [ ⬡ built-in ] badge */}
                      <div className="flex items-center justify-center gap-2.5 mb-2">
                        <div className="text-[23px] font-bold !text-white tracking-tight drop-shadow-xs font-sans">
                          Ask KMK
                        </div>
                        <motion.span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-white/40 bg-white/20 text-[11px] font-semibold !text-white tracking-wide backdrop-blur-md shadow-2xs"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-[10px] text-amber-300">⬡</span>
                          <span>built-in</span>
                        </motion.span>
                      </div>

                      {/* Description Subtitle Centered */}
                      <p className="text-[13px] text-indigo-100/95 font-normal leading-relaxed max-w-[320px] mx-auto text-center font-sans">
                        Get helpful guidance and recommendations from KMK food science AI assistant.
                      </p>
                    </div>
                  </div>
                )}

                {/* Body Content Area with High-Tech Blueprint Grid, Molecular Motif, and Ambient Luminescence */}
                <div className="flex-1 overflow-y-auto relative bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9]/60 to-[#EEF2FF]/40">
                  {/* Subtle Blueprint Micro-Grid Background Layer */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.45]"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
                      `,
                      backgroundSize: '22px 22px',
                    }}
                  />

                  {/* Decorative Food-Tech Molecular Hexagon Motif Watermark */}
                  <svg
                    className="absolute -bottom-10 -right-10 w-64 h-64 text-indigo-600 pointer-events-none opacity-[0.05]"
                    viewBox="0 0 200 200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" />
                    <polygon points="100,45 150,75 150,125 100,155 50,125 50,75" />
                    <circle cx="100" cy="20" r="4" fill="currentColor" />
                    <circle cx="170" cy="60" r="4" fill="currentColor" />
                    <circle cx="170" cy="140" r="4" fill="currentColor" />
                    <circle cx="100" cy="180" r="4" fill="currentColor" />
                    <circle cx="30" cy="140" r="4" fill="currentColor" />
                    <circle cx="30" cy="60" r="4" fill="currentColor" />
                    <line x1="100" y1="20" x2="100" y2="45" />
                    <line x1="170" y1="60" x2="150" y2="75" />
                    <line x1="170" y1="140" x2="150" y2="125" />
                    <line x1="100" y1="180" x2="100" y2="155" />
                    <line x1="30" y1="140" x2="50" y2="125" />
                    <line x1="30" y1="60" x2="50" y2="75" />
                  </svg>

                  {/* Decorative Floating Molecular Node Top Left */}
                  <svg
                    className="absolute top-4 -left-6 w-36 h-36 text-indigo-400 pointer-events-none opacity-[0.06]"
                    viewBox="0 0 120 120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="60" cy="60" r="28" strokeDasharray="3 3" />
                    <circle cx="60" cy="60" r="8" fill="currentColor" />
                    <circle cx="20" cy="40" r="5" fill="currentColor" />
                    <circle cx="100" cy="40" r="5" fill="currentColor" />
                    <circle cx="60" cy="105" r="5" fill="currentColor" />
                    <line x1="60" y1="60" x2="20" y2="40" />
                    <line x1="60" y1="60" x2="100" y2="40" />
                    <line x1="60" y1="60" x2="60" y2="105" />
                  </svg>

                  {/* Ambient Soft Luminescent Glows */}
                  <div className="absolute top-12 -right-16 w-52 h-52 bg-indigo-300/25 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-16 -left-16 w-52 h-52 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-sky-200/20 rounded-full blur-2xl pointer-events-none" />

                  {/* HOME STATE: Ask AWS Starter Questions Deck */}
                  {messages.length === 0 ? (
                    <div className="min-h-full flex flex-col justify-between p-4.5 pt-4 pb-3 relative z-10">
                      <div>
                        {/* Section Header with Refined Typography & Alignment */}
                        <div className="mb-3.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-[#4F46E5] shadow-[0_0_8px_rgba(79,70,229,0.7)] flex-shrink-0 animate-pulse" />
                            <h3 className="font-bold text-[15.5px] text-[#0F172A] tracking-tight font-sans">
                              Select a Question to Formulate
                            </h3>
                          </div>
                          <p className="text-[12.5px] text-[#475569] font-normal leading-relaxed pl-4 font-sans">
                            Click any question bubble below for an instant formulation breakdown:
                          </p>
                        </div>

                        {/* Starter Question Cards in Individual Clean Bubbles */}
                        <motion.div
                          className="space-y-2.5"
                          variants={listContainerVariants}
                          initial="hidden"
                          animate="show"
                        >
                          {STARTER_OPTIONS.map((item, idx) => (
                            <motion.button
                              key={idx}
                              variants={cardItemVariants}
                              onClick={() => handleSend(item.prompt)}
                              className="w-full text-left bg-white/95 hover:bg-gradient-to-r hover:from-white hover:to-indigo-50/50 backdrop-blur-sm border-[1.5px] border-indigo-200/80 hover:border-[#4F46E5] rounded-2xl p-3.5 transition-all shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_20px_rgba(79,70,229,0.12)] group cursor-pointer relative overflow-hidden flex items-center justify-between"
                              whileHover={{ scale: 1.015, x: 3 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* Shimmer sweep animation effect on hover */}
                              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 pointer-events-none" />

                              <div className="relative z-10 flex-1 pr-3 break-words">
                                <span className="inline-block px-2 py-0.5 mr-1.5 rounded-md bg-indigo-50 group-hover:bg-indigo-100 text-[#4338CA] group-hover:text-[#4F46E5] text-[11px] font-mono font-bold uppercase tracking-wider border border-indigo-200/60 transition-colors">
                                  {item.prefix}
                                </span>
                                <span className="font-medium text-[#1E293B] group-hover:text-[#0F172A] text-[13px] leading-relaxed">
                                  {item.rest}
                                </span>
                              </div>

                              <div className="w-6 h-6 rounded-full bg-indigo-50/80 group-hover:bg-[#4F46E5] text-indigo-400 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-all duration-200 relative z-10 shadow-2xs">
                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      </div>

                      {/* Disclaimer Footer Note */}
                      <div className="pt-3.5 text-center relative z-10">
                        <p className="text-[12px] text-[#64748B] font-medium font-sans">
                          By chatting, you agree to this{' '}
                          <button
                            type="button"
                            onClick={() => setShowDisclaimer(!showDisclaimer)}
                            className="text-[#4338CA] hover:text-[#3730A3] font-semibold underline underline-offset-2 decoration-indigo-300 hover:decoration-indigo-600 transition-colors cursor-pointer"
                          >
                            disclaimer
                          </button>
                          .
                        </p>

                        {/* Inline Disclaimer Popover */}
                        <AnimatePresence>
                          {showDisclaimer && (
                            <motion.div
                              className="mt-2.5 p-3.5 bg-white/95 border border-indigo-100 rounded-2xl text-left text-[11.5px] text-[#334155] leading-relaxed shadow-md backdrop-blur-sm"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              KMK AI formulation guidance represents initial food science R&D principles. Production batches require certified benchtop verification, shelf-life challenge tests, and FSSAI jurisdiction sign-off by KMK's food technologists.
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ) : (
                    /* CONVERSATION FEED STATE */
                    <div className="p-4 space-y-4 pb-6 relative z-10">
                      {messages.map((msg) => (
                        <div key={msg.id} className="space-y-3">
                          {/* Visitor Message Bubble (Pure White Text, Perfect Padding, Never Clips) */}
                          {msg.sender === 'visitor' ? (
                            <motion.div
                              className="flex justify-end w-full"
                              initial={{ opacity: 0, y: 10, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ type: 'spring', damping: 22, stiffness: 350 }}
                            >
                              <div className="max-w-[85%] bg-gradient-to-r from-[#4338CA] via-[#4F46E5] to-[#6366F1] !text-white rounded-2xl rounded-tr-xs px-4.5 py-3 shadow-md border border-indigo-400/30">
                                <p className="text-[13.5px] font-medium leading-relaxed !text-white break-words m-0 select-text font-sans">
                                  {msg.content}
                                </p>
                              </div>
                            </motion.div>
                          ) : (
                            /* Assistant Response Message */
                            <motion.div
                              className="space-y-3 w-full"
                              initial={{ opacity: 0, y: 12, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ type: 'spring', damping: 24, stiffness: 350 }}
                            >
                              <div className="flex gap-2.5 justify-start items-start">
                                {/* Bot avatar icon with futuristic gradient ring */}
                                <motion.div
                                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4338CA] via-[#4F46E5] to-[#7C3AED] text-white shadow-md flex items-center justify-center flex-shrink-0 self-start mt-0.5 ring-2 ring-indigo-200/80"
                                  initial={{ rotate: -20, scale: 0.8 }}
                                  animate={{ rotate: 0, scale: 1 }}
                                  transition={{ type: 'spring', stiffness: 400 }}
                                >
                                  <Sparkles className="w-4 h-4 text-white drop-shadow-xs" />
                                </motion.div>

                                {/* Clean Light Theme High-Tech Assistant Card */}
                                <div className="flex-1 max-w-[89%] bg-white rounded-2xl rounded-tl-xs border-[1.5px] border-indigo-200/90 shadow-[0_6px_24px_rgba(79,70,229,0.08),0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden relative">
                                  {/* Luminescent Top Neon Hairline Accent */}
                                  <div className="h-1 w-full bg-gradient-to-r from-[#4F46E5] via-[#6366F1] via-[#818CF8] to-[#A855F7]" />

                                  {/* AI Identity & Metadata Header Bar (Light Theme) */}
                                  <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-indigo-100/90 bg-gradient-to-r from-indigo-50/70 via-[#F8FAFC] to-purple-50/50">
                                    <div className="flex items-center gap-2">
                                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse" />
                                      <span className="font-bold text-[12.5px] text-[#0F172A] tracking-tight font-sans">
                                        KMK Food Science AI
                                      </span>
                                      {msg.category && (
                                        <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[9.5px] font-mono font-bold tracking-wider uppercase bg-white text-[#4338CA] border border-indigo-200 shadow-2xs">
                                          {msg.category}
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10.5px] text-[#64748B] font-mono font-medium">
                                      {new Date(msg.timestamp).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </span>
                                  </div>

                                  <div className="p-3.5 space-y-3">
                                    {/* Mobile category badge */}
                                    {msg.category && (
                                      <div className="sm:hidden -mt-1 mb-1">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9.5px] font-mono font-bold uppercase tracking-wider bg-white text-[#4338CA] border border-indigo-200 shadow-2xs">
                                          <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
                                          {msg.category}
                                        </span>
                                      </div>
                                    )}

                                    {/* Main Content Rendered in High-Contrast Slate */}
                                    <div className="select-text text-[#1E293B] text-[13.5px] leading-relaxed">
                                      {renderContent(msg.content)}
                                    </div>

                                    {/* Clean Light Theme Technical Parameters & Specs Lab Dock */}
                                    {msg.parameters && msg.parameters.length > 0 && (
                                      <div className="mt-3.5 rounded-xl bg-gradient-to-br from-indigo-50/70 via-[#F8FAFC] to-purple-50/50 p-3.5 border-[1.5px] border-indigo-200/80 shadow-2xs relative overflow-hidden">
                                        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-indigo-100">
                                          <div className="flex items-center gap-1.5">
                                            <span className="text-sm">🧪</span>
                                            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#3730A3]">
                                              Formulation Specs & Pilot Metrics
                                            </span>
                                          </div>
                                          <span className="text-[9.5px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300/80 px-2 py-0.5 rounded-full font-bold shadow-2xs">
                                            ✓ Benchtop Verified
                                          </span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1.5">
                                          {msg.parameters.map((param, pIdx) => (
                                            <div
                                              key={pIdx}
                                              className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-indigo-100/90 shadow-2xs hover:border-indigo-300 transition-colors"
                                            >
                                              <span className="text-[#334155] font-sans text-[12px] font-medium">
                                                {param.label}
                                              </span>
                                              <span className="font-mono font-bold text-[#312E81] text-[11.5px] bg-indigo-50 text-[#4338CA] px-2.5 py-0.5 rounded-md border border-indigo-200/80 shadow-2xs">
                                                {param.value}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Verified R&D Sources Badges (Light Theme) */}
                                    {msg.sources && msg.sources.length > 0 && (
                                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                                        <span className="text-[10.5px] font-mono font-bold text-[#64748B] uppercase tracking-wider mr-1">
                                          Verified Sources:
                                        </span>
                                        {msg.sources.map((src, sIdx) => (
                                          <Link
                                            key={sIdx}
                                            to={src.url}
                                            onClick={() => setIsOpen(false)}
                                            className="inline-flex items-center gap-1.5 text-[11px] text-[#4338CA] hover:text-[#312E81] font-semibold bg-indigo-50/80 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200/80 shadow-2xs transition-all hover:scale-102"
                                          >
                                            <span>{src.title}</span>
                                            <ExternalLink className="w-3 h-3 text-[#6366F1]" />
                                          </Link>
                                        ))}
                                      </div>
                                    )}

                                    {/* Cool Action Toolbar on Responses (Light Theme) */}
                                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                                      <div className="flex items-center gap-2">
                                        <motion.button
                                          onClick={() => copyToClipboard(msg.id, msg.content)}
                                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-[#334155] hover:text-[#0F172A] font-medium transition-colors cursor-pointer border border-slate-200 shadow-2xs"
                                          title="Copy response"
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                          {copiedId === msg.id ? (
                                            <>
                                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                                              <span className="text-emerald-700 font-mono font-semibold">Copied!</span>
                                            </>
                                          ) : (
                                            <>
                                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                                              <span>Copy</span>
                                            </>
                                          )}
                                        </motion.button>

                                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                                          <Link
                                            to="/contact"
                                            onClick={() => setIsOpen(false)}
                                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#4338CA] to-[#6366F1] text-white font-bold shadow-xs hover:shadow-sm transition-all"
                                          >
                                            <Calendar className="w-3.5 h-3.5 text-indigo-200" />
                                            <span>Book Trial</span>
                                          </Link>
                                        </motion.div>
                                      </div>

                                      {msg.latencyMs > 0 && (
                                        <span className="text-[10.5px] text-[#64748B] font-mono font-medium">
                                          ⚡ {(msg.latencyMs / 1000).toFixed(2)}s RAG
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* SEPARATE BUBBLE FOR EACH SUGGESTED QUESTION */}
                              {msg.followUps && msg.followUps.length > 0 && (
                                <div className="pl-10.5 pr-2 space-y-2 mt-2 w-full">
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
                                    <span className="text-[11px] font-mono font-bold text-[#4338CA] tracking-wider uppercase">
                                      Suggested Questions:
                                    </span>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    {msg.followUps.map((fu, idx) => (
                                      <motion.button
                                        key={idx}
                                        onClick={() => handleSend(fu)}
                                        className="w-full text-left bg-white/95 hover:bg-gradient-to-r hover:from-indigo-50/90 hover:to-purple-50/70 text-[#1E293B] hover:text-[#4338CA] border-[1.5px] border-indigo-200/90 hover:border-[#4F46E5] rounded-2xl px-4 py-2.5 text-[12.5px] font-medium shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 cursor-pointer group"
                                        whileHover={{ scale: 1.015, x: 3 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <div className="flex items-center gap-2.5 flex-1 pr-2">
                                          <span className="w-5 h-5 rounded-full bg-indigo-100 text-[#4338CA] group-hover:bg-[#4F46E5] group-hover:text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 transition-colors shadow-2xs">
                                            ?
                                          </span>
                                          <span className="leading-snug">{fu}</span>
                                        </div>
                                        <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                                      </motion.button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </div>
                      ))}

                      {/* Loading State with Staggered Bouncing Dots */}
                      {loading && (
                        <motion.div
                          className="flex gap-2.5 items-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4338CA] to-[#6366F1] text-white shadow-xs flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-white/95 border border-indigo-100 rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2 shadow-2xs">
                            <div className="flex items-center gap-1.5">
                              <motion.span
                                className="w-2 h-2 rounded-full bg-[#4F46E5]"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                              />
                              <motion.span
                                className="w-2 h-2 rounded-full bg-[#4F46E5]"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                              />
                              <motion.span
                                className="w-2 h-2 rounded-full bg-[#4F46E5]"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                              />
                            </div>
                            <span className="text-xs text-[#475569] font-mono ml-1 font-medium">
                              KMK AI is formulating response...
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* Error State */}
                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-2.5 rounded-xl text-xs flex items-center gap-2 font-medium">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* Bottom Action Dock (Visible when in conversation mode) */}
                {messages.length > 0 && (
                  <motion.div
                    className="px-4 py-2.5 bg-white/95 backdrop-blur-md flex items-center justify-between flex-shrink-0 border-t border-indigo-100 relative z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#4338CA] hover:text-[#312E81] bg-indigo-50/90 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200/80 transition-all cursor-pointer shadow-2xs"
                      whileHover={{ scale: 1.03, x: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Choose Another Question</span>
                    </motion.button>

                    <div className="text-[11px] text-[#64748B] font-medium font-sans">
                      KMK Food Science AI
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

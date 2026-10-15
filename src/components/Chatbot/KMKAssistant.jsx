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
  MoreVertical,
  Smile,
  Clock,
  Sparkles,
  Volume2,
  VolumeX,
  MessageCircle,
  ChevronRight,
  Copy,
  Check,
  Calendar,
  Layers,
  FlaskConical,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { sendChatMessage, resetSessionId } from '../../services/chatService';

// Advanced interactive question cards for the welcome hero
const ADVANCED_CAPABILITY_CARDS = [
  {
    id: 'dairy',
    category: 'dairy',
    icon: '🥛',
    badge: 'Dairy Science',
    title: 'Dairy & RTD Milks',
    desc: 'UHT thermal profiles, anti-sedimentation & zero-syneresis curd set',
    prompt: 'Tell me about your dairy beverage and curd capabilities.',
  },
  {
    id: 'icecream',
    category: 'icecream',
    icon: '🍦',
    badge: 'Cryogenics',
    title: 'Ice Cream & Meltdown',
    desc: 'Overrun mass-flow control & chewable inclusions at -18°C',
    prompt: 'Can you stabilize ice cream inclusions and overrun?',
  },
  {
    id: 'sugarfree',
    category: 'sugarfree',
    icon: '🌿',
    badge: 'Clean Label',
    title: 'Sugar-Free & Stevia',
    desc: 'Reb-M sweetener modulation & suspended fruit cell systems',
    prompt: 'Do you formulate sugar-free beverages with stevia or monk fruit?',
  },
  {
    id: 'pilot',
    category: 'pilot',
    icon: '🔬',
    badge: 'Pilot R&D',
    title: 'Pilot Plant & Scale-Up',
    desc: '500-bar homogenization, continuous freezing & extrusion trials',
    prompt: 'What pilot plant facilities and homogenizers do you operate?',
  },
  {
    id: 'fssai',
    category: 'fssai',
    icon: '🛡️',
    badge: 'Quality & FSSAI',
    title: 'FSSAI Compliance & AST',
    desc: 'Accelerated stability chambers (AST) & water activity (aw) control',
    prompt: 'What are your FSSAI compliance and shelf life procedures?',
  },
  {
    id: 'technologist',
    category: 'consult',
    icon: '👨‍🔬',
    badge: 'Senior Advisory',
    title: 'Senior Technologist Desk',
    desc: 'Consult 1-on-1 with Senior Technologist Manivvannan A (20+ yrs)',
    prompt: 'How can I connect with Senior Technologist Manivvannan A for project consulting?',
  },
];

// Quick category filter pills
const FILTER_TABS = [
  { id: 'all', label: '✨ All Areas' },
  { id: 'dairy', label: '🥛 Dairy' },
  { id: 'icecream', label: '🍦 Ice Cream' },
  { id: 'sugarfree', label: '🌿 Sugar-Free' },
  { id: 'pilot', label: '🔬 Pilot Lab' },
  { id: 'fssai', label: '🛡️ FSSAI' },
];

export default function KMKAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      isWelcome: true,
      content:
        'Hi there! Welcome to KMK Enterprises. How may our Food Science & R&D team support your formulation or pilot trials today?',
      options: ADVANCED_CAPABILITY_CARDS,
      sources: [],
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen, loading]);

  // Handle escape key
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
    setMenuOpen(false);

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
    setMessages([
      {
        id: 'welcome_reset',
        sender: 'assistant',
        isWelcome: true,
        content:
          'Hi there! Welcome to KMK Enterprises. How may our Food Science & R&D team support your formulation or pilot trials today?',
        options: ADVANCED_CAPABILITY_CARDS,
        sources: [],
        timestamp: new Date(),
      },
    ]);
    setError(null);
    setMenuOpen(false);
  };

  // Filtered capability cards
  const filteredOptions =
    activeTab === 'all'
      ? ADVANCED_CAPABILITY_CARDS
      : ADVANCED_CAPABILITY_CARDS.filter((card) => card.category === activeTab);

  // Clean formatted content renderer
  const renderContent = (content) => {
    if (!content) return null;
    const paragraphs = content.split('\n\n');

    return (
      <div className="space-y-2.5">
        {paragraphs.map((p, pIdx) => {
          const lines = p.split('\n');
          return (
            <div key={pIdx} className="space-y-1.5">
              {lines.map((line, lIdx) => {
                const trimmed = line.trim();
                if (!trimmed) return null;

                // Bullet point with glowing royal dot
                if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                  const text = trimmed.replace(/^[•-]\s*/, '');
                  return (
                    <div key={lIdx} className="flex items-start gap-2 pl-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A68F8] flex-shrink-0 mt-2 shadow-[0_0_6px_rgba(26,104,248,0.6)]" />
                      <span className="flex-1">{renderInline(text)}</span>
                    </div>
                  );
                }

                // Numbered list item
                const numMatch = trimmed.match(/^(\d+)\.\s*(.+)/);
                if (numMatch) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2 pl-0.5">
                      <span className="w-4 h-4 rounded-full bg-blue-50 text-[#1A68F8] font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-200">
                        {numMatch[1]}
                      </span>
                      <span className="flex-1">{renderInline(numMatch[2])}</span>
                    </div>
                  );
                }

                return <p key={lIdx}>{renderInline(trimmed)}</p>;
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
          <strong key={i} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-[74px] right-4 md:bottom-[96px] md:right-8 z-[9995]">
          <motion.button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-[#1A68F8] text-white shadow-[0_8px_25px_rgba(26,104,248,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer relative group"
            aria-label="Open KMK Chat Assistant"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            <MessageCircle className="w-7 h-7 text-white fill-white/20" />
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22C55E] border-2 border-white"></span>
            </span>

            {/* Hover Tooltip */}
            <span className="absolute right-16 bg-slate-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md hidden sm:block">
              Chat with KMK Food Tech Assistant
            </span>
          </motion.button>
        </div>
      )}

      {/* Floating Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-x-3 bottom-3 top-16 md:inset-auto md:bottom-6 md:right-8 md:w-[410px] md:h-[620px] md:max-h-[88vh] z-[100000] bg-white rounded-3xl shadow-[0_22px_55px_rgba(0,0,0,0.2)] border border-slate-200/90 flex flex-col overflow-hidden font-sans"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="KMK Assistant Chat"
          >
            {/* Header Card (BotPenguin style with premium polish) */}
            <div className="m-3 p-3.5 bg-gradient-to-r from-[#175CD3] via-[#1A68F8] to-[#2563EB] text-white rounded-2xl flex items-center justify-between shadow-sm relative flex-shrink-0">
              <div className="flex items-center gap-2.5">
                {/* 3 Layered Team Avatars */}
                <div className="flex items-center relative -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white overflow-hidden flex items-center justify-center text-xs font-bold text-slate-700 shadow-xs">
                    👨‍🔬
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white overflow-hidden flex items-center justify-center text-xs font-bold text-blue-700 shadow-xs">
                    👩‍🔬
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#0E3D96] border-2 border-white overflow-hidden flex items-center justify-center text-white shadow-xs relative">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  {/* Green status indicator */}
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-[#1A68F8] absolute -bottom-0.5 -right-0.5" />
                </div>

                {/* Title & Status */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-[15px] text-white leading-tight">KMK AI Food Lab</h3>
                    <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-white text-[9px] font-mono font-semibold">
                      v2.5
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-blue-100/95 font-medium mt-0.5">
                    <Clock className="w-3 h-3 inline-block" />
                    <span>Agent reply within a minute</span>
                  </div>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1 relative">
                {/* 3-dots Menu Button */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  aria-label="More options"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {/* Dropdown Options */}
                {menuOpen && (
                  <div className="absolute right-8 top-8 w-48 bg-white text-slate-700 rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 text-xs">
                    <button
                      onClick={handleReset}
                      className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span>Reset conversation</span>
                    </button>
                    <button
                      onClick={() => {
                        setSoundEnabled(!soundEnabled);
                        setMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                    >
                      {soundEnabled ? (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Mute sounds</span>
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                          <span>Enable sounds</span>
                        </>
                      )}
                    </button>
                    <a
                      href="https://wa.me/919876543210?text=Hello%20KMK%20Enterprises%2C%20I%20would%20like%20to%20consult%20on%20food%20technology."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-emerald-600 font-semibold cursor-pointer border-t border-slate-100 mt-1 pt-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Technologist</span>
                    </a>
                  </div>
                )}

                {/* White Circular Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full bg-white text-[#1A68F8] flex items-center justify-center hover:bg-blue-50 transition-colors shadow-xs cursor-pointer ml-1"
                  aria-label="Close Chat"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Quick Sector Category Tabs Bar */}
            <div className="px-3 pb-2 pt-0.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0 border-b border-slate-100">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[#1A68F8] text-white shadow-xs font-semibold'
                      : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Messages Feed Body */}
            <div className="flex-1 overflow-y-auto px-3.5 py-2 space-y-4 bg-gradient-to-b from-[#F8FAFC]/50 via-white to-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Bot circular icon on the left */}
                  {msg.sender === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#1A68F8] flex-shrink-0 self-start mt-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#1A68F8]" />
                    </div>
                  )}

                  <div
                    className={`text-[13.5px] leading-relaxed ${
                      msg.sender === 'visitor'
                        ? 'max-w-[82%] bg-[#1A68F8] text-white rounded-2xl rounded-tr-xs px-4 py-2.5 font-medium shadow-xs'
                        : 'max-w-[88%] bg-[#F7F9FC] text-slate-800 rounded-2xl rounded-tl-xs overflow-hidden border border-slate-200/80 shadow-xs'
                    }`}
                  >
                    {/* Welcome Card & Advanced Option Cards Deck */}
                    {msg.isWelcome ? (
                      <div className="p-3.5 space-y-3">
                        {/* Welcome text */}
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-900 text-[13.5px]">
                            👋 Welcome to KMK Enterprises
                          </p>
                          <p className="text-slate-600 text-xs leading-relaxed">
                            Formulation R&D, pilot plant scaling, and FSSAI shelf-life certification led by Senior Technologist <strong>Manivvannan A</strong>.
                          </p>
                          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider pt-1">
                            Select a formulation sector to inspect:
                          </p>
                        </div>

                        {/* Advanced Capability Cards Deck */}
                        <div className="space-y-2 pt-1">
                          {filteredOptions.map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => handleSend(opt.prompt || opt.title)}
                              className="w-full text-left bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-[#1A68F8]/50 rounded-xl p-2.5 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-xs group cursor-pointer flex items-center justify-between gap-2.5"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                {/* Thematic Icon Badge */}
                                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 group-hover:bg-blue-50 transition-all">
                                  {opt.icon}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <h4 className="font-bold text-[13px] text-slate-900 group-hover:text-[#1A68F8] transition-colors truncate">
                                      {opt.title}
                                    </h4>
                                    <span className="text-[9px] font-mono text-[#1A68F8] bg-blue-50 px-1.5 py-0.2 rounded font-semibold flex-shrink-0">
                                      {opt.badge}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 leading-tight">
                                    {opt.desc}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1A68F8] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Regular Bot Response Card */
                      <div className="p-3.5 space-y-3">
                        {/* Domain Category Header Badge */}
                        {msg.category && (
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-[#1A68F8] border border-blue-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1A68F8] animate-pulse" />
                              {msg.category}
                            </span>
                          </div>
                        )}

                        {/* Formatted Content */}
                        <div className="text-[13px] text-slate-800 leading-relaxed">
                          {renderContent(msg.content)}
                        </div>

                        {/* Key Formulation Parameters Pill Bar */}
                        {msg.parameters && msg.parameters.length > 0 && (
                          <div className="p-2.5 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold block">
                              ⚙️ Technical Parameters & Specifications:
                            </span>
                            <div className="grid grid-cols-1 gap-1">
                              {msg.parameters.map((param, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="flex items-center justify-between py-0.5 px-2 bg-slate-50 rounded text-[11px]"
                                >
                                  <span className="text-slate-600 font-sans">{param.label}</span>
                                  <span className="font-mono font-bold text-slate-900 text-[10.5px]">
                                    {param.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Verified Technical Source Links */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="pt-2 border-t border-slate-200/70 flex flex-wrap gap-1.5">
                            {msg.sources.map((src, sIdx) => (
                              <Link
                                key={sIdx}
                                to={src.url}
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center gap-1 text-[11px] text-[#1A68F8] font-medium hover:underline bg-white px-2 py-0.5 rounded border border-slate-200"
                              >
                                <span>{src.title}</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* Contextual Smart Follow-Up Inquiries */}
                        {msg.followUps && msg.followUps.length > 0 && (
                          <div className="pt-2 border-t border-slate-200/70 space-y-1.5">
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                              💡 Related Follow-up Inquiries:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.followUps.map((fu, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSend(fu)}
                                  className="text-[11px] text-slate-700 bg-white hover:bg-blue-50 hover:text-[#1A68F8] border border-slate-200 hover:border-blue-300 rounded-lg px-2.5 py-1 transition-all text-left flex items-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-xs"
                                >
                                  <span className="text-[#1A68F8] font-bold">↳</span>
                                  <span>{fu}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Message Action Footer Toolbar */}
                        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => copyToClipboard(msg.id, msg.content)}
                              className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              title="Copy answer text"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-500" />
                                  <span className="text-emerald-600 font-mono text-[10px]">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>

                            <Link
                              to="/contact"
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1 text-[#1A68F8] font-bold hover:underline ml-1"
                            >
                              <Calendar className="w-3 h-3" />
                              <span>Book Trial</span>
                            </Link>
                          </div>

                          <span className="text-slate-400 text-[10px]">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Bot Typing State */}
              {loading && (
                <div className="flex gap-2.5 items-center">
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#1A68F8] flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-[#1A68F8]" />
                  </div>
                  <div className="bg-[#F7F9FC] border border-slate-200/80 rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#1A68F8] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#1A68F8] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#1A68F8] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-slate-500 font-mono ml-1">
                      Consulting food science models...
                    </span>
                  </div>
                </div>
              )}

              {/* Error Note */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-2.5 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Input Area */}
            <div className="px-3 pb-2 pt-1.5 bg-white flex flex-col gap-1.5 flex-shrink-0 border-t border-slate-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-1.5 pl-3.5 bg-slate-50/70 border border-slate-200 rounded-xl flex items-center justify-between shadow-xs focus-within:bg-white focus-within:border-[#1A68F8] focus-within:ring-2 focus-within:ring-blue-100 transition-all"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about dairy, ice cream, sugar-free, pilot trials..."
                  className="flex-1 text-[13px] text-slate-800 placeholder-slate-400 outline-none bg-transparent"
                  disabled={loading}
                  maxLength={500}
                />

                <div className="flex items-center gap-1.5 pr-1">
                  <Smile className="w-5 h-5 text-amber-500 cursor-pointer hover:scale-110 transition-transform" />

                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || loading}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      inputMessage.trim() && !loading
                        ? 'bg-[#1A68F8] text-white hover:bg-blue-600 cursor-pointer shadow-xs'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                    aria-label="Send Inquiry"
                  >
                    <Send className="w-3.5 h-3.5 translate-x-0.5" />
                  </button>
                </div>
              </form>

              {/* BotPenguin-style Clean Footer */}
              <div className="text-center text-[10.5px] text-slate-400 font-sans tracking-wide">
                KMK Enterprises Food Tech R&D ⚡ Led by Manivvannan A
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

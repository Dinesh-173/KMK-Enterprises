import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { sendChatMessage, resetSessionId } from '../../services/chatService';

const SUGGESTIONS = [
  'How do you formulate high-protein dairy beverages?',
  'What are your ice cream overrun stabilization capabilities?',
  'Do you formulate sugar-free beverages with stevia or monk fruit?',
  'What are your FSSAI compliance and shelf-life testing procedures?',
];

export default function KMKAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      content:
        'Hello! I am the KMK Enterprises AI Food Technology Assistant.\n\n' +
        'How can our food science team support your formulation, pilot trials, or product scaling today?',
      sources: [
        { title: 'Core Sectors', url: '/industries' },
        { title: 'Pilot R&D', url: '/research' },
      ],
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
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);

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
        content: 'Conversation cleared. How can KMK Enterprises assist with your food formulation today?',
        sources: [],
        timestamp: new Date(),
      },
    ]);
    setError(null);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-26 right-6 md:right-8 z-[9990]">
        {!isOpen && (
          <motion.button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-royal-primary text-white shadow-card hover:bg-royal-mid transition-all duration-300 border border-royal-light/40 group cursor-pointer"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open KMK AI Assistant"
          >
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center relative">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-[11px] font-mono tracking-wider uppercase block text-blue-100 font-bold">
                Food Tech AI
              </span>
              <span className="text-xs font-bold leading-tight block">
                Ask KMK Assistant
              </span>
            </div>
          </motion.button>
        )}
      </div>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed z-[9995] bg-white border border-[#EAE5D9] shadow-2xl overflow-hidden flex flex-col transition-all duration-300
              ${
                isMinimized
                  ? 'bottom-26 right-6 md:right-8 w-80 h-16 rounded-2xl'
                  : 'bottom-4 md:bottom-20 right-2 md:right-8 w-[95vw] md:w-[440px] max-w-[450px] h-[85vh] md:h-[620px] max-h-[660px] rounded-3xl'
              }`}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            role="dialog"
            aria-label="KMK Food Science Assistant"
          >
            {/* Top Accent Strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-royal-primary via-royal-mid to-royal-bright flex-shrink-0" />

            {/* Header */}
            <div className="bg-[#FAF9F6] p-4 border-b border-[#EAE5D9] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-royal-primary text-white flex items-center justify-center shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-navy">KMK AI Assistant</h3>
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <p className="text-[10px] font-mono text-silver-dark uppercase tracking-wider">
                    Food Science & R&D Team
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 text-slate-500 hover:text-navy hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                  aria-label={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 text-slate-500 hover:text-navy hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-navy hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Chat Area (Hidden if minimized) */}
            {!isMinimized && (
              <>
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/70">
                  {/* Notification badge notice */}
                  <div className="bg-royal-subtle/70 border border-blue-200/80 rounded-xl p-2.5 flex items-center gap-2 text-royal-primary text-[11px] font-medium">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                    <span>Every inquiry directly notifies our technical leadership via Email & WhatsApp.</span>
                  </div>

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${msg.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'assistant' && (
                        <div className="w-7 h-7 rounded-lg bg-royal-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[82%] rounded-2xl p-3.5 text-xs md:text-sm leading-relaxed ${
                          msg.sender === 'visitor'
                            ? 'bg-royal-primary text-white rounded-tr-xs shadow-xs'
                            : 'bg-[#FAF9F6] text-navy border border-[#EAE5D9] rounded-tl-xs shadow-xs'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.content}</p>

                        {/* Source citations */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-slate-200/80">
                            <span className="text-[10px] font-mono text-silver-dark uppercase tracking-wider block mb-1.5">
                              Verified References:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.sources.map((src, idx) => (
                                <Link
                                  key={idx}
                                  to={src.url}
                                  onClick={() => setIsOpen(false)}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-royal-primary hover:border-royal-primary text-[10px] font-mono font-bold transition-all"
                                >
                                  {src.title}
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        <span
                          className={`text-[9px] block text-right mt-1.5 ${
                            msg.sender === 'visitor' ? 'text-blue-200' : 'text-slate-400'
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      {msg.sender === 'visitor' && (
                        <div className="w-7 h-7 rounded-lg bg-navy text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {loading && (
                    <div className="flex gap-2.5 items-center">
                      <div className="w-7 h-7 rounded-lg bg-royal-primary text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-[#FAF9F6] border border-[#EAE5D9] rounded-2xl rounded-tl-xs p-3 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-royal-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-royal-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-royal-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span className="text-[11px] text-silver-dark font-mono ml-2">Consulting knowledge base...</span>
                      </div>
                    </div>
                  )}

                  {/* Error state */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestions Pills */}
                {messages.length <= 2 && (
                  <div className="px-4 py-2 bg-[#FAF9F6] border-t border-[#EAE5D9] flex flex-wrap gap-1.5 flex-shrink-0">
                    <span className="w-full text-[10px] font-mono text-silver-dark uppercase tracking-wider">
                      Popular Questions:
                    </span>
                    {SUGGESTIONS.map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(suggestion)}
                        className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-royal-primary hover:text-royal-primary text-text-body transition-colors cursor-pointer"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Area */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="p-3 bg-white border-t border-[#EAE5D9] flex items-center gap-2 flex-shrink-0"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about formulation, pilot trials, or testing..."
                    className="flex-1 bg-[#FAF9F6] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-navy focus:outline-none focus:border-royal-primary placeholder:text-slate-400"
                    disabled={loading}
                    maxLength={500}
                  />

                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || loading}
                    className="w-10 h-10 rounded-xl bg-royal-primary text-white flex items-center justify-center hover:bg-royal-mid disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-btn flex-shrink-0 cursor-pointer"
                    aria-label="Send Message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Bottom Footer Note */}
                <div className="px-4 py-1.5 bg-[#FAF9F6] border-t border-slate-100 flex items-center justify-between text-[10px] text-silver-dark font-mono flex-shrink-0">
                  <span>KMK R&D Guidance</span>
                  <Link to="/contact" onClick={() => setIsOpen(false)} className="text-royal-primary font-bold hover:underline">
                    Schedule Trial →
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Sparkles, Send } from 'lucide-react';

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Services', id: 'services' },
  { label: 'Experience', id: 'experience' },
  { label: 'Reviews', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSec, setActiveSec] = useState('');

  // Scroll level tracking for top thin progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracker
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSec(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSec = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Thin Top Glowing Page Scroll Meter */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary z-[9999] origin-left shadow-[0_1px_10px_#00E5FF]"
        style={{ scaleX }}
      />

      {/* 2. Floating Navbar Container */}
      <header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 select-none ${
          scrolled
            ? 'py-4 bg-[#050816]/75 backdrop-blur-md border-b border-white/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Brand with Cyber Dot */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group font-display font-bold text-lg text-white cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-xs text-brand-primary font-mono group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-brand-bg transition-all duration-300 shadow-[0_0_10px_rgba(0,229,255,0.1)]">
              NK
            </div>
            <span className="tracking-wide">
              Nuzhat<span className="text-brand-primary animate-pulse">.</span>
            </span>
          </button>

          {/* Desktop Navigation Link Dock */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSec === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => scrollToSec(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all duration-300 relative group cursor-pointer ${
                    isActive ? 'text-brand-primary font-bold' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Glowing micro-dot below active item */}
                  {isActive && (
                    <motion.span
                      layoutId="activeDot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_#00E5FF]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA Header Action trigger */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              id="nav-cta-collab"
              onClick={() => scrollToSec('contact')}
              className="group px-4 py-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20 hover:border-brand-primary/50 text-xs font-mono font-bold text-brand-primary flex items-center gap-2 transition-all duration-300 hover:bg-brand-primary hover:text-brand-bg shadow-inner cursor-pointer"
            >
              Collab
              <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile responsive toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            id="mobile-nav-toggle"
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/8 text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile slide drawer navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav-drawer"
              className="lg:hidden fixed inset-x-0 top-[65px] bg-[#050816]/95 backdrop-blur-lg border-b border-white/5 shadow-2xl overflow-hidden z-[998]"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-6 flex flex-col gap-4 font-mono text-xs">
                {navItems.map((item) => {
                  const isActive = activeSec === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-item-${item.id}`}
                      onClick={() => scrollToSec(item.id)}
                      className={`py-2 text-left border-b border-white/5 font-semibold cursor-pointer ${
                        isActive ? 'text-brand-primary' : 'text-brand-muted hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                <button
                  id="mobile-nav-cta-collab"
                  onClick={() => scrollToSec('contact')}
                  className="w-full text-center py-3 mt-4 rounded-xl bg-brand-primary text-brand-bg font-sans font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  Start Collab Project
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

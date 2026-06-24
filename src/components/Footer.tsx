import { Github, Linkedin, Twitter, Sparkles, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSec = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="relative bg-[#02040a] border-t border-white/5 py-16 px-4 sm:px-6 md:px-12 w-full overflow-hidden select-none">
      
      {/* Decorative Grid Line Accent */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
      
      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Brand details */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-start">
            <button
              onClick={handleScrollTop}
              className="flex items-center gap-2 font-display font-bold text-lg text-white mb-4 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-xs text-brand-primary font-mono shadow-[0_0_10px_rgba(0,229,255,0.1)]">
                NK
              </div>
              <span className="tracking-wide text-white">
                Nuzhat<span className="text-brand-primary">.</span>
              </span>
            </button>
            <p className="text-xs text-brand-muted leading-relaxed max-w-sm mb-6 font-sans">
              Award-winning digital portfolio of Nuzhat Kaunain. Building next-generation high-concurrency web applications, interactive 2.5D visualizers, and SaaS solutions.
            </p>
            <div className="flex items-center gap-3 text-brand-primary/80 font-mono text-[10px]">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
              <span>STABILIZED ON PROD CONTAINER</span>
            </div>
          </div>

          {/* Column 2: Quick Index Navigation links */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-start">
            <span className="text-[10px] font-mono text-white/50 block uppercase tracking-widest mb-4">PORTAL DIRECTORY</span>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 font-sans text-xs text-brand-muted">
              <button onClick={() => scrollToSec('hero')} className="hover:text-brand-primary text-left transition-colors cursor-pointer">00 / Top Home</button>
              <button onClick={() => scrollToSec('about')} className="hover:text-brand-primary text-left transition-colors cursor-pointer">01 / Story</button>
              <button onClick={() => scrollToSec('skills')} className="hover:text-brand-primary text-left transition-colors cursor-pointer">02 / Expertise</button>
              <button onClick={() => scrollToSec('projects')} className="hover:text-brand-primary text-left transition-colors cursor-pointer">03 / Bento Craft</button>
              <button onClick={() => scrollToSec('services')} className="hover:text-brand-primary text-left transition-colors cursor-pointer">04 / Services</button>
              <button onClick={() => scrollToSec('experience')} className="hover:text-brand-primary text-left transition-colors cursor-pointer">05 / Timeline</button>
              <button onClick={() => scrollToSec('testimonials')} className="hover:text-brand-primary text-left transition-colors cursor-pointer">06 / Reviews</button>
              <button onClick={() => scrollToSec('contact')} className="hover:text-brand-primary text-left transition-colors cursor-pointer">07 / Contact</button>
            </div>
          </div>

          {/* Column 3: Scroll Top Trigger Action */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-start md:items-end">
            <span className="text-[10px] font-mono text-white/50 block uppercase tracking-widest mb-4">RESET PERSPECTIVE</span>
            <button
              onClick={handleScrollTop}
              id="footer-scroll-top-btn"
              className="group px-4 py-2.5 rounded-xl bg-white/3 border border-white/8 hover:border-brand-primary/30 text-xs font-mono font-bold text-brand-muted hover:text-white flex items-center gap-2 transition-all duration-300 hover:bg-white/10 cursor-pointer"
            >
              <span>Back To Zenith</span>
              <ArrowUp className="w-4 h-4 text-brand-primary group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Divider and copyright bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-brand-muted">
          <div>
            © 2026 {portfolioData.personalInfo.name}. Designed & Engineered with 100% performance.
          </div>
          <div className="flex items-center gap-4">
            <a href={portfolioData.personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">GITHUB</a>
            <div className="w-[1px] h-3 bg-white/10" />
            <a href={portfolioData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">LINKEDIN</a>
            <div className="w-[1px] h-3 bg-white/10" />
            <a href={portfolioData.personalInfo.twitter} target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">TWITTER</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

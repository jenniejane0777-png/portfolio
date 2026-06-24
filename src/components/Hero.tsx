import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Terminal, Code, Cpu, Sparkles, ChevronRight, Play } from 'lucide-react';
import { portfolioData } from '../data';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth spring mouse tracking
  const xSpring = useSpring(0, { stiffness: 100, damping: 25 });
  const ySpring = useSpring(0, { stiffness: 100, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates from -0.5 to 0.5
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
    xSpring.set(x);
    ySpring.set(y);
  };

  const handleMouseLeave = () => {
    xSpring.set(0);
    ySpring.set(0);
  };

  // Parallax transformations for separate layers (Background, Middle, Foreground, Text)
  // Background moves very slightly in opposite direction
  const bgTranslateX = useTransform(xSpring, [-0.5, 0.5], [15, -15]);
  const bgTranslateY = useTransform(ySpring, [-0.5, 0.5], [15, -15]);

  // Middle layer (Laptop) tilts on 3D axes
  const midRotateX = useTransform(ySpring, [-0.5, 0.5], [12, -12]);
  const midRotateY = useTransform(xSpring, [-0.5, 0.5], [-15, 15]);
  const midTranslateX = useTransform(xSpring, [-0.5, 0.5], [-10, 10]);
  const midTranslateY = useTransform(ySpring, [-0.5, 0.5], [-10, 10]);

  // Foreground layers (Floating code windows) move faster for strong depth illusion
  const fg1TranslateX = useTransform(xSpring, [-0.5, 0.5], [-35, 35]);
  const fg1TranslateY = useTransform(ySpring, [-0.5, 0.5], [-35, 35]);
  
  const fg2TranslateX = useTransform(xSpring, [-0.5, 0.5], [45, -45]);
  const fg2TranslateY = useTransform(ySpring, [-0.5, 0.5], [45, -45]);

  // Particles drifts
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; scale: number; duration: number }>>([]);

  useEffect(() => {
    // Generate static particle offsets for background
    const initialParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      scale: Math.random() * 0.6 + 0.4,
      duration: Math.random() * 12 + 8
    }));
    setParticles(initialParticles);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#050816] flex items-center justify-center overflow-hidden py-24 px-4 sm:px-6 md:px-12 select-none"
    >
      {/* 1. Background Grid & Moving Lines */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-45 pointer-events-none"
        style={{
          backgroundPosition: 'center center'
        }}
      />

      {/* 2. Interactive Radial Cursor Glow (Behind elements) */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-500 blur-[130px]"
        style={{
          background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 229, 255, 0.15), rgba(124, 58, 237, 0.08), transparent 80%)`,
        }}
      />

      {/* 3. Deep Ambient Glow Spots */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none"
        style={{ x: bgTranslateX, y: bgTranslateY }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-brand-secondary/8 blur-[140px] pointer-events-none"
        style={{ x: bgTranslateX, y: bgTranslateY }}
      />

      {/* 4. Drifting star particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-brand-primary rounded-full opacity-30"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              scale: p.scale,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* 5. Central Layout Content Wrapper */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left: Text Elements Block */}
        <div id="hero-text-block" className="col-span-1 lg:col-span-6 flex flex-col justify-center text-left pointer-events-auto">
          {/* Creative Label Tag */}
          <motion.div
            className="inline-flex items-center gap-2 bg-brand-secondary/15 border border-brand-secondary/35 text-white text-xs px-3.5 py-1.5 rounded-full w-fit mb-6 shadow-[0_0_15px_rgba(124,58,237,0.2)] font-mono"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
            <span className="tracking-wide">AWWWARDS NOMINEE PORTFOLIO</span>
          </motion.div>

          {/* Majestic Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-none tracking-tight text-white mb-6">
            <motion.span
              className="block overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            >
              Crafting Modern
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary bg-clip-text text-transparent filter drop-shadow-[0_2px_15px_rgba(0,229,255,0.2)]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            >
              Digital Experiences
            </motion.span>
          </h1>

          {/* Precise Subheadline */}
          <motion.p
            className="text-brand-muted text-base sm:text-lg max-w-lg mb-8 leading-relaxed font-sans font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {portfolioData.personalInfo.subheadline}
          </motion.p>

          {/* Action Call Controls */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {/* Primary Magnetic/Glowing Button */}
            <button
              id="cta-hire-me"
              onClick={() => scrollToSection('contact')}
              className="group relative px-7 py-3.5 rounded-xl bg-brand-primary text-brand-bg font-sans font-bold text-sm tracking-wide overflow-hidden shadow-[0_4px_20px_rgba(0,229,255,0.4)] transition-all duration-300 hover:shadow-[0_4px_35px_rgba(0,229,255,0.65)] hover:scale-[1.03] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Hire Nuzhat Now
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              {/* Inner sliding gloss element */}
              <div className="absolute inset-0 bg-gradient-to-right from-brand-accent to-[#fff] opacity-0 group-hover:opacity-25 transition-opacity duration-300 -translate-x-full group-hover:translate-x-0 skew-x-12" />
            </button>

            {/* Secondary Glassmorphic Button */}
            <button
              id="cta-view-projects"
              onClick={() => scrollToSection('projects')}
              className="group px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary/30 text-white font-sans font-medium text-sm tracking-wide flex items-center gap-2 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-brand-primary fill-brand-primary group-hover:scale-110 transition-transform" />
              View Custom Projects
            </button>
          </motion.div>

          {/* Quick Metrics Tagline */}
          <motion.div
            className="flex items-center gap-6 mt-12 pt-8 border-t border-white/5 text-xs text-brand-muted font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div>
              <span className="text-white font-bold block text-lg font-display">2+ YRS</span>
              Experience
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-white font-bold block text-lg font-display">99+</span>
              Lighthouse Perf
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-white font-bold block text-lg font-display">100%</span>
              Client Success
            </div>
          </motion.div>
        </div>

        {/* Right: Immersive Interactive 2.5D Scene Area */}
        <div id="hero-3d-scene" className="col-span-1 lg:col-span-6 flex justify-center items-center relative min-h-[450px] sm:min-h-[550px] w-full mt-8 lg:mt-0 perspective-1000">
          
          {/* Depth Layer 1 (Background): Subtle glowing ring */}
          <motion.div
            className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-brand-primary/10 bg-gradient-to-b from-brand-primary/5 to-transparent flex items-center justify-center opacity-50 blur-[2px] pointer-events-none"
            style={{
              x: bgTranslateX,
              y: bgTranslateY,
              rotate: 45
            }}
          >
            <div className="w-[85%] h-[85%] rounded-full border border-dashed border-brand-secondary/15 animate-[spin_40s_linear_infinite]" />
          </motion.div>

          {/* Depth Layer 2 (Middle ground): Premium Glassmorphic Laptop Structure */}
          <motion.div
            className="relative w-[340px] sm:w-[460px] flex flex-col items-center select-none"
            style={{
              transformStyle: "preserve-3d",
              rotateX: midRotateX,
              rotateY: midRotateY,
              x: midTranslateX,
              y: midTranslateY,
            }}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The Screen (Chassis Lid) */}
            <div className="w-full aspect-[16/10] rounded-2xl bg-slate-950/90 border-2 border-slate-800 p-2.5 shadow-[0_30px_60px_rgba(0,0,0,0.8),_0_0_50px_rgba(0,229,255,0.05)] relative overflow-hidden flex flex-col">
              {/* Gloss Reflection Flare */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent -skew-y-12 origin-top-left pointer-events-none z-20" />
              
              {/* Screen Content Wrapper */}
              <div className="w-full h-full bg-[#030712] rounded-lg border border-slate-900 overflow-hidden flex flex-col relative">
                
                {/* Visual Header Grid Bar */}
                <div className="h-6 w-full bg-slate-950 px-3 flex items-center justify-between border-b border-slate-900 font-mono text-[8px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-slate-400">nuzhat_core_v6.ts</span>
                  <span className="text-brand-primary/80 font-bold">● LIVE</span>
                </div>

                {/* Main Screen Visualization Panel */}
                <div className="flex-1 p-3 flex flex-col justify-between font-mono text-[9px]">
                  {/* Mock dashboard state */}
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="glass-card rounded p-1.5 border-slate-900 bg-white/2">
                      <div className="text-[7px] text-brand-muted">API LOAD</div>
                      <div className="text-brand-primary text-[10px] font-bold">14ms</div>
                      <div className="h-1 w-full bg-slate-900 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-brand-primary w-4/5" />
                      </div>
                    </div>
                    <div className="glass-card rounded p-1.5 border-slate-900 bg-white/2">
                      <div className="text-[7px] text-brand-muted">RENDER</div>
                      <div className="text-brand-accent text-[10px] font-bold">60FPS</div>
                      <div className="h-1 w-full bg-slate-900 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-brand-accent w-11/12" />
                      </div>
                    </div>
                    <div className="glass-card rounded p-1.5 border-slate-900 bg-white/2">
                      <div className="text-[7px] text-brand-muted">SERVERS</div>
                      <div className="text-green-400 text-[10px] font-bold">ONLINE</div>
                      <div className="h-1 w-full bg-slate-900 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-green-400 w-[100%]" />
                      </div>
                    </div>
                  </div>

                  {/* Flow code lines in canvas center */}
                  <div className="my-2 p-2 rounded bg-slate-950/80 border border-slate-900/50 flex-1 overflow-hidden flex flex-col gap-0.5 justify-center leading-normal text-slate-300">
                    <div className="flex items-center text-brand-primary gap-1">
                      <Terminal className="w-3 h-3 text-brand-primary" />
                      <span>$ npm run dev --portfolio</span>
                    </div>
                    <div className="text-slate-500 font-bold text-[8px]">▶ compiles successfully inside 230ms</div>
                    <div className="text-brand-secondary font-bold text-[8px]">▶ binding reverse-proxy to Port 3000</div>
                    <div className="text-white mt-1">
                      const Developer = <span className="text-brand-primary">"Nuzhat"</span>;
                    </div>
                    <div className="text-slate-400">
                      core_skills: [<span className="text-brand-accent">"React"</span>, <span className="text-brand-accent">"Next"</span>, <span className="text-brand-accent">"Node"</span>]
                    </div>
                  </div>

                  {/* Foot bar */}
                  <div className="flex justify-between items-center text-[7px] text-slate-500 border-t border-slate-900/50 pt-1.5">
                    <span>Vite Server Active</span>
                    <span className="text-brand-secondary animate-pulse">● 2.5D Layer stabilized</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Base / Keyboard Deck */}
            <div className="w-[108%] h-3 bg-slate-800 rounded-b-lg border-x-2 border-b border-slate-700 shadow-[0_15px_30px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-12 h-0.5 bg-slate-950/40" />
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-14 h-1 bg-slate-950 rounded-full" /> {/* Notch */}
            </div>
            
            {/* Base Shadow Overlay */}
            <div className="w-[102%] h-4 bg-gradient-to-b from-black/80 to-transparent blur-[8px] -mt-1 opacity-80" />
          </motion.div>

          {/* Depth Layer 3 (Foreground Left): Interactive Code Terminal Floating Window */}
          <motion.div
            id="hero-floating-card-left"
            className="absolute left-[-20px] top-[15%] w-[190px] sm:w-[220px] glass-card p-3 rounded-xl border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.4)] z-30 font-mono text-[9px] pointer-events-none"
            style={{
              x: fg1TranslateX,
              y: fg1TranslateY,
              transformStyle: "preserve-3d",
              translateZ: "40px"
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
              <Code className="w-3.5 h-3.5 text-brand-primary" />
              <span className="text-white font-medium">FullStackSchema.ts</span>
            </div>
            <div className="space-y-1.5 leading-snug text-brand-muted">
              <div>
                <span className="text-brand-secondary">interface</span> <span className="text-white">Expert</span> {'{'}
              </div>
              <div className="pl-3">
                cleanCode: <span className="text-brand-primary">true</span>;
              </div>
              <div className="pl-3">
                speedLimit: <span className="text-brand-primary">"99+"</span>;
              </div>
              <div className="pl-3">
                reliability: <span className="text-green-400">"100%"</span>;
              </div>
              <div>{'}'}</div>
              <div className="text-[8px] text-brand-primary/80 font-bold border-t border-white/5 pt-1.5 mt-2 flex items-center justify-between">
                <span>EXPORT READY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
              </div>
            </div>
          </motion.div>

          {/* Depth Layer 4 (Foreground Right): Dynamic Tech Score Card */}
          <motion.div
            id="hero-floating-card-right"
            className="absolute right-[-10px] bottom-[15%] w-[170px] sm:w-[190px] glass-card p-3 rounded-xl border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.4)] z-30 pointer-events-none"
            style={{
              x: fg2TranslateX,
              y: fg2TranslateY,
              transformStyle: "preserve-3d",
              translateZ: "60px"
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
              <Cpu className="w-3.5 h-3.5 text-brand-accent animate-spin" />
              <span className="text-white font-medium font-mono text-[9px]">Aetherial Core</span>
            </div>
            <div className="text-center py-1">
              <div className="text-xs text-brand-muted font-sans">Lighthouse Perf</div>
              <div className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-green-400 drop-shadow-[0_0_12px_rgba(0,229,255,0.3)]">
                100%
              </div>
              <div className="text-[7px] text-brand-muted font-mono mt-1">✓ Core Web Vitals Passed</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 6. Subtle Bottom Mask Gradient to flow into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
    </div>
  );
}

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { User, ShieldCheck, Mail, Github, Linkedin, Cpu, CheckSquare } from 'lucide-react';
import { portfolioData } from '../data';

// Helper component for count-up animations
function CountUp({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const stepTime = Math.abs(Math.floor(totalMiliseconds / end));
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const [cardRotate, setCardRotate] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize to -15 to 15 degrees
    const rX = ((y / rect.height) - 0.5) * -20;
    const rY = ((x / rect.width) - 0.5) * 20;
    
    setCardRotate({ x: rX, y: rY });
  };

  const handleCardMouseLeave = () => {
    setCardRotate({ x: 0, y: 0 });
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 md:px-12 w-full bg-[#050816] overflow-hidden select-none"
    >
      {/* Decorative ambient background mesh */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16">
          <motion.div
            className="flex items-center gap-2 text-brand-primary text-xs font-mono font-bold tracking-wider uppercase mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            01 / STORY & OVERVIEW
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            About Nuzhat Kaunain
          </motion.h2>
          <div className="h-[2px] w-20 bg-brand-primary mt-4 rounded-full" />
        </div>

        {/* About Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Beautiful 3D Interactive Profile Passport ID Card */}
          <div className="col-span-1 lg:col-span-5 flex justify-center perspective-1000">
            <motion.div
              id="about-profile-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative w-full max-w-[340px] aspect-[1/1.4] rounded-2xl p-6 glass-card border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden cursor-pointer"
              style={{
                transform: `rotateX(${cardRotate.x}deg) rotateY(${cardRotate.y}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.15s ease-out"
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Card Hologram Line Shimmers */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-brand-secondary/5 opacity-50 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-60 animate-pulse" />

              {/* Card Header */}
              <div className="flex justify-between items-center font-mono text-[9px] text-brand-muted border-b border-white/5 pb-4">
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3 text-brand-primary" />
                  <span>IDENTITY RECORD</span>
                </div>
                <div className="flex items-center gap-1.5 text-green-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* Avatar Frame & Key Visual */}
              <div className="my-6 flex flex-col items-center">
                <div className="relative w-28 h-28 rounded-xl border border-white/10 p-1.5 overflow-hidden group shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary/20 to-brand-primary/20 opacity-40 z-10" />
                  
                  {/* Decorative corner brackets */}
                  <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-brand-primary" />
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-brand-primary" />
                  <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-brand-primary" />
                  <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-brand-primary" />

                  {/* Elegant High-Contrast Tech Avatar Placeholder (Abstract Generative Pattern) */}
                  <div className="w-full h-full bg-[#030712] rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full filter blur-md opacity-45 animate-pulse" />
                    <span className="text-3xl font-display font-bold text-white relative z-20 select-none">NK</span>
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-white mt-4 tracking-wide">
                  {portfolioData.personalInfo.name}
                </h3>
                <p className="text-xs text-brand-primary font-mono mt-1 uppercase tracking-wider">
                  Full Stack Developer
                </p>
              </div>

              {/* Quick Metadata Details */}
              <div className="space-y-2 border-t border-white/5 pt-4 font-mono text-[9px] text-brand-muted">
                <div className="flex justify-between">
                  <span>SPECIALIZATION:</span>
                  <span className="text-white">UX / ARCHITECT</span>
                </div>
                <div className="flex justify-between">
                  <span>PRIMARY REGION:</span>
                  <span className="text-white">GLOBAL FREELANCE</span>
                </div>
                <div className="flex justify-between">
                  <span>SECURE KEY:</span>
                  <span className="text-brand-accent">NK_CORE_v6.14</span>
                </div>
              </div>

              {/* Contact Socials Strip inside Passport */}
              <div className="flex justify-center items-center gap-4 mt-5 pt-3 border-t border-white/5">
                <a
                  href={`mailto:${portfolioData.personalInfo.email}`}
                  id="about-social-mail"
                  className="p-1.5 rounded bg-white/5 text-brand-muted hover:text-brand-primary hover:bg-white/10 transition-colors"
                  title="Mail Nuzhat"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={portfolioData.personalInfo.github}
                  id="about-social-github"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded bg-white/5 text-brand-muted hover:text-brand-primary hover:bg-white/10 transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={portfolioData.personalInfo.linkedin}
                  id="about-social-linkedin"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded bg-white/5 text-brand-muted hover:text-brand-primary hover:bg-white/10 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Detailed Story & Animated Statistics */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center">
            
            {/* Story Paragraphs */}
            <motion.div
              className="text-brand-muted text-base leading-relaxed space-y-6 mb-12"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p>
                Hello! I am <strong className="text-white font-medium">Nuzhat Kaunain</strong>, a passionate, multi-disciplinary Full Stack Web Developer and Freelancer. Over the past 2 years, I’ve refined my craftsmanship by engineering production-ready web applications, client portals, and interactive digital interfaces that run at perfect speeds.
              </p>
              <p>
                My philosophy is simple: <strong className="text-brand-primary font-medium">Design is not just what it looks like; it is how it works under high load.</strong> I bridge the gap between creative visual artistry (using robust Framer Motion micro-animations) and enterprise-grade backend infrastructure (by designing performant database schemas, secure API gateways, and robust cloud services).
              </p>
              
              {/* Highlight Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-white font-mono font-medium">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-brand-primary" />
                  <span>Interactive 2.5D Experience</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-brand-secondary" />
                  <span>Robust Backend Services</span>
                </div>
              </div>
            </motion.div>

            {/* Statistics Row (With Interactive CountUp Component) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/5">
              {portfolioData.personalInfo.stats.map((stat, idx) => (
                <motion.div
                  key={stat.id}
                  id={`stat-box-${stat.id}`}
                  className="flex flex-col text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                >
                  <div className="text-3xl sm:text-4xl font-display font-bold text-brand-primary mb-1">
                    <CountUp target={stat.target} />
                    <span className="text-brand-accent font-medium">+</span>
                  </div>
                  <div className="text-xs text-brand-muted leading-tight font-sans">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

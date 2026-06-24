import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'motion/react';
import { Briefcase, Calendar, Sparkles, Milestone } from 'lucide-react';
import { portfolioData } from '../data';

// Individual milestone card rendering
function MilestoneCard({ item, index }: { item: typeof portfolioData.milestones[0]; index: number; key?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  // Stagger alternating layout (even index left, odd index right)
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      id={`experience-milestone-${item.id}`}
      className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-16 md:mb-24 last:mb-0 ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* 1. Desktop Stretched Space Spacer to force staggering */}
      <div className="hidden md:block w-[45%]" />

      {/* 2. Interactive Centered Icon Node on vertical rail */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-brand-bg border-2 border-brand-primary/50 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-transform duration-300 hover:scale-110">
        <Briefcase className="w-3.5 h-3.5 text-brand-primary" />
      </div>

      {/* 3. The Interactive Milestone Content Card */}
      <motion.div
        className="w-[90%] md:w-[45%] ml-12 md:ml-0 p-6 rounded-2xl glass-card border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:border-brand-primary/25 transition-all duration-300 group cursor-pointer"
        whileHover={{ y: -5, scale: 1.01 }}
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/2 via-transparent to-brand-secondary/2 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

        {/* Year Label and Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 font-mono text-[10px]">
          <span className="flex items-center gap-1.5 text-brand-primary font-bold bg-brand-primary/10 px-2.5 py-1 rounded-full">
            <Calendar className="w-3 h-3" />
            {item.year}
          </span>
          <span className="text-brand-muted font-bold tracking-widest uppercase">
            {item.company}
          </span>
        </div>

        <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
          {item.title}
        </h3>
        
        <p className="text-xs text-brand-muted leading-relaxed font-sans mb-5 font-normal">
          {item.description}
        </p>

        {/* Highlight tags */}
        <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
          {item.tags.map(tag => (
            <span key={tag} className="text-[9px] font-mono text-white/40 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  // Scroll tracking to draw a glowing vertical progress line down the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 md:px-12 w-full bg-[#050816] overflow-hidden select-none"
    >
      {/* Ambient backgrounds */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-20 md:items-center md:text-center">
          <motion.div
            className="flex items-center gap-2 text-brand-primary text-xs font-mono font-bold tracking-wider uppercase mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            05 / TRACK RECORD
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Milestone Career Timeline
          </motion.h2>
          <div className="h-[2px] w-20 bg-brand-primary mt-4 rounded-full md:mx-auto" />
        </div>

        {/* Timeline Structure Area */}
        <div className="relative w-full max-w-5xl mx-auto mt-16">
          
          {/* A. Background Neutral Track Rail */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 bottom-2 w-[2px] bg-white/5 z-0 rounded-full" />

          {/* B. Glowing Interactive Progress Rail Line */}
          <motion.div
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-brand-primary via-brand-accent to-brand-secondary origin-top z-10 rounded-full shadow-[0_0_15px_#00E5FF]"
            style={{ scaleY }}
          />

          {/* C. Render Milestones Alternating loop */}
          <div className="relative z-20 flex flex-col w-full">
            {portfolioData.milestones.map((milestone, index) => (
              <MilestoneCard key={milestone.id} item={milestone} index={index} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

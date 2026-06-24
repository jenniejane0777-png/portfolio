import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ExternalLink, Github, Sparkles, Code2, Heart, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data';
import { Project } from '../types';

// Interactive 3D Card Wrapper with Cursor Spotlight
function ProjectCard3D({ project, index }: { project: Project; index: number; key?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize mouse coords from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Calculate rotation angle coefficients (Max 12 degrees)
    const rotateX = y * -12;
    const rotateY = x * 12;

    // Calculate spotlight percentage position
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlow({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Bento width mappings
  const colSpans = {
    large: "lg:col-span-8 md:col-span-12 col-span-12",
    medium: "lg:col-span-6 md:col-span-12 col-span-12",
    small: "lg:col-span-4 md:col-span-12 col-span-12"
  };

  return (
    <motion.div
      ref={cardRef}
      id={`project-bento-card-${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className={`relative rounded-3xl overflow-hidden glass-card border-white/5 shadow-[0_20px_45px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-brand-primary/20 flex flex-col justify-between group ${colSpans[project.size]} cursor-pointer`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out, border-color 0.3s ease"
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* 1. Dynamic Cursor Shimmer Spotlight Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle 220px at ${glow.x}% ${glow.y}%, rgba(0, 229, 255, 0.12), rgba(124, 58, 237, 0.05), transparent 70%)`
        }}
      />

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none" />

      {/* 2. Visual Layout splits */}
      <div className="grid grid-cols-1 md:grid-cols-12 h-full">
        
        {/* Left Side (or full for smaller structures): Text Data */}
        <div className={`p-6 flex flex-col justify-between ${project.size === 'large' ? 'md:col-span-5' : 'md:col-span-12'} z-20`}>
          <div>
            {/* Project Metrics pill */}
            {project.metrics && (
              <span className="inline-flex items-center gap-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-[9px] px-2.5 py-1 rounded-full mb-4 font-bold uppercase">
                <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                {project.metrics}
              </span>
            )}

            <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
              {project.title}
            </h3>
            
            <p className="text-xs text-brand-muted leading-relaxed font-sans font-normal mb-6">
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech tag loops */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="text-[9px] font-mono text-white/50 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>

            {/* Core Action triggers */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              <a
                href={project.liveUrl}
                id={`project-${project.id}-live`}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-brand-primary hover:text-white transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LIVE DEMO</span>
              </a>
              <a
                href={project.githubUrl}
                id={`project-${project.id}-github`}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-brand-muted hover:text-brand-primary transition-colors cursor-pointer"
              >
                <Github className="w-3.5 h-3.5" />
                <span>SOURCE CODE</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side (visual preview canvas) */}
        {project.size === 'large' && (
          <div className="md:col-span-7 h-60 md:h-auto relative overflow-hidden bg-gradient-to-l from-brand-secondary/15 to-transparent flex items-center justify-center p-6 border-t md:border-t-0 md:border-l border-white/5">
            <div className="relative w-full aspect-video rounded-xl border border-white/10 overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.4)] group-hover:scale-[1.03] group-hover:border-brand-primary/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bg/80 opacity-50 z-10" />
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Mini active floating grid visualization overlay */}
              <div className="absolute top-3 right-3 bg-brand-bg/80 backdrop-blur border border-white/10 px-2 py-1 rounded text-[8px] font-mono text-white flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                ONLINE VIEW
              </div>
            </div>
          </div>
        )}

        {project.size !== 'large' && (
          <div className="md:col-span-12 h-44 relative overflow-hidden bg-gradient-to-t from-brand-secondary/10 to-transparent flex items-end justify-center px-4 border-t border-white/5">
            <div className="relative w-[90%] h-[90%] rounded-t-xl border-x border-t border-white/10 overflow-hidden shadow-inner group-hover:translate-y-1 transition-all duration-500">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              />
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 md:px-12 w-full bg-[#050816] overflow-hidden select-none"
    >
      {/* Decorative blurred background shapes */}
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-secondary/5 blur-[120px] pointer-events-none" />

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
            03 / CURATED CRAFT
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Featured Digital Craft
          </motion.h2>
          <div className="h-[2px] w-20 bg-brand-primary mt-4 rounded-full" />
        </div>

        {/* Bento Grid layout wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard3D key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Dynamic CTA at grid bottom */}
        <div className="flex justify-center mt-16">
          <motion.a
            id="view-all-projects-btn"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/3 border border-white/10 hover:border-brand-primary/40 text-xs font-mono font-bold text-white tracking-widest transition-all duration-300 hover:bg-brand-primary/5 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            EXPLORE COMPLETE REPOSITORIES
            <ArrowRight className="w-4 h-4 text-brand-primary group-hover:translate-x-1.5 transition-transform" />
          </motion.a>
        </div>

      </div>
    </section>
  );
}

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { portfolioData } from '../data';
import { Service } from '../types';

// Dynamic icon resolver
function ServiceIcon({ name }: { name: string }) {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <LucideIcons.Layers className="w-5 h-5 text-brand-primary" />;
  return <IconComponent className="w-5 h-5 text-brand-primary group-hover:scale-110 group-hover:text-brand-accent transition-all duration-300" />;
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 md:px-12 w-full bg-[#050816] overflow-hidden select-none"
    >
      {/* Visual glowing meshes */}
      <div className="absolute top-[20%] right-[-5%] w-[450px] h-[450px] rounded-full bg-brand-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-5%] w-[450px] h-[450px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />

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
            04 / CORE UTILITIES
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Futuristic Web Services
          </motion.h2>
          <div className="h-[2px] w-20 bg-brand-primary mt-4 rounded-full" />
        </div>

        {/* 2.5D Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.services.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group relative rounded-2xl p-6 glass-card border-white/5 hover:border-brand-primary/20 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)] glow-border-hover cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Spotlight background shimmers */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Floating Icon Frame inside Card */}
                  <div className="relative w-11 h-11 rounded-xl bg-white/3 border border-white/8 flex items-center justify-center mb-6 group-hover:bg-brand-primary/5 group-hover:border-brand-primary/20 shadow-inner group-hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all duration-300">
                    <ServiceIcon name={service.iconName} />
                    {/* Ring decoration */}
                    <div className="absolute inset-0 rounded-xl border border-dashed border-brand-primary/0 group-hover:border-brand-primary/10 group-hover:animate-spin" style={{ animationDuration: '8s' }} />
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed font-sans font-normal mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Specific bullets highlighted inside card */}
                <div className="border-t border-white/5 pt-5 mt-auto">
                  <ul className="space-y-2.5 font-sans text-[11px] text-brand-muted">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 group-hover:text-white transition-colors">
                        <span className="text-brand-primary font-bold mt-0.5 font-mono">✦</span>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subtle digital bottom barcode layout element for agency polish */}
                <div className="absolute bottom-2 right-4 opacity-5 group-hover:opacity-15 transition-opacity duration-300 font-mono text-[7px] text-white">
                  SERVICE_MD_v6.14
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

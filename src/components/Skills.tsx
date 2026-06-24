import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Layout, Server, Settings, Zap } from 'lucide-react';
import { portfolioData } from '../data';
import { Skill } from '../types';

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState<'all' | 'Frontend' | 'Backend' | 'Tools'>('all');

  // Filter skills based on chosen tab
  const filteredSkills = activeTab === 'all' 
    ? portfolioData.skills 
    : portfolioData.skills.filter(s => s.category === activeTab);

  const categories = [
    { id: 'all', name: 'All Stack Technologies', icon: Zap },
    { id: 'Frontend', name: 'Frontend Engineering', icon: Layout },
    { id: 'Backend', name: 'Backend & Cloud', icon: Server },
    { id: 'Tools', name: 'DevOps & Tools', icon: Settings },
  ];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 md:px-12 w-full bg-[#050816] overflow-hidden select-none"
    >
      {/* Visual background lines and accents */}
      <div className="absolute top-[20%] left-[-5%] w-[450px] h-[450px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[450px] h-[450px] rounded-full bg-brand-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="flex flex-col">
            <motion.div
              className="flex items-center gap-2 text-brand-primary text-xs font-mono font-bold tracking-wider uppercase mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
              02 / COGNITIVE ENGINE
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Technical Expertise
            </motion.h2>
            <div className="h-[2px] w-20 bg-brand-primary mt-4 rounded-full" />
          </div>

          {/* Interactive Navigation Switcher */}
          <div className="flex flex-wrap gap-2.5 max-w-full">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`skill-tab-${cat.id}`}
                  onClick={() => setActiveTab(cat.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-brand-bg shadow-[0_4px_15px_rgba(0,229,255,0.3)]'
                      : 'bg-white/5 text-brand-muted border border-white/5 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2.5D Layered Interactive Bento Grid of Skills */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
          transition={{ duration: 0.4 }}
        >
          {filteredSkills.map((skill, idx) => {
            return (
              <motion.div
                key={skill.name}
                id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="group relative rounded-2xl p-5 glass-card border-white/5 hover:border-brand-primary/20 flex flex-col justify-between overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] glow-border-hover cursor-pointer"
                layout
                whileHover={{ y: -6, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {/* Dynamic Mouse-Follow Glow emulation */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 100px at 50% 50%, ${skill.color}25, transparent 75%)`
                  }}
                />

                <div className="flex items-center justify-between mb-4">
                  {/* Technology Label */}
                  <span className="text-white font-display font-semibold text-sm tracking-wide">
                    {skill.name}
                  </span>
                  {/* Category Pill */}
                  <span className="text-[9px] font-mono text-brand-primary px-2 py-0.5 rounded-full bg-brand-primary/5 border border-brand-primary/10">
                    {skill.category}
                  </span>
                </div>

                {/* Performance Progress Meter */}
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono mb-2 text-brand-muted">
                    <span>PROFICIENCY</span>
                    <span className="font-bold text-white">{skill.proficiency}%</span>
                  </div>
                  
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                      className="absolute left-0 top-0 h-full rounded-full bg-brand-primary"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.proficiency}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Visual subtle micro-mesh inside cards */}
                <div className="absolute bottom-2 right-2 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

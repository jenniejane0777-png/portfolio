import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { portfolioData } from '../data';

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  // Duplicate items to ensure uninterrupted seamless scrolling inside marquee
  const doubleTestimonials = [...portfolioData.testimonials, ...portfolioData.testimonials];

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative py-28 w-full bg-[#050816] overflow-hidden select-none"
    >
      {/* Visual glowing elements */}
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 md:items-center md:text-center">
          <motion.div
            className="flex items-center gap-2 text-brand-primary text-xs font-mono font-bold tracking-wider uppercase mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            06 / WORD OF MOUTH
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Global Client Testimonials
          </motion.h2>
          <div className="h-[2px] w-20 bg-brand-primary mt-4 rounded-full md:mx-auto" />
        </div>
      </div>

      {/* 2. Seamless Marquee Carousel Container */}
      <div id="testimonials-marquee-scroller" className="relative flex w-full overflow-hidden mt-12 py-4 group">
        
        {/* Left and right fade gradient overlays for deep elegant focus */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#050816] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#050816] to-transparent z-20 pointer-events-none" />

        {/* The Marquee Row - Slides continuously. Animates smoothly on GPU. Pauses on hover. */}
        <div className="flex gap-6 animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap">
          {doubleTestimonials.map((test, index) => (
            <div
              key={`${test.id}-${index}`}
              id={`testimonial-marquee-card-${test.id}-${index}`}
              className="inline-block w-[320px] sm:w-[380px] p-6 rounded-2xl glass-card border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:border-brand-primary/20 transition-all duration-300 relative select-none cursor-pointer flex-shrink-0"
            >
              {/* Card Sparkle Shimmer Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/2 via-transparent to-brand-secondary/2 opacity-30 pointer-events-none rounded-2xl" />

              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-6 text-brand-primary/10">
                <Quote className="w-8 h-8 fill-brand-primary/5" />
              </div>

              {/* Stars rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: test.rating }).map((_, sIdx) => (
                  <Star key={sIdx} className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" />
                ))}
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6 whitespace-normal font-sans font-normal italic">
                "{test.comment}"
              </p>

              {/* Author Details Block */}
              <div className="flex items-center gap-3.5 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-slate-900 shadow-inner">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-display font-bold text-white tracking-wide">
                    {test.name}
                  </h4>
                  <p className="text-[10px] font-mono text-brand-primary uppercase tracking-wider">
                    {test.role} @ {test.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Embedded CSS for seamless keyframe marquee slide */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translate(0);
            transform: translateX(calc(-50% - 12px));
          }
        }
      `}</style>

    </section>
  );
}

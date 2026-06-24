import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CursorTrail() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the trailing ring
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const trailingX = useSpring(mouseX, springConfig);
  const trailingY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect mobile/tablet to avoid rendering custom cursor
    const isMobile = window.matchMedia("(max-width: 1024px)").matches || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
    
    if (isMobile) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Watch for hovered interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .project-card, .service-card, .skill-pill');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Set up hover tracking and check periodically for dynamic elements
    addHoverListeners();
    const interval = setInterval(addHoverListeners, 1500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(interval);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div id="custom-cursor-layer" className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Delayed Halo Ring */}
      <motion.div
        className="absolute w-8 h-8 rounded-full border border-brand-primary/50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: trailingX,
          y: trailingY,
          scale: isHovered ? 1.5 : isClicking ? 0.8 : 1,
          borderColor: isHovered ? '#7C3AED' : '#00E5FF',
          backgroundColor: isHovered ? 'rgba(124, 58, 237, 0.08)' : 'rgba(0, 229, 255, 0.02)',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {/* Subtle rotating inner dash */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full border border-dashed border-brand-primary/20 animate-spin" />
        )}
      </motion.div>

      {/* Cyber Cyan Precise Target Dot */}
      <motion.div
        ref={cursorRef}
        className="absolute w-2.5 h-2.5 bg-brand-primary rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_#00E5FF]"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isHovered ? 0.5 : isClicking ? 1.4 : 1,
          backgroundColor: isHovered ? '#7C3AED' : '#00E5FF',
        }}
      />
    </div>
  );
}

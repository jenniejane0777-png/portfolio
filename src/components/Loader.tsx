import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

const logs = [
  "LOADING CORE MODULES...",
  "ESTABLISHING 2.5D RENDERING SCHEMAS...",
  "STABILIZING AMBIENT GRADIENTS...",
  "INJECTING FRAMER PHYSICS ENGINE...",
  "BOOTSTRAPPING NEURAL DESIGNS...",
  "SYSTEMS ONLINE. SECURE PROTOCOLS ACTIVE."
];

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIdx, setLogIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds loader
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const progressInterval = setInterval(() => {
      stepCount++;
      const currentProgress = Math.min(Math.round((stepCount / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(progressInterval);
        setIsDone(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, intervalTime);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIdx((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 350);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="loader-container"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050816] font-sans text-white select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Futuristic Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30" />
          
          {/* Radial Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[100px]" />
          
          <div className="relative flex flex-col items-center max-w-md w-full px-6">
            {/* Logo animation */}
            <motion.div
              id="loader-logo"
              className="relative w-24 h-24 mb-10 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Spinning tech border */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(0, 229, 255, 0.15)"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="3"
                  strokeDasharray="80 200"
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Middle spinning element */}
              <svg className="absolute w-16 h-16 animate-[spin_5s_linear_infinite_reverse]" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeDasharray="40 100"
                  strokeLinecap="round"
                />
              </svg>

              {/* Central Letter */}
              <span className="text-3xl font-display font-bold tracking-widest text-brand-primary drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">
                N
              </span>
            </motion.div>

            {/* Percentage Indicator */}
            <div className="text-center w-full">
              <div className="overflow-hidden h-[1px] w-full bg-white/10 rounded-full relative mb-4">
                <motion.div
                  id="loader-bar"
                  className="absolute top-0 left-0 h-full bg-gradient-to-right from-brand-primary to-brand-secondary"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs font-mono mb-6">
                <span className="text-brand-primary/80">SYSTEM COMPILING</span>
                <span className="text-brand-primary font-bold">{progress}%</span>
              </div>
            </div>

            {/* Dynamic Logs Stream */}
            <div className="w-full h-12 overflow-hidden flex flex-col justify-end font-mono text-[9px] text-brand-muted/70">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={logIdx}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-brand-primary font-bold">▶</span>
                  <span>{logs[logIdx]}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

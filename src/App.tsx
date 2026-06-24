import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Loader from './components/Loader';
import CursorTrail from './components/CursorTrail';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div id="portfolio-app-root" className="bg-[#050816] text-white selection:bg-brand-primary/30 selection:text-white min-h-screen relative font-sans">
      {/* 1. Custom Initial loading screen */}
      <Loader onComplete={() => setLoadingComplete(true)} />

      {/* 2. Global Cyber Custom Cursor Trail */}
      <CursorTrail />

      {/* 3. Main layout content wrapper (revealed after loading) */}
      <AnimatePresence>
        {loadingComplete && (
          <motion.div
            id="main-scroller-layout"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col w-full min-h-screen overflow-hidden"
          >
            {/* Ambient cyber line network lines backing whole canvas */}
            <div className="absolute inset-0 bg-radial-glow pointer-events-none z-0" />

            {/* Float Fixed Navbar */}
            <Navbar />

            {/* Fully responsive layout blocks */}
            <main className="flex-1 w-full flex flex-col z-10 relative">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Services />
              <Experience />
              <Testimonials />
              <Contact />
            </main>

            {/* Layout Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

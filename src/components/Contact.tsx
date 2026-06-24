import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle2, Sparkles, MessageSquareCode } from 'lucide-react';
import { portfolioData } from '../data';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic Validation
    if (!formState.name || !formState.email || !formState.message) {
      setErrorMessage('Please fill in all mandatory parameters.');
      return;
    }

    setIsSubmitting(true);

    // Simulate server ingestion (1.5 seconds)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 md:px-12 w-full bg-[#050816] overflow-hidden select-none"
    >
      {/* Visual glowing particle fields */}
      <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 md:items-center md:text-center">
          <motion.div
            className="flex items-center gap-2 text-brand-primary text-xs font-mono font-bold tracking-wider uppercase mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            07 / DATA TRANSMISSION
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Initiate Project Collaboration
          </h2>
          <div className="h-[2px] w-20 bg-brand-primary mt-4 rounded-full md:mx-auto" />
        </div>

        {/* Dual Pane Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-12">
          
          {/* Left Side: Creative Contact Details & Core Social Links */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
            <div>
              <div className="flex items-center gap-2.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-mono font-bold px-3 py-1 rounded-full w-fit mb-6">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>FREELANCE CONTRACTS ACTIVE</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Let's Build Something Premium
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed font-sans font-normal mb-8">
                Whether you're looking to engineer a robust full-stack dashboard, design a high-converting landing page, or create an immersive 2.5D visual showcase—I am ready to consult, scope, and deliver top-tier systems.
              </p>

              {/* Specific Contact metrics */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-950/40 border border-white/5 group hover:border-brand-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-bg transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-brand-muted uppercase block leading-none mb-1">Inquiries Email</span>
                    <a href={`mailto:${portfolioData.personalInfo.email}`} id="contact-email-link" className="text-sm font-sans font-medium text-white hover:text-brand-primary transition-colors">
                      {portfolioData.personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-950/40 border border-white/5 group hover:border-brand-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-brand-secondary/10 flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-all duration-300">
                    <MessageSquareCode className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-brand-muted uppercase block leading-none mb-1">Response Speed</span>
                    <span className="text-sm font-sans font-medium text-white">
                      Guaranteed within 12 hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social profiles strip */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <span className="text-[10px] font-mono text-brand-muted block uppercase tracking-widest mb-4">CONNECT SECURE CHANNELS</span>
              <div className="flex items-center gap-3">
                <a
                  href={portfolioData.personalInfo.github}
                  id="contact-social-github"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 hover:border-brand-primary/30 text-brand-muted hover:text-brand-primary flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={portfolioData.personalInfo.linkedin}
                  id="contact-social-linkedin"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 hover:border-brand-primary/30 text-brand-muted hover:text-brand-primary flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={portfolioData.personalInfo.twitter}
                  id="contact-social-twitter"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 hover:border-brand-primary/30 text-brand-muted hover:text-brand-primary flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Glow Form or Success validation Screen */}
          <div className="col-span-1 lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.3)] relative min-h-[480px] overflow-hidden flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  id="inquiry-form"
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Name Input */}
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-[10px] font-mono text-brand-muted uppercase tracking-wider mb-2">
                      Full Identity Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Satoshi Nakamoto"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/5 focus:border-brand-primary/40 focus:outline-none text-sm text-white placeholder-white/20 transition-colors focus:shadow-[0_0_15px_rgba(0,229,255,0.08)]"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-[10px] font-mono text-brand-muted uppercase tracking-wider mb-2">
                      Secure Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. user@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/5 focus:border-brand-primary/40 focus:outline-none text-sm text-white placeholder-white/20 transition-colors focus:shadow-[0_0_15px_rgba(0,229,255,0.08)]"
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="flex flex-col">
                    <label htmlFor="subject" className="text-[10px] font-mono text-brand-muted uppercase tracking-wider mb-2">
                      Topic Subject (Optional)
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Custom Web App Scoping"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/5 focus:border-brand-primary/40 focus:outline-none text-sm text-white placeholder-white/20 transition-colors focus:shadow-[0_0_15px_rgba(0,229,255,0.08)]"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-[10px] font-mono text-brand-muted uppercase tracking-wider mb-2">
                      Collaboration Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Describe your goals, tech expectations, or timeline requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/5 focus:border-brand-primary/40 focus:outline-none text-sm text-white placeholder-white/20 transition-colors focus:shadow-[0_0_15px_rgba(0,229,255,0.08)] resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="text-xs text-red-400 font-mono mt-2 flex items-center gap-1.5">
                      <span>▶</span> {errorMessage}
                    </div>
                  )}

                  {/* Submission Control */}
                  <button
                    type="submit"
                    id="submit-inquiry-btn"
                    disabled={isSubmitting}
                    className="w-full group py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-brand-bg font-sans font-bold text-sm tracking-widest uppercase shadow-[0_4px_20px_rgba(0,229,255,0.25)] hover:shadow-[0_4px_30px_rgba(124,58,237,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-brand-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        TRANSMITTING PARAMETERS...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        SECURELY TRANSMIT DETAILS
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  id="inquiry-success-block"
                  className="flex flex-col items-center justify-center text-center p-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-brand-primary/15 flex items-center justify-center text-brand-primary mb-6 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>

                  <h3 className="text-2xl font-display font-bold text-white mb-3">
                    Inquiry Securely Transmitted!
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed max-w-sm mb-8 font-sans">
                    Your project details have bypassed external layers and arrived in Nuzhat Kaunain's main queue. Expect a custom callback within 12 hours.
                  </p>

                  <button
                    onClick={() => setIsSuccess(false)}
                    id="submit-another-inquiry"
                    className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary/30 text-xs font-mono font-bold text-white tracking-wider hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    SEND ANOTHER STREAM
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

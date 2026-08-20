import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Words combining Role & Pillars with comfortable timing & creamy scrapbook tones
const INTRO_WORDS = [
  { text: "DESIGNER", label: "01", bg: "bg-accent-pink", textCol: "text-ink-black" },
  { text: "DEVELOPER", label: "02", bg: "bg-accent-blue", textCol: "text-ink-black" },
  { text: "STORIES", label: "03", bg: "bg-accent-yellow", textCol: "text-ink-black" },
  { text: "MUSIC", label: "04", bg: "bg-accent-mint", textCol: "text-ink-black" },
  { text: "AESTHETICS", label: "05", bg: "bg-accent-lavender", textCol: "text-ink-black" },
  { text: "TECHNOLOGY", label: "06", bg: "bg-accent-peach", textCol: "text-ink-black" }
];

export default function Loader({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < INTRO_WORDS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 800); // Slower readable pace (~800ms per word)
      return () => clearTimeout(timer);
    } else {
      // Pause on the final word before sweeping up
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 950);
      return () => clearTimeout(finishTimer);
    }
  }, [currentIndex, onComplete]);

  const currentItem = INTRO_WORDS[currentIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col justify-between items-center bg-[#fdf6e3] text-ink-black overflow-hidden p-6 md:p-12 select-none border-b-2 border-ink-black touch-none overscroll-none"
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Creamy Grid Notebook Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'linear-gradient(rgba(160, 160, 190, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(160, 160, 190, 0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* Top Header Info Bar */}
      <div className="w-full max-w-[1600px] flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-mint border-2 border-ink-black animate-pulse" />
          <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-ink-black uppercase">
            STUDIO INTRO
          </span>
        </div>
        <div className="font-mono text-xs md:text-sm font-bold text-ink-black bg-white px-3.5 py-1.5 rounded-md border-2 border-ink-black neo-shadow-sm">
          {currentItem.label} / 06
        </div>
      </div>

      {/* Center Snappy Typography & Badge Cycling */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto overflow-visible py-12 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.text}
            initial={{ y: 35, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -35, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 overflow-visible"
          >
            {/* Main Word styled in soft neobrutal badge */}
            <div 
              className={`px-6 py-3 sm:px-9 sm:py-4.5 rounded-2xl border-2 border-ink-black neo-shadow rotate-[-1deg] ${currentItem.bg} select-none`}
            >
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-7xl tracking-tight m-0 text-ink-black">
                {currentItem.text}
              </h1>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Footer Info */}
      <div className="w-full max-w-[1600px] flex items-center justify-between text-text-muted font-mono text-[11px] md:text-xs z-10 border-t-2 border-ink-black/15 pt-4">
        <span className="font-bold">© 2026 PRATAMA PUTRA</span>
        <span className="hidden sm:inline-block tracking-wider font-semibold">PORTFOLIO INITIATION</span>
        <span className="font-bold">CILACAP, ID</span>
      </div>
    </motion.div>
  );
}

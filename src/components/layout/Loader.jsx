import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Words combining Role & Pillars with comfortable timing & creamy scrapbook tones
const INTRO_WORDS = [
  { text: "UI / UX", label: "01", bg: "bg-sticker-pink" },
  { text: "FRONTEND", label: "02", bg: "bg-soft-blue" },
  { text: "BACKEND", label: "03", bg: "bg-pale-yellow" },
  { text: "NETWORK", label: "04", bg: "bg-lavender" },
  { text: "ENGINEERING", label: "05", bg: "bg-mint" }
];

export default function Loader({ onComplete }) {
  // 'words' | 'logo' | 'flying-up'
  const [phase, setPhase] = useState('words');
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Cycle through words (comfortable, readable ~680ms)
  useEffect(() => {
    if (phase !== 'words') return;

    if (currentIndex < INTRO_WORDS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 680);
      return () => clearTimeout(timer);
    } else {
      // Pause on final word before revealing center brand logo
      const finishTimer = setTimeout(() => {
        setPhase('logo');
      }, 700);
      return () => clearTimeout(finishTimer);
    }
  }, [currentIndex, phase]);

  // 2. Hold logo in center for ~950ms, then shoot only the logo up to hide
  useEffect(() => {
    if (phase !== 'logo') return;

    const logoTimer = setTimeout(() => {
      setPhase('flying-up');
    }, 950); // Display logo proud in center for ~950ms

    return () => clearTimeout(logoTimer);
  }, [phase]);

  // 3. When logo finishes flying up, call onComplete
  useEffect(() => {
    if (phase !== 'flying-up') return;

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 700);

    return () => clearTimeout(completeTimer);
  }, [phase, onComplete]);

  const currentItem = INTRO_WORDS[currentIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col justify-between items-center bg-[#fdf6e3] text-ink-black overflow-hidden p-6 md:p-12 select-none border-b-2 border-ink-black touch-none overscroll-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'flying-up' ? 0 : 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Creamy Grid Notebook Background matching exact website theme */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(160, 160, 190, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(160, 160, 190, 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
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
          {phase === 'words' ? `${currentItem.label} / 05` : '05 / 05'}
        </div>
      </div>

      {/* Center Stage: Words or Brand Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto overflow-visible py-12 px-4">
        {phase === 'words' ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.text}
              initial={{ y: 35, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -35, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
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
        ) : (
          /* Climax Phase: Logo appears in center, then only the logo flies UP off-screen to hide */
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 25 }}
            animate={
              phase === 'flying-up'
                ? { y: -window.innerHeight * 0.85, opacity: 0, scale: 0.6 }
                : { y: 0, opacity: 1, scale: 1 }
            }
            transition={{
              duration: phase === 'flying-up' ? 0.72 : 0.45,
              ease: phase === 'flying-up' ? [0.76, 0, 0.24, 1] : [0.16, 1, 0.3, 1]
            }}
            className="flex items-center gap-3 sm:gap-4 select-none cursor-default"
          >
            <div className="w-11 h-11 sm:w-14 sm:h-14 shrink-0">
              <img
                src="/favicon.svg"
                alt="Tama Polaroid Logo"
                className="w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>
            <span 
              className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-ink-black tracking-tight leading-none"
            >
              tama<span className="text-[#ff6b9d]">.</span>gallery
            </span>
          </motion.div>
        )}
      </div>

      {/* Bottom Footer Info */}
      <div className="w-full max-w-[1600px] flex items-center justify-between text-text-muted font-mono text-[11px] md:text-xs z-10 border-t-2 border-ink-black/15 pt-4">
        <span className="font-bold">© {new Date().getFullYear()} PRATAMA PUTRA</span>
        <span className="hidden sm:inline-block tracking-wider font-semibold">PORTFOLIO INITIATION</span>
        <span className="font-bold">CILACAP, ID</span>
      </div>
    </motion.div>
  );
}

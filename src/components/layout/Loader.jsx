import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Boot-up steps message log
const BOOT_STEPS = [
  "Initializing scrapbook engine...",
  "Unboxing polaroid photo stack...",
  "Sticking washi tape segments...",
  "Injecting pastel aesthetic vibes...",
  "Booting Tama's Gallery v2.0.26..."
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Increment progress simulating boot sequence
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 25); // ~2.5s total loading duration

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Maps progress milestones to boot text changes
    const stepSize = 100 / BOOT_STEPS.length;
    const currentStep = Math.min(
      Math.floor(progress / stepSize),
      BOOT_STEPS.length - 1
    );
    setStepIndex(currentStep);

    if (progress === 100) {
      // Small delay after reaching 100% before transition
      const timeout = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-primary overflow-hidden p-4"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -40,
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Retro desktop grid lines background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(160,160,190,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(160,160,190,0.12)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Y2K Scrapbook Sticker Decorations around the window */}
      <motion.div 
        className="absolute top-10 left-10 text-3xl hidden md:block"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        🌸
      </motion.div>
      <motion.div 
        className="absolute bottom-10 right-10 text-3xl hidden md:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        🌟
      </motion.div>

      {/* Retro OS Pop-up Dialog Window */}
      <motion.div
        className="w-full max-w-sm md:max-w-md bg-white border-2 border-text-dark rounded-sm shadow-[4px_4px_0px_#2d2d2d] flex flex-col z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Title bar */}
        <div className="bg-accent-lavender border-b-2 border-text-dark px-3 py-1.5 flex items-center justify-between font-display font-medium text-text-dark text-sm md:text-base select-none">
          <span>TAMA_BOOT_SYSTEM.EXE</span>
          <div className="flex gap-1">
            <button className="w-5 h-5 border border-text-dark bg-white rounded-sm text-xs font-bold leading-none flex items-center justify-center hover:bg-accent-pink active:translate-y-0.5">
              _
            </button>
            <button className="w-5 h-5 border border-text-dark bg-white rounded-sm text-xs font-bold leading-none flex items-center justify-center hover:bg-accent-pink active:translate-y-0.5">
              X
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="p-4 md:p-6 flex flex-col gap-4">
          {/* OS Icon & Status Message */}
          <div className="flex items-center gap-3">
            <span className="text-3xl select-none" role="img" aria-label="disk">💾</span>
            <div className="flex-1">
              <p className="font-display text-text-dark text-sm font-semibold">TAMA OS v2.0</p>
              <p className="font-body text-text-muted text-xs">Booting up interactive portfolio...</p>
            </div>
            <span className="font-display text-text-dark text-sm font-semibold">{progress}%</span>
          </div>

          {/* Loading Progress Bar (Pixel block style) */}
          <div className="w-full h-6 border-2 border-text-dark bg-bg-secondary p-0.5 rounded-sm overflow-hidden flex">
            <motion.div 
              className="bg-accent-pink h-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Desktop recommendation tip box */}
          <div className="border border-dashed border-text-muted bg-[var(--accent-yellow)]/30 p-2.5 rounded-sm flex items-start select-none">
            <p className="font-body text-[11px] leading-tight text-[var(--text-dark)]">
              <span className="font-semibold text-[var(--text-dark)]">System Tip:</span> Better use desktop mode for the best interactive scrapbook experience!
            </p>
          </div>

          {/* Console Log Message Area */}
          <div className="bg-bg-primary border border-text-dark p-3 rounded-sm font-body text-xs text-text-dark min-h-[4.5rem] flex flex-col justify-center gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-pulse" />
              <span className="font-medium text-text-muted">SYSTEM STATUS:</span>
            </div>
            <p className="font-mono text-text-dark animate-fade-in">
              {BOOT_STEPS[stepIndex]}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// src/components/birthday/OpeningScreen.jsx
// Honest & funny self-aware opening screen for /20 route

import { motion } from 'framer-motion'
import { birthdayMeta } from '../../data/birthday'

export default function OpeningScreen() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[55vh] text-center px-4 py-8 sm:py-12 relative select-none">
      {/* Top Washi Tape Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-1.5 bg-mint border-2 border-ink-black rounded-xs neo-shadow-sm mb-6 rotate-[-1.5deg] text-xs sm:text-sm font-mono font-bold text-ink-black tracking-widest uppercase"
        style={{
          clipPath: 'polygon(0% 10%, 4% 0%, 96% 5%, 100% 12%, 98% 88%, 94% 100%, 6% 95%, 0% 90%)'
        }}
      >
        🎉 EASTER EGG UNLOCKED • TAMA v{birthdayMeta.version}
      </motion.div>

      {/* Main Celebratory Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-ink-black tracking-tight max-w-4xl mb-6 uppercase leading-tight"
      >
        LET&apos;S CELEBRATE & SAY <span className="bg-sticker-pink px-3 py-0.5 rounded-lg border-2 border-ink-black neo-shadow inline-block rotate-1">HAPPY 20TH</span> TO TAMA! 🎂
      </motion.h1>

      {/* Sticky Note Quote Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-ink-black max-w-xl w-full text-center neo-shadow mb-8 rotate-[0.5deg] relative"
      >
        {/* Top Washi Tape */}
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 h-6 px-4 bg-pale-yellow border border-ink-black/40 rounded-xs neo-shadow-sm flex items-center justify-center text-[10px] font-mono font-bold text-ink-black tracking-wider"
          style={{ 
            clipPath: 'polygon(0% 5%, 3% 0%, 97% 4%, 100% 12%, 98% 88%, 95% 100%, 3% 95%, 0% 88%)',
            transform: 'translateX(-50%) rotate(-1deg)' 
          }}
        >
          ✨ CHAPTER 20
        </div>

        <p
          className="text-lg sm:text-2xl text-text-handwrite leading-relaxed m-0 font-medium"
          style={{ fontFamily: 'var(--font-handwrite)' }}
        >
          &ldquo;20 years of existing. <br />
          Still figuring things out, still becoming.&rdquo;
        </p>

        <div className="mt-4 pt-3 border-t border-ink-black/10 flex items-center justify-between text-xs font-mono font-semibold text-text-dark/70">
          <span>✨ CHAPTER 20 ARCHIVE</span>
          <span className="text-emerald-700 font-bold">● STABLE-ISH</span>
        </div>
      </motion.div>

      {/* Quick Jump Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-3 max-w-lg"
      >
        <button
          onClick={() => scrollTo('polaroid-dump')}
          className="px-4 py-2 bg-soft-blue hover:bg-[#9fe0ff] text-ink-black border-2 border-ink-black rounded-lg font-mono text-xs font-bold neo-shadow neo-shadow-hover transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>📸</span>
          <span>POLAROID DUMP</span>
        </button>
        <button
          onClick={() => scrollTo('system-specs')}
          className="px-4 py-2 bg-mint hover:bg-[#bef5b5] text-ink-black border-2 border-ink-black rounded-lg font-mono text-xs font-bold neo-shadow neo-shadow-hover transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>⚙️</span>
          <span>SYSTEM SPECS</span>
        </button>
        <button
          onClick={() => scrollTo('road-to-21')}
          className="px-4 py-2 bg-pale-yellow hover:bg-[#ffe999] text-ink-black border-2 border-ink-black rounded-lg font-mono text-xs font-bold neo-shadow neo-shadow-hover transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>💌</span>
          <span>TIME CAPSULE</span>
        </button>
      </motion.div>
    </div>
  )
}

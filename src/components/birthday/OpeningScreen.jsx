// src/components/birthday/OpeningScreen.jsx
// Honest & funny self-aware opening screen for /20 route

import { motion } from 'framer-motion'
import { birthdayMeta } from '../../data/birthday'

export default function OpeningScreen() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-12 relative select-none">
      {/* Tape Decoration */}
      <div
        className="h-4 w-24 bg-[var(--accent-mint)] opacity-70 border border-black/5 shadow-xs mb-8 rounded-[1px]"
        style={{
          clipPath: 'polygon(0% 10%, 4% 0%, 96% 5%, 100% 12%, 98% 88%, 94% 100%, 6% 95%, 0% 90%)',
          transform: 'rotate(-2deg)'
        }}
      />

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-3"
      >
        YOU FOUND IT • TAMA v{birthdayMeta.version}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display font-extrabold sm:font-bold text-[2.75rem] leading-[1.04] sm:text-5xl md:text-6xl text-[var(--text-dark)] tracking-tight max-w-3xl mb-6 uppercase"
      >
        LET&apos;S CELEBRATE AND SAY HAPPY BIRTHDAY TO TAMA! 🎉
      </motion.h1>

      {/* Quote Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 sm:p-8 rounded-sm border border-black/10 max-w-lg w-full text-center shadow-xs mb-4 rotate-[0.5deg] relative"
      >
        {/* Top Washi Tape */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-20 bg-[var(--accent-yellow)] opacity-80 rounded-[1px] border border-black/5"
          style={{ transform: 'rotate(-1deg)' }}
        />

        <p
          className="font-handwrite text-lg sm:text-xl text-[var(--text-dark)] leading-relaxed m-0"
          style={{ fontFamily: 'var(--font-handwrite)' }}
        >
          &ldquo;20 years of existing. <br />
          Still figuring things out, still becoming.&rdquo;
        </p>
      </motion.div>

    </div>
  )
}

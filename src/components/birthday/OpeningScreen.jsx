// src/components/birthday/OpeningScreen.jsx
// Minimal opening screen for /20 route

import { motion } from 'framer-motion'
import { birthdayMeta } from '../../data/birthday'

export default function OpeningScreen({ onEnterArchive }) {
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
        YOU FOUND IT.
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display font-semibold text-4xl sm:text-6xl text-[var(--text-dark)] tracking-tight mb-2"
      >
        TAMA v{birthdayMeta.version}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-mono text-sm text-[var(--text-muted)] mb-8"
      >
        RELEASE DATE: {birthdayMeta.releaseDate}
      </motion.p>

      {/* Quote Block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-xs p-6 rounded-sm border border-black/10 max-w-lg w-full text-center shadow-xs mb-8 rotate-[0.5deg]"
      >
        <p className="font-handwrite text-lg sm:text-xl text-[var(--text-dark)] leading-relaxed m-0" style={{ fontFamily: 'var(--font-handwrite)' }}>
          &ldquo;20 years of existing. <br />
          Still figuring things out. <br />
          Still becoming.&rdquo;
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onEnterArchive}
        className="px-6 py-3 rounded-sm bg-[var(--text-dark)] text-white text-sm font-semibold font-body tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 cursor-pointer"
      >
        [ ENTER ARCHIVE ]
      </motion.button>
    </div>
  )
}

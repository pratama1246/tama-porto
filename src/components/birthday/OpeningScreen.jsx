// src/components/birthday/OpeningScreen.jsx
// Honest & funny self-aware opening screen for /20 route

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

      {/* Honest Developer Note Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 sm:p-8 rounded-sm border border-black/10 max-w-lg w-full text-center shadow-xs mb-8 rotate-[0.5deg] relative"
      >
        {/* Top Washi Tape */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-20 bg-[var(--accent-yellow)] opacity-80 rounded-[1px] border border-black/5"
          style={{ transform: 'rotate(-1deg)' }}
        />

        <p
          className="font-handwrite text-lg sm:text-xl text-[var(--text-dark)] leading-relaxed m-0 mb-4"
          style={{ fontFamily: 'var(--font-handwrite)' }}
        >
          &ldquo;20 years of existing. <br />
          Still figuring things out, still becoming.&rdquo;
        </p>

        <div className="pt-4 border-t border-dashed border-black/15 text-xs sm:text-sm font-body text-[var(--text-muted)] leading-relaxed">
          <p className="m-0 text-[var(--text-dark)] font-medium">
            💡 <span className="font-mono font-bold text-amber-700">DEV NOTE:</span>
          </p>
          <p className="mt-1 mb-0 italic">
            &ldquo;Sebenernya rencananya mau bikin 20 foto momen lengkap... tapi gak sempet karena males & gak ada waktu. hehe ✌️&rdquo;
          </p>
          <p className="mt-3 mb-0 text-xs font-mono text-[var(--text-dark)] font-semibold bg-[var(--accent-peach)]/30 py-1.5 px-3 rounded-xs border border-black/5 inline-block">
            Tapi makasih banyak udah nemuin & mampir ke halaman rahasia ini! 🎉
          </p>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onEnterArchive}
        className="px-6 py-3 rounded-sm bg-[var(--text-dark)] text-white text-sm font-semibold font-body tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 cursor-pointer"
      >
        [ VIEW ROAD TO 21 & TIME CAPSULE ]
      </motion.button>
    </div>
  )
}

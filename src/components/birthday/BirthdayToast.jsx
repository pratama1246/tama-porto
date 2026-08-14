// src/components/birthday/BirthdayToast.jsx
// Popup Toast / Modal triggered by logo 5-click easter egg or keyboard sequence

import { motion } from 'framer-motion'
import { birthdayMeta } from '../../data/birthday'

export default function BirthdayToast({ onClose, onNavigateToBirthday }) {
  return (
    <div className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white p-6 rounded-sm border border-black/10 shadow-lg max-w-sm w-full text-center relative select-none"
      >
        {/* Top Tape */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-16 bg-[var(--accent-lavender)] opacity-80 rounded-[1px] border border-black/5"
          style={{ transform: 'rotate(-2deg)' }}
        />

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xs font-mono text-[var(--text-muted)] hover:text-black p-1 cursor-pointer"
        >
          [✕]
        </button>

        <span className="font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-xs tracking-wider uppercase inline-block mb-2">
          🎉 BIRTHDAY EASTER EGG UNLOCKED
        </span>

        <h3 className="font-display font-semibold text-2xl text-[var(--text-dark)] mb-1">
          TAMA v{birthdayMeta.version}
        </h3>

        <div className="my-2 py-1 px-2 bg-[var(--accent-lavender)]/50 rounded-xs border border-black/5">
          <span className="font-mono text-[10px] font-bold text-[var(--text-dark)] uppercase">
            LET&apos;S CELEBRATE AND SAY HAPPY BIRTHDAY TO TAMA! 🎂
          </span>
        </div>

        <p
          className="text-base text-[var(--text-dark)] my-2.5 leading-relaxed"
          style={{ fontFamily: 'var(--font-handwrite)' }}
        >
          &ldquo;okay fine... you found the secret personal layer.&rdquo;
        </p>

        <p className="text-xs text-[var(--text-muted)] font-body mb-6">
          A personal digital archive & software release milestone for 15 August 2026.
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              onClose()
              onNavigateToBirthday()
            }}
            className="w-full py-2.5 rounded-sm bg-[var(--text-dark)] text-white text-xs font-semibold font-body tracking-wider transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-xs"
          >
            {new Date().getTime() >= new Date(birthdayMeta.targetIsoDate).getTime()
              ? '[ ENTER TAMA v20.0 ARCHIVE ]'
              : '[ VIEW COUNTDOWN TEASER /20 ]'}
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 rounded-sm bg-black/5 text-[var(--text-muted)] text-xs font-semibold font-body hover:bg-black/10 transition-colors cursor-pointer"
          >
            Close Teaser
          </button>
        </div>
      </motion.div>
    </div>
  )
}

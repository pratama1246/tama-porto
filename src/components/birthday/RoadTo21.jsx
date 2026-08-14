// src/components/birthday/RoadTo21.jsx
// Interactive checklist for Road to 21 and Time Capsule letter view (Locked until 15 Aug 2027)

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { roadTo21Checklist, timeCapsuleLetter } from '../../data/birthday'

export default function RoadTo21() {
  const [items, setItems] = useState(roadTo21Checklist)
  const [showAttemptModal, setShowAttemptModal] = useState(false)

  // Future letter is strictly locked until 15 August 2027
  const unlockTimestamp = new Date('2027-08-15T00:00:00+07:00').getTime()
  const isLetterUnlocked = new Date().getTime() >= unlockTimestamp

  const toggleCheck = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item))
  }

  return (
    <section className="w-full py-8 px-4 max-w-3xl mx-auto select-none">
      <div className="bg-white p-6 sm:p-8 rounded-sm border border-black/10 shadow-xs relative">
        {/* Top Washi Tape */}
        <div
          className="absolute -top-3 left-10 h-4 w-20 bg-[var(--accent-yellow)] opacity-80 rounded-[1px] border border-black/5"
          style={{ transform: 'rotate(-2deg)' }}
        />

        <div className="text-center mb-6">
          <span className="font-mono text-xs font-bold text-[var(--text-muted)] tracking-widest uppercase">
            TARGETS & MEMORIES
          </span>
          <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[var(--text-dark)] mt-1">
            Road to 21 (20 → 21)
          </h3>
          <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Things to experience and build before the next release (v21.0).
          </p>
        </div>

        {/* Checklist */}
        <div className="space-y-3 mb-8">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="flex items-center gap-3 p-3 rounded-xs border border-black/5 hover:bg-black/5 transition-colors cursor-pointer select-none"
            >
              <div className={`w-5 h-5 rounded-xs border flex items-center justify-center font-mono text-xs font-bold ${
                item.completed
                  ? 'bg-[var(--accent-mint)] border-emerald-600 text-emerald-950'
                  : 'bg-white border-black/20 text-transparent'
              }`}>
                ✓
              </div>
              <span className={`text-xs sm:text-sm font-body ${
                item.completed ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-dark)] font-medium'
              }`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Time Capsule Future Letter (Locked until 15 Aug 2027) */}
        <div className="border-t border-black/10 pt-6 flex flex-col items-center text-center">
          <span className="font-mono text-xs font-bold text-[var(--text-muted)] mb-2 uppercase flex items-center gap-1.5">
            💌 TIME CAPSULE • FUTURE LETTER
          </span>

          {!isLetterUnlocked ? (
            /* Locked State Envelope */
            <div className="w-full mt-2 bg-gradient-to-b from-[#faf5ee] to-[#f5ebd7] p-6 rounded-sm border border-amber-900/15 shadow-2xs relative overflow-hidden text-center">
              {/* Wax Seal Stamp */}
              <div className="mx-auto w-14 h-14 rounded-full bg-[#852c2c] text-amber-100 flex items-center justify-center shadow-md border-2 border-amber-300/30 mb-3 rotate-[-3deg]">
                <span className="font-mono font-bold text-xs tracking-tighter">🔒 2027</span>
              </div>

              <div className="font-mono text-xs font-bold text-amber-950 uppercase tracking-wider mb-1">
                SEALED & LOCKED UNTIL 15 AUGUST 2027
              </div>

              <p className="text-xs sm:text-sm text-amber-900/80 font-body max-w-md mx-auto mb-4 leading-relaxed">
                This letter was written by 20-year-old Tama and is <span className="font-semibold text-amber-950">strictly sealed</span>. It will automatically unlock on his 21st birthday next year!
              </p>

              {/* Locked Envelope Details */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-6 bg-white/70 px-4 py-2 rounded-xs border border-amber-900/10 font-mono text-[11px] text-amber-900">
                <span>📅 WRITTEN: 15.08.2026</span>
                <span className="hidden sm:inline">•</span>
                <span className="font-bold text-red-700">⏳ UNLOCKS: 15.08.2027</span>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setShowAttemptModal(true)}
                  className="px-4 py-1.5 rounded-xs bg-amber-950 text-amber-100 text-xs font-mono font-semibold transition-all hover:bg-amber-900 active:scale-95 cursor-pointer shadow-2xs"
                >
                  [ 🔒 TRY OPENING LETTER ]
                </button>
              </div>

              {/* Locked Attempt Feedback */}
              <AnimatePresence>
                {showAttemptModal && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xs text-xs font-mono text-red-800 text-center max-w-sm mx-auto"
                  >
                    ⛔ ACCESS DENIED: Not yet! Please wait until 15 August 2027. ⏳✌️
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Unlocked Letter (Active only on/after 15.08.2027) */
            <div
              className="bg-[var(--accent-peach)]/25 p-5 rounded-xs border border-black/10 text-left relative w-full mt-3"
              style={{ transform: 'rotate(-0.5deg)' }}
            >
              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] mb-3 border-b border-black/10 pb-2">
                <span>Written: {timeCapsuleLetter.writtenDate}</span>
                <span>Unlocked: {timeCapsuleLetter.unlockDate}</span>
              </div>

              <p
                className="text-sm sm:text-base text-[var(--text-dark)] leading-relaxed m-0"
                style={{ fontFamily: 'var(--font-handwrite)' }}
              >
                &ldquo;{timeCapsuleLetter.message}&rdquo;
              </p>

              <div className="text-right mt-3 text-xs font-mono font-bold text-[var(--text-dark)]">
                — {timeCapsuleLetter.author}
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <span className="font-mono font-bold text-xs text-[var(--text-muted)] tracking-widest uppercase">
            SEE YOU AT v21.0 🚀
          </span>
        </div>
      </div>
    </section>
  )
}

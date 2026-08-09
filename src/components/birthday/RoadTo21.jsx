// src/components/birthday/RoadTo21.jsx
// Interactive checklist for Road to 21 and Time Capsule letter view

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { roadTo21Checklist, timeCapsuleLetter } from '../../data/birthday'

export default function RoadTo21() {
  const [items, setItems] = useState(roadTo21Checklist)
  const [showCapsule, setShowCapsule] = useState(false)

  const toggleCheck = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item))
  }

  return (
    <section className="w-full py-8 px-4 max-w-3xl mx-auto">
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

        {/* Time Capsule Toggle Button */}
        <div className="border-t border-black/10 pt-6 flex flex-col items-center text-center">
          <span className="font-mono text-xs font-bold text-[var(--text-muted)] mb-2 uppercase">
            💌 TIME CAPSULE
          </span>
          <button
            onClick={() => setShowCapsule(!showCapsule)}
            className="px-4 py-2 rounded-sm bg-black/5 hover:bg-black/10 text-[var(--text-dark)] text-xs font-semibold font-mono tracking-wider transition-colors cursor-pointer border border-black/5"
          >
            {showCapsule ? '[ CLOSE FUTURE LETTER ]' : '[ OPEN FUTURE LETTER ]'}
          </button>

          <AnimatePresence>
            {showCapsule && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden w-full mt-4"
              >
                <div
                  className="bg-[var(--accent-peach)]/25 p-5 rounded-xs border border-black/10 text-left relative"
                  style={{ transform: 'rotate(-0.5deg)' }}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] mb-3 border-b border-black/10 pb-2">
                    <span>Written: {timeCapsuleLetter.writtenDate}</span>
                    <span>Unlock Date: {timeCapsuleLetter.unlockDate}</span>
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
              </motion.div>
            )}
          </AnimatePresence>
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

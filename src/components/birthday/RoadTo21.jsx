// src/components/birthday/RoadTo21.jsx
// Interactive checklist for Road to 21 and Time Capsule letter view (Locked until 15 Aug 2027)

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { roadTo21Checklist, timeCapsuleLetter } from '../../data/birthday'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' }
  }
}

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
    <section id="road-to-21" className="w-full py-8 px-4 max-w-4xl mx-auto select-none">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeUp}
        className="bg-white p-6 sm:p-10 rounded-2xl border-2 border-ink-black neo-shadow relative"
      >
        {/* Top Washi Tape */}
        <div
          className="absolute -top-3.5 left-10 h-6 px-4 bg-pale-yellow border border-ink-black/40 -rotate-2 rounded-xs neo-shadow-sm flex items-center justify-center text-[10px] font-mono font-bold text-ink-black tracking-wider"
          style={{ clipPath: 'polygon(0% 5%, 3% 0%, 97% 4%, 100% 12%, 98% 88%, 95% 100%, 3% 95%, 0% 88%)' }}
        >
          📝 ROADMAP // 20 → 21
        </div>

        <div className="text-center mb-8">
          <span className="font-mono text-xs font-bold text-ink-black/70 tracking-widest uppercase bg-mint px-3 py-1 rounded border border-ink-black/30 neo-shadow-sm -rotate-1 inline-block mb-2">
            TARGETS & MEMORIES
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-ink-black mt-1 uppercase tracking-tight">
            ROAD TO 21 (v20.0 → v21.0)
          </h3>
          <p 
            className="text-sm sm:text-base text-text-handwrite mt-1 font-semibold"
            style={{ fontFamily: 'var(--font-handwrite)' }}
          >
            Things to experience and build before the next major release.
          </p>
        </div>

        {/* Checklist */}
        <div className="space-y-3 mb-10">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`flex items-center gap-3.5 p-3.5 rounded-xl border-2 border-ink-black transition-all cursor-pointer select-none ${
                item.completed
                  ? 'bg-emerald-50 neo-shadow-sm'
                  : 'bg-white hover:bg-neutral-50 neo-shadow-sm active:scale-99'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg border-2 border-ink-black flex items-center justify-center font-mono text-xs font-bold transition-all ${
                item.completed
                  ? 'bg-mint text-ink-black neo-shadow-sm scale-105'
                  : 'bg-white text-transparent'
              }`}>
                ✓
              </div>
              <span className={`text-xs sm:text-sm font-mono font-bold ${
                item.completed ? 'line-through text-text-muted opacity-60' : 'text-ink-black'
              }`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Time Capsule Future Letter (Locked until 15 Aug 2027) */}
        <div className="border-t-2 border-ink-black/10 pt-8 flex flex-col items-center text-center">
          <span className="font-mono text-xs font-bold text-ink-black/80 mb-3 uppercase flex items-center gap-2 bg-sticker-pink px-3 py-1 rounded border border-ink-black/30 neo-shadow-sm">
            <span>💌</span>
            <span>TIME CAPSULE • FUTURE LETTER</span>
          </span>

          {!isLetterUnlocked ? (
            /* Locked State Envelope */
            <div className="w-full mt-3 bg-[#faf5ee] p-6 sm:p-8 rounded-2xl border-2 border-ink-black neo-shadow relative overflow-hidden text-center">
              {/* Wax Seal Stamp */}
              <div className="mx-auto w-16 h-16 rounded-full bg-[#852c2c] text-amber-100 flex items-center justify-center shadow-lg border-2 border-amber-300/40 mb-4 rotate-[-3deg] neo-shadow-sm">
                <span className="font-mono font-bold text-xs tracking-tighter">🔒 2027</span>
              </div>

              <div className="font-mono text-xs sm:text-sm font-extrabold text-ink-black uppercase tracking-wider mb-2">
                SEALED & LOCKED UNTIL CHAPTER 21 (2027)
              </div>

              <p 
                className="text-xs sm:text-sm text-text-handwrite max-w-md mx-auto mb-5 leading-relaxed font-semibold"
                style={{ fontFamily: 'var(--font-handwrite)' }}
              >
                This letter was written by 20-year-old Tama and is <span className="font-bold text-red-700">strictly sealed</span>. It will automatically unlock on his 21st birthday!
              </p>

              {/* Locked Envelope Details */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-6 bg-white px-5 py-2.5 rounded-xl border-2 border-ink-black font-mono text-xs font-bold text-ink-black neo-shadow-sm">
                <span>✍️ WRITTEN: CHAPTER 20 (2026)</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-red-600">⏳ UNLOCKS: CHAPTER 21 (2027)</span>
              </div>

              <div className="mt-5">
                <button
                  onClick={() => setShowAttemptModal(true)}
                  className="px-5 py-2 rounded-xl bg-ink-black text-white text-xs font-mono font-bold neo-shadow neo-shadow-hover transition-all active:scale-95 cursor-pointer"
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
                    className="mt-4 p-3.5 bg-red-100 border-2 border-red-500 rounded-xl text-xs font-mono font-bold text-red-900 text-center max-w-sm mx-auto neo-shadow-sm"
                  >
                    ⛔ ACCESS DENIED: Not yet! Please wait until next year (Chapter 21). ⏳✌️
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Unlocked Letter (Active only on/after 15.08.2027) */
            <div
              className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-ink-black neo-shadow text-left relative w-full mt-3 rotate-[-0.5deg]"
            >
              <div className="flex justify-between items-center text-xs font-mono text-text-muted mb-3 border-b border-ink-black/10 pb-2">
                <span>Written: {timeCapsuleLetter.writtenDate}</span>
                <span>Unlocked: {timeCapsuleLetter.unlockDate}</span>
              </div>

              <p
                className="text-base sm:text-lg text-text-handwrite leading-relaxed m-0"
                style={{ fontFamily: 'var(--font-handwrite)' }}
              >
                &ldquo;{timeCapsuleLetter.message}&rdquo;
              </p>

              <div className="text-right mt-4 text-xs font-mono font-bold text-ink-black">
                — {timeCapsuleLetter.author}
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center pt-4 border-t border-ink-black/10">
          <span className="font-mono font-bold text-xs text-text-muted tracking-widest uppercase">
            SEE YOU AT v21.0 🚀
          </span>
        </div>
      </motion.div>
    </section>
  )
}

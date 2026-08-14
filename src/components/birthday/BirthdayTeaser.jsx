// src/components/birthday/BirthdayTeaser.jsx
// Live countdown screen displayed when /20 is visited before August 15, 2026

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { birthdayMeta } from '../../data/birthday'

export default function BirthdayTeaser({ onEnterArchive }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isTargetReached: false
  })

  useEffect(() => {
    const targetDate = new Date(birthdayMeta.targetIsoDate).getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isTargetReached: true })
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds, isTargetReached: false })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Dev Spec Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--accent-peach)] text-[var(--text-dark)] border border-black/10 mb-6 rotate-[-1deg]"
      >
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        Status: Pre-Release (Unlocking Soon)
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-[var(--text-dark)] max-w-2xl mx-auto mb-3 tracking-tight uppercase leading-tight"
      >
        LET&apos;S CELEBRATE AND SAY HAPPY BIRTHDAY TO TAMA! 🎉
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-4 font-mono text-xs sm:text-sm font-semibold text-[var(--text-muted)] tracking-wider uppercase"
      >
        TAMA v{birthdayMeta.version} • UNLOCKING IN
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-[var(--text-muted)] font-body text-base sm:text-lg max-w-md mx-auto mb-8"
      >
        Chapter 20 is currently compiling and unlocking soon.
      </motion.p>

      {/* Countdown Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto w-full mb-10"
      >
        {[
          { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
          { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
          { label: 'MINS', value: String(timeLeft.minutes).padStart(2, '0') },
          { label: 'SECS', value: String(timeLeft.seconds).padStart(2, '0') }
        ].map((item, i) => (
          <div
            key={item.label}
            className="bg-white p-3 sm:p-4 rounded-sm border border-black/10 shadow-xs flex flex-col items-center"
            style={{ transform: `rotate(${i % 2 === 0 ? '-1.5deg' : '1.5deg'})` }}
          >
            <span className="font-mono font-bold text-2xl sm:text-4xl text-[var(--text-dark)]">
              {item.value}
            </span>
            <span className="font-body text-[10px] sm:text-xs font-semibold tracking-wider text-[var(--text-muted)] mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* CTA Button - Only visible when countdown reaches target date (15 August 2026 00:00 WIB) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        {timeLeft.isTargetReached ? (
          <button
            onClick={onEnterArchive}
            className="px-6 py-3 rounded-sm bg-[var(--text-dark)] text-white text-sm font-semibold font-body tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:scale-95 cursor-pointer"
          >
            [ ENTER FULL ARCHIVE ]
          </button>
        ) : (
          <div className="px-5 py-2.5 rounded-sm bg-black/5 text-[var(--text-muted)] text-xs font-mono font-semibold tracking-wider border border-black/10">
            🔒 ARCHIVE LOCKED UNTIL 15.08.2026 00:00 WIB
          </div>
        )}
      </motion.div>
    </div>
  )
}

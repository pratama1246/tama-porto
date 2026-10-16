import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hazeConfig } from '../../../data/haze'

export default function HazeBadge({ isActive, onToggle }) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [noteIndex, setNoteIndex] = useState(0)

  // Rotasi otomatis setiap 2 menit sekali
  useEffect(() => {
    if (!isActive || isMinimized) return
    const timer = setInterval(() => {
      setNoteIndex((prev) => (prev + 1) % hazeConfig.notes.length)
    }, hazeConfig.rotationIntervalMs)
    return () => clearInterval(timer)
  }, [isActive, isMinimized])

  const handleNextNote = () => {
    setNoteIndex((prev) => (prev + 1) % hazeConfig.notes.length)
  }

  return (
    <div className="fixed top-14 sm:top-16 left-4 md:left-1/2 md:-translate-x-1/2 z-[80] select-none pointer-events-auto">
      <AnimatePresence mode="wait">
        {isActive && !isMinimized ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: -10, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative bg-[#fbf5e6] text-stone-800 border-2 border-stone-800 p-3 sm:p-3.5 rounded-sm shadow-[3px_4px_0px_#1c1b1a] w-[270px] sm:w-[305px] box-border"
          >
            {/* Top Washi Tape Pinned to Navbar Edge */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-200/90 border-t border-b border-amber-300/80 rotate-1 shadow-xs" />

            {/* Status Header */}
            <div className="flex items-center justify-between gap-2 border-b border-stone-300 pb-1.5 mb-2 font-mono text-[11px] sm:text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span className="font-bold text-amber-950">{hazeConfig.statusLabel}</span>
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-red-800 font-extrabold">
                {hazeConfig.statusAir}
              </span>
            </div>

            {/* Locked-Height Note Container (mencegah card melebar/goyang saat ganti kata) */}
            <div
              onClick={handleNextNote}
              className="min-h-[44px] sm:min-h-[48px] flex items-center mb-2.5 cursor-pointer"
              title="Click to see next note"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={noteIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="font-handwrite text-sm sm:text-base text-amber-950/90 leading-snug w-full select-none"
                >
                  "{hazeConfig.notes[noteIndex]}"
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Action Buttons: Clear Haze & Minimize */}
            <div className="flex items-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={onToggle}
                className="flex-1 py-1.5 px-2.5 bg-stone-900 text-stone-100 hover:bg-stone-800 text-[11px] sm:text-xs font-mono font-medium rounded-xs border border-stone-900 transition-colors text-center cursor-pointer"
                title="Dismiss smoke overlay"
              >
                ✕ Clear Haze
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="py-1.5 px-3 bg-amber-100 hover:bg-amber-200 text-amber-950 text-[11px] sm:text-xs font-mono rounded-xs border border-amber-400 transition-colors cursor-pointer"
                title="Minimize note"
              >
                _
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="minimized"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!isActive) onToggle()
              setIsMinimized(false)
            }}
            className="flex items-center gap-2 bg-[#fbf5e6] text-stone-800 border-2 border-stone-800 px-3 py-1.5 rounded-sm shadow-[2px_2px_0px_#1c1b1a] font-mono text-[11px] sm:text-xs font-bold cursor-pointer"
          >
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-600 animate-pulse' : 'bg-stone-400'}`} />
            <span>{isActive ? '🌫️ Haze: Active' : '🌫️ Enable Haze'}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

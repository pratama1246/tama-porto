import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hazeConfig } from '../../../data/haze'

export default function HazeBadge({ isActive, onToggle }) {
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 select-none">
      <AnimatePresence mode="wait">
        {isActive && !isMinimized ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 15, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative bg-[#fbf5e6] text-stone-800 border-2 border-stone-800 p-3 sm:p-3.5 rounded-sm shadow-[3px_3px_0px_#1c1b1a] max-w-[230px] sm:max-w-[260px]"
          >
            {/* Top Washi Tape Decoration */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-amber-200/80 border-t border-b border-amber-300/60 rotate-1 shadow-xs" />

            {/* Status Header */}
            <div className="flex items-center justify-between gap-2 border-b border-stone-300 pb-1.5 mb-1.5 font-mono text-[10px] sm:text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span className="font-bold text-amber-900">{hazeConfig.statusLabel}</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-amber-800/80 font-bold">
                {hazeConfig.statusAir}
              </span>
            </div>

            {/* Handwritten Note */}
            <p className="font-handwrite text-sm sm:text-base text-amber-950/90 leading-tight mb-2.5">
              "{hazeConfig.handwrittenNote}"
            </p>

            {/* Action Buttons: Minimalkan & Matikan */}
            <div className="flex items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={onToggle}
                className="flex-1 py-1 px-2 bg-stone-900 text-stone-100 hover:bg-stone-800 text-[10px] font-mono font-medium rounded-xs border border-stone-900 transition-colors text-center"
                title="Matikan efek kabut asap"
              >
                ✕ Usap Kabut
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="py-1 px-2 bg-amber-100 hover:bg-amber-200 text-amber-950 text-[10px] font-mono rounded-xs border border-amber-400 transition-colors"
                title="Kecilkan catatan"
              >
                _
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="minimized"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!isActive) onToggle()
              setIsMinimized(false)
            }}
            className="flex items-center gap-2 bg-[#fbf5e6] text-stone-800 border-2 border-stone-800 px-2.5 py-1.5 rounded-sm shadow-[2px_2px_0px_#1c1b1a] font-mono text-[10px] sm:text-[11px] font-bold"
          >
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-600 animate-pulse' : 'bg-stone-400'}`} />
            <span>{isActive ? '🌫️ Kabut: Aktif' : '🌫️ Nyalakan Kabut'}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

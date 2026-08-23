// src/components/layout/NotFound.jsx
import { motion } from 'framer-motion'

export default function NotFound({ onGoHome }) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-ink-black flex items-center justify-center relative w-full px-4 py-8 overflow-hidden select-none">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-[var(--accent-pink)] opacity-25 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-[var(--accent-yellow)] opacity-25 rounded-full blur-3xl" />
      </div>

      {/* Main Centered 404 Scrapbook Card */}
      <main className="w-full flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="bg-white p-6 sm:p-12 rounded-2xl border-2 border-ink-black neo-shadow max-w-xl w-full text-center relative"
        >
          {/* Top Washi Tape */}
          <div
            className="absolute -top-3.5 left-1/2 -translate-x-1/2 h-6 px-4 bg-sticker-pink border border-ink-black/40 -rotate-2 rounded-xs neo-shadow-sm flex items-center justify-center text-[10px] font-mono font-bold text-ink-black tracking-wider"
          >
            MISSING.SNAPSHOT // 404
          </div>

          {/* Missing Polaroid Graphic Frame */}
          <div className="mx-auto w-40 sm:w-48 aspect-[3/2] bg-amber-50 rounded-xl border-2 border-dashed border-ink-black/50 flex flex-col items-center justify-center mb-6 relative">
            <span className="text-3xl sm:text-4xl mb-1">📸</span>
            <span className="font-mono text-xs font-bold text-ink-black/60">
              [ SNAPSHOT LOST ]
            </span>
          </div>

          {/* Large Error Text */}
          <span className="font-mono text-xs sm:text-sm font-bold text-ink-black/70 tracking-widest uppercase bg-mint px-3 py-1 rounded border border-ink-black/30 neo-shadow-sm -rotate-1 inline-block mb-3">
            ERROR 404 • PAGE NOT FOUND
          </span>

          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-ink-black uppercase tracking-tight mb-3">
            LOST IN THE SCRAPBOOK
          </h1>

          <p
            className="text-base sm:text-lg text-text-handwrite leading-relaxed max-w-md mx-auto mb-8 font-semibold text-text-muted"
            style={{ fontFamily: 'var(--font-handwrite)' }}
          >
            Oops! The snapshot or page you are trying to visit doesn't exist, was moved, or has vanished into the archives.
          </p>

          {/* CTA Return Home */}
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-ink-black bg-pale-yellow hover:bg-[#fff275] text-sm font-bold font-mono text-ink-black neo-shadow neo-shadow-hover transition-all active:scale-95 cursor-pointer"
          >
            <span>🧭</span>
            <span>RETURN TO STUDIO HOME</span>
          </button>
        </motion.div>
      </main>
    </div>
  )
}

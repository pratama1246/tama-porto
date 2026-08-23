// src/components/birthday/ScatteredGallery.jsx
// Big Scattered Polaroid Photo Dump (3:2 Crop, pict.N.jpg captions, Draggable on desktop, touch-friendly scroll on mobile)

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { dumpPolaroids } from '../../data/birthday'

export default function ScatteredGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' && (window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024))
  )

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024))
    }
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12 select-none relative">
      {/* Section Header */}
      <div className="text-center mb-14 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--accent-yellow)]/70 rounded-xs border border-black/10 text-xs font-mono font-bold uppercase tracking-wider mb-3 rotate-[-1deg] shadow-2xs"
        >
          {isMobile ? '🔍 TAP POLAROIDS TO VIEW FULL SIZE' : '🖐️ DRAG & SCATTER POLAROIDS AROUND!'}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-display font-bold text-[var(--text-dark)] tracking-tight uppercase"
        >
          POLAROID DUMP
        </motion.h2>

        <p className="text-sm sm:text-base font-body text-[var(--text-muted)] max-w-md mx-auto mt-2">
          {isMobile 
            ? 'A curated collection of real snapshots at 20. Tap any photo to expand.'
            : 'A curated collection of real snapshots at 20. Drag and scatter the polaroids around or click to view full size.'}
        </p>
      </div>

      {/* Big Scattered Polaroid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16 relative z-10 px-2 sm:px-4 max-w-5xl mx-auto">
        {dumpPolaroids.map((photo, index) => (
          <motion.div
            key={photo.id}
            drag={!isMobile}
            dragConstraints={isMobile ? undefined : { left: -150, right: 150, top: -150, bottom: 150 }}
            dragElastic={0.15}
            whileDrag={!isMobile ? {
              scale: 1.07,
              zIndex: 70,
              cursor: 'grabbing',
              boxShadow: '8px 12px 0px rgba(26,26,26,0.9)',
              rotate: 0
            } : undefined}
            initial={{ opacity: 0, y: 30, rotate: parseFloat(photo.rotate) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={!isMobile ? {
              y: -10,
              scale: 1.03,
              zIndex: 35,
              transition: { duration: 0.2, ease: 'easeOut' }
            } : undefined}
            className={`relative bg-white p-4 sm:p-5 pb-6 rounded-xl border-2 border-ink-black neo-shadow transition-shadow duration-300 flex flex-col ${
              isMobile ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'
            }`}
            style={{
              transform: `rotate(${photo.rotate})`,
              transformOrigin: 'center center'
            }}
          >
            {/* Washi Tape Accent */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 rounded-xs border border-ink-black/40 z-20 pointer-events-none neo-shadow-sm flex items-center justify-center text-[10px] font-mono font-bold text-ink-black tracking-widest uppercase"
              style={{
                backgroundColor: photo.tapeColor,
                transform: `translateX(-50%) rotate(${photo.tapeAngle})`,
                clipPath: 'polygon(0% 15%, 5% 0%, 95% 8%, 100% 20%, 97% 85%, 92% 100%, 8% 92%, 0% 80%)'
              }}
            >
              MEMORIES
            </div>

            {/* Paper Clip Decoration */}
            {photo.paperClip && (
              <div className="absolute -top-3 right-6 w-4 h-10 border-2 border-slate-700/80 rounded-full z-20 pointer-events-none rotate-[12deg]" />
            )}

            {/* 3:2 Photo Container (Large) */}
            <div
              onClick={() => setSelectedPhoto(photo)}
              className="w-full aspect-[3/2] bg-[#f5e6c8] overflow-hidden rounded-md border-2 border-ink-black relative mb-3 cursor-pointer group"
            >
              <img
                src={photo.image}
                alt={photo.title}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay vignette */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono text-xs font-bold text-ink-black bg-pale-yellow border-2 border-ink-black neo-shadow-sm px-3 py-1.5 rounded-md">
                  🔍 CLICK TO EXPAND
                </span>
              </div>
            </div>

            {/* Clean Caption: pict.N.jpg */}
            <div className="flex items-center justify-between pt-1 px-1">
              <span className="font-mono text-sm sm:text-base font-bold text-ink-black tracking-wider">
                📁 {photo.title}
              </span>
              <span 
                className="text-xs text-text-handwrite font-semibold"
                style={{ fontFamily: 'var(--font-handwrite)' }}
              >
                chapter.20
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white p-4 sm:p-6 pb-6 rounded-2xl max-w-3xl w-full border-2 border-ink-black neo-shadow relative cursor-default"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-sticker-pink hover:bg-[#ffb6cb] text-ink-black border-2 border-ink-black flex items-center justify-center font-bold text-sm cursor-pointer z-20 neo-shadow-sm active:scale-95 transition-all"
                title="Close"
              >
                ✕
              </button>

              {/* 3:2 High Res Photo */}
              <div className="w-full aspect-[3/2] bg-[#f5e6c8] overflow-hidden rounded-lg border-2 border-ink-black mb-4">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  draggable={false}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Filename Header */}
              <div className="flex items-center justify-between px-1">
                <h3 className="font-mono font-bold text-base sm:text-lg text-ink-black">
                  📁 {selectedPhoto.title}
                </h3>
                <span 
                  className="text-sm text-text-handwrite font-semibold"
                  style={{ fontFamily: 'var(--font-handwrite)' }}
                >
                  ✨ snapshot archive • 20th year
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

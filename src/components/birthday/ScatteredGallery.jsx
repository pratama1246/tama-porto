// src/components/birthday/ScatteredGallery.jsx
// Big, Draggable Scattered Polaroid Photo Dump (3:2 Crop, pict.N.jpg captions)

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { dumpPolaroids } from '../../data/birthday'

export default function ScatteredGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

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
          🖐️ INTERACTIVE: DRAG & SCATTER POLAROIDS AROUND!
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
          A curated collection of real snapshots at 20. Drag and scatter the polaroids around or click to view full size.
        </p>
      </div>

      {/* Big Draggable Scattered Polaroid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16 relative z-10 px-2 sm:px-4">
        {dumpPolaroids.map((photo, index) => (
          <motion.div
            key={photo.id}
            drag
            dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
            dragElastic={0.15}
            whileDrag={{
              scale: 1.07,
              zIndex: 70,
              cursor: 'grabbing',
              boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3)',
              rotate: 0
            }}
            initial={{ opacity: 0, y: 30, rotate: parseFloat(photo.rotate) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{
              y: -10,
              scale: 1.03,
              zIndex: 35,
              transition: { duration: 0.2, ease: 'easeOut' }
            }}
            className="cursor-grab active:cursor-grabbing relative bg-white p-4 sm:p-5 pb-7 rounded-[2px] border border-black/10 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.1),0_8px_12px_-6px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_22px_40px_-10px_rgba(0,0,0,0.18)] flex flex-col"
            style={{
              transform: `rotate(${photo.rotate})`,
              transformOrigin: 'center center'
            }}
          >
            {/* Washi Tape Accent */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-6 opacity-90 rounded-[1px] border border-black/5 z-20 pointer-events-none"
              style={{
                backgroundColor: photo.tapeColor,
                transform: `translateX(-50%) rotate(${photo.tapeAngle})`,
                clipPath: 'polygon(0% 15%, 5% 0%, 95% 8%, 100% 20%, 97% 85%, 92% 100%, 8% 92%, 0% 80%)'
              }}
            />

            {/* Paper Clip Decoration */}
            {photo.paperClip && (
              <div className="absolute -top-3 right-6 w-4 h-10 border-2 border-slate-700/60 rounded-full z-20 pointer-events-none rotate-[12deg]" />
            )}

            {/* 3:2 Photo Container (Large) */}
            <div
              onClick={() => setSelectedPhoto(photo)}
              className="w-full aspect-[3/2] bg-slate-100 overflow-hidden rounded-[1px] border border-black/5 relative mb-4 cursor-pointer group"
            >
              <img
                src={photo.image}
                alt={photo.title}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay vignette */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-sm backdrop-blur-xs">
                  🔍 CLICK TO EXPAND
                </span>
              </div>
            </div>

            {/* Clean Caption: pict.N.jpg */}
            <div className="flex items-center justify-between pt-1 px-1">
              <span className="font-mono text-sm sm:text-base font-bold text-[var(--text-dark)] tracking-wider">
                {photo.title}
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-semibold text-[var(--text-muted)] bg-slate-100 px-2 py-0.5 rounded-xs">
                3:2 • 1200x800
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
              className="bg-white p-4 sm:p-6 pb-6 rounded-sm max-w-3xl w-full border border-black/20 shadow-2xl relative cursor-default"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-sm cursor-pointer z-20"
              >
                ✕
              </button>

              {/* 3:2 High Res Photo */}
              <div className="w-full aspect-[3/2] bg-slate-100 overflow-hidden rounded-[1px] border border-black/10 mb-3">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  draggable={false}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Filename Header */}
              <div className="flex items-center justify-between px-1">
                <h3 className="font-mono font-bold text-base sm:text-lg text-[var(--text-dark)]">
                  {selectedPhoto.title}
                </h3>
                <span className="font-mono text-xs text-[var(--text-muted)] bg-slate-100 px-2 py-0.5 rounded-xs">
                  ORIGINAL BACKGROUND • 3:2 CROP
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

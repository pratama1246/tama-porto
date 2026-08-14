// src/components/birthday/MomentsArchive.jsx
// Multi-Artifact 20 Moments digital archive (Polaroid, Struk, Cassette, Sticky Note)

import { useState } from 'react'
import { motion } from 'framer-motion'
import { moments20 } from '../../data/birthday'

// Image Placeholder component with automatic error fallback if photo isn't uploaded yet
function MomentImage({ src, alt, color }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center p-3 text-center border border-black/5 rounded-xs select-none"
        style={{ backgroundColor: `${color}30` }}
      >
        <span className="text-xl mb-1">🖼️</span>
        <span className="font-mono text-[10px] font-bold text-[var(--text-dark)] opacity-70">
          [ Photo Placeholder ]
        </span>
        <span className="font-mono text-[9px] text-[var(--text-muted)] mt-0.5">
          {alt}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className="w-full h-full object-cover rounded-xs protected-image"
    />
  )
}

export default function MomentsArchive() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeMoment, setActiveMoment] = useState(null)

  const categories = ['all', 'coding', 'campus', 'design', 'music', 'milestone', 'ordinary']

  const filteredMoments = selectedCategory === 'all'
    ? moments20
    : moments20.filter(m => m.category === selectedCategory)

  return (
    <section className="w-full py-8 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-display font-semibold text-2xl sm:text-3xl text-[var(--text-dark)] mb-2">
          20 Moments Archive
        </h3>
        <p className="font-body text-sm text-[var(--text-muted)] max-w-md mx-auto">
          A scrapbooking collection of 20 moments, receipts, music tracks, and memories before turning 20.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer border border-black/5 ${
              selectedCategory === cat
                ? 'bg-[var(--text-dark)] text-white shadow-xs'
                : 'bg-white text-[var(--text-muted)] hover:bg-black/5'
            }`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Multi-Artifact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none items-start">
        {filteredMoments.map((moment) => {
          const isReceipt = moment.category === 'coding' || moment.category === 'campus'
          const isMusic = moment.category === 'music'
          const isSticky = moment.category === 'design' || moment.category === 'ordinary' || moment.category === 'random'

          return (
            <motion.div
              key={moment.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 10, boxShadow: 'var(--shadow-md)' }}
              onClick={() => setActiveMoment(moment)}
              className="bg-white rounded-sm border border-black/10 shadow-xs cursor-pointer flex flex-col justify-between transition-shadow relative overflow-hidden p-3.5"
              style={{ transform: `rotate(${moment.rotate})` }}
            >
              {/* Top Washi Tape accent */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3.5 w-14 opacity-75 rounded-[1px] border border-black/5"
                style={{ backgroundColor: moment.color }}
              />

              {/* ARTIFACT TYPE 1: Receipt / Struk Style (Coding & Campus) */}
              {isReceipt ? (
                <div className="w-full border border-dashed border-black/20 p-2.5 rounded-xs bg-[#faf8f5] font-mono text-[11px]">
                  <div className="flex justify-between items-center border-b border-black/10 pb-1 mb-2 text-[9px] text-[var(--text-muted)]">
                    <span>RECEIPT #{String(moment.id).padStart(2, '0')}</span>
                    <span>{moment.date}</span>
                  </div>

                  {/* Photo area inside receipt */}
                  <div className="w-full aspect-[4/3] mb-2 rounded-xs overflow-hidden border border-black/5">
                    <MomentImage src={moment.image} alt={moment.title} color={moment.color} />
                  </div>

                  <div className="font-bold text-xs text-[var(--text-dark)] uppercase mb-1">
                    {moment.title}
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] border-t border-black/5 pt-1.5 flex justify-between">
                    <span>QTY: 1 ERA</span>
                    <span className="font-bold text-emerald-700">OK</span>
                  </div>

                  {/* Receipt Barcode */}
                  <div className="mt-2 pt-1 border-t border-black/10 flex justify-center items-center gap-0.5 opacity-60">
                    {[3,1,4,2,5,1,3,2,4,1,3,2,1].map((h, i) => (
                      <span key={i} className="bg-black inline-block" style={{ width: `${h}px`, height: '14px' }}></span>
                    ))}
                  </div>
                </div>
              ) : isMusic ? (
                /* ARTIFACT TYPE 2: Cassette / Music Card Style (Music) */
                <div className="w-full border border-black/10 p-2.5 rounded-xs bg-slate-900 text-white font-mono text-[11px]">
                  <div className="flex justify-between items-center text-[9px] text-slate-400 mb-1.5">
                    <span>SIDE A • {moment.date}</span>
                    <span className="text-emerald-400">PLAYING ▶</span>
                  </div>

                  {/* Photo / Cassette Reel area */}
                  <div className="w-full aspect-[4/3] mb-2 rounded-xs overflow-hidden relative border border-slate-700">
                    <MomentImage src={moment.image} alt={moment.title} color={moment.color} />
                  </div>

                  <div className="font-bold text-xs text-white truncate">
                    🎵 {moment.title}
                  </div>

                  {/* Mini Progress Bar */}
                  <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full w-3/4"></div>
                  </div>
                </div>
              ) : isSticky ? (
                /* ARTIFACT TYPE 3: Pastel Sticky Note Style (Design & Ordinary) */
                <div
                  className="w-full border border-black/10 p-3 rounded-xs flex flex-col justify-between min-h-[160px]"
                  style={{ backgroundColor: `${moment.color}45` }}
                >
                  <div className="flex justify-between items-center font-mono text-[9px] text-[var(--text-muted)] mb-1">
                    <span>📌 NOTE {String(moment.id).padStart(2, '0')}</span>
                    <span>{moment.date}</span>
                  </div>

                  <div className="w-full aspect-[4/3] my-1.5 rounded-xs overflow-hidden border border-black/5">
                    <MomentImage src={moment.image} alt={moment.title} color={moment.color} />
                  </div>

                  <div className="font-display font-semibold text-xs text-[var(--text-dark)]">
                    {moment.title}
                  </div>
                </div>
              ) : (
                /* ARTIFACT TYPE 4: Classic Polaroid Photo (Milestone, Friends, Travel) */
                <div className="w-full">
                  <div className="w-full aspect-[4/3] bg-neutral-100 rounded-xs overflow-hidden border border-black/10 mb-2">
                    <MomentImage src={moment.image} alt={moment.title} color={moment.color} />
                  </div>
                  <div className="flex justify-between items-center font-mono text-[10px] text-[var(--text-muted)] mb-1">
                    <span>POLAROID #{String(moment.id).padStart(2, '0')}</span>
                    <span>{moment.date}</span>
                  </div>
                  <h4 className="font-display font-semibold text-sm text-[var(--text-dark)] leading-tight">
                    {moment.title}
                  </h4>
                </div>
              )}

              {/* Caption */}
              <p
                className="mt-2.5 text-xs text-[var(--text-dark)] text-center leading-snug line-clamp-2"
                style={{ fontFamily: 'var(--font-handwrite)' }}
              >
                &ldquo;{moment.caption}&rdquo;
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Lightbox Modal */}
      {activeMoment && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveMoment(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-sm border border-black/10 max-w-sm w-full shadow-lg relative text-center"
          >
            <button
              onClick={() => setActiveMoment(null)}
              className="absolute top-2 right-2 text-xs font-mono text-[var(--text-muted)] hover:text-black p-1 cursor-pointer"
            >
              [✕]
            </button>

            <span className="font-mono text-xs text-[var(--text-muted)] font-bold block mb-1">
              MOMENT {String(activeMoment.id).padStart(2, '0')} / 20
            </span>

            <h3 className="font-display font-semibold text-xl text-[var(--text-dark)] mb-2">
              {activeMoment.title}
            </h3>

            {/* Photo preview in lightbox */}
            <div className="w-full aspect-[4/3] my-3 rounded-xs overflow-hidden border border-black/10">
              <MomentImage src={activeMoment.image} alt={activeMoment.title} color={activeMoment.color} />
            </div>

            <div
              className="w-full p-4 rounded-xs border border-black/5 my-3 text-left"
              style={{ backgroundColor: `${activeMoment.color}25` }}
            >
              <p
                className="text-base text-[var(--text-dark)] leading-relaxed m-0"
                style={{ fontFamily: 'var(--font-handwrite)' }}
              >
                &ldquo;{activeMoment.caption}&rdquo;
              </p>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-[var(--text-muted)] border-t border-black/10 pt-3">
              <span>Year: {activeMoment.date}</span>
              <span className="uppercase font-semibold bg-black/5 px-2 py-0.5 rounded-xs">
                {activeMoment.category}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

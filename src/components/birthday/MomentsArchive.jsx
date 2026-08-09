// src/components/birthday/MomentsArchive.jsx
// 20 Moments digital archive photo grid

import { useState } from 'react'
import { motion } from 'framer-motion'
import { moments20 } from '../../data/birthday'

export default function MomentsArchive() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeMoment, setActiveMoment] = useState(null)

  const categories = ['all', 'coding', 'campus', 'design', 'milestone', 'ordinary']

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
          A collection of 20 small moments, memories, and ordinary days before turning 20.
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

      {/* Polaroid Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        {filteredMoments.map((moment) => (
          <motion.div
            key={moment.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 10, boxShadow: 'var(--shadow-md)' }}
            onClick={() => setActiveMoment(moment)}
            className="bg-white p-3.5 pb-6 rounded-sm border border-black/10 shadow-xs cursor-pointer flex flex-col justify-between transition-shadow relative"
            style={{ transform: `rotate(${moment.rotate})` }}
          >
            {/* Top Washi Tape accent */}
            <div
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3.5 w-14 opacity-75 rounded-[1px] border border-black/5"
              style={{ backgroundColor: moment.color }}
            />

            {/* Photo frame card */}
            <div
              className="w-full aspect-[4/3] rounded-xs flex flex-col justify-between p-3 border border-black/5 relative overflow-hidden"
              style={{ backgroundColor: `${moment.color}33` }}
            >
              <span className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                {String(moment.id).padStart(2, '0')} / 20
              </span>

              <h4 className="font-display font-semibold text-base text-[var(--text-dark)] my-auto leading-tight">
                {moment.title}
              </h4>

              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)]">
                <span>{moment.date}</span>
                <span className="uppercase font-semibold text-[var(--text-dark)] bg-white/70 px-1.5 py-0.5 rounded-xs">
                  {moment.category}
                </span>
              </div>
            </div>

            {/* Caption */}
            <p
              className="mt-3 text-xs text-[var(--text-dark)] text-center leading-snug line-clamp-2"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              &ldquo;{moment.caption}&rdquo;
            </p>
          </motion.div>
        ))}
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

            <div
              className="w-full p-4 rounded-xs border border-black/5 my-4 text-left"
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

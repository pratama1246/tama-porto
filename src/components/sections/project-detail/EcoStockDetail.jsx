import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { projectDetails } from '../../../data/projectDetails'

export default function EcoStockDetail({ project, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const detail = projectDetails[4]

  return (
    <div
      className="min-h-screen bg-[var(--bg-primary)] flex flex-col w-full relative z-50 pb-20"
      style={{
        backgroundImage: `linear-gradient(rgba(160, 160, 190, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(160, 160, 190, 0.12) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Header bar */}
      <div className="sticky top-0 z-30 bg-[var(--bg-secondary)] border-b border-black/10 px-4 py-3 flex items-center justify-between shadow-xs gap-3">
        <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-mono text-[var(--text-dark)] overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="opacity-60 hidden sm:inline">tama-porto</span>
          <span className="opacity-40 hidden sm:inline">/</span>
          <span className="opacity-60 hidden sm:inline">projects</span>
          <span className="opacity-40 hidden sm:inline">/</span>
          <span className="font-semibold">ecostock-ai</span>
          <span className="opacity-40">/</span>
          <span className="text-[var(--text-handwrite)] bg-[var(--accent-yellow)] px-1.5 py-0.5 rounded-sm text-[9px] md:text-[10px] font-sans rotate-[-1deg] shrink-0">README.md</span>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-[var(--accent-pink)] border border-black/10 text-xs font-semibold text-[var(--text-dark)] hover:bg-[var(--accent-pink)]/85 active:scale-95 transition-all cursor-pointer shadow-3xs rotate-[1deg] shrink-0 whitespace-nowrap"
        >
          ← <span className="hidden sm:inline">Back to Gallery</span><span className="sm:hidden">Back</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 md:py-14 flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="inline-block px-2.5 py-0.5 rounded-sm text-[9px] font-semibold tracking-wider uppercase border border-black/10 bg-white text-[var(--text-dark)] self-start shadow-3xs">
            {project.status}
          </span>
          <h1 className="font-display font-semibold text-2xl md:text-4xl text-[var(--text-dark)] uppercase m-0 leading-none">
            {project.title}
          </h1>
          <p className="font-body text-xs md:text-sm text-[var(--text-muted)] italic m-0">
            {detail?.tagline}
          </p>
        </div>

        {/* Custom Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* Left: Polaroid card & Tech details */}
          <div className="w-full lg:w-[45%] flex flex-col gap-6 items-center shrink-0">
            <div className="w-full max-w-[420px] bg-white border border-black/10 rounded-sm p-4 pb-12 shadow-sm relative rotate-[-1.5deg] hover:rotate-0 transition-all select-none">
              <div className="absolute -top-3 left-1/3 w-24 h-4.5 bg-[var(--accent-mint)]/70 rotate-[1deg] rounded-sm pointer-events-none" />
              <div className="relative aspect-video w-full bg-[var(--bg-secondary)] overflow-hidden rounded-xs border border-black/5">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="protected-image w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center font-handwrite text-xs md:text-sm text-[var(--text-handwrite)]">
                ecostock_dashboard.png
              </div>
            </div>

            {/* Tech chips */}
            <div className="w-full max-w-[420px] bg-[#fefcf7] border border-black/10 rounded-sm p-5 shadow-2xs">
              <h3 className="font-display font-semibold text-xs md:text-sm text-[var(--text-dark)] mb-3 pb-1.5 border-b border-black/5 select-none">Built With</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-sm text-xs font-semibold bg-white border border-black/10 text-[var(--text-dark)] shadow-3xs select-none">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Info card stack */}
          <div className="flex-grow flex flex-col gap-6 w-full">
            <div className="bg-white border border-black/10 rounded-sm p-6 shadow-2xs flex flex-col gap-3">
              <h3 className="font-display font-semibold text-sm md:text-base text-[var(--text-dark)] m-0 select-none">Overview</h3>
              <p className="font-body text-xs md:text-sm leading-relaxed text-[var(--text-dark)]/90 m-0">
                {detail?.overview}
              </p>
            </div>

            <div className="bg-[#fefcf7] border border-black/10 rounded-sm p-6 shadow-2xs flex flex-col gap-3">
              <h3 className="font-display font-semibold text-sm md:text-base text-[var(--text-dark)] m-0 select-none">Key Features</h3>
              <ul className="list-none pl-0 m-0 flex flex-col gap-2.5">
                {detail?.roles.flatMap(r => r.features).map((feat, fidx) => (
                  <li key={fidx} className="flex items-start gap-2 text-xs md:text-sm font-body text-[var(--text-dark)]">
                    <span className="text-[var(--accent-mint)] font-bold select-none">✔</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

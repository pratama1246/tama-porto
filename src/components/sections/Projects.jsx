import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
}

// Custom SVG External Link Icon
function ExternalIcon({ className }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

// Custom SVG GitHub Icon
function GitHubIcon({ className }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

// Custom SVG Readme Icon
function ReadmeIcon({ className }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

const washiColors = [
  'bg-[var(--accent-pink)]/70',
  'bg-[var(--accent-mint)]/70',
  'bg-[var(--accent-blue)]/70',
  'bg-[var(--accent-peach)]/70'
]

// Decorative stickers on project polaroid corner
const activeSticker = (idx) => {
  switch (idx) {
    case 0: return '⭐'
    case 1: return '🚀'
    case 2: return '💡'
    case 3: return '🔥'
    case 4: return '🎨'
    case 5: return '🏛️'
    case 6: return '📱'
    case 7: return '⚡'
    default: return '✨'
  }
}

// Single Project Card Component
function ProjectCard({ project, idx, totalCount, onOpenDetail }) {
  const cardWashiColor = washiColors[idx % washiColors.length]
  const cardSticker = activeSticker(idx)
  const cardTechString = project.tech.join(' / ').toUpperCase()

  return (
    <div
      style={{
        backgroundImage: `
          linear-gradient(rgba(160, 160, 190, 0.08) 1.5px, transparent 1.5px),
          linear-gradient(90deg, rgba(160, 160, 190, 0.08) 1.5px, transparent 1.5px)
        `,
        backgroundSize: '20px 20px',
      }}
      className="w-full bg-white border-2 border-ink-black neo-shadow rounded-2xl p-4.5 sm:p-7 md:p-10 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Split Layout (Photo Left, Text Specs Right) */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-between w-full flex-grow">
        
        {/* Left Column: Large Polaroid Photo Card */}
        <div className="w-full md:w-[45%] flex items-center justify-center flex-shrink-0 relative">
          <div 
            data-cursor="view"
            className="w-full p-3 pb-8 sm:p-4 sm:pb-10 bg-white border-2 border-ink-black neo-shadow rounded-lg rotate-[-1deg] relative hover:rotate-0 hover:scale-102 active:scale-98 transition-all cursor-pointer group"
            onClick={() => onOpenDetail?.(project.id)}
          >
            {/* Polaroid Image */}
            <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-md border-2 border-ink-black select-none ${
              project.id === 7 ? 'bg-white' : 'bg-[#f5e6c8]'
            }`}>
              <img
                src={project.thumbnail}
                alt={project.title}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className={`protected-image w-full h-full object-cover object-top grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 pointer-events-none ${
                  project.id === 7 ? 'object-contain p-1' : ''
                }`}
                loading="lazy"
              />
            </div>

            {/* Handwritten Label */}
            <div className="mt-3 text-center font-handwrite text-[0.95rem] text-text-handwrite select-none font-semibold truncate px-2">
              {project.title.toLowerCase().replace(/\s+/g, '_')}.png
            </div>

            {/* Washi Tape pinning the photo to the sheet */}
            <div 
              className={`absolute -top-3.5 left-[calc(50%-45px)] w-[90px] h-[18px] ${cardWashiColor} border border-ink-black/40 rotate-[-1deg] rounded-[2px] z-10 shadow-xs opacity-85`}
            />

            {/* Corner sticker */}
            <div className="absolute -top-2.5 -right-2.5 w-8 h-8 bg-pale-yellow rounded-full flex items-center justify-center text-base select-none neo-shadow-sm rotate-[12deg] border-2 border-ink-black z-20 group-hover:scale-115 transition-transform">
              {cardSticker}
            </div>
          </div>
        </div>

        {/* Right Column: Project Specifications */}
        <div className="w-full md:w-[55%] flex flex-col justify-between self-stretch gap-6">
          <div className="flex-grow flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2.5">
              
              {/* Status & Index Subheader */}
              <div className="flex items-center justify-between">
                <span className="inline-block px-3 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase border-2 border-ink-black bg-pale-yellow text-ink-black neo-shadow-sm">
                  {project.status}
                </span>
                <span className="font-mono text-xs font-bold text-text-muted">
                  #{String(idx + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
                </span>
              </div>

              {/* Giant Bold Title */}
              <h3 
                className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-ink-black uppercase leading-[1.1] tracking-tight m-0"
              >
                {project.title}
              </h3>

              {/* Tech Stack */}
              <div 
                className="font-mono text-[11px] md:text-xs font-bold tracking-wider text-text-muted uppercase mt-0.5"
              >
                {cardTechString}
              </div>

              {/* Description */}
              <p 
                className="text-xs md:text-sm text-ink-black leading-relaxed font-body mt-1 max-w-xl"
              >
                {project.desc}
              </p>
            </div>

            {/* Action Buttons (Aligned Right) */}
            <div className="mt-6 pt-4 border-t-2 border-ink-black/10 flex flex-wrap items-center justify-end gap-3 w-full">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border-2 border-ink-black bg-white text-ink-black font-mono text-xs font-bold neo-shadow-sm hover:bg-pale-yellow transition-all min-h-[42px] no-underline"
                >
                  <GitHubIcon className="shrink-0" />
                  <span>GitHub</span>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border-2 border-ink-black bg-white text-ink-black font-mono text-xs font-bold neo-shadow-sm hover:bg-mint transition-all min-h-[42px] no-underline"
                >
                  <ExternalIcon className="shrink-0" />
                  <span>Live Demo</span>
                </a>
              )}
              <button
                onClick={() => onOpenDetail?.(project.id)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border-2 border-ink-black bg-soft-blue text-ink-black font-mono text-xs font-bold neo-shadow neo-shadow-hover transition-all cursor-pointer min-h-[42px]"
              >
                <ReadmeIcon className="shrink-0" />
                <span>View Case Study ↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects({ onOpenDetail }) {
  const [showAll, setShowAll] = useState(false)

  // Recalculate ScrollTrigger markers and layout cleanly after expand/collapse completes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 450)
    return () => clearTimeout(timer)
  }, [showAll])

  return (
    <section
      id="projects"
      className="py-10 px-6 md:py-24 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full overflow-hidden relative"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex flex-col gap-10 md:gap-14 w-full"
      >
        {/* Section Header */}
        <motion.div variants={fadeUp} className="w-full">
          <h2
            className="inline-block px-5 py-2 md:px-7 md:py-3 rounded-xl text-xl sm:text-2xl md:text-4xl font-display font-extrabold text-ink-black bg-soft-blue border-2 border-ink-black neo-shadow rotate-[-1.5deg] tracking-tight m-0 select-none"
          >
            Featured Projects
          </h2>
        </motion.div>

        {/* Wide Vertical Project Cards Stack */}
        <div className="flex flex-col gap-10 sm:gap-14 w-full">
          {/* Core First 3 Projects */}
          {projects.slice(0, 3).map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              totalCount={projects.length}
              onOpenDetail={onOpenDetail}
            />
          ))}

          {/* Collapsible Remaining Projects (Native Smooth CSS Grid Accordion) */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: showAll ? '1fr' : '0fr',
              transition: 'grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
              opacity: showAll ? 1 : 0
            }}
            className="w-full"
          >
            <div className="overflow-hidden min-h-0 flex flex-col gap-10 sm:gap-14">
              {projects.slice(3).map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  idx={idx + 3}
                  totalCount={projects.length}
                  onOpenDetail={onOpenDetail}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Show More / Show Less Toggle Button */}
        {projects.length > 3 && (
          <motion.div
            variants={fadeUp}
            className="flex justify-center pt-2"
          >
            <button
              onClick={() => setShowAll(prev => !prev)}
              className="group flex items-center gap-2.5 px-6 py-3 rounded-xl border-2 border-ink-black bg-pale-yellow text-ink-black font-mono text-xs sm:text-sm font-bold neo-shadow neo-shadow-hover transition-all cursor-pointer select-none"
            >
              <span>
                {showAll 
                  ? 'Show Less ▴' 
                  : `View More Works (+${projects.length - 3} more) ▾`}
              </span>
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

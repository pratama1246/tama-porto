import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../../data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
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

// Auto-play interval in ms
const AUTOPLAY_DELAY = 4000

export default function Projects({ onOpenDetail }) {
  // Store page index
  const [page, setPage] = useState(0)
  
  const activeIdx = page

  // Auto-play state
  const isPausedRef = useRef(false)
  const progressRef = useRef(0)
  const progressRafRef = useRef(null)
  const startTimeRef = useRef(null)

  const washiColors = [
    'bg-[var(--accent-pink)]/70',
    'bg-[var(--accent-mint)]/70',
    'bg-[var(--accent-blue)]/70',
    'bg-[var(--accent-peach)]/70'
  ]

  // Decorative stickers on active project polaroid corner
  const activeSticker = (idx) => {
    switch (idx) {
      case 0: return '⭐'
      case 1: return '🚀'
      case 2: return '💡'
      case 3: return '🔥'
      default: return '✨'
    }
  }

  // Navigation handlers
  const paginate = useCallback((newDirection) => {
    setPage((curr) => (curr + newDirection + projects.length) % projects.length)
  }, [])

  const nextProject = useCallback(() => paginate(1), [paginate])
  const prevProject = useCallback(() => paginate(-1), [paginate])

  const handleDotClick = (i) => {
    if (i === activeIdx) return
    setPage(i)
  }

  // ── Progress bar animation & autoplay trigger ───────────────────────
  const startProgress = useCallback(() => {
    // Cancel any existing animation
    if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current)
    progressRef.current = 0
    startTimeRef.current = performance.now()

    const tick = (now) => {
      if (isPausedRef.current) {
        // Freeze: re-schedule without advancing time origin
        startTimeRef.current = now - progressRef.current * AUTOPLAY_DELAY
        progressRafRef.current = requestAnimationFrame(tick)
        return
      }
      const elapsed = now - startTimeRef.current
      const p = Math.min(elapsed / AUTOPLAY_DELAY, 1)
      progressRef.current = p
      
      if (p < 1) {
        progressRafRef.current = requestAnimationFrame(tick)
      } else {
        // Time's up! Transition to the next project
        setPage((currPage) => (currPage + 1) % projects.length)
      }
    }
    progressRafRef.current = requestAnimationFrame(tick)
  }, [])

  // Reset & restart everything when the active slide changes
  useEffect(() => {
    startProgress()
    return () => {
      if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current)
    }
  }, [activeIdx, startProgress])

  const handleMouseEnter = () => { isPausedRef.current = true }
  const handleMouseLeave = () => { isPausedRef.current = false }



  return (
    <section
      id="projects"
      className="min-h-screen w-full flex flex-col justify-center py-10 overflow-hidden relative"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-6 md:gap-10 w-full"
      >
        {/* Section Header */}
        <motion.div variants={fadeUp} className="max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-20">
          <h2
            className="inline-block px-5 py-2 md:px-7 md:py-3 rounded-xl text-xl sm:text-2xl md:text-4xl font-display font-extrabold text-ink-black bg-soft-blue border-2 border-ink-black neo-shadow rotate-[-1.5deg] tracking-tight m-0 select-none"
          >
            Featured Projects
          </h2>
        </motion.div>

        {/* Unified Board Container */}
        <div
          className="relative w-full z-10 flex items-center justify-center min-h-[600px] md:min-h-[500px] overflow-visible mt-8 md:mt-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => { isPausedRef.current = true; }}
          onTouchEnd={() => {
            setTimeout(() => { isPausedRef.current = false; }, 4000);
          }}
        >
          
          {/* FIXED Washi Tapes on top and bottom corners */}
          <div className="absolute top-[3%] left-[10%] w-24 h-5 bg-soft-blue/70 border border-ink-black/40 rotate-[-3deg] rounded-xs shadow-xs z-25 pointer-events-none hidden md:block" />
          <div className="absolute bottom-[3%] right-[10%] w-20 h-5 bg-lavender/70 border border-ink-black/40 rotate-[4deg] rounded-xs shadow-xs z-25 pointer-events-none hidden md:block" />

          {projects.map((project, idx) => {
            // Calculate relative distance with loop wrapping
            let diff = idx - activeIdx
            if (diff > projects.length / 2) {
              diff -= projects.length
            } else if (diff < -projects.length / 2) {
              diff += projects.length
            }

            const isActive = diff === 0
            const isNext = diff === 1
            const isPrev = diff === -1
            const isFar = !isActive && !isNext && !isPrev

            const cardWashiColor = washiColors[idx % washiColors.length]
            const cardSticker = activeSticker(idx)
            const cardTechString = project.tech.join(' / ').toUpperCase()

            return (
              <motion.div
                key={project.id}
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(160, 160, 190, 0.08) 1.5px, transparent 1.5px),
                    linear-gradient(90deg, rgba(160, 160, 190, 0.08) 1.5px, transparent 1.5px)
                  `,
                  backgroundSize: '20px 20px',
                }}
                animate={{
                  x: isActive ? 0 : isNext ? "88%" : isPrev ? "-88%" : diff > 0 ? "200%" : "-200%",
                  scale: isActive ? 1 : 0.9,
                  rotate: isActive ? 0.5 : isNext ? 3 : isPrev ? -2 : 0,
                  opacity: isActive ? 1 : isFar ? 0 : 0.35,
                  zIndex: isActive ? 20 : isFar ? 0 : 10,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => {
                  isPausedRef.current = true;
                }}
                onDragEnd={(event, info) => {
                  const swipeThreshold = 40
                  const velocityThreshold = 250
                  if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                    nextProject()
                  } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                    prevProject()
                  }
                  setTimeout(() => {
                    isPausedRef.current = false;
                  }, 4000)
                }}
                whileHover={!isActive ? { scale: 0.93, opacity: 0.55 } : undefined}
                className={`absolute left-0 right-0 mx-auto w-[90%] md:w-[85%] lg:w-[80%] max-w-[1100px] bg-white border-2 border-ink-black neo-shadow rounded-lg p-6 md:p-10 flex flex-col justify-between overflow-hidden touch-pan-y ${
                  isActive 
                    ? 'min-h-[540px] md:min-h-[480px] h-auto' 
                    : 'h-[280px] md:h-auto min-h-[280px] md:min-h-[480px] overflow-hidden cursor-pointer select-none'
                }`}
                onClick={() => {
                  if (!isActive) {
                    handleDotClick(idx)
                  }
                }}
              >
                {/* Top Row: Split Layout (Photo Left, Text Specs Right) */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between w-full flex-grow">
                  
                  {/* Left Column: Large Polaroid Photo Card */}
                  <div className="w-full md:w-[45%] flex items-center justify-center flex-shrink-0 relative">
                    <div 
                      data-cursor="view"
                      className="w-full max-w-[440px] p-4 pb-12 bg-white border-2 border-ink-black neo-shadow rounded-lg rotate-[-2deg] relative hover:rotate-0 hover:scale-102 active:scale-98 transition-all cursor-pointer"
                      onClick={(e) => {
                        if (!isActive) return
                        e.stopPropagation()
                        onOpenDetail?.(project.id)
                      }}
                    >
                      
                      {/* Polaroid Image */}
                      <div className={`relative aspect-video w-full overflow-hidden rounded-md border-2 border-ink-black select-none ${
                        project.id === 7 ? 'bg-white' : 'bg-[#f5e6c8]'
                      }`}>
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          className={`protected-image w-full h-full grayscale-[10%] hover:grayscale-0 transition-all duration-300 pointer-events-none ${
                            project.id === 7 ? 'object-contain p-1' : 'object-cover'
                          }`}
                          loading="lazy"
                        />
                      </div>

                      {/* Handwritten Label */}
                      <div className="mt-4 text-center font-handwrite text-[1rem] text-text-handwrite select-none font-semibold">
                        {project.title.toLowerCase().replace(/\s+/g, '_')}.png
                      </div>

                      {/* Washi Tape pinning the photo to the sheet */}
                      <div 
                        className={`absolute -top-3.5 left-[calc(50%-45px)] w-[90px] h-[18px] ${cardWashiColor} border border-ink-black/40 rotate-[-1deg] rounded-[2px] z-10 shadow-xs opacity-85 transition-colors duration-500`}
                      />

                      {/* Corner sticker */}
                      <div className="absolute -top-2.5 -right-2.5 w-8 h-8 bg-pale-yellow rounded-full flex items-center justify-center text-base select-none neo-shadow-sm rotate-[12deg] border-2 border-ink-black z-20">
                        {cardSticker}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Project Specifications */}
                  <div className={`w-full md:w-[55%] flex-col justify-between self-stretch gap-6 ${
                    isActive ? 'flex' : 'hidden md:flex'
                  }`}>
                    <div className="flex-grow flex flex-col justify-between gap-6">
                      <div className="flex flex-col gap-3">
                        
                        {/* Status & Category/Subheader */}
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-3 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase border-2 border-ink-black bg-pale-yellow text-ink-black neo-shadow-sm">
                            {project.status}
                          </span>
                        </div>

                        {/* Giant Bold Title */}
                        <h3 
                          className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-ink-black uppercase leading-[1.1] tracking-tight m-0"
                        >
                          {project.title}
                        </h3>

                        {/* Tech Stack - Space Mono Slashed Clean Text */}
                        <div 
                          className="font-mono text-[11px] md:text-xs font-bold tracking-wider text-text-muted uppercase mt-0.5"
                        >
                          {cardTechString}
                        </div>

                        {/* Description */}
                        <p 
                          className="text-xs md:text-sm text-ink-black leading-relaxed font-body mt-2 max-w-xl line-clamp-2 md:line-clamp-none"
                        >
                          {project.desc}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 pt-4 border-t-2 border-ink-black/10 flex flex-col gap-2.5 max-w-md">
                        <button
                          onClick={(e) => {
                            if (!isActive) return
                            e.stopPropagation()
                            onOpenDetail?.(project.id)
                          }}
                          disabled={!isActive}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-ink-black bg-soft-blue text-ink-black font-mono text-xs font-bold neo-shadow neo-shadow-hover transition-all cursor-pointer min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ReadmeIcon className="shrink-0" />
                          <span>See Detail (README.md)</span>
                        </button>
                        
                        {(project.github || project.live) && (
                          <div className="flex items-center gap-2.5 w-full">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => { if (!isActive) e.preventDefault() }}
                                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border-2 border-ink-black bg-white text-ink-black font-mono text-xs font-bold neo-shadow-sm hover:bg-pale-yellow transition-all min-h-[44px] no-underline ${
                                  isActive ? '' : 'pointer-events-none opacity-50'
                                }`}
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
                                onClick={(e) => { if (!isActive) e.preventDefault() }}
                                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border-2 border-ink-black bg-white text-ink-black font-mono text-xs font-bold neo-shadow-sm hover:bg-mint transition-all min-h-[44px] no-underline ${
                                  isActive ? '' : 'pointer-events-none opacity-50'
                                }`}
                              >
                                <ExternalIcon className="shrink-0" />
                                <span>Live Demo</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )
          })}

        </div>



        {/* Combined Navigation Bar (Outside Card) */}
        <div 
          className="w-full flex items-center justify-center gap-4 mt-2 md:mt-1 text-[var(--text-handwrite)] font-handwrite select-none text-sm relative z-30"
          style={{ fontFamily: 'var(--font-handwrite)' }}
        >
          <button 
            onClick={prevProject} 
            className="hover:scale-105 active:scale-95 transition-all cursor-pointer px-2 py-1 min-h-[30px]"
          >
            ← prev
          </button>
          
          <span className="opacity-30 hidden sm:inline">─────────</span>
          
          {/* Combined Dots indicator */}
          <div className="flex gap-1.5 items-center justify-center font-sans mx-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIdx === i ? 'bg-[var(--text-dark)] w-5' : 'bg-[var(--text-muted)]/30 hover:bg-[var(--text-muted)]/60'
                }`}
              />
            ))}
          </div>

          <span className="opacity-30 hidden sm:inline">─────────</span>
          
          <button 
            onClick={nextProject} 
            className="hover:scale-105 active:scale-95 transition-all cursor-pointer px-2 py-1 min-h-[30px]"
          >
            next →
          </button>
        </div>

        {/* Cursive Helper Text */}
        <p className="text-center font-handwrite text-xs text-[var(--text-handwrite)]/80 select-none">
          * Auto-flipping every 4s — hover to pause, click arrows or dots to navigate! *
        </p>


      </motion.div>
    </section>
  )
}

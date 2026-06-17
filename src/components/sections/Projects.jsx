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
  // Progress: 0 → 1 over AUTOPLAY_DELAY ms
  const [progress, setProgress] = useState(0)
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
      setProgress(p)
      
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
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
          <motion.div
            variants={fadeUp}
            className="inline-block px-3 py-1 rounded-sm text-[12px] font-semibold uppercase tracking-wider bg-[var(--accent-blue)] border border-black/5 rotate-[1deg] mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            My Works Project
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold text-[1.5rem] md:text-[2rem] tracking-tight text-[var(--text-dark)] m-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The Project Blueprints
          </motion.h2>
        </div>

        {/* Unified Board Container */}
        <div
          className="relative w-full z-10 flex items-center justify-center min-h-[600px] md:min-h-[500px] overflow-visible mt-8 md:mt-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          
          {/* FIXED Washi Tapes on top and bottom corners (remain completely static as the page slides underneath them) */}
          <div className="absolute top-[3%] left-[10%] w-24 h-5 bg-[var(--accent-blue)]/60 rotate-[-3deg] rounded-xs shadow-3xs z-25 pointer-events-none hidden md:block" />
          <div className="absolute bottom-[3%] right-[10%] w-20 h-5 bg-[var(--accent-lavender)]/60 rotate-[4deg] rounded-xs shadow-3xs z-25 pointer-events-none hidden md:block" />

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
                    linear-gradient(rgba(160, 160, 190, 0.05) 1.5px, transparent 1.5px),
                    linear-gradient(90deg, rgba(160, 160, 190, 0.05) 1.5px, transparent 1.5px)
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
                  type: 'tween',
                  ease: 'easeOut',
                  duration: 0.28
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(event, info) => {
                  const swipeThreshold = 50
                  if (info.offset.x < -swipeThreshold) {
                    nextProject()
                  } else if (info.offset.x > swipeThreshold) {
                    prevProject()
                  }
                }}
                whileHover={!isActive ? { scale: 0.93, opacity: 0.55 } : undefined}
                className={`absolute left-0 right-0 mx-auto w-[90%] md:w-[85%] lg:w-[80%] max-w-[1100px] bg-[#fefcf7] border border-black/10 shadow-md rounded-[6px] p-6 md:p-10 flex flex-col justify-between overflow-hidden touch-pan-y ${
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
                    <div className="w-full max-w-[440px] p-4 pb-12 bg-white border border-black/10 shadow-sm rounded-xs rotate-[-2deg] relative hover:rotate-0 hover:scale-102 active:scale-98 transition-all">
                      
                      {/* Polaroid Image */}
                      <div className="relative aspect-video w-full bg-[var(--bg-secondary)] overflow-hidden rounded-[2px] border border-black/5 select-none">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          className="protected-image w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-300 pointer-events-none"
                          loading="lazy"
                        />
                      </div>

                      {/* Handwritten Label */}
                      <div className="mt-4 text-center font-handwrite text-[1rem] text-[var(--text-handwrite)] select-none">
                        {project.title.toLowerCase().replace(/\s+/g, '_')}.png
                      </div>

                      {/* Washi Tape pinning the photo to the sheet */}
                      <div 
                        className={`absolute -top-3.5 left-[calc(50%-45px)] w-[90px] h-[18px] ${cardWashiColor} rotate-[-1deg] rounded-[2px] z-10 shadow-3xs opacity-85 transition-colors duration-500`}
                      />

                      {/* Corner sticker */}
                      <div className="absolute -top-2.5 -right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center text-base select-none shadow-xs rotate-[12deg] border border-black/5 z-20">
                        {cardSticker}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Project Specifications (Bold minimalist style inspired by image.png) */}
                  <div className={`w-full md:w-[55%] flex-col justify-between self-stretch gap-6 ${
                    isActive ? 'flex' : 'hidden md:flex'
                  }`}>
                    <div className="flex-grow flex flex-col justify-between gap-6">
                      <div className="flex flex-col gap-3">
                        
                        {/* Status & Category/Subheader */}
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-sm text-[9px] font-semibold tracking-wider uppercase border border-black/10 bg-white text-[var(--text-dark)]">
                            {project.status}
                          </span>
                        </div>

                        {/* Giant Bold Title (Uppercase & Heavy) */}
                        <h3 
                          className="font-display font-semibold text-2xl md:text-3xl lg:text-4xl text-[var(--text-dark)] uppercase leading-[1.1] tracking-tight m-0"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {project.title}
                        </h3>

                        {/* Tech Stack - Slashed Clean Text (LARAVEL / FIGMA / MYSQL) */}
                        <div 
                          className="font-body text-[10px] md:text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase mt-0.5"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {cardTechString}
                        </div>

                        {/* Description */}
                        <p 
                          className="text-xs md:text-sm text-[var(--text-dark)]/85 leading-relaxed font-body mt-2 max-w-xl line-clamp-2 md:line-clamp-none"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {project.desc}
                        </p>
                      </div>

                      {/* Action Buttons (Clean Thin Outline Style) */}
                      <div className="mt-4 pt-4 border-t border-black/5 flex flex-col gap-2 max-w-md">
                        <button
                          onClick={(e) => {
                            if (!isActive) return
                            e.stopPropagation()
                            onOpenDetail?.(project.id)
                          }}
                          disabled={!isActive}
                          className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-sm border border-[var(--text-dark)] text-[var(--text-dark)] text-xs font-semibold hover:bg-black/5 active:scale-[0.98] transition-all cursor-pointer min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ReadmeIcon className="shrink-0" />
                          See Detail (README.md)
                        </button>
                        
                        {(project.github || project.live) && (
                          <div className="flex items-center gap-2 w-full">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => { if (!isActive) e.preventDefault() }}
                                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-sm border border-black/15 text-[var(--text-dark)]/80 text-xs font-semibold hover:border-[var(--text-dark)] hover:text-[var(--text-dark)] hover:bg-black/5 transition-all min-h-[44px] no-underline ${
                                  isActive ? '' : 'pointer-events-none opacity-50'
                                }`}
                              >
                                <GitHubIcon className="shrink-0" />
                                GitHub
                              </a>
                            )}
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => { if (!isActive) e.preventDefault() }}
                                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-sm border border-black/15 text-[var(--text-dark)]/80 text-xs font-semibold hover:border-[var(--text-dark)] hover:text-[var(--text-dark)] hover:bg-black/5 transition-all min-h-[44px] no-underline ${
                                  isActive ? '' : 'pointer-events-none opacity-50'
                                }`}
                              >
                                <ExternalIcon className="shrink-0" />
                                Live Demo
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

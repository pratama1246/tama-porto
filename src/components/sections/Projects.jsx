import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../../data/projects'
import CardSwap, { Card } from '../reactbits/CardSwap'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
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

export default function Projects({ onOpenDetail }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeProject = projects[activeIdx] || projects[0]

  // Scrapbook colors for the details note card
  const stickyColors = [
    'bg-[var(--accent-lavender)]',
    'bg-[var(--accent-peach)]',
    'bg-[var(--accent-yellow)]',
    'bg-[var(--accent-mint)]'
  ]
  const washiColors = [
    'bg-[var(--accent-pink)]/70',
    'bg-[var(--accent-mint)]/70',
    'bg-[var(--accent-blue)]/70',
    'bg-[var(--accent-peach)]/70'
  ]

  const cardColor = stickyColors[activeIdx % stickyColors.length]
  const washiColor = washiColors[activeIdx % washiColors.length]

  return (
    <section
      id="projects"
      className="py-10 px-4 md:py-24 md:px-8 max-w-7xl mx-auto"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-10 lg:gap-14"
      >
        {/* Section Header */}
        <div>
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
            The Polaroid Gallery
          </motion.h2>
        </div>

        {/* Dynamic Split Layout: Details Note + Polaroid Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Project Details Sticky Note */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center w-full relative z-20 lg:-translate-y-36">
            <div className={`relative p-6 md:p-8 ${cardColor} border border-black/10 rounded-sm shadow-sm rotate-[-1deg] flex flex-col justify-between min-h-[340px] max-w-md mx-auto lg:mx-0 transition-colors duration-500`}>
              
              {/* Washi Tape Accent */}
              <div className={`absolute -top-3 left-10 w-24 h-5 ${washiColor} rotate-[-3deg] rounded-sm z-10 shadow-xs transition-colors duration-500`} />
              
              {/* Paper Clip Accent (CSS-based) */}
              <div className="absolute top-4 right-6 w-3 h-8 border-2 border-[var(--text-muted)] rounded-full rotate-[15deg] opacity-80" />

              {/* Animating content inside details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-3.5"
                >
                  {/* Status Badge */}
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-sm text-[9px] font-bold tracking-wider uppercase shadow-xs border border-black/5 bg-white text-[var(--text-dark)]">
                      {activeProject.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-medium text-lg md:text-xl text-[var(--text-dark)] leading-tight m-0">
                    {activeProject.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-[var(--text-dark)]/85 leading-relaxed font-body m-0">
                    {activeProject.desc}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activeProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-sm bg-white/60 text-[10px] font-semibold text-[var(--text-dark)]/90 border border-black/5 shadow-3xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons (GitHub / Live / See Detail) */}
              <div className="mt-6 pt-4 border-t border-black/5 flex flex-col gap-2">
                <button
                  onClick={() => onOpenDetail?.(activeProject.id)}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-[var(--text-dark)] text-white text-xs font-semibold hover:bg-[var(--text-dark)]/90 active:scale-[0.98] transition-all cursor-pointer shadow-3xs min-h-[44px]"
                >
                  <ReadmeIcon className="shrink-0" />
                  See Detail (README.md)
                </button>
                
                {(activeProject.github || activeProject.live) && (
                  <div className="flex items-center gap-3 w-full">
                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm border border-[var(--text-dark)] text-xs font-semibold hover:bg-black/5 transition-colors duration-200 min-h-[44px] no-underline text-[var(--text-dark)]"
                      >
                        <GitHubIcon className="shrink-0" />
                        GitHub
                      </a>
                    )}
                    {activeProject.live && (
                      <a
                        href={activeProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm border border-[var(--text-dark)] text-xs font-semibold hover:bg-black/5 transition-colors duration-200 min-h-[44px] no-underline text-[var(--text-dark)]"
                      >
                        <ExternalIcon className="shrink-0" />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Cursive helper text under details card */}
            <p className="mt-4 text-center lg:text-left font-handwrite text-xs text-[var(--text-handwrite)]/80 select-none">
              * Psst... click the top polaroid to flip through the gallery! *
            </p>
          </div>

          {/* Right Column: CardSwap Polaroid Stack */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center items-center relative h-[420px] sm:h-[520px] lg:h-[700px] w-full">
            
            {/* Wrapper to center and size the CardSwap container, shifted to the right */}
            <div className="relative w-[450px] h-[580px] scale-[0.5] min-[380px]:scale-[0.6] min-[450px]:scale-[0.7] sm:scale-[0.8] lg:scale-100 translate-x-6 sm:translate-x-12 lg:translate-x-24 origin-center transition-all duration-300">
              <CardSwap
                width={450}
                height={580}
                cardDistance={24}
                verticalDistance={27}
                delay={4500}
                pauseOnHover={true}
                onIndexChange={setActiveIdx}
                containerClassName="relative w-full h-full perspective-[900px] overflow-visible -translate-x-2 lg:translate-x-0"
              >
                {projects.map((project, idx) => (
                  <Card
                    key={project.id}
                    className="p-5 pb-16 bg-white border border-black/10 shadow-sm rounded-sm flex flex-col justify-between cursor-pointer animate-none"
                  >
                    {/* Polaroid Image */}
                    <div className="relative aspect-[4/3] w-full bg-[var(--bg-secondary)] overflow-hidden rounded-[2px] border border-black/5 select-none">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-300 pointer-events-none"
                        loading="lazy"
                      />
                    </div>

                    {/* Handwritten Label */}
                    <div className="mt-4 text-center font-handwrite text-[1.15rem] text-[var(--text-handwrite)] select-none">
                      {project.title.toLowerCase().replace(/\s+/g, '_')}.png
                    </div>

                    {/* Fun decorative stickers on Polaroid corners */}
                    {idx === 0 && (
                      <div className="absolute -top-3.5 -left-3.5 w-10 h-10 bg-[var(--accent-pink)]/90 rounded-full flex items-center justify-center text-lg select-none shadow-xs rotate-[-12deg] border border-black/5">
                        ⭐
                      </div>
                    )}
                    {idx === 1 && (
                      <div className="absolute -bottom-3.5 -right-3.5 w-10 h-10 bg-[var(--accent-blue)]/90 rounded-full flex items-center justify-center text-lg select-none shadow-xs rotate-[15deg] border border-black/5">
                        🚀
                      </div>
                    )}
                    {idx === 2 && (
                      <div className="absolute -top-3.5 -right-3.5 w-10 h-10 bg-[var(--accent-yellow)]/90 rounded-full flex items-center justify-center text-lg select-none shadow-xs rotate-[8deg] border border-black/5">
                        💡
                      </div>
                    )}
                    {idx === 3 && (
                      <div className="absolute -bottom-3.5 -left-3.5 w-10 h-10 bg-[var(--accent-mint)]/90 rounded-full flex items-center justify-center text-lg select-none shadow-xs rotate-[-5deg] border border-black/5">
                        🔥
                      </div>
                    )}
                  </Card>
                ))}
              </CardSwap>
            </div>

            {/* Carousel Index Indicator Dots */}
            <div className="flex gap-1.5 justify-center mt-6 lg:mt-8 z-10">
              {projects.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIdx === i ? 'bg-[var(--text-dark)] w-4' : 'bg-[var(--text-muted)]/30'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  )
}

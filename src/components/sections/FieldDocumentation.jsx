import { useEffect } from 'react'
import { motion } from 'framer-motion'

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

// Instagram Icon (SVG)
function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default function FieldDocumentation() {
  const instagramUrl = "https://www.instagram.com/p/DdIZhI7qIc1/"

  useEffect(() => {
    // Official Instagram Embed script to process and dynamically adjust embed proportions
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    } else {
      const script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      script.onload = () => {
        window.instgrm?.Embeds.process()
      }
      document.body.appendChild(script)
    }
  }, [])

  return (
    <section
      id="field-documentation"
      className="py-10 px-4 sm:px-6 md:py-24 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full overflow-visible relative"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex flex-col gap-8 md:gap-12 w-full"
      >
        {/* Section Header */}
        <motion.div variants={fadeUp} className="w-full">
          <h2
            className="inline-block px-5 py-2 md:px-7 md:py-3 rounded-xl text-xl sm:text-2xl md:text-4xl font-display font-extrabold text-ink-black bg-soft-blue border-2 border-ink-black neo-shadow rotate-[-1deg] tracking-tight m-0 select-none"
          >
            Field Documentation
          </h2>
        </motion.div>

        {/* Showcase Card */}
        <motion.div variants={fadeUp} className="w-full">
          <div
            style={{
              backgroundImage: `
                linear-gradient(rgba(160, 160, 190, 0.08) 1.5px, transparent 1.5px),
                linear-gradient(90deg, rgba(160, 160, 190, 0.08) 1.5px, transparent 1.5px)
              `,
              backgroundSize: '20px 20px',
            }}
            className="w-full bg-white border-2 border-ink-black neo-shadow rounded-2xl p-5 sm:p-8 md:p-12 relative overflow-hidden"
          >
            {/* Top Right: Pelindo Official Logo (subtle, clean) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-7 z-10 flex items-center">
              <img
                src="/assets/pelindo-logo.svg"
                alt="Pelindo Official Logo"
                className="h-4.5 sm:h-5.5 md:h-6 w-auto object-contain select-none opacity-90"
                draggable={false}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center pt-2 sm:pt-0">
              
              {/* Left Column: Embed Container clipped exactly at video bottom (no comments/likes) */}
              <div className="lg:col-span-5 w-full flex justify-center items-center">
                <div className="w-full max-w-[340px] sm:max-w-[350px] aspect-[100/139] rounded-2xl overflow-hidden border-2 border-ink-black neo-shadow bg-white relative flex justify-center">
                  <iframe
                    src="https://www.instagram.com/reel/DdIZhI7qIc1/embed"
                    title="Field Documentation - Pelindo Tanjung Intan"
                    className="w-full h-[680px] border-0 block"
                    loading="lazy"
                    scrolling="no"
                    allowTransparency="true"
                  />
                </div>
              </div>

              {/* Right Column: Project Details & Meta */}
              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-mint border border-ink-black rounded-lg text-xs font-mono font-bold text-ink-black uppercase tracking-wider neo-shadow-sm">
                    🎬 Video Project
                  </span>
                  <span className="px-3 py-1 bg-pastel-yellow border border-ink-black rounded-lg text-xs font-mono font-bold text-ink-black uppercase tracking-wider neo-shadow-sm">
                    ⚓ Pelindo Multi Terminal
                  </span>
                </div>

                {/* Subtitle / Project Heading with Date */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-ink-black tracking-tight leading-snug">
                  Port Operational Activity — Tanjung Intan{' '}
                  <span className="inline-block text-base sm:text-lg md:text-xl font-mono font-normal text-text-muted">
                    (8 September 2026)
                  </span>
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-text-dark/85 font-body leading-relaxed">
                  Documentation of port activities during my internship at Pelindo, where I participated as a presenter in an official operational activity report.
                </p>

                {/* Highlights Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#fdf6e3] border border-ink-black/20 rounded-xl p-3">
                    <span className="text-xs font-mono text-text-muted block">ROLE</span>
                    <span className="text-sm font-semibold text-ink-black font-body">On-Camera Presenter</span>
                  </div>
                  <div className="bg-[#fdf6e3] border border-ink-black/20 rounded-xl p-3">
                    <span className="text-xs font-mono text-text-muted block">LOCATION</span>
                    <span className="text-sm font-semibold text-ink-black font-body">Tanjung Intan, Cilacap</span>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-2">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-sticker-pink border-2 border-ink-black neo-shadow hover:translate-x-1 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all font-display font-bold text-ink-black text-sm sm:text-base select-none group"
                  >
                    <InstagramIcon className="w-4.5 h-4.5 text-ink-black group-hover:scale-110 transition-transform" />
                    <span>Watch on Instagram</span>
                    <span className="text-lg leading-none">↗</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

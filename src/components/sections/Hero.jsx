import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Framer Motion variants for section enter animations
const fadeUp = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
}

export default function Hero({ onOpenBirthday, isLoading = false }) {
  // Refs for direct DOM zIndex updates to avoid React re-renders during dragging
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const stickyNoteVariants = {
    hidden: { 
      x: isMobile ? 0 : 200, 
      y: isMobile ? 40 : 150, 
      rotate: isMobile ? -8 : -25, 
      opacity: 0 
    },
    visible: {
      x: 0,
      y: 0,
      rotate: -4,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }
    }
  }

  const polaroidVariants = {
    hidden: { 
      x: isMobile ? 0 : 250, 
      y: isMobile ? 40 : -50, 
      rotate: isMobile ? 8 : 25, 
      opacity: 0 
    },
    visible: {
      x: 0,
      y: 0,
      rotate: 6,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }
    }
  }

  const bringCardToFront = (index) => {
    if (index === 0) {
      if (card1Ref.current) card1Ref.current.style.zIndex = '30'
      if (card2Ref.current) card2Ref.current.style.zIndex = '20'
    } else {
      if (card1Ref.current) card1Ref.current.style.zIndex = '20'
      if (card2Ref.current) card2Ref.current.style.zIndex = '30'
    }
  }

  return (
    <section
      id="hero"
      className="relative z-20 min-h-[90svh] flex items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-20 px-4 sm:px-8 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full overflow-hidden lg:overflow-visible"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={!isLoading ? "visible" : "hidden"}
        className="w-full text-left relative z-10 flex flex-col gap-4 sm:gap-6"
      >
        {/* Top Header Area: Badges & Massive Display Name */}
        <div className="w-full flex flex-col items-start">
          
          {/* Welcome Tag & Subtle Birthday Release Clue */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
            <motion.div
              variants={fadeUp}
              className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-md text-[11px] sm:text-[12px] font-mono font-bold tracking-wider uppercase bg-lavender text-ink-black border-2 border-ink-black neo-shadow rotate-[-2deg] select-none"
            >
              Welcome to my studio
            </motion.div>

            <motion.button
              onClick={(e) => {
                e.preventDefault()
                if (onOpenBirthday) onOpenBirthday()
              }}
              variants={fadeUp}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-[#ffd4b8] text-ink-black border-2 border-ink-black neo-shadow-sm rotate-[2deg] select-none no-underline cursor-pointer"
            >
              ⚡ v20.0 (15.08)
            </motion.button>
          </div>

          {/* Display Name Header — Scaled precisely for 320px to 4K */}
          <motion.div variants={fadeUp} className="relative select-none w-full">
            <h1 className="font-display font-extrabold text-[2.5rem] xs:text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8.2rem] leading-[0.96] lg:leading-[0.92] tracking-tight text-ink-black m-0">
              Pratama Putra Purwanto
            </h1>
          </motion.div>
        </div>

        {/* Bottom Split: Bio & CTA on Left, Interactive Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start w-full mt-2 sm:mt-6">
          
          {/* Left Column: Bio Teaser & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start relative">
            
            {/* Subtitle / Bio Teaser with uniform line-height & clean highlights */}
            <motion.div variants={fadeUp} className="max-w-[680px] w-full">
              <p className="text-[0.95rem] sm:text-lg md:text-xl text-text-muted leading-[1.5] sm:leading-[1.55] font-body m-0">
                <span className="font-bold text-ink-black">Frontend Developer</span> with a solid foundation in{' '}
                <span className="font-bold text-ink-black underline decoration-sticker-pink decoration-[2.5px] underline-offset-4">
                  Network &amp; Backend Engineering
                </span>
                . Bridging pixel-perfect UI design with reliable system fundamentals to craft{' '}
                <span className="font-bold text-ink-black px-1.5 py-0.5 rounded-sm bg-pale-yellow border border-ink-black/30 box-decoration-clone inline">
                  expressive
                </span>{' '}
                web experiences that truly feel{' '}
                <span className="font-bold text-ink-black px-1.5 py-0.5 rounded-sm bg-mint border border-ink-black/30 box-decoration-clone inline">
                  alive.
                </span>
              </p>
            </motion.div>

            {/* CTA Button and Arrow Doodle */}
            <motion.div
              variants={fadeUp}
              className="mt-6 sm:mt-8 flex flex-col items-start gap-2 relative"
            >
              <div className="relative">
                <a
                  href="#about"
                  className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg border-2 border-ink-black bg-soft-blue text-ink-black font-mono text-xs sm:text-sm font-bold neo-shadow neo-shadow-hover active:scale-95 transition-transform no-underline inline-flex items-center gap-2"
                >
                  <span>Enter Gallery</span>
                  <span className="text-base">→</span>
                </a>

                {/* Hand-drawn Arrow Doodle */}
                <div className="absolute left-[180px] -top-3 hidden sm:block pointer-events-none select-none text-text-muted w-28 h-12">
                  <svg width="70" height="40" viewBox="0 0 70 40" fill="none">
                    <path
                      d="M10,8 Q35,8 55,28"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M43,27 L55,28 L51,16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="absolute -right-14 top-2.5 text-[0.85rem] text-text-handwrite select-none rotate-[5deg] whitespace-nowrap font-bold"
                    style={{ fontFamily: 'var(--font-handwrite)' }}
                  >
                    Click to enter!
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Tactile Studio Collage (Overlapping & Desktop-Draggable) */}
          <div className="lg:col-span-5 flex justify-center items-start relative min-h-[290px] xs:min-h-[310px] sm:min-h-[340px] lg:min-h-[360px] w-full select-none mt-2 sm:mt-4 lg:-mt-14 xl:-mt-20">
          
            {/* Card 1: Sticky Note (Mood/State) - Index 0 */}
            <motion.div
              ref={card1Ref}
              drag={!isMobile}
              dragMomentum={false}
              dragElastic={0}
              onDragStart={() => bringCardToFront(0)}
              onTapStart={() => bringCardToFront(0)}
              style={{
                zIndex: 10,
                touchAction: isMobile ? 'auto' : 'none'
              }}
              variants={stickyNoteVariants}
              whileHover={isMobile ? {} : { scale: 1.04, rotate: -2, transition: { duration: 0.15 } }}
              whileDrag={{ scale: 1.05, zIndex: 100 }}
              whileTap={{ scale: 0.98 }}
              className={`absolute left-1 xs:left-3 sm:left-[6%] lg:left-[2%] top-0 sm:-top-2 lg:-top-6 bg-pale-yellow p-3.5 sm:p-4 w-[155px] xs:w-[170px] sm:w-[195px] lg:w-[210px] aspect-square rounded-lg neo-shadow border-2 border-ink-black will-change-transform ${
                isMobile ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
              }`}
            >
              <h3 
                className="text-[10px] sm:text-[11px] font-mono font-bold text-text-handwrite tracking-wider uppercase border-b-2 border-ink-black/20 pb-1 mb-2 sm:mb-2.5"
              >
                ⚡ CURRENT STATE
              </h3>
              <ul
                className="list-none p-0 m-0 flex flex-col gap-1 sm:gap-1.5 text-[0.8rem] sm:text-[0.88rem] text-text-handwrite leading-tight font-medium"
                style={{ fontFamily: 'var(--font-handwrite)' }}
              >
                <li>🎧 Spotify on repeat</li>
                <li>🍫 Iced Chocolate: 100%</li>
                <li>📍 Cilacap, ID</li>
                <li>💻 Building interactive UI</li>
                <li>🌐 Analyzing packet flows</li>
              </ul>
            </motion.div>
   
            {/* Card 2: Mini Polaroid (Workspace / Tech Drawing) - Index 1 */}
            <motion.div
              ref={card2Ref}
              drag={!isMobile}
              dragMomentum={false}
              dragElastic={0}
              onDragStart={() => bringCardToFront(1)}
              onTapStart={() => bringCardToFront(1)}
              style={{
                zIndex: 20,
                touchAction: isMobile ? 'auto' : 'none'
              }}
              variants={polaroidVariants}
              whileHover={isMobile ? {} : { scale: 1.04, rotate: 3, transition: { duration: 0.15 } }}
              whileDrag={{ scale: 1.05, zIndex: 100 }}
              whileTap={{ scale: 0.98 }}
              className={`absolute right-1 xs:right-3 sm:right-[6%] lg:right-[4%] top-14 xs:top-14 sm:top-4 lg:-top-16 bg-white p-2.5 pb-4 sm:p-3 sm:pb-6 w-[170px] xs:w-[190px] sm:w-[225px] lg:w-[245px] rounded-lg neo-shadow border-2 border-ink-black will-change-transform ${
                isMobile ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
              }`}
            >
              {/* Torn Washi Tape on top corner */}
              <div
                className="absolute -top-3.5 right-5 sm:right-8 h-[16px] sm:h-[18px] w-[50px] sm:w-[64px] rounded-xs border border-ink-black/40 shadow-xs pointer-events-none"
                style={{
                  backgroundColor: 'var(--color-mint, #D0F0C0)',
                  clipPath: 'polygon(0% 10%, 4% 0%, 96% 5%, 100% 12%, 98% 88%, 94% 100%, 6% 95%, 0% 90%)',
                  mixBlendMode: 'multiply',
                  transform: 'rotate(-4deg)'
                }}
              />
   
              {/* Browser Drawing/Mockup */}
              <div className="w-full aspect-square bg-white flex flex-col border-2 border-ink-black rounded-md p-1 sm:p-1.5 overflow-hidden relative">
                <div className="flex gap-1 border-b border-ink-black/20 pb-0.5 sm:pb-1 mb-1 select-none pointer-events-none">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-red-400 border border-ink-black/40"></span>
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-yellow-400 border border-ink-black/40"></span>
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-400 border border-ink-black/40"></span>
                </div>
                <img
                  src="https://media.giphy.com/media/UWrvP9jVYegGdCXq6C/giphy.gif"
                  alt="Cute heart animation"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="protected-image w-full flex-grow object-contain pointer-events-none select-none"
                />
              </div>
   
              <div
                className="text-center mt-1.5 sm:mt-3 text-[0.78rem] sm:text-[0.85rem] font-medium text-text-handwrite"
                style={{ fontFamily: 'var(--font-handwrite)' }}
              >
                🐢 juhoon (cortis).gif
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

    </section>
  )
}


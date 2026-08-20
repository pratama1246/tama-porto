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
      className="relative z-20 min-h-[90svh] flex items-center justify-center pt-28 pb-16 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full overflow-hidden lg:overflow-visible"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={!isLoading ? "visible" : "hidden"}
        className="w-full text-left relative z-10 flex flex-col gap-4 sm:gap-5"
      >
        {/* Top Header Area: Badges & Massive Display Name */}
        <div className="w-full flex flex-col items-start">
          
          {/* Welcome Tag & Subtle Birthday Release Clue (Elevated with breathing room) */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4 flex-wrap">
            <motion.div
              variants={fadeUp}
              className="px-3.5 py-1.5 rounded-md text-[12px] font-mono font-bold tracking-wider uppercase bg-lavender text-ink-black border-2 border-ink-black neo-shadow rotate-[-2deg] select-none"
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
              className="px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-[#ffd4b8] text-ink-black border-2 border-ink-black neo-shadow-sm rotate-[2deg] select-none no-underline cursor-pointer"
            >
              ⚡ v20.0 (15.08)
            </motion.button>
          </div>

          {/* Massive Full-Width Display Name Header */}
          <motion.div variants={fadeUp} className="relative select-none w-full">
            <h1 className="font-display font-extrabold text-[2.8rem] sm:text-[4.5rem] md:text-[5.8rem] lg:text-[7rem] xl:text-[8rem] leading-[0.94] tracking-tight text-ink-black m-0">
              Pratama Putra Purwanto
            </h1>
          </motion.div>
        </div>

        {/* Bottom Split: Bio & CTA on Left, Interactive Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start w-full mt-2 sm:mt-3">
          
          {/* Left Column: Bio Teaser & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start relative">
            
            {/* Subtitle / Bio Teaser with clean scrapbook highlights & underlines */}
            <motion.div variants={fadeUp} className="max-w-[650px] w-full">
              <p className="text-lg md:text-xl text-text-muted leading-relaxed font-body m-0">
                D3 Informatics Engineering student, Frontend Developer &amp; Network Administrator. Inspired by{' '}
                <span className="font-bold text-ink-black border-b-2 border-sticker-pink">stories</span>,{' '}
                <span className="font-bold text-ink-black px-1.5 py-0.5 rounded bg-pale-yellow border border-ink-black/30">music</span>,{' '}
                <span className="font-bold text-ink-black px-1.5 py-0.5 rounded bg-lavender border border-ink-black/30">aesthetics</span>, and{' '}
                <span className="font-bold text-ink-black px-1.5 py-0.5 rounded bg-mint border border-ink-black/30">technology.</span>
              </p>
            </motion.div>

            {/* CTA Button and Arrow Doodle */}
            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-col items-start gap-2 relative"
            >
              <div className="relative">
                <a
                  href="#about"
                  className="px-6 py-3 rounded-lg border-2 border-ink-black bg-soft-blue text-ink-black font-mono text-sm font-bold neo-shadow neo-shadow-hover no-underline inline-flex items-center gap-2"
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

          {/* Right Column: Interactive Polaroid Stack (Elevated slightly) */}
          <div className="lg:col-span-5 flex justify-center items-start relative min-h-[300px] sm:min-h-[380px] w-full select-none lg:-mt-6">
          
          {/* Card 1: Sticky Note (Mood/State) - Index 0 */}
          <motion.div
            ref={card1Ref}
            drag={!isMobile}
            dragMomentum={false}
            onDragStart={() => bringCardToFront(0)}
            onTapStart={() => bringCardToFront(0)}
            style={{
              zIndex: 10,
            }}
            variants={stickyNoteVariants}
            whileHover={isMobile ? {} : { scale: 1.05, rotate: -2, transition: { duration: 0.15 } }}
            whileDrag={{ scale: 1.03, zIndex: 100 }}
            className={`absolute left-[5%] sm:left-[8%] top-[2%] bg-pale-yellow p-4 w-[180px] sm:w-[200px] aspect-square rounded-lg neo-shadow border-2 border-ink-black will-change-transform ${
              isMobile ? 'cursor-default' : 'cursor-grab active:cursor-grabbing touch-none'
            }`}
          >
            <h3 
              className="text-[11px] font-mono font-bold text-text-handwrite tracking-wider uppercase border-b-2 border-ink-black/20 pb-1 mb-2.5"
            >
              ⚡ CURRENT STATE
            </h3>
            <ul
              className="list-none p-0 m-0 flex flex-col gap-1.5 text-[0.9rem] text-text-handwrite leading-tight font-medium"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              <li>🎧 Lofi beats playing</li>
              <li>☕ Coffee level: 85%</li>
              <li>📍 Cilacap, ID</li>
              <li>🚀 Crafting in React</li>
            </ul>
          </motion.div>
 
          {/* Card 2: Mini Polaroid (Workspace / Tech Drawing) - Index 1 */}
          <motion.div
            ref={card2Ref}
            drag={!isMobile}
            dragMomentum={false}
            onDragStart={() => bringCardToFront(1)}
            onTapStart={() => bringCardToFront(1)}
            style={{
              zIndex: 20,
            }}
            variants={polaroidVariants}
            whileHover={isMobile ? {} : { scale: 1.05, rotate: 3, transition: { duration: 0.15 } }}
            whileDrag={{ scale: 1.03, zIndex: 100 }}
            className={`absolute right-[5%] sm:right-[8%] -top-3 sm:-top-6 bg-white p-3 pb-6 w-[220px] sm:w-[245px] rounded-lg neo-shadow border-2 border-ink-black will-change-transform ${
              isMobile ? 'cursor-default' : 'cursor-grab active:cursor-grabbing touch-none'
            }`}
          >
            {/* Torn Washi Tape on top corner */}
            <div
              className="absolute -top-3.5 right-8 h-[18px] w-[64px] rounded-xs border border-ink-black/40 shadow-xs"
              style={{
                backgroundColor: 'var(--color-mint, #D0F0C0)',
                clipPath: 'polygon(0% 10%, 4% 0%, 96% 5%, 100% 12%, 98% 88%, 94% 100%, 6% 95%, 0% 90%)',
                mixBlendMode: 'multiply',
                transform: 'rotate(-4deg)'
              }}
            />
 
            {/* Browser Drawing/Mockup */}
            <div className="w-full aspect-square bg-white flex flex-col border-2 border-ink-black rounded-md p-1.5 overflow-hidden relative">
              <div className="flex gap-1 border-b border-ink-black/20 pb-1 mb-1 select-none pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-red-400 border border-ink-black/40"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-400 border border-ink-black/40"></span>
                <span className="w-2 h-2 rounded-full bg-green-400 border border-ink-black/40"></span>
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
              className="text-center mt-3 text-[0.85rem] font-medium text-text-handwrite"
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

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import SplitText from '../reactbits/SplitText'
import TextType from '../reactbits/TextType'

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

const stickyNoteVariants = {
  hidden: { x: 200, y: 150, rotate: -25, opacity: 0 },
  visible: {
    x: 0,
    y: 0,
    rotate: -4,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }
  }
}

const polaroidVariants = {
  hidden: { x: 250, y: -50, rotate: 25, opacity: 0 },
  visible: {
    x: 0,
    y: 0,
    rotate: 6,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }
  }
}

const reactCssBadgeVariants = {
  hidden: { y: -80, opacity: 0, rotate: -15 },
  visible: {
    y: 0,
    opacity: 1,
    rotate: -4,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }
  }
}

const figmaBadgeVariants = {
  hidden: { x: -100, y: 100, opacity: 0, rotate: 20 },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 8,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }
  }
}

const pncBadgeVariants = {
  hidden: { x: 100, y: -100, opacity: 0, rotate: -10 },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 6,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }
  }
}

const laravelBadgeVariants = {
  hidden: { x: 100, y: 100, opacity: 0, rotate: -20 },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: -8,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }
  }
}

const descriptionSegments = [
  { text: "D3 Informatics Engineering student & Frontend-leaning developer. Inspired by ", type: "normal" },
  { text: "stories", type: "underline" },
  { text: ", ", type: "normal" },
  { text: "music and technology.", type: "highlight" }
];

export default function Hero() {
  // Refs for direct DOM zIndex updates to avoid React re-renders during dragging
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)

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
      className="relative z-20 min-h-[90svh] flex items-center justify-center pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full overflow-hidden lg:overflow-visible"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full text-left relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
      >
        {/* Left column: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start relative">
          
          {/* Welcome Tag */}
          <motion.div
            variants={fadeUp}
            className="px-3 py-1 rounded-sm text-[12px] font-semibold tracking-wider uppercase bg-[var(--accent-lavender)] text-[var(--text-dark)] border border-black/5 mb-6 rotate-[-1.5deg] select-none"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem' }}
          >
            Welcome to my studio
          </motion.div>

          {/* Name Header */}
          <motion.div variants={fadeUp} className="relative select-none my-2 max-w-full">
            <SplitText
              text="Pratama Putra Purwanto"
              className="font-display font-semibold text-[2.4rem] sm:text-[3.5rem] md:text-[4.8rem] leading-none tracking-tight text-[var(--text-dark)] m-0"
              delay={50}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              tag="h1"
            />
          </motion.div>

          {/* Subtitle / Bio Teaser with custom scrapbook highlights & underlines */}
          <motion.div variants={fadeUp} className="mt-4 max-w-[600px] w-full min-h-[4.5rem]">
            <TextType
              text={descriptionSegments}
              className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed font-body"
              style={{ fontFamily: 'var(--font-body)' }}
              typingSpeed={45}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-[var(--accent-pink)] font-semibold"
              loop={false}
              startOnVisible={true}
              as="p"
            />
          </motion.div>

          {/* CTA Button and Arrow Doodle */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-start gap-2 relative"
          >
            <div className="relative">
              <a
                href="#about"
                className="px-5 py-2.5 rounded-sm border border-[var(--text-dark)] text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs active:scale-95 no-underline block"
                style={{
                  fontFamily: 'var(--font-body)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-dark)',
                }}
              >
                Enter Gallery
              </a>

              {/* Hand-drawn Arrow Doodle */}
              <div className="absolute left-[130px] -top-3 hidden sm:block pointer-events-none select-none text-[var(--text-muted)] w-28 h-12">
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
                  className="absolute -right-14 top-2.5 text-[0.8rem] text-[var(--text-handwrite)] select-none rotate-[5deg] whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-handwrite)' }}
                >
                  Click to enter!
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right column: Interactive Polaroid Stack (Without redundant avatar photo) */}
        <div className="lg:col-span-5 flex justify-center items-center relative min-h-[380px] sm:min-h-[460px] w-full mt-10 lg:mt-0 select-none">
          
          {/* Card 1: Sticky Note (Mood/State) - Index 0 */}
          <motion.div
            ref={card1Ref}
            drag
            dragMomentum={false}
            onDragStart={() => bringCardToFront(0)}
            onTapStart={() => bringCardToFront(0)}
            style={{
              zIndex: 10,
            }}
            variants={stickyNoteVariants}
            whileHover={{ scale: 1.05, rotate: '-2deg', boxShadow: 'var(--shadow-md)', transition: { duration: 0.15 } }}
            whileDrag={{ scale: 1.05, zIndex: 100 }}
            className="absolute left-[5%] sm:left-[10%] top-[10%] bg-[var(--accent-yellow)] p-4 w-[170px] sm:w-[190px] aspect-square rounded-sm shadow-xs border border-black/5 cursor-grab active:cursor-grabbing"
          >
            <h3 
              className="text-[10px] font-bold text-[var(--text-handwrite)] tracking-wider uppercase border-b border-[var(--text-handwrite)]/10 pb-1 mb-2.5"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              ⚡ CURRENT STATE
            </h3>
            <ul
              className="list-none p-0 m-0 flex flex-col gap-1.5 text-[0.85rem] text-[var(--text-handwrite)] leading-tight"
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
            drag
            dragMomentum={false}
            onDragStart={() => bringCardToFront(1)}
            onTapStart={() => bringCardToFront(1)}
            style={{
              zIndex: 20,
            }}
            variants={polaroidVariants}
            whileHover={{ scale: 1.05, rotate: '3deg', boxShadow: 'var(--shadow-md)', transition: { duration: 0.15 } }}
            whileDrag={{ scale: 1.05, zIndex: 100 }}
            className="absolute right-[5%] sm:right-[10%] top-[5%] bg-white p-3 pb-6 w-[180px] sm:w-[200px] rounded-sm shadow-sm border border-black/5 cursor-grab active:cursor-grabbing"
          >
            {/* Torn Washi Tape on top corner */}
            <div
              className="absolute -top-3 right-8 h-[16px] w-[60px] opacity-75 rounded-[1px] border border-black/5 shadow-xs"
              style={{
                backgroundColor: 'var(--accent-mint)',
                clipPath: 'polygon(0% 10%, 4% 0%, 96% 5%, 100% 12%, 98% 88%, 94% 100%, 6% 95%, 0% 90%)',
                mixBlendMode: 'multiply',
                transform: 'rotate(-4deg)'
              }}
            />

            {/* Browser Drawing/Mockup */}
            <div className="w-full aspect-video bg-[var(--accent-lavender)] flex flex-col border border-black/5 rounded-xs p-1.5 overflow-hidden">
              <div className="flex gap-1 border-b border-black/10 pb-1 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center text-[10px] text-[var(--text-dark)] font-mono leading-none select-none gap-1">
                <span>&lt;canvas &gt;</span>
                <span className="text-[8px] opacity-65">doodles_here</span>
                <span>&lt;/canvas&gt;</span>
              </div>
            </div>

            <div
              className="text-center mt-3 text-[0.8rem] text-[var(--text-handwrite)]"
              style={{ fontFamily: 'var(--font-handwrite)' }}
            >
              canvas_view.png
            </div>
          </motion.div>



        </div>
      </motion.div>

      {/* Floating/Scattered tags positioned dynamically around the main container */}
      
      {/* React & CSS Badge */}
      <motion.div
        drag
        dragMomentum={false}
        variants={reactCssBadgeVariants}
        whileHover={{ scale: 1.1, rotate: '5deg' }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-[10%] left-[12%] px-3 py-1.5 rounded-sm bg-[var(--accent-blue)] border border-black/5 shadow-xs text-xs font-semibold cursor-grab select-none rotate-[-4deg] hidden xl:flex items-center gap-1.5 z-20"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--text-dark)' }}
      >
        <span>🌸</span> React & CSS
      </motion.div>

      {/* UI/UX Figma Badge */}
      <motion.div
        drag
        dragMomentum={false}
        variants={figmaBadgeVariants}
        whileHover={{ scale: 1.1, rotate: '-6deg' }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-[8%] left-[32%] px-3 py-1.5 rounded-sm bg-[var(--accent-yellow)] border border-black/5 shadow-xs text-xs font-semibold cursor-grab select-none rotate-[8deg] hidden md:flex items-center gap-1.5 z-20"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--text-dark)' }}
      >
        <span>⭐</span> UI/UX Figma
      </motion.div>

      {/* PNC Coder Badge */}
      <motion.div
        drag
        dragMomentum={false}
        variants={pncBadgeVariants}
        whileHover={{ scale: 1.1, rotate: '8deg' }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-[34%] right-[12%] px-3 py-1.5 rounded-sm bg-[var(--accent-mint)] border border-black/5 shadow-xs text-xs font-semibold cursor-grab select-none rotate-[6deg] hidden lg:flex items-center gap-1.5 z-20"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--text-dark)' }}
      >
        <span>💻</span> PNC Coder
      </motion.div>

      {/* Laravel Fan Badge */}
      <motion.div
        drag
        dragMomentum={false}
        variants={laravelBadgeVariants}
        whileHover={{ scale: 1.1, rotate: '-4deg' }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-[10%] right-[3%] px-3 py-1.5 rounded-sm bg-[var(--accent-pink)] border border-black/5 shadow-xs text-xs font-semibold cursor-grab select-none rotate-[-8deg] hidden lg:flex items-center gap-1.5 z-20"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--text-dark)' }}
      >
        <span>⚡</span> Laravel Fan
      </motion.div>
    </section>
  )
}

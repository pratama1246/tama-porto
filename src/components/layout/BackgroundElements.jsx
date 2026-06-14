import { motion } from 'framer-motion'

// Y2K 4-Pointed Sparkle Star Component
function SparkleStar({ className, color = 'var(--accent-pink)', size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="var(--text-dark)"
      strokeWidth="1.5"
      className={className}
    >
      <path d="M12 2 Q12 12 2 12 Q12 12 12 22 Q12 12 22 12 Q12 12 12 2 Z" />
    </svg>
  )
}

// Doodle Flower Component
function FlowerSticker({ className, color = 'var(--accent-lavender)', size = 50 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
    >
      <circle cx="50" cy="25" r="18" fill={color} stroke="var(--text-dark)" strokeWidth="3" />
      <circle cx="26" cy="42" r="18" fill={color} stroke="var(--text-dark)" strokeWidth="3" />
      <circle cx="35" cy="71" r="18" fill={color} stroke="var(--text-dark)" strokeWidth="3" />
      <circle cx="65" cy="71" r="18" fill={color} stroke="var(--text-dark)" strokeWidth="3" />
      <circle cx="74" cy="42" r="18" fill={color} stroke="var(--text-dark)" strokeWidth="3" />
      <circle cx="50" cy="50" r="15" fill="var(--accent-yellow)" stroke="var(--text-dark)" strokeWidth="3" />
    </svg>
  )
}

// Retro Cassette Tape Component
function CassetteSticker({ className, color = 'var(--accent-peach)', width = 120, height = 75 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 75"
      fill="none"
      className={className}
    >
      <rect x="2" y="2" width="116" height="71" rx="6" fill={color} stroke="var(--text-dark)" strokeWidth="3.5" />
      <rect x="15" y="12" width="90" height="40" rx="3" fill="white" stroke="var(--text-dark)" strokeWidth="2.5" />
      <circle cx="42" cy="32" r="10" fill="var(--bg-primary)" stroke="var(--text-dark)" strokeWidth="2.5" />
      <circle cx="42" cy="32" r="4" fill="var(--text-dark)" />
      <line x1="42" y1="19" x2="42" y2="22" stroke="var(--text-dark)" strokeWidth="2" />
      <line x1="42" y1="42" x2="42" y2="45" stroke="var(--text-dark)" strokeWidth="2" />
      <circle cx="78" cy="32" r="10" fill="var(--bg-primary)" stroke="var(--text-dark)" strokeWidth="2.5" />
      <circle cx="78" cy="32" r="4" fill="var(--text-dark)" />
      <line x1="78" y1="19" x2="78" y2="22" stroke="var(--text-dark)" strokeWidth="2" />
      <line x1="78" y1="42" x2="78" y2="45" stroke="var(--text-dark)" strokeWidth="2" />
      <line x1="22" y1="19" x2="100" y2="19" stroke="var(--accent-pink)" strokeWidth="2.5" />
      <line x1="22" y1="24" x2="100" y2="24" stroke="var(--accent-blue)" strokeWidth="2.5" />
      <polygon points="35,62 85,62 80,72 40,72" fill="white" stroke="var(--text-dark)" strokeWidth="2.5" />
      <circle cx="8" cy="8" r="1.5" fill="var(--text-dark)" />
      <circle cx="112" cy="8" r="1.5" fill="var(--text-dark)" />
      <circle cx="8" cy="67" r="1.5" fill="var(--text-dark)" />
      <circle cx="112" cy="67" r="1.5" fill="var(--text-dark)" />
    </svg>
  )
}

// Doodle Y2K Smiley Sticker Component
function SmileySticker({ className, color = 'var(--accent-yellow)', size = 45 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="45" fill={color} stroke="var(--text-dark)" strokeWidth="3.5" />
      <circle cx="35" cy="40" r="5" fill="var(--text-dark)" />
      <circle cx="65" cy="40" r="5" fill="var(--text-dark)" />
      <path d="M30 60 Q50 80 70 60" fill="none" stroke="var(--text-dark)" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

// Doodle Heart Sticker Component
function HeartSticker({ className, color = 'var(--accent-pink)', size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <path
        d="M50 85 C50 85 15 55 15 35 C15 15 35 10 50 30 C65 10 85 15 85 35 C85 55 50 85 50 85 Z"
        fill={color}
        stroke="var(--text-dark)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Doodle Y2K Butterfly Sticker Component
function ButterflySticker({ className, color = 'var(--accent-blue)', size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <path d="M50 50 C40 30 15 20 20 40 C22 50 40 50 50 55 C40 60 20 60 22 75 C25 85 45 80 50 65 Z" fill={color} stroke="var(--text-dark)" strokeWidth="3.5" />
      <path d="M50 50 C60 30 85 20 80 40 C78 50 60 50 50 55 C60 60 80 60 78 75 C75 85 55 80 50 65 Z" fill={color} stroke="var(--text-dark)" strokeWidth="3.5" />
      <path d="M46 38 C46 30 40 25 40 25 M54 38 C54 30 60 25 60 25" fill="none" stroke="var(--text-dark)" strokeWidth="2" strokeLinecap="round" />
      <rect x="47" y="35" width="6" height="30" rx="3" fill="var(--accent-yellow)" stroke="var(--text-dark)" strokeWidth="2.5" />
    </svg>
  )
}

export default function BackgroundElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 w-full select-none" aria-hidden="true">
      {/* --- HERO SECTION DECORATIONS --- */}
      
      {/* 1. Heart Sticker (Hero top-left margin) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[140px] left-[4%] hidden xl:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.15, rotate: '-10deg' }}
      >
        <HeartSticker color="var(--accent-pink)" size={42} className="shadow-xs rotate-[-8deg]" />
      </motion.div>

      {/* 2. Sparkle Star (Hero top-right margin) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[180px] right-[4%] hidden lg:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-pink)" size={42} className="shadow-xs" />
      </motion.div>

      {/* 3. Smiley Face Sticker (Hero bottom-left margin) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[480px] left-[5%] hidden lg:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.1, rotate: '15deg' }}
      >
        <SmileySticker color="var(--accent-yellow)" size={46} className="shadow-xs rotate-[12deg]" />
      </motion.div>

      {/* 4. Lavender Sparkle Star (Hero bottom-right margin) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[680px] right-[5%] hidden xl:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-lavender)" size={35} className="shadow-xs rotate-[-15deg]" />
      </motion.div>

      {/* Y2K PNG Sticker 1: Draggable Pixel Cursor (near Hero CTA) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[520px] left-[26%] hidden xl:block pointer-events-auto cursor-grab active:cursor-grabbing z-30"
        whileHover={{ scale: 1.2, rotate: '15deg' }}
      >
        <img
          src="/assets/stickers/cursor.png"
          alt="Pixel Cursor Sticker"
          className="w-[50px] h-[50px] select-none pointer-events-none drop-shadow-[1px_2px_2px_rgba(0,0,0,0.15)]"
        />
      </motion.div>

      {/* Y2K PNG Sticker 2: Draggable Pixel Folder (Between Hero and About, right side) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[820px] right-[6%] hidden xl:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.1, rotate: '-10deg' }}
      >
        <img
          src="/assets/stickers/folder.png"
          alt="Pixel Folder Sticker"
          className="w-[100px] h-[100px] select-none pointer-events-none drop-shadow-[2px_3px_3px_rgba(0,0,0,0.12)] rotate-[8deg]"
        />
      </motion.div>

      {/* --- ABOUT SECTION DECORATIONS --- */}
      
      {/* 5. Cassette Tape (Between Hero and About) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[920px] left-[3%] hidden xl:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.08, rotate: '-5deg' }}
      >
        <CassetteSticker color="var(--accent-peach)" className="shadow-xs rotate-[-12deg]" />
      </motion.div>

      {/* 6. Peach Sparkle Star (About right margin) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[1150px] right-[4%] hidden lg:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-peach)" size={38} className="shadow-xs rotate-[10deg]" />
      </motion.div>

      {/* 7. Mint Sparkle Star (About left margin) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[1380px] left-[4%] hidden lg:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-mint)" size={35} className="shadow-xs rotate-[15deg]" />
      </motion.div>

      {/* --- PROJECTS SECTION DECORATIONS --- */}
      
      {/* 8. Mint Sparkle Star (Projects top-left margin) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[1650px] left-[5%] hidden lg:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-mint)" size={35} className="shadow-xs" />
      </motion.div>

      {/* 9. Flower Sticker (Projects right margin) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[1920px] right-[3%] hidden xl:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.08, rotate: '12deg' }}
      >
        <FlowerSticker color="var(--accent-lavender)" size={55} className="shadow-xs rotate-[8deg]" />
      </motion.div>

      {/* 10. Butterfly Sticker (Projects bottom-left margin) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[2150px] left-[3%] hidden xl:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.15, rotate: '-8deg' }}
      >
        <ButterflySticker color="var(--accent-blue)" size={48} className="shadow-xs rotate-[-10deg]" />
      </motion.div>

      {/* --- SKILLS & CONTACT SECTION DECORATIONS --- */}
      
      {/* 11. Yellow Sparkle Star (Skills right margin) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[2480px] right-[4%] hidden lg:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-yellow)" size={38} className="shadow-xs" />
      </motion.div>

      {/* 12. Washi Tape Strip (Skills left margin) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[2820px] left-[2%] w-[80px] h-[18px] bg-[var(--accent-blue)] border border-black/5 rotate-[-5deg] rounded-sm hidden xl:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        style={{ mixBlendMode: 'multiply' }}
        whileHover={{ scale: 1.1 }}
      />

      {/* 13. Pink Sparkle Star (Contact right margin) */}
      <motion.div
        drag
        dragMomentum={false}
        className="absolute top-[2980px] right-[5%] hidden lg:block pointer-events-auto cursor-grab active:cursor-grabbing z-20"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-pink)" size={36} className="shadow-xs rotate-[20deg]" />
      </motion.div>
    </div>
  )
}

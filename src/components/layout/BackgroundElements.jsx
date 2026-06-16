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
  const springTransition = (delay = 0) => ({
    type: 'spring',
    stiffness: 80,
    damping: 14,
    mass: 1,
    delay
  })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 w-full select-none hidden lg:block" aria-hidden="true">
      
      {/* ─── HERO SECTION ─── */}
      {/* PNG 1: Y2K Element 1 */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={springTransition(0.4)}
        className="absolute top-[140px] left-[3%] w-[85px] sm:w-[110px] rotate-[-8deg] z-20 pointer-events-auto cursor-grab active:cursor-grabbing hidden xl:block"
        whileHover={{ scale: 1.12, rotate: '-12deg' }}
      >
        <img src="/assets/stickers/1.png" alt="Y2K Element 1" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </motion.div>

      {/* SVG 1: Pink Heart */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, y: -200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.45)}
        className="absolute top-[180px] left-[12%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden lg:block"
        whileHover={{ scale: 1.15, rotate: '-10deg' }}
      >
        <HeartSticker color="var(--accent-pink)" size={42} className="sticker-effect rotate-[-8deg]" />
      </motion.div>

      {/* PNG 2: Vinyl */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={springTransition(0.45)}
        className="absolute top-[200px] right-[3%] w-[100px] sm:w-[125px] rotate-[12deg] z-20 pointer-events-auto cursor-grab active:cursor-grabbing hidden xl:block"
        whileHover={{ scale: 1.1, rotate: '25deg' }}
      >
        <img src="/assets/stickers/vinly.png" alt="Vinyl Record Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </motion.div>

      {/* SVG 2: Pink Sparkle Star */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, y: -200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.5)}
        className="absolute top-[260px] right-[12%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden lg:block"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-pink)" size={42} className="sticker-effect" />
      </motion.div>

      {/* SVG 3: Yellow Smiley */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, y: 200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.55)}
        className="absolute top-[480px] left-[4%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden lg:block"
        whileHover={{ scale: 1.1, rotate: '15deg' }}
      >
        <SmileySticker color="var(--accent-yellow)" size={46} className="sticker-effect rotate-[12deg]" />
      </motion.div>

      {/* PNG 3: MikroTik */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.5)}
        className="absolute top-[580px] left-[12%] w-[100px] sm:w-[130px] rotate-[6deg] z-20 pointer-events-auto cursor-grab active:cursor-grabbing hidden xl:block"
        whileHover={{ scale: 1.12, rotate: '-3deg' }}
      >
        <img src="/assets/stickers/mikrotik.png" alt="MikroTik Router Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </motion.div>

      {/* PNG 4: Pixel Cursor */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, y: 150, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.55)}
        className="absolute top-[680px] right-[14%] w-[55px] sm:w-[70px] rotate-[-15deg] z-30 pointer-events-auto cursor-grab active:cursor-grabbing hidden xl:block"
        whileHover={{ scale: 1.15, rotate: '5deg' }}
      >
        <img src="/assets/stickers/cursor.png" alt="Pixel Cursor Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </motion.div>

      {/* SVG 4: Lavender Sparkle Star */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, y: 200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.6)}
        className="absolute top-[750px] right-[3%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden lg:block"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-lavender)" size={35} className="sticker-effect rotate-[-15deg]" />
      </motion.div>


      {/* ─── ABOUT SECTION ─── */}
      {/* PNG 5: Y2K Element 2 */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={springTransition(0.6)}
        className="absolute top-[1100px] right-[3%] w-[90px] sm:w-[115px] rotate-[10deg] z-20 pointer-events-auto cursor-grab active:cursor-grabbing hidden xl:block"
        whileHover={{ scale: 1.12, rotate: '18deg' }}
      >
        <img src="/assets/stickers/2.png" alt="Y2K Element 2" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </motion.div>

      {/* SVG 5: Peach Sparkle Star */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, y: -100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.65)}
        className="absolute top-[1180px] right-[12%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden lg:block"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-peach)" size={38} className="sticker-effect rotate-[10deg]" />
      </motion.div>

      {/* PNG 6: Pixel Folder */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={springTransition(0.65)}
        className="absolute top-[1450px] left-[3%] w-[85px] sm:w-[110px] rotate-[-5deg] z-20 pointer-events-auto cursor-grab active:cursor-grabbing hidden xl:block"
        whileHover={{ scale: 1.1, rotate: '5deg' }}
      >
        <img src="/assets/stickers/folder.png" alt="Pixel Folder Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </motion.div>

      {/* SVG 6: Mint Sparkle Star */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.7)}
        className="absolute top-[1550px] left-[12%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden lg:block"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-mint)" size={35} className="sticker-effect rotate-[15deg]" />
      </motion.div>

      {/* SVG 7: Blue Butterfly */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, y: 150, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.75)}
        className="absolute top-[1950px] left-[4%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden xl:block"
        whileHover={{ scale: 1.15, rotate: '-8deg' }}
      >
        <ButterflySticker color="var(--accent-blue)" size={48} className="sticker-effect rotate-[-10deg]" />
      </motion.div>


      {/* ─── PROJECTS SECTION ─── */}
      {/* PNG 7: Earphone */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={springTransition(0.7)}
        className="absolute top-[2300px] left-[3%] w-[95px] sm:w-[120px] rotate-[-10deg] z-20 pointer-events-auto cursor-grab active:cursor-grabbing hidden xl:block"
        whileHover={{ scale: 1.12, rotate: '-2deg' }}
      >
        <img src="/assets/stickers/earphone.png" alt="Earphone Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </motion.div>

      {/* SVG 8: Lavender Flower */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.8)}
        className="absolute top-[2550px] right-[3%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden xl:block"
        whileHover={{ scale: 1.08, rotate: '12deg' }}
      >
        <FlowerSticker color="var(--accent-lavender)" size={55} className="sticker-effect rotate-[8deg]" />
      </motion.div>

      {/* SVG 9: Mint Sparkle Star */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, y: -100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.85)}
        className="absolute top-[2850px] left-[6%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden lg:block"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-mint)" size={35} className="sticker-effect" />
      </motion.div>


      {/* ─── SKILLS & CERTIFICATIONS ─── */}
      {/* SVG 10: Yellow Sparkle Star */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, y: -100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.8)}
        className="absolute top-[3150px] right-[5%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden lg:block"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-yellow)" size={38} className="sticker-effect" />
      </motion.div>

      {/* PNG 8: CD Sticker */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={springTransition(0.75)}
        className="absolute top-[3450px] right-[3%] w-[100px] sm:w-[130px] rotate-[8deg] z-20 pointer-events-auto cursor-grab active:cursor-grabbing hidden xl:block"
        whileHover={{ scale: 1.15, rotate: '-12deg' }}
      >
        <img src="/assets/stickers/cd.png" alt="Compact Disc Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </motion.div>

      {/* SVG 11: Lavender Smiley */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.85)}
        className="absolute top-[3750px] left-[3%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden xl:block"
        whileHover={{ scale: 1.1, rotate: '15deg' }}
      >
        <SmileySticker color="var(--accent-lavender)" size={46} className="sticker-effect rotate-[15deg]" />
      </motion.div>

      {/* SVG 12: Peach Sparkle Star */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, y: -100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.9)}
        className="absolute top-[4150px] right-[4%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden lg:block"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-peach)" size={35} className="sticker-effect rotate-[-10deg]" />
      </motion.div>


      {/* ─── HOBBIES SECTION ─── */}
      {/* SVG 13: Mint Flower */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.85)}
        className="absolute top-[4500px] left-[4%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden xl:block"
        whileHover={{ scale: 1.08, rotate: '12deg' }}
      >
        <FlowerSticker color="var(--accent-mint)" size={50} className="sticker-effect rotate-[8deg]" />
      </motion.div>

      {/* PNG 9: Cassette Tape */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={springTransition(0.8)}
        className="absolute top-[4800px] left-[3%] w-[120px] sm:w-[145px] rotate-[-12deg] z-20 pointer-events-auto cursor-grab active:cursor-grabbing hidden xl:block"
        whileHover={{ scale: 1.1, rotate: '-2deg' }}
      >
        <img src="/assets/stickers/Cassette_tape.png" alt="Cassette Tape Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </motion.div>

      {/* SVG 14: Yellow Heart */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, y: -200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.9)}
        className="absolute top-[4980px] left-[10%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden lg:block"
        whileHover={{ scale: 1.15, rotate: '-10deg' }}
      >
        <HeartSticker color="var(--accent-yellow)" size={40} className="sticker-effect rotate-[10deg]" />
      </motion.div>

      {/* PNG 10: Bowie Card */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={springTransition(0.85)}
        className="absolute top-[5150px] right-[4%] w-[100px] sm:w-[125px] rotate-[14deg] z-20 pointer-events-auto cursor-grab active:cursor-grabbing hidden xl:block"
        whileHover={{ scale: 1.12, rotate: '4deg' }}
      >
        <img src="/assets/stickers/bowie.png" alt="Bowie Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </motion.div>

      {/* SVG 15: Pink Butterfly */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, y: 200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.95)}
        className="absolute top-[5350px] right-[9%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden xl:block"
        whileHover={{ scale: 1.15, rotate: '-8deg' }}
      >
        <ButterflySticker color="var(--accent-pink)" size={45} className="sticker-effect rotate-[-12deg]" />
      </motion.div>


      {/* ─── CONTACT SECTION ─── */}
      {/* SVG 16: Lavender Sparkle Star */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, y: 200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.9)}
        className="absolute top-[5750px] left-[5%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden lg:block"
        whileHover={{ scale: 1.15 }}
      >
        <SparkleStar color="var(--accent-lavender)" size={38} className="sticker-effect rotate-[15deg]" />
      </motion.div>

      {/* PNG 11: Retro Phone */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={springTransition(0.9)}
        className="absolute top-[5920px] right-[3%] w-[85px] sm:w-[110px] rotate-[8deg] z-20 pointer-events-auto cursor-grab active:cursor-grabbing hidden xl:block"
        whileHover={{ scale: 1.15, rotate: '18deg' }}
      >
        <img src="/assets/stickers/phone.png" alt="Retro Telephone Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </motion.div>

      {/* SVG 17: Peach Smiley */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ x: -200, y: 200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={springTransition(0.95)}
        className="absolute top-[6000px] left-[4%] pointer-events-auto cursor-grab active:cursor-grabbing z-20 hidden xl:block"
        whileHover={{ scale: 1.1, rotate: '15deg' }}
      >
        <SmileySticker color="var(--accent-peach)" size={46} className="sticker-effect rotate-[-15deg]" />
      </motion.div>

    </div>
  )
}

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

// Fixed Decorative Sticker Container (Purely decorative, 0 pointer/touch interception)
function DraggableSticker({
  className,
  rotate = 0,
  delay = 0,
  children
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 90,
        damping: 14,
        delay
      }}
      className={`absolute pointer-events-none select-none z-20 ${className}`}
    >
      <div
        style={{ transform: `rotate(${rotate}deg)`, transformOrigin: 'center center' }}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default function BackgroundElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 w-full select-none" aria-hidden="true">
      
      {/* ─── VISUAL REVEAL & PHILOSOPHY SECTION ─── */}
      {/* PNG 1: Y2K Element 1 (Desktop only) */}
      <DraggableSticker
        className="top-[1220px] left-[3%] w-[90px] lg:w-[110px] hidden md:block"
        rotate={-8}
        hoverRotate={-12}
        delay={0.4}
      >
        <img src="/assets/stickers/1.png" alt="Y2K Element 1" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* SVG 1: Pink Sparkle Star (Edge Peeking Micro-Sticker) */}
      <DraggableSticker
        className="top-[1260px] right-[2%] sm:right-[4%] block"
        rotate={-8}
        hoverRotate={-12}
        delay={0.45}
      >
        <SparkleStar color="var(--accent-pink)" size={26} className="sticker-effect sm:w-[40px] sm:h-[40px]" />
      </DraggableSticker>

      {/* SVG 2: Pink Heart (Edge Peeking Micro-Sticker) */}
      <DraggableSticker
        className="top-[1660px] left-[1.5%] sm:left-[3%] block"
        rotate={10}
        hoverRotate={20}
        delay={0.45}
      >
        <HeartSticker color="var(--accent-pink)" size={26} className="sticker-effect sm:w-[38px] sm:h-[38px]" />
      </DraggableSticker>

      {/* PNG 2: Vinyl (Desktop only) */}
      <DraggableSticker
        className="top-[1650px] left-[3%] w-[100px] lg:w-[125px] hidden md:block"
        rotate={12}
        hoverRotate={25}
        delay={0.45}
      >
        <img src="/assets/stickers/vinly.png" alt="Vinyl Record Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* SVG 3: Lavender Sparkle Star (Edge Peeking Micro-Sticker) */}
      <DraggableSticker
        className="top-[1820px] right-[2%] sm:right-[5%] block"
        rotate={0}
        hoverRotate={15}
        delay={0.5}
      >
        <SparkleStar color="var(--accent-lavender)" size={24} className="sticker-effect sm:w-[36px] sm:h-[36px]" />
      </DraggableSticker>

      {/* SVG 3: Yellow Smiley */}
      <DraggableSticker
        className="top-[2450px] left-[3%] hidden md:block"
        rotate={12}
        hoverRotate={18}
        delay={0.55}
      >
        <SmileySticker color="var(--accent-yellow)" size={36} className="sticker-effect" />
      </DraggableSticker>

      {/* PNG 3: MikroTik */}
      <DraggableSticker
        className="top-[2680px] right-[4%] w-[105px] lg:w-[130px] hidden md:block"
        rotate={6}
        hoverRotate={-3}
        delay={0.5}
      >
        <img src="/assets/stickers/mikrotik.png" alt="MikroTik Router Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* PNG 4: Pixel Cursor */}
      <DraggableSticker
        className="top-[2950px] left-[5%] w-[58px] lg:w-[70px] hidden md:block z-30"
        rotate={-15}
        hoverRotate={5}
        delay={0.55}
      >
        <img src="/assets/stickers/cursor.png" alt="Pixel Cursor Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* SVG 4: Lavender Sparkle Star */}
      <DraggableSticker
        className="top-[3300px] left-[3%] hidden md:block"
        rotate={-15}
        hoverRotate={0}
        delay={0.6}
      >
        <SparkleStar color="var(--accent-lavender)" size={28} className="sticker-effect" />
      </DraggableSticker>


      {/* ─── ABOUT SECTION ─── */}
      {/* PNG 5: Y2K Element 2 */}
      <DraggableSticker
        className="top-[1100px] right-[3%] w-[95px] lg:w-[115px] hidden md:block"
        rotate={10}
        hoverRotate={18}
        delay={0.6}
      >
        <img src="/assets/stickers/2.png" alt="Y2K Element 2" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* SVG 5: Peach Sparkle Star */}
      <DraggableSticker
        className="top-[1180px] right-[12%] hidden md:block"
        rotate={10}
        hoverRotate={20}
        delay={0.65}
      >
        <SparkleStar color="var(--accent-peach)" size={38} className="sticker-effect" />
      </DraggableSticker>

      {/* PNG 6: Pixel Folder */}
      <DraggableSticker
        className="top-[1450px] left-[3%] w-[90px] lg:w-[110px] hidden md:block"
        rotate={-5}
        hoverRotate={5}
        delay={0.65}
      >
        <img src="/assets/stickers/folder.png" alt="Pixel Folder Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* SVG 6: Mint Sparkle Star */}
      <DraggableSticker
        className="top-[1550px] left-[12%] hidden md:block"
        rotate={15}
        hoverRotate={25}
        delay={0.7}
      >
        <SparkleStar color="var(--accent-mint)" size={35} className="sticker-effect" />
      </DraggableSticker>

      {/* SVG 7: Blue Butterfly */}
      <DraggableSticker
        className="top-[1950px] left-[4%] hidden md:block"
        rotate={-10}
        hoverRotate={-16}
        delay={0.75}
      >
        <ButterflySticker color="var(--accent-blue)" size={36} className="sticker-effect" />
      </DraggableSticker>


      {/* ─── PROJECTS SECTION ─── */}
      {/* PNG 7: Earphone */}
      <DraggableSticker
        className="top-[2300px] left-[3%] w-[95px] lg:w-[120px] hidden md:block"
        rotate={-10}
        hoverRotate={-2}
        delay={0.7}
      >
        <img src="/assets/stickers/earphone.png" alt="Earphone Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* SVG 8: Lavender Flower */}
      <DraggableSticker
        className="top-[2550px] right-[3%] hidden md:block"
        rotate={8}
        hoverRotate={15}
        delay={0.8}
      >
        <FlowerSticker color="var(--accent-lavender)" size={42} className="sticker-effect" />
      </DraggableSticker>

      {/* SVG 9: Mint Sparkle Star */}
      <DraggableSticker
        className="top-[2850px] left-[6%] hidden md:block"
        rotate={0}
        hoverRotate={15}
        delay={0.85}
      >
        <SparkleStar color="var(--accent-mint)" size={28} className="sticker-effect" />
      </DraggableSticker>


      {/* ─── SKILLS SECTION ─── */}
      {/* SVG 10: Yellow Sparkle Star */}
      <DraggableSticker
        className="top-[3150px] right-[5%] hidden md:block"
        rotate={0}
        hoverRotate={15}
        delay={0.8}
      >
        <SparkleStar color="var(--accent-yellow)" size={30} className="sticker-effect" />
      </DraggableSticker>

      {/* PNG 4: Pixel Cursor */}
      <DraggableSticker
        className="top-[3350px] left-[4%] w-[58px] lg:w-[70px] hidden md:block z-30"
        rotate={-15}
        hoverRotate={5}
        delay={0.55}
      >
        <img src="/assets/stickers/cursor.png" alt="Pixel Cursor Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>


      {/* ─── CERTIFICATIONS SECTION ─── */}
      {/* PNG 3: MikroTik Router Sticker */}
      <DraggableSticker
        className="top-[3650px] right-[3%] w-[105px] lg:w-[130px] hidden md:block"
        rotate={8}
        hoverRotate={-3}
        delay={0.7}
      >
        <img src="/assets/stickers/mikrotik.png" alt="MikroTik Router Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* SVG 11: Lavender Smiley */}
      <DraggableSticker
        className="top-[3820px] left-[3%] hidden md:block"
        rotate={15}
        hoverRotate={22}
        delay={0.75}
      >
        <SmileySticker color="var(--accent-lavender)" size={36} className="sticker-effect" />
      </DraggableSticker>

      {/* PNG 6: Pixel Folder */}
      <DraggableSticker
        className="top-[4050px] left-[3%] w-[90px] lg:w-[110px] hidden md:block"
        rotate={-6}
        hoverRotate={5}
        delay={0.8}
      >
        <img src="/assets/stickers/folder.png" alt="Pixel Folder Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* SVG 12: Peach Sparkle Star */}
      <DraggableSticker
        className="top-[4180px] right-[4%] hidden md:block"
        rotate={-10}
        hoverRotate={10}
        delay={0.85}
      >
        <SparkleStar color="var(--accent-peach)" size={30} className="sticker-effect" />
      </DraggableSticker>

      {/* PNG 8: CD Sticker */}
      <DraggableSticker
        className="top-[4380px] right-[3%] w-[105px] lg:w-[130px] hidden md:block"
        rotate={8}
        hoverRotate={-12}
        delay={0.85}
      >
        <img src="/assets/stickers/cd.png" alt="Compact Disc Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* SVG 4: Mint Sparkle Star */}
      <DraggableSticker
        className="top-[4480px] left-[4%] hidden md:block"
        rotate={15}
        hoverRotate={25}
        delay={0.9}
      >
        <SparkleStar color="var(--accent-mint)" size={28} className="sticker-effect" />
      </DraggableSticker>


      {/* ─── HOBBIES SECTION ─── */}
      {/* SVG 13: Mint Flower */}
      <DraggableSticker
        className="top-[4500px] left-[4%] hidden md:block"
        rotate={8}
        hoverRotate={15}
        delay={0.85}
      >
        <FlowerSticker color="var(--accent-mint)" size={40} className="sticker-effect" />
      </DraggableSticker>

      {/* PNG 9: Cassette Tape */}
      <DraggableSticker
        className="top-[4800px] left-[3%] w-[115px] lg:w-[145px] hidden md:block"
        rotate={-12}
        hoverRotate={-2}
        delay={0.8}
      >
        <img src="/assets/stickers/Cassette_tape.png" alt="Cassette Tape Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* SVG 14: Yellow Heart */}
      <DraggableSticker
        className="top-[4980px] left-[10%] hidden md:block"
        rotate={10}
        hoverRotate={-10}
        delay={0.9}
      >
        <HeartSticker color="var(--accent-yellow)" size={32} className="sticker-effect" />
      </DraggableSticker>

      {/* PNG 10: Bowie Card */}
      <DraggableSticker
        className="top-[5150px] right-[4%] w-[100px] lg:w-[125px] hidden md:block"
        rotate={14}
        hoverRotate={4}
        delay={0.85}
      >
        <img src="/assets/stickers/bowie.png" alt="Bowie Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* SVG 15: Pink Butterfly */}
      <DraggableSticker
        className="top-[5350px] right-[9%] hidden md:block"
        rotate={-12}
        hoverRotate={-18}
        delay={0.95}
      >
        <ButterflySticker color="var(--accent-pink)" size={36} className="sticker-effect" />
      </DraggableSticker>


      {/* ─── CONTACT SECTION ─── */}
      {/* SVG 16: Lavender Sparkle Star */}
      <DraggableSticker
        className="top-[5750px] left-[5%] hidden md:block"
        rotate={15}
        hoverRotate={25}
        delay={0.9}
      >
        <SparkleStar color="var(--accent-lavender)" size={30} className="sticker-effect" />
      </DraggableSticker>

      {/* PNG 11: Retro Phone */}
      <DraggableSticker
        className="top-[5920px] right-[3%] w-[90px] lg:w-[110px] hidden md:block"
        rotate={8}
        hoverRotate={18}
        delay={0.9}
      >
        <img src="/assets/stickers/phone.png" alt="Retro Telephone Sticker" className="w-full h-auto select-none pointer-events-none sticker-effect" />
      </DraggableSticker>

      {/* SVG 17: Peach Smiley */}
      <DraggableSticker
        className="top-[6000px] left-[4%] hidden md:block"
        rotate={-15}
        hoverRotate={0}
        delay={0.95}
      >
        <SmileySticker color="var(--accent-peach)" size={36} className="sticker-effect" />
      </DraggableSticker>

    </div>
  )
}

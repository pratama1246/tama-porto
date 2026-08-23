import { useState } from 'react'
import { motion } from 'framer-motion'
import OpeningScreen from './OpeningScreen'
import BirthdayTeaser from './BirthdayTeaser'
import ScatteredGallery from './ScatteredGallery'
import SystemSpecs from './SystemSpecs'
import RoadTo21 from './RoadTo21'
import ConfettiCannon from './ConfettiCannon'
import { birthdayMeta } from '../../data/birthday'

// Decorative Sticker Helpers
function SparkleStar({ className, color = 'var(--accent-pink)', size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="var(--ink-black)"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M12 2 Q12 12 2 12 Q12 12 12 22 Q12 12 22 12 Q12 12 12 2 Z" />
    </svg>
  )
}

function SmileySticker({ className, color = 'var(--accent-yellow)', size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="45" fill={color} stroke="var(--ink-black)" strokeWidth="4" />
      <circle cx="35" cy="40" r="6" fill="var(--ink-black)" />
      <circle cx="65" cy="40" r="6" fill="var(--ink-black)" />
      <path d="M30 60 Q50 82 70 60" fill="none" stroke="var(--ink-black)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function FlowerSticker({ className, color = 'var(--accent-lavender)', size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="25" r="18" fill={color} stroke="var(--ink-black)" strokeWidth="3.5" />
      <circle cx="26" cy="42" r="18" fill={color} stroke="var(--ink-black)" strokeWidth="3.5" />
      <circle cx="35" cy="71" r="18" fill={color} stroke="var(--ink-black)" strokeWidth="3.5" />
      <circle cx="65" cy="71" r="18" fill={color} stroke="var(--ink-black)" strokeWidth="3.5" />
      <circle cx="74" cy="42" r="18" fill={color} stroke="var(--ink-black)" strokeWidth="3.5" />
      <circle cx="50" cy="50" r="15" fill="var(--accent-yellow)" stroke="var(--ink-black)" strokeWidth="3.5" />
    </svg>
  )
}

export default function BirthdayPage({ onBackToPortfolio, isLoading = false }) {
  // Check if target birthday date has arrived or if devPreviewMode is enabled for editing
  const isTargetDateReached = birthdayMeta.devPreviewMode || (new Date().getTime() >= new Date(birthdayMeta.targetIsoDate).getTime())

  // State to control archive view
  const [showFullArchive, setShowFullArchive] = useState(isTargetDateReached)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen bg-[var(--bg-primary)] text-ink-black flex flex-col justify-start relative w-full pb-0 overflow-x-hidden"
    >
      {/* Confetti Explosion upon opening /20 ONLY after intro is done */}
      {!isLoading && <ConfettiCannon triggerOnMount={true} />}

      {/* Background Ambient Glows & Floating Scrapbook Stickers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Ambient Light Blobs */}
        <div className="absolute top-[8%] left-[5%] w-72 h-72 bg-[var(--accent-lavender)] opacity-25 rounded-full blur-3xl" />
        <div className="absolute top-[35%] right-[5%] w-80 h-80 bg-[var(--accent-pink)] opacity-20 rounded-full blur-3xl" />
        <div className="absolute top-[65%] left-[8%] w-72 h-72 bg-[var(--accent-mint)] opacity-20 rounded-full blur-3xl" />
        <div className="absolute top-[85%] right-[10%] w-96 h-96 bg-[var(--accent-yellow)] opacity-25 rounded-full blur-3xl" />

        {/* Scattered Scrapbook Vector Stickers */}
        <SparkleStar className="absolute top-20 right-[12%] rotate-12 opacity-80" color="var(--accent-pink)" size={38} />
        <SparkleStar className="absolute top-[40%] left-[6%] -rotate-12 opacity-75" color="var(--accent-mint)" size={32} />
        <SmileySticker className="absolute top-[28%] right-[8%] rotate-6 opacity-85 hidden md:block" color="var(--accent-yellow)" size={48} />
        <FlowerSticker className="absolute top-[55%] right-[6%] -rotate-6 opacity-80 hidden md:block" color="var(--accent-lavender)" size={50} />
        <SparkleStar className="absolute top-[75%] left-[10%] rotate-45 opacity-80" color="var(--accent-yellow)" size={34} />
        <SmileySticker className="absolute top-[88%] left-[6%] -rotate-12 opacity-85 hidden md:block" color="var(--accent-pink)" size={44} />
      </div>

      {/* Top Navbar Bar for /20 */}
      <header className="w-full max-w-6xl mx-auto px-4 py-6 flex items-center justify-between z-30 select-none relative">
        <button
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-ink-black bg-white text-xs sm:text-sm font-bold font-mono text-ink-black neo-shadow neo-shadow-hover transition-all active:scale-95 cursor-pointer"
        >
          <span>←</span>
          <span>BACK TO MAIN STUDIO</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold bg-sticker-pink text-ink-black px-3 py-1.5 rounded-lg border-2 border-ink-black neo-shadow-sm rotate-[-1deg]">
            🎂 TAMA v{birthdayMeta.version}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full z-10 space-y-16 sm:space-y-24 relative">
        {!showFullArchive && !isTargetDateReached ? (
          <BirthdayTeaser onEnterArchive={() => setShowFullArchive(true)} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-16 sm:space-y-24"
          >
            {/* 1. Hero Opening Screen */}
            <OpeningScreen />

            {/* 2. Scattered 3:2 Polaroid Photo Dump Gallery */}
            <div id="polaroid-dump">
              <ScatteredGallery />
            </div>

            {/* 3. TAMA.EXE System Specs & Release Notes */}
            <div id="system-specs">
              <SystemSpecs />
            </div>

            {/* 4. Road to 21 & Time Capsule */}
            <div id="road-to-21">
              <RoadTo21 />
            </div>
          </motion.div>
        )}
      </main>

      {/* Giant Stacked Typography Footer (Matching Main Portfolio) */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full border-t-2 border-ink-black bg-[var(--bg-primary)] pt-10 sm:pt-14 pb-8 px-4 sm:px-8 md:px-16 lg:px-20 mt-20 sm:mt-28 flex justify-center select-none overflow-hidden relative z-10"
      >
        <div className="max-w-[1600px] w-full flex flex-col justify-between">
          {/* Top Info Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-5 sm:pb-8 border-b-2 border-ink-black/10 font-mono text-xs sm:text-sm font-bold text-ink-black uppercase">
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded-md bg-pale-yellow border-2 border-ink-black neo-shadow-sm text-xs sm:text-sm font-extrabold whitespace-nowrap">
                © 2026
              </span>
              <span className="px-2.5 py-1 rounded-md bg-sticker-pink border-2 border-ink-black neo-shadow-sm text-xs font-bold whitespace-nowrap">
                🎂 CHAPTER 20
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-text-muted text-[11px] sm:text-xs whitespace-nowrap">
              <span>FRONTEND &amp; NETWORK</span>
              <span>•</span>
              <span>MYTAMAKIKII.WEB.ID/20</span>
            </div>
          </div>

          {/* Massive Stacked Name with calibrated responsive clamping */}
          <div className="py-6 sm:py-12 md:py-16 flex flex-col items-start leading-[0.85] tracking-tighter w-full">
            <span className="font-display font-black text-[13.5vw] xs:text-[14.2vw] sm:text-[14.5vw] md:text-[14vw] lg:text-[13vw] 2xl:text-[12.5rem] text-ink-black uppercase hover:text-soft-blue transition-colors duration-300">
              PRATAMA
            </span>
            <span className="font-display font-black text-[13.5vw] xs:text-[14.2vw] sm:text-[14.5vw] md:text-[14vw] lg:text-[13vw] 2xl:text-[12.5rem] text-ink-black uppercase hover:text-sticker-pink transition-colors duration-300">
              PUTRA
            </span>
            <span className="font-display font-black text-[13.5vw] xs:text-[14.2vw] sm:text-[14.5vw] md:text-[14vw] lg:text-[13vw] 2xl:text-[12.5rem] text-ink-black uppercase hover:text-mint transition-colors duration-300">
              PURWANTO
            </span>
          </div>

          {/* Bottom Disclaimer */}
          <div className="pt-6 border-t-2 border-ink-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] sm:text-xs font-mono text-text-muted">
            <span>Some assets and components may be subject to copyright • Non-profit personal portfolio.</span>
            <span className="shrink-0">Crafted with 💖 in Cilacap, ID 🇮🇩</span>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  )
}

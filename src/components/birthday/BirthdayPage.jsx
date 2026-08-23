import { useState } from 'react'
import { motion } from 'framer-motion'
import OpeningScreen from './OpeningScreen'
import BirthdayTeaser from './BirthdayTeaser'
import ScatteredGallery from './ScatteredGallery'
import RoadTo21 from './RoadTo21'
import ConfettiCannon from './ConfettiCannon'
import { birthdayMeta } from '../../data/birthday'

export default function BirthdayPage({ onBackToPortfolio }) {
  // Check if target birthday date has arrived or if devPreviewMode is enabled for editing
  const isTargetDateReached = birthdayMeta.devPreviewMode || (new Date().getTime() >= new Date(birthdayMeta.targetIsoDate).getTime())

  // State to control archive view
  const [showFullArchive, setShowFullArchive] = useState(isTargetDateReached)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-dark)] flex flex-col justify-start relative w-full pb-0">
      {/* Confetti Explosion upon opening /20 */}
      <ConfettiCannon triggerOnMount={true} />

      {/* Top Navbar Bar for /20 */}
      <header className="w-full max-w-6xl mx-auto px-4 py-6 flex items-center justify-between z-30">
        <button
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-black/10 bg-white text-xs font-semibold font-body text-[var(--text-dark)] transition-all hover:-translate-y-0.5 hover:shadow-xs active:scale-95 cursor-pointer"
        >
          ← Back to Main Portfolio
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold bg-[var(--accent-lavender)] text-[var(--text-dark)] px-2.5 py-1 rounded-sm border border-black/5 rotate-[-1deg]">
            TAMA v{birthdayMeta.version}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full z-10">
        {!showFullArchive && !isTargetDateReached ? (
          <BirthdayTeaser onEnterArchive={() => setShowFullArchive(true)} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-16"
          >
            <OpeningScreen onEnterArchive={() => {
              const el = document.getElementById('polaroid-dump')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }} />

            {/* Scattered 3:2 Polaroid Photo Dump Gallery */}
            <div id="polaroid-dump">
              <ScatteredGallery />
            </div>

            {/* Road to 21 & Time Capsule */}
            <div id="road-to-21">
              <RoadTo21 />
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer Copyright */}
      <footer className="w-full select-none mt-16 bg-[var(--bg-primary)]/50 border-t border-[var(--text-dark)]/15 pt-6 pb-6 px-4 flex flex-col gap-2 items-center text-center">
        <div className="font-mono text-xs font-bold text-[var(--text-dark)] opacity-90 uppercase">
          © 2026 Pratama Putra Purwanto • All rights reserved
        </div>
        <div className="text-[10px] opacity-75 font-mono text-[var(--text-dark)] px-4 uppercase">
          Some assets and components may be subject to copyright • Non-profit personal portfolio.
        </div>
      </footer>
    </div>
  )
}

// src/components/birthday/BirthdayPage.jsx
// Full /20 route page view

import { useState } from 'react'
import { motion } from 'framer-motion'
import OpeningScreen from './OpeningScreen'
import BirthdayTeaser from './BirthdayTeaser'
import MomentsArchive from './MomentsArchive'
import SystemSpecs from './SystemSpecs'
import RoadTo21 from './RoadTo21'
import { birthdayMeta } from '../../data/birthday'

export default function BirthdayPage({ onBackToPortfolio }) {
  // Check if target birthday date has arrived
  const isTargetDateReached = new Date().getTime() >= new Date(birthdayMeta.targetIsoDate).getTime()

  // State to control preview when target date is not reached yet
  const [showFullArchive, setShowFullArchive] = useState(isTargetDateReached)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-dark)] flex flex-col justify-start relative w-full pb-16">
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
            className="space-y-12"
          >
            <OpeningScreen onEnterArchive={() => {
              const archiveEl = document.getElementById('moments-archive')
              if (archiveEl) archiveEl.scrollIntoView({ behavior: 'smooth' })
            }} />

            <div id="moments-archive">
              <MomentsArchive />
            </div>

            <SystemSpecs />

            <RoadTo21 />
          </motion.div>
        )}
      </main>

      {/* Secret Footer Note */}
      <footer className="mt-12 text-center text-xs font-mono text-[var(--text-muted)] border-t border-black/5 pt-6">
        <p className="m-0">© 20 years of Tama • TAMA v20.0 • 15.08.2026</p>
      </footer>
    </div>
  )
}

// src/components/birthday/BirthdayPage.jsx
// Full /20 route page view

import { useState } from 'react'
import { motion } from 'framer-motion'
import OpeningScreen from './OpeningScreen'
import BirthdayTeaser from './BirthdayTeaser'
import MomentsArchive from './MomentsArchive'
import SystemSpecs from './SystemSpecs'
import RoadTo21 from './RoadTo21'
import ScrollVelocity from '../reactbits/ScrollVelocity'
import { birthdayMeta } from '../../data/birthday'

export default function BirthdayPage({ onBackToPortfolio }) {
  // Check if target birthday date has arrived or if devPreviewMode is enabled for editing
  const isTargetDateReached = birthdayMeta.devPreviewMode || (new Date().getTime() >= new Date(birthdayMeta.targetIsoDate).getTime())

  // State to control archive view
  const [showFullArchive, setShowFullArchive] = useState(isTargetDateReached)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-dark)] flex flex-col justify-start relative w-full pb-0">
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
              const roadEl = document.getElementById('road-to-21')
              if (roadEl) roadEl.scrollIntoView({ behavior: 'smooth' })
            }} />

            <div id="road-to-21">
              <RoadTo21 />
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer Copyright - ScrollVelocity Marquee & Disclaimer matching main portfolio */}
      <footer className="w-full select-none mt-12 overflow-hidden bg-[var(--bg-primary)]/50 border-t border-[var(--text-dark)]/15 pt-5 pb-4 md:pt-6 md:pb-5 flex flex-col gap-2 md:gap-3 items-center text-center">
        <ScrollVelocity
          texts={[
            `© ${new Date().getFullYear()} Pratama Putra Purwanto • Informatics Engineering • All rights reserved`
          ]}
          velocity={-35}
          numCopies={8}
          scrollerClassName="text-xl md:text-3xl font-display font-semibold uppercase tracking-wider text-[var(--text-dark)]/90 flex items-center w-full"
          className="px-8"
        />
        <div className="text-[10px] md:text-xs opacity-75 font-mono font-semibold tracking-wider text-[var(--text-dark)] px-4 uppercase">
          Some assets and components may be subject to copyright • This website is a non-profit personal portfolio. If you own any featured asset and object to its use, please contact me for immediate removal.
        </div>
      </footer>
    </div>
  )
}

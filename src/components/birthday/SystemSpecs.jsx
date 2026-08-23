// src/components/birthday/SystemSpecs.jsx
// TAMA.EXE Specs & Developer Changelog component

import { motion } from 'framer-motion'
import { birthdayMeta, changelog } from '../../data/birthday'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' }
  }
}

export default function SystemSpecs() {
  return (
    <section id="system-specs" className="w-full py-8 px-4 max-w-5xl mx-auto select-none">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="font-mono text-xs font-bold text-ink-black/70 tracking-widest uppercase bg-pale-yellow px-3 py-1 rounded border border-ink-black/30 neo-shadow-sm rotate-1 inline-block mb-2">
          ⚙️ SYSTEM DIAGNOSTICS
        </span>
        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-ink-black uppercase tracking-tight">
          TAMA.EXE SPECS & CHANGELOG
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* TAMA.EXE Metadata Panel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-ink-black neo-shadow relative flex flex-col justify-between"
        >
          {/* Top Washi Tape */}
          <div 
            className="absolute -top-3.5 left-8 h-6 px-3 bg-sticker-pink border border-ink-black/40 -rotate-1 rounded-xs neo-shadow-sm flex items-center justify-center text-[10px] font-mono font-bold text-ink-black tracking-wider"
          >
            SYS.INFO // v{birthdayMeta.version}
          </div>

          <div>
            <div className="flex items-center justify-between border-b-2 border-ink-black/10 pb-3 mb-4 mt-2">
              <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-ink-black flex items-center gap-1.5">
                <span>💻</span>
                <span>SYSTEM SPECIFICATION</span>
              </span>
              <span className="font-mono text-[10px] bg-mint border border-ink-black/40 px-2 py-0.5 rounded font-bold text-ink-black neo-shadow-sm">
                ONLINE
              </span>
            </div>

            <dl className="grid grid-cols-3 gap-y-3 text-xs sm:text-sm">
              <dt className="font-mono text-text-muted font-bold">VERSION</dt>
              <dd className="col-span-2 font-mono font-bold text-ink-black">v{birthdayMeta.version}</dd>

              <dt className="font-mono text-text-muted font-bold">BUILD</dt>
              <dd className="col-span-2 font-mono font-bold text-ink-black">CHAPTER 20 (2026)</dd>

              <dt className="font-mono text-text-muted font-bold">STATUS</dt>
              <dd className="col-span-2 font-body font-semibold text-emerald-700">● {birthdayMeta.status}</dd>

              <dt className="font-mono text-text-muted font-bold">MAIN QUEST</dt>
              <dd className="col-span-2 font-body text-ink-black">{birthdayMeta.mainQuest}</dd>

              <dt className="font-mono text-text-muted font-bold">SIDE QUEST</dt>
              <dd className="col-span-2 font-body text-ink-black">{birthdayMeta.sideQuest}</dd>

              <dt className="font-mono text-text-muted font-bold">LEARNING</dt>
              <dd className="col-span-2 font-body text-ink-black">{birthdayMeta.currentlyLearning}</dd>

              <dt className="font-mono text-text-muted font-bold">NEXT VER</dt>
              <dd className="col-span-2 font-mono font-bold text-sticker-pink bg-ink-black px-2 py-0.5 rounded inline-block w-fit">
                v{birthdayMeta.nextUpdate}
              </dd>
            </dl>
          </div>

          {/* Known bugs note */}
          <div className="mt-5 pt-3 border-t-2 border-ink-black/10 text-xs font-mono text-text-dark bg-amber-50 p-3 rounded-lg border border-amber-300">
            <span className="text-amber-800 font-bold">🐛 KNOWN BUGS:</span> {birthdayMeta.knownBugs.join(' • ')}
          </div>
        </motion.div>

        {/* Developer Changelog Panel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-ink-black neo-shadow relative"
        >
          {/* Top Washi Tape */}
          <div 
            className="absolute -top-3.5 right-8 h-6 px-3 bg-mint border border-ink-black/40 rotate-1 rounded-xs neo-shadow-sm flex items-center justify-center text-[10px] font-mono font-bold text-ink-black tracking-wider"
          >
            RELEASE.NOTES
          </div>

          <div className="flex items-center justify-between border-b-2 border-ink-black/10 pb-3 mb-4 mt-2">
            <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-ink-black flex items-center gap-1.5">
              <span>🚀</span>
              <span>CHANGELOG // v{birthdayMeta.version}</span>
            </span>
          </div>

          <div className="flex flex-col gap-4 text-xs sm:text-sm">
            <div>
              <h5 className="font-mono font-bold text-emerald-900 bg-mint border border-emerald-500/40 px-2 py-0.5 rounded text-xs inline-block mb-1.5">
                + Added
              </h5>
              <ul className="list-disc list-inside text-ink-black space-y-1 pl-1">
                {changelog.added.map((item, i) => (
                  <li key={i} className="leading-snug">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-mono font-bold text-sky-900 bg-soft-blue border border-sky-500/40 px-2 py-0.5 rounded text-xs inline-block mb-1.5">
                ↑ Improved
              </h5>
              <ul className="list-disc list-inside text-ink-black space-y-1 pl-1">
                {changelog.improved.map((item, i) => (
                  <li key={i} className="leading-snug">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-mono font-bold text-violet-900 bg-lavender border border-violet-500/40 px-2 py-0.5 rounded text-xs inline-block mb-1.5">
                ✓ Fixed
              </h5>
              <ul className="list-disc list-inside text-ink-black space-y-1 pl-1">
                {changelog.fixed.map((item, i) => (
                  <li key={i} className="leading-snug">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

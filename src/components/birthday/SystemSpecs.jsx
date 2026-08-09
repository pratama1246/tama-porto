// src/components/birthday/SystemSpecs.jsx
// TAMA.EXE Specs & Developer Changelog component

import { motion } from 'framer-motion'
import { birthdayMeta, changelog } from '../../data/birthday'

export default function SystemSpecs() {
  return (
    <section className="w-full py-8 px-4 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* TAMA.EXE Metadata Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white p-5 rounded-sm border border-black/10 shadow-xs flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-4">
            <span className="font-mono font-bold text-xs uppercase tracking-wider text-[var(--text-dark)]">
              💻 TAMA.EXE SYSTEM SPEC
            </span>
            <span className="font-mono text-[10px] bg-[var(--accent-mint)] px-2 py-0.5 rounded-xs font-semibold">
              v{birthdayMeta.version}
            </span>
          </div>

          <dl className="grid grid-cols-3 gap-y-3 text-xs font-body">
            <dt className="font-mono text-[var(--text-muted)] font-semibold">VERSION</dt>
            <dd className="col-span-2 font-mono font-bold text-[var(--text-dark)]">{birthdayMeta.version}</dd>

            <dt className="font-mono text-[var(--text-muted)] font-semibold">RELEASE</dt>
            <dd className="col-span-2 font-body text-[var(--text-dark)]">{birthdayMeta.releaseDate}</dd>

            <dt className="font-mono text-[var(--text-muted)] font-semibold">STATUS</dt>
            <dd className="col-span-2 font-body text-[var(--text-dark)]">{birthdayMeta.status}</dd>

            <dt className="font-mono text-[var(--text-muted)] font-semibold">MAIN QUEST</dt>
            <dd className="col-span-2 font-body text-[var(--text-dark)]">{birthdayMeta.mainQuest}</dd>

            <dt className="font-mono text-[var(--text-muted)] font-semibold">SIDE QUEST</dt>
            <dd className="col-span-2 font-body text-[var(--text-dark)]">{birthdayMeta.sideQuest}</dd>

            <dt className="font-mono text-[var(--text-muted)] font-semibold">LEARNING</dt>
            <dd className="col-span-2 font-body text-[var(--text-dark)]">{birthdayMeta.currentlyLearning}</dd>

            <dt className="font-mono text-[var(--text-muted)] font-semibold">NEXT VER</dt>
            <dd className="col-span-2 font-mono font-bold text-[var(--text-dark)]">v{birthdayMeta.nextUpdate}</dd>
          </dl>
        </div>

        {/* Known bugs note */}
        <div className="mt-4 pt-3 border-t border-black/10 text-[11px] font-mono text-[var(--text-muted)]">
          <span className="text-amber-600 font-bold">KNOWN BUGS:</span> {birthdayMeta.knownBugs.join(' • ')}
        </div>
      </motion.div>

      {/* Developer Changelog Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white p-5 rounded-sm border border-black/10 shadow-xs"
      >
        <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-4">
          <span className="font-mono font-bold text-xs uppercase tracking-wider text-[var(--text-dark)]">
            🚀 RELEASE NOTES (CHANGELOG)
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)] font-semibold">
            v{birthdayMeta.version}
          </span>
        </div>

        <div className="flex flex-col gap-3 text-xs font-body">
          <div>
            <h5 className="font-mono font-bold text-[var(--accent-mint)] bg-emerald-50 px-1.5 py-0.5 rounded-xs inline-block mb-1">
              + Added
            </h5>
            <ul className="list-disc list-inside text-[var(--text-dark)] space-y-0.5 pl-1">
              {changelog.added.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-mono font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded-xs inline-block mb-1">
              ↑ Improved
            </h5>
            <ul className="list-disc list-inside text-[var(--text-dark)] space-y-0.5 pl-1">
              {changelog.improved.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-mono font-bold text-violet-700 bg-violet-50 px-1.5 py-0.5 rounded-xs inline-block mb-1">
              ✓ Fixed
            </h5>
            <ul className="list-disc list-inside text-[var(--text-dark)] space-y-0.5 pl-1">
              {changelog.fixed.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

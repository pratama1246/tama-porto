import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { education, experience, organization } from '../../data/resume'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
}

// Metal Binder Rings for the Scrapbook Metaphor (Fluid across all devices)
function BinderRings() {
  const rings = [1, 2, 3, 4, 5]
  return (
    <div className="absolute -left-2 sm:-left-3.5 top-1/2 -translate-y-1/2 flex flex-col gap-8 sm:gap-12 z-20 pointer-events-none">
      {rings.map((r) => (
        <div key={r} className="relative w-5 h-7 sm:w-7 sm:h-10 select-none">
          {/* Metal Ring Curve */}
          <div className="absolute inset-0 border-[2.5px] sm:border-[3.5px] border-slate-300 rounded-full shadow-xs bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 opacity-90" />
          {/* Hole Background Overlay */}
          <div className="absolute left-[1.5px] sm:left-[2px] top-[9px] sm:top-[14px] w-1 sm:w-1.5 h-2 sm:h-3 bg-black/25 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export default function Journey() {
  const [activeTab, setActiveTab] = useState('education')

  const tabs = [
    { id: 'education', label: 'Education', color: 'bg-[var(--accent-pink)]', text: 'text-[var(--text-dark)]' },
    { id: 'experience', label: 'Experience', color: 'bg-[var(--accent-mint)]', text: 'text-[var(--text-dark)]' },
    { id: 'organization', label: 'Organization', color: 'bg-[var(--accent-yellow)]', text: 'text-[var(--text-dark)]' }
  ]

  return (
    <section
      id="journey"
      className="py-10 px-4 sm:px-6 md:py-24 md:px-12 lg:px-20 max-w-[1600px] mx-auto w-full overflow-visible relative"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-6 sm:gap-10"
      >
        {/* Section Header */}
        <motion.div variants={fadeUp}>
          <h2
            className="inline-block px-5 py-2 md:px-7 md:py-3 rounded-xl text-xl sm:text-2xl md:text-4xl font-display font-extrabold text-ink-black bg-lavender border-2 border-ink-black neo-shadow rotate-[1deg] tracking-tight m-0 select-none"
          >
            My Journey
          </h2>
        </motion.div>

        {/* Interactive Ring Binder Layout */}
        <div className="flex flex-col md:flex-row items-stretch gap-0 relative pt-2 sm:pt-4">
          
          {/* Tabs Container - Mobile: Top row, Desktop: Vertical column on the right side */}
          <div className="flex flex-row md:flex-col order-1 md:order-2 md:-translate-x-1.5 z-10 shrink-0 md:justify-center gap-1 sm:gap-1.5 mb-2 md:mb-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 md:flex-none py-2.5 px-3 sm:py-3.5 sm:px-5 
                    text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider
                    border-2 border-ink-black transition-all duration-200 cursor-pointer
                    min-h-[42px] flex items-center justify-center select-none rounded-md
                    ${tab.color} ${tab.text}
                    ${isActive 
                      ? 'neo-shadow scale-100 z-10 md:translate-x-2' 
                      : 'opacity-70 scale-95 hover:opacity-100'
                    }
                  `}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Notebook Lined Binder Sheet */}
          <div className="flex-grow order-2 md:order-1 bg-white border-2 border-ink-black rounded-lg neo-shadow relative min-h-[500px] md:min-h-[580px] flex flex-col overflow-visible">
            
            {/* Metal Binder Rings Decorator */}
            <BinderRings />

            {/* Notebook Red Margin Line */}
            <div className="absolute left-5 sm:left-7 md:left-10 top-0 bottom-0 border-l border-red-200 pointer-events-none" aria-hidden="true" />

            {/* Content Container */}
            <div 
              className="flex-grow p-4 pl-8 sm:p-6 sm:pl-10 md:p-10 md:pl-16 relative z-10 flex flex-col justify-start"
              style={{
                backgroundImage: 'linear-gradient(var(--bg-secondary) 1px, transparent 1px)',
                backgroundSize: '100% 28px',
                lineHeight: '28px'
              }}
            >
              {/* Ruled lines padding adjustment for content headers */}
              <div className="mt-2 flex-grow flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Education Tab View */}
                    {activeTab === 'education' && (
                      <div className="flex flex-col gap-8">
                        {education.map((edu) => (
                          <div key={edu.id} className="relative flex flex-col gap-1.5">
                            {/* Marker circle on margin line */}
                            <div className="absolute left-[-22px] md:-left-[30px] top-[9px] w-2.5 h-2.5 rounded-full bg-[var(--accent-pink)] border border-black/20" />
                            
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start leading-snug">
                              <h3 className="font-display font-semibold text-[1.05rem] text-[var(--text-dark)] m-0">
                                {edu.school}
                              </h3>
                              <span className="font-handwrite text-xs font-semibold text-[var(--text-handwrite)] rotate-[1.5deg]">
                                {edu.period}
                              </span>
                            </div>
                            
                            <div className="text-xs md:text-sm text-[var(--text-dark)] font-medium leading-none opacity-80">
                              {edu.degree} — <span className="italic">{edu.location}</span>
                            </div>

                            <ul className="list-disc pl-4 m-0 text-xs md:text-sm text-[var(--text-dark)]/90 leading-relaxed font-body">
                              {edu.details.map((detail, i) => (
                                <li key={i}>{detail}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Experience Tab View */}
                    {activeTab === 'experience' && (
                      <div className="flex flex-col gap-8">
                        {experience.map((exp) => (
                          <div key={exp.id} className="relative flex flex-col gap-1.5">
                            {/* Marker circle on margin line */}
                            <div className="absolute left-[-22px] md:-left-[30px] top-[9px] w-2.5 h-2.5 rounded-full bg-[var(--accent-mint)] border border-black/20" />

                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start leading-snug">
                              <h3 className="font-display font-semibold text-[1.05rem] text-[var(--text-dark)] m-0">
                                {exp.company}
                              </h3>
                              <span className="font-handwrite text-xs font-semibold text-[var(--text-handwrite)] rotate-[-1.5deg]">
                                {exp.period}
                              </span>
                            </div>

                            <div className="text-xs md:text-sm text-[var(--text-dark)] font-medium leading-none opacity-80">
                              {exp.role} — <span className="italic">{exp.location}</span>
                            </div>

                            <ul className="list-disc pl-4 m-0 text-xs md:text-sm text-[var(--text-dark)]/90 leading-relaxed font-body">
                              {exp.description.map((bullet, i) => (
                                <li key={i}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Organization Tab View */}
                    {activeTab === 'organization' && (
                      <div className="flex flex-col gap-8">
                        {organization.map((org) => (
                          <div key={org.id} className="relative flex flex-col gap-1.5">
                            {/* Marker circle on margin line */}
                            <div className="absolute left-[-22px] md:-left-[30px] top-[9px] w-2.5 h-2.5 rounded-full bg-[var(--accent-yellow)] border border-black/20" />

                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start leading-snug">
                              <h3 className="font-display font-semibold text-[1.05rem] text-[var(--text-dark)] m-0">
                                {org.name}
                              </h3>
                              <span className="font-handwrite text-xs font-semibold text-[var(--text-handwrite)] rotate-[1deg]">
                                {org.period}
                              </span>
                            </div>

                            <div className="text-xs md:text-sm text-[var(--text-dark)] font-medium leading-none opacity-80">
                              {org.role} — <span className="italic">{org.location}</span>
                            </div>

                            <ul className="list-disc pl-4 m-0 text-xs md:text-sm text-[var(--text-dark)]/90 leading-relaxed font-body">
                              {org.highlights.map((bullet, i) => (
                                <li key={i}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Notebook Page Footer scribble */}
            <div className="absolute bottom-2.5 right-4 pointer-events-none select-none font-handwrite text-[10px] text-[var(--text-handwrite)]/60">
              * Page {activeTab === 'education' ? '1/3' : activeTab === 'experience' ? '2/3' : '3/3'} — logged_background.sys *
            </div>

          </div>

        </div>

      </motion.div>
    </section>
  )
}

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

// Metal Binder Rings for the Scrapbook Metaphor (desktop only)
function BinderRings() {
  const rings = [1, 2, 3, 4, 5]
  return (
    <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 flex flex-col gap-12 z-20 hidden md:flex pointer-events-none">
      {rings.map((r) => (
        <div key={r} className="relative w-7 h-10 select-none">
          {/* Metal Ring Curve */}
          <div className="absolute inset-0 border-[3.5px] border-slate-300 rounded-full shadow-xs bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 opacity-90" />
          {/* Hole Background Overlay */}
          <div className="absolute left-[2px] top-[14px] w-1.5 h-3 bg-black/25 rounded-full" />
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
      className="py-10 px-4 md:py-24 md:px-8 max-w-5xl mx-auto overflow-visible relative"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-10"
      >
        {/* Section Header */}
        <div>
          <motion.div
            variants={fadeUp}
            className="inline-block px-3 py-1 rounded-sm text-[12px] font-semibold uppercase tracking-wider bg-[var(--accent-pink)] border border-black/5 rotate-[-1deg] mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            My Background
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold text-[1.5rem] md:text-[2rem] tracking-tight text-[var(--text-dark)] m-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The Logbook Planner
          </motion.h2>
        </div>

        {/* Interactive Ring Binder Layout */}
        <div className="flex flex-col md:flex-row items-stretch gap-0 relative pt-4">
          
          {/* Tabs Container - Mobile: Top row, Desktop: Vertical column on the right side */}
          <div className="flex flex-row md:flex-col order-1 md:order-2 md:-translate-x-1.5 z-10 shrink-0 md:justify-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 md:flex-none py-3 px-4 md:py-4 md:px-5 
                    text-xs font-semibold uppercase tracking-wider
                    border border-black/10 transition-all duration-300 cursor-pointer
                    min-h-[44px] flex items-center justify-center select-none
                    ${tab.color} ${tab.text}
                    ${isActive 
                      ? 'shadow-xs scale-100 z-10 font-semibold border-b-transparent md:border-b-black/10 md:border-l-transparent md:translate-x-1.5' 
                      : 'opacity-70 scale-95 hover:opacity-90'
                    }
                    rounded-t-sm md:rounded-t-none md:rounded-r-sm md:first:rounded-t-sm md:last:rounded-b-sm
                  `}
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    transform: isActive && window.innerWidth >= 768 ? 'translateX(6px)' : ''
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Notebook Lined Binder Sheet */}
          <div className="flex-grow order-2 md:order-1 bg-[#fefcf7] border border-black/10 rounded-sm md:rounded-l-sm shadow-md relative min-h-[540px] md:min-h-[580px] flex flex-col overflow-visible">
            
            {/* Metal Binder Rings Decorator (desktop only) */}
            <BinderRings />

            {/* Notebook Red Margin Line */}
            <div className="absolute left-6 md:left-10 top-0 bottom-0 border-l border-red-200 pointer-events-none" aria-hidden="true" />

            {/* Content Container */}
            <div 
              className="flex-grow p-6 pl-10 md:p-10 md:pl-16 relative z-10 flex flex-col justify-start"
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

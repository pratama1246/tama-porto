import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RolesTab({ detail }) {
  const [activeRoleIdx, setActiveRoleIdx] = useState(0)
  const roles = detail?.roles || []

  if (roles.length === 0) {
    return (
      <div className="text-center font-handwrite text-[var(--text-muted)] py-12">
        No role configurations defined for this project.
      </div>
    )
  }

  const activeRole = roles[activeRoleIdx]

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start w-full">
      {/* Left Column: Interactive Sticky Notes Stack */}
      <div className="w-full md:w-[35%] flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 select-none scrollbar-none">
        {roles.map((role, idx) => {
          const isActive = idx === activeRoleIdx
          // Rotational angles for sticky notes to make them look hand-placed
          const angles = [-3, 4, -2]
          const angle = angles[idx % angles.length]

          return (
            <button
              key={idx}
              onClick={() => setActiveRoleIdx(idx)}
              className="flex-shrink-0 w-32 h-32 md:w-full md:h-auto p-4 border border-black/10 rounded-sm flex flex-col items-center md:items-start justify-center md:justify-start gap-2 shadow-2xs cursor-pointer text-center md:text-left transition-all hover:scale-102 duration-200"
              style={{
                backgroundColor: role.color || 'var(--accent-yellow)',
                transform: `rotate(${isActive ? 0 : angle}deg) translateY(${isActive ? -3 : 0}px)`,
                boxShadow: isActive ? '2px 4px 10px rgba(0,0,0,0.12)' : '1px 2px 4px rgba(0, 0, 0, 0.08)',
                zIndex: isActive ? 10 : 1
              }}
            >
              {/* Pushpin circle element */}
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--glitch-pink)] border border-black/20 shadow-3xs self-center hidden md:block mb-1 -mt-1" />
              
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl">{role.icon}</span>
                <span className="font-display font-semibold text-sm md:text-base text-[var(--text-dark)] leading-tight">
                  {role.roleName.split(' ')[0]}
                </span>
              </div>
              <span className="font-handwrite text-xs text-[var(--text-handwrite)] leading-tight opacity-75 hidden md:block">
                {role.roleName}
              </span>
            </button>
          )
        })}
      </div>

      {/* Right Column: Features checklist board */}
      <div className="flex-grow w-full bg-[#fefcf7] border border-black/10 rounded-sm p-6 md:p-8 shadow-2xs relative">
        {/* Paper clip decorator */}
        <div className="absolute -top-3 left-8 flex flex-col items-center pointer-events-none select-none">
          <div className="w-3.5 h-8 border-2 border-[var(--text-muted)] rounded-full absolute -top-1" />
          <div className="w-2 h-6 border border-[var(--text-muted)]/75 rounded-full absolute top-1" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoleIdx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 border-b border-black/5 pb-3">
              <span className="text-2xl">{activeRole.icon}</span>
              <div>
                <h3 className="font-display font-semibold text-base md:text-lg text-[var(--text-dark)] m-0">
                  {activeRole.roleName}
                </h3>
                <span className="text-[10px] md:text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider select-none">
                  Access & Privilege Details
                </span>
              </div>
            </div>

            <ul className="flex flex-col gap-3.5 pl-0 list-none m-0">
              {activeRole.features.map((feat, fidx) => (
                <li key={fidx} className="flex items-start gap-2.5 text-sm md:text-base font-body text-[var(--text-dark)] leading-relaxed">
                  <span className="text-[var(--accent-pink)] font-bold shrink-0 mt-0.5 select-none">✔</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

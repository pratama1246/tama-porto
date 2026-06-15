import { motion } from 'framer-motion'
import { skillCategories } from '../../data/skills'

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

// Deterministic rotations for sticky notes
const getRotationStyle = (id) => {
  const angles = [-3, 2, -2, 4, -1]
  const idx = (id - 1) % angles.length
  return { transform: `rotate(${angles[idx]}deg)` }
}

// Deterministic washi tape rotations and colors
const getTapeStyle = (id) => {
  const tapeColors = [
    "var(--accent-mint)",
    "var(--accent-pink)",
    "var(--accent-blue)",
    "var(--accent-peach)",
    "var(--accent-lavender)"
  ]
  const angles = [1, -2, 2, -1, 3]
  const colorIdx = id % tapeColors.length
  const angleIdx = (id - 1) % angles.length
  
  return {
    backgroundColor: tapeColors[colorIdx],
    transform: `rotate(${angles[angleIdx]}deg)`
  }
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-10 px-4 md:py-24 md:px-8 max-w-7xl mx-auto"
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
            className="inline-block px-3 py-1 rounded-sm text-[12px] font-semibold uppercase tracking-wider bg-[var(--accent-mint)] border border-black/5 rotate-[-1deg] mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            My Toolbox
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold text-[1.5rem] md:text-[2rem] tracking-tight text-[var(--text-dark)] m-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The Sticky Note Wall
          </motion.h2>
        </div>

        {/* Sticky Notes container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8 justify-items-center items-start pt-6">
          {skillCategories.map((cat) => {
            const rotStyle = getRotationStyle(cat.id)
            const tapeStyle = getTapeStyle(cat.id)

            return (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                style={{ ...rotStyle, backgroundColor: cat.color }}
                whileHover={{
                  y: -6,
                  rotate: 0,
                  scale: 1.04,
                  boxShadow: 'var(--shadow-sm)',
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
                className="relative w-full max-w-[200px] aspect-square p-5 pt-7 rounded-sm shadow-xs border border-black/5 flex flex-col justify-start"
              >
                {/* Washi Tape Strip at the top center */}
                <div
                  style={tapeStyle}
                  className="absolute -top-3 left-[calc(50%-35px)] w-[70px] h-[16px] opacity-80 border border-black/5 rounded-xs"
                  aria-hidden="true"
                />

                {/* Category Title (Print Font) */}
                <h3
                  className="text-[11px] font-bold text-[var(--text-handwrite)] tracking-wider uppercase border-b border-[var(--text-handwrite)]/10 pb-1.5 mb-3 select-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {cat.title}
                </h3>

                {/* Skills List (Handwritten Font) */}
                <ul
                  className="list-none p-0 m-0 flex flex-col gap-2 text-xs md:text-[0.875rem] text-[var(--text-handwrite)] leading-tight"
                  style={{ fontFamily: 'var(--font-handwrite)' }}
                >
                  {cat.skills.map((skill, index) => (
                    <li key={`${skill}-${index}`} className="flex items-center gap-1">
                      <span>•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

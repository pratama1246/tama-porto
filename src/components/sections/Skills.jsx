import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { skillCategories } from '../../data/skills'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 }
  }
}

// Helper to determine icon color based on category ID
const getFolderColorClass = (id) => {
  const colors = [
    "fill-pink-300 stroke-pink-400",
    "fill-purple-300 stroke-purple-400",
    "fill-blue-300 stroke-blue-400",
    "fill-orange-300 stroke-orange-400",
    "fill-emerald-300 stroke-emerald-400",
    "fill-amber-300 stroke-amber-400"
  ]
  return colors[(id - 1) % colors.length]
}

// Helper to determine file extension based on category ID
const getFileExtension = (id) => {
  const extensions = ["exe", "dll", "cfg", "lnk", "sys", "bat"]
  return extensions[(id - 1) % extensions.length]
}

// Retro Folder Icon (SVG)
function FolderIcon({ className = "w-10 h-10", colorClass = "fill-yellow-400" }) {
  return (
    <svg viewBox="0 0 32 32" className={`${className} ${colorClass} stroke-[var(--text-dark)]`} strokeWidth="1.5">
      <path d="M2 6h8l3 3h17v21H2V6z" />
      <path d="M2 11h28" fill="none" />
    </svg>
  )
}

const localLogos = {
  "HTML5": "/assets/tech-stack/HTML5.png",
  "CSS3": "/assets/tech-stack/CSS3.png",
  "JavaScript": "/assets/tech-stack/JavaScript.png",
  "TypeScript": "/assets/tech-stack/TypeScript.png",
  "React": "/assets/tech-stack/React.png",
  "Next.js": "/assets/tech-stack/Next.js.png",
  "Tailwind CSS": "/assets/tech-stack/Tailwind CSS.png",
  "PHP": "/assets/tech-stack/PHP.png",
  "Laravel": "/assets/tech-stack/Laravel.png",
  "Node.js": "/assets/tech-stack/Node.js.png",
  "Dart": "/assets/tech-stack/Dart.png",
  "Flutter": "/assets/tech-stack/Flutter.png",
  "Ubuntu": "/assets/tech-stack/Ubuntu.png",
  "MikroTik": "/assets/tech-stack/MikroTik.png",
  "Cisco": "/assets/tech-stack/Cisco.png",
  "Cloudflare": "/assets/tech-stack/Cloudflare.png",
  "Claude": "/assets/tech-stack/Claude.svg",
  "Gemini": "/assets/tech-stack/Gemini.svg",
  "ChatGPT": "/assets/tech-stack/ChatGPT.svg",
  "Framer Motion": "/assets/tech-stack/Framer-Motion.svg",
  "CodeIgniter": "/assets/tech-stack/CodeIgniter.png",
  "Figma": "/assets/tech-stack/Figma.png",
  "Git": "/assets/tech-stack/Git.png",
  "GitHub": "/assets/tech-stack/GitHub.png",
  "VS Code": "/assets/tech-stack/VS Code.png",
  "MySQL": "/assets/tech-stack/MySQL.png",
  "Postman": "/assets/tech-stack/Postman.png",
  "Notion": "/assets/tech-stack/Notion.svg",
  "Canva": "/assets/tech-stack/Canva.png",
  "ngrok": "/assets/tech-stack/Ngrok.svg",
  "Vite.js": "/assets/tech-stack/Vite.js.png",
  "Windows": "/assets/tech-stack/Windows.png",
  "Alpine.js": "/assets/tech-stack/Alpine.js.png",
  "Mailtrap": "/assets/tech-stack/Mailtrap.jpeg",
  "Resend": "/assets/tech-stack/Resend.svg",
  "DaisyUI": "/assets/tech-stack/DaisyUI.svg",
  "Flowbite": "/assets/tech-stack/Flowbite.svg",
  "Shadcn UI": "/assets/tech-stack/Shadcn UI.svg"
}

export default function Skills() {
  // All categories are collapsed by default
  const [activeId, setActiveId] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      id="skills"
      className="py-16 px-4 md:py-24 md:px-8 max-w-6xl mx-auto"
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
            className="inline-block px-3 py-1 rounded-sm text-[12px] font-semibold uppercase tracking-wider bg-[var(--accent-mint)] border border-black/5 rotate-[-1deg] mb-2 select-none"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            My Toolbox
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold text-[1.5rem] md:text-[2rem] tracking-tight text-[var(--text-dark)] m-0 select-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Skills Explorer
          </motion.h2>
          <p className="text-xs md:text-sm text-[var(--text-muted)] mt-1 select-none">
            {isMobile 
              ? "Tap folders below to expand or collapse each technical category directory."
              : "Hover over folders below to expand each technical category directory."
            }
          </p>
        </div>

        {/* Collapsible Categories Accordion Stack */}
        <div 
          className="flex flex-col gap-4"
          onMouseLeave={isMobile ? undefined : () => setActiveId(null)}
        >
          {skillCategories.map((cat) => {
            const folderColor = getFolderColorClass(cat.id)
            const ext = getFileExtension(cat.id)
            const isOpen = activeId === cat.id

            return (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                onMouseEnter={isMobile ? undefined : () => setActiveId(cat.id)}
                className="bg-[#fefcf7] rounded-md border border-black/5 shadow-xs overflow-hidden"
              >
                {/* Accordion Header (Hover on desktop / click to toggle on both) */}
                <div
                  className="px-5 py-3.5 bg-zinc-50 border-b border-black/5 flex justify-between items-center select-none transition-colors cursor-pointer hover:bg-zinc-100/80"
                  onClick={() => {
                    setActiveId(prevId => prevId === cat.id ? null : cat.id)
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 flex-1 min-w-0 mr-4">
                    <span 
                      className="text-base md:text-2xl font-semibold text-neutral-800 uppercase tracking-widest font-mono flex items-center gap-2.5 shrink-0"
                    >
                      <span className="text-xl md:text-2xl leading-none">{isOpen ? "📂" : "📁"}</span>
                      <span>{cat.title}</span>
                    </span>
                    {cat.description && (
                      <span className="text-[10px] md:text-sm text-neutral-400 font-mono md:border-l md:border-neutral-300 md:pl-4 truncate ml-8 md:ml-0">
                        {cat.description}
                      </span>
                    )}
                  </div>
                  
                  {/* Windows 98 Tree View Expand Indicator [+] or [-] */}
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-white border border-neutral-400 flex items-center justify-center rounded-[1px] shadow-xs font-mono text-[11px] md:text-lg font-semibold text-neutral-700">
                    {isOpen ? "-" : "+"}
                  </div>
                </div>

                {/* Collapsible Content Wrapper (Framer Motion height transition) */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t border-black/[0.02]">
                    {/* Skills Folder Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
                      {cat.skills.map((skill) => {
                        const localLogo = localLogos[skill]
                        return (
                          <motion.div
                            key={skill}
                            whileHover={{ scale: 1.05 }}
                            className="w-24 flex flex-col items-center gap-2 cursor-pointer group text-center select-none"
                          >
                            {/* Icon container */}
                            <div className="relative transform transition-transform group-hover:scale-105 flex items-center justify-center w-14 h-14">
                              {localLogo ? (
                                <div className="relative w-11 h-11 flex items-center justify-center">
                                  <img
                                    src={localLogo}
                                    alt={`${skill} logo`}
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                    className="protected-image w-11 h-11 object-contain"
                                  />
                                  {/* Classic Windows 98 Shortcut Arrow overlay */}
                                  <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 bg-white border border-neutral-400 flex items-center justify-center rounded-[1px] shadow-xs select-none pointer-events-none">
                                    <span className="text-[8px] text-blue-800 leading-none font-semibold">↗</span>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <FolderIcon colorClass={folderColor} className="w-14 h-14 drop-shadow-xs" />
                                  <span className="absolute -bottom-0.5 -right-1 bg-zinc-800 text-[7px] text-[#00ffcc] font-mono px-1 rounded-xs border border-zinc-700 font-semibold select-none uppercase">
                                    {ext}
                                  </span>
                                </>
                              )}
                            </div>
                            
                            {/* File Label (Classic Windows 98 highlight style on hover) */}
                            <span className="text-[11px] font-mono text-neutral-800 px-1 py-0.5 leading-tight rounded-xs group-hover:bg-[#000080] group-hover:text-white select-none transition-colors break-words max-w-[88px]">
                              {skill}
                            </span>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

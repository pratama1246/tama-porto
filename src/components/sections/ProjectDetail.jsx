import { motion } from 'framer-motion'
import { useEffect } from 'react'

// Custom Readme icon
function ReadmeIcon({ className }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

export default function ProjectDetail({ project, onBack }) {
  // Scroll to top when this separate page mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!project) return null

  return (
    <div
      className="min-h-screen bg-[var(--bg-primary)] flex flex-col w-full relative z-50 pb-20"
      style={{
        backgroundImage: `linear-gradient(rgba(160, 160, 190, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(160, 160, 190, 0.12) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Header bar */}
      <div className="sticky top-0 z-30 bg-[var(--bg-secondary)] border-b border-black/10 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 text-xs md:text-sm font-mono text-[var(--text-dark)] overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="opacity-60">tama-porto</span>
          <span className="opacity-40">/</span>
          <span className="opacity-60">projects</span>
          <span className="opacity-40">/</span>
          <span className="font-semibold">{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
          <span className="opacity-40">/</span>
          <span className="text-[var(--text-handwrite)] bg-[var(--accent-yellow)] px-1.5 py-0.5 rounded-sm text-[10px] font-sans rotate-[-1deg]">README.md</span>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[var(--accent-pink)] border border-black/10 text-xs font-bold text-[var(--text-dark)] hover:bg-[var(--accent-pink)]/85 active:scale-95 transition-all cursor-pointer shadow-3xs rotate-[1deg]"
        >
          ← Back to Gallery
        </button>
      </div>

      {/* Main Content container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex-grow max-w-4xl w-full mx-auto px-4 py-8 md:py-14 flex flex-col justify-start"
      >
        {/* Paper Binder / Markdown Box */}
        <div className="bg-white border border-black/10 rounded-sm shadow-md relative flex flex-col overflow-hidden">
          
          {/* File Viewer Header */}
          <div className="bg-[var(--bg-secondary)]/30 border-b border-black/10 px-4 py-2.5 flex items-center justify-between text-xs font-mono select-none">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--text-dark)]">
              <ReadmeIcon className="opacity-70 shrink-0" />
              <span>README.md</span>
            </div>
            <span className="text-[10px] opacity-60 font-sans">Markdown Preview</span>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-10 flex flex-col gap-6 md:gap-8">
            {/* Title */}
            <h1 className="font-display font-semibold text-2xl md:text-4xl text-[var(--text-dark)] tracking-tight m-0 border-b border-black/10 pb-4">
              {project.title}
            </h1>

            {/* Image Display */}
            <div className="w-full overflow-hidden rounded-sm border border-black/10 bg-[var(--bg-primary)] p-2">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-auto object-contain max-h-[70vh] rounded-2xs mx-auto"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

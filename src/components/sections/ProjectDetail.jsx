import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { projectDetails } from '../../data/projectDetails'

// Custom SVG Icons
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

function GitHubIcon({ className }) {
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
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function ExternalIcon({ className }) {
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export default function ProjectDetail({ project, onBack, isLoading = false }) {
  const [copiedIdx, setCopiedIdx] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [project?.id])

  const detail = useMemo(() => projectDetails[project?.id] || {}, [project?.id])

  const handleCopy = (cmd, idx) => {
    navigator.clipboard.writeText(cmd)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  if (!project) return null

  const washiTapes = [
    { bg: 'bg-[#FFD1DC]', rot: 'rotate-[-2deg]' },
    { bg: 'bg-[#D0F0C0]', rot: 'rotate-[2.5deg]' },
    { bg: 'bg-[#B3E5FC]', rot: 'rotate-[-1.5deg]' },
    { bg: 'bg-[#FFF9C4]', rot: 'rotate-[2deg]' }
  ]
  const selectedWashi = washiTapes[(project?.id || 1) % washiTapes.length]

  // Scrapbook Reveal Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  }

  const polaroidDropVariants = {
    hidden: { y: -35, opacity: 0, rotate: -4, scale: 0.94 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 130,
        mass: 0.85
      }
    }
  }

  const washiVariants = {
    hidden: { scale: 0, opacity: 0, y: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { delay: 0.28, duration: 0.38, type: 'spring', damping: 14 }
    }
  }

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const sheetVariants = {
    hidden: { y: 35, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <div
      className="min-h-screen bg-[#fdf6e3] flex flex-col w-full relative z-50 pb-0 select-none"
      style={{
        backgroundImage: `linear-gradient(rgba(160, 160, 190, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(160, 160, 190, 0.15) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Sticky Top Header Navigation Bar */}
      <motion.header 
        initial={{ y: -40, opacity: 0 }}
        animate={!isLoading ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="sticky top-0 z-40 bg-[#fdf6e3]/90 backdrop-blur-md border-b border-black/10 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs gap-4"
      >
        {/* Brand & Breadcrumb */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer border-none bg-transparent p-0 select-none shrink-0"
            title="Back to Home Gallery"
          >
            <img src="/favicon.svg" alt="Tama Logo" className="w-5 h-5 object-contain" />
            <span className="font-display font-bold text-xs sm:text-sm text-ink-black tracking-tight hidden sm:inline">
              tama<span className="text-[#ff6b9d]">.</span>gallery
            </span>
          </button>

          <span className="text-black/20 font-mono hidden sm:inline">/</span>

          {/* Breadcrumb Path */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-ink-black overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="opacity-50 hidden sm:inline">projects</span>
            <span className="opacity-30 hidden sm:inline">/</span>
            <span className="font-bold text-ink-black">{project?.slug || project?.title?.toLowerCase()}</span>
            <span className="opacity-30">/</span>
            <span className="text-text-handwrite bg-pale-yellow px-1.5 py-0.5 rounded text-[10px] font-sans rotate-[-1deg] shrink-0 border border-black/10">
              CASE_STUDY.md
            </span>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-soft-blue border-2 border-ink-black text-xs font-mono font-bold text-ink-black neo-shadow-sm hover:neo-shadow active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <span>←</span>
          <span className="hidden sm:inline">Back to Gallery</span>
          <span className="sm:hidden">Back</span>
        </button>
      </motion.header>

      {/* Main Content Article with Staggered Children */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate={!isLoading ? "visible" : "hidden"}
        className="max-w-[1360px] w-full mx-auto px-2.5 xs:px-4 sm:px-8 flex flex-col gap-6 sm:gap-14 pt-4 sm:pt-10"
      >
        {/* 1. TOP HERO SHOWCASE (Mockup Split + Bento Specs) */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-between w-full">
          
          {/* Left Column: Visual Mockup Showcase Card (Polaroid Drop Animation) */}
          <motion.div 
            variants={polaroidDropVariants}
            className="w-full lg:w-[48%] shrink-0"
          >
            <div className="bg-white border sm:border-2 border-ink-black shadow-xs sm:neo-shadow rounded-xl sm:rounded-2xl p-2.5 sm:p-5 pb-5 sm:pb-8 relative group">
              {/* Top Washi Tape */}
              <motion.div
                variants={washiVariants}
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-4 sm:h-5 ${selectedWashi.bg} ${selectedWashi.rot} border border-ink-black/40 shadow-xs z-10 pointer-events-none rounded-xs`}
                style={{
                  clipPath: 'polygon(0% 12%, 4% 0%, 96% 4%, 100% 15%, 97% 85%, 93% 100%, 7% 96%, 0% 88%)',
                  mixBlendMode: 'multiply'
                }}
              />

              {/* Mockup Screenshot Frame */}
              <div className="w-full aspect-[16/10] bg-neutral-100 rounded-lg sm:rounded-xl overflow-hidden border sm:border-2 border-ink-black relative mb-2.5 sm:mb-3">
                <img
                  src={project?.thumbnail}
                  alt={project?.title}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="protected-image w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
              </div>

              {/* Polaroid Caption */}
              <div
                className="text-center font-handwrite text-xs sm:text-sm text-text-handwrite truncate px-2 font-semibold"
                style={{ fontFamily: 'var(--font-handwrite)' }}
              >
                * {project?.title?.toLowerCase().replace(/\s+/g, '_')}.webp *
              </div>
            </div>
          </motion.div>

          {/* Right Column: Project Title, Tagline & Action Bar */}
          <div className="w-full lg:w-[52%] flex flex-col justify-between self-stretch gap-4 sm:gap-5">
            <motion.div variants={itemVariants} className="flex flex-col gap-2.5 sm:gap-3">
              {/* Status & Index Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase border sm:border-2 border-ink-black bg-pale-yellow text-ink-black shadow-xs sm:neo-shadow-sm">
                  {project?.status || 'Completed'}
                </span>
                <span className="font-mono text-xs font-bold text-text-muted">
                  PROJECT #{String(project?.id || 1).padStart(2, '0')}
                </span>
              </div>

              {/* Bold Title */}
              <h1 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-ink-black uppercase leading-[1.1] tracking-tight m-0">
                {project?.title}
              </h1>

              {/* Tagline / Pitch */}
              <p className="text-xs sm:text-sm md:text-base text-ink-black leading-relaxed font-body">
                {detail?.tagline || project?.desc}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1 sm:pt-2">
                {project?.tech?.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/[0.04] border border-black/15 text-[10px] sm:text-[11px] font-mono font-bold text-text-dark"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Direct Action Buttons */}
            {(project?.github || project?.live) && (
              <motion.div variants={itemVariants} className="pt-3 sm:pt-4 border-t border-ink-black/15 sm:border-t-2 sm:border-ink-black/10 flex flex-wrap items-center gap-2.5 sm:gap-3">
                {project?.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg border sm:border-2 border-ink-black bg-white text-ink-black font-mono text-xs font-bold shadow-xs sm:neo-shadow-sm hover:bg-pale-yellow transition-all min-h-[40px] sm:min-h-[42px] no-underline"
                  >
                    <GitHubIcon className="shrink-0" />
                    <span>GitHub Repo ↗</span>
                  </a>
                )}
                {project?.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg border sm:border-2 border-ink-black bg-mint text-ink-black font-mono text-xs font-bold shadow-xs sm:neo-shadow-sm hover:brightness-95 transition-all min-h-[40px] sm:min-h-[42px] no-underline"
                  >
                    <ExternalIcon className="shrink-0" />
                    <span>Live Site ↗</span>
                  </a>
                )}
              </motion.div>
            )}
          </div>

        </div>

        {/* 2. EDITORIAL ARTICLE SHEET (Open & Breathable on Mobile, Scrapbook on Desktop) */}
        <motion.article
          variants={sheetVariants}
          id="case-study-content"
          style={{
            backgroundImage: `
              linear-gradient(rgba(160, 160, 190, 0.08) 1.5px, transparent 1.5px),
              linear-gradient(90deg, rgba(160, 160, 190, 0.08) 1.5px, transparent 1.5px)
            `,
            backgroundSize: '20px 20px',
          }}
          className="w-full bg-white border sm:border-2 border-ink-black/20 sm:border-ink-black shadow-xs sm:neo-shadow rounded-xl sm:rounded-2xl p-4 sm:p-10 md:p-14 flex flex-col gap-8 sm:gap-14 overflow-hidden"
        >
          {/* Article Header Badge */}
          <div className="flex items-center justify-between border-b border-ink-black/15 sm:border-b-2 sm:border-ink-black/10 pb-3 sm:pb-4 text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2 font-bold text-ink-black">
              <ReadmeIcon />
              <span className="text-[11px] sm:text-xs">CASE_STUDY_DOCUMENTATION.md</span>
            </div>
            <span className="text-[11px] uppercase font-bold tracking-wider hidden sm:inline">
              ENGINEERING BLUEPRINT
            </span>
          </div>

          {/* SECTION A: Overview & Problem-Solution */}
          <section className="flex flex-col gap-5 sm:gap-6 w-full">
            <div className="flex items-center gap-2">
              <span className="font-handwrite text-text-handwrite text-xs sm:text-sm rotate-[-1deg] bg-pale-yellow px-2 py-0.5 rounded border border-black/10 select-none">
                * project_brief.txt *
              </span>
            </div>

            <p className="font-body text-xs sm:text-base md:text-lg leading-relaxed text-ink-black/90">
              {detail?.overview}
            </p>

            {/* Problem & Solution Scrapbook Block (Open & clean left-accent on Mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 my-1 sm:my-2">
              {/* Problem Statement */}
              <div className="bg-peach/25 sm:bg-peach/30 border-l-4 sm:border-2 border-ink-black rounded-r-lg sm:rounded-xl p-3.5 sm:p-5 relative shadow-none sm:shadow-xs rotate-0 sm:rotate-[-0.5deg]">
                <div className="w-12 h-4 bg-red-400/30 border border-black/15 absolute -top-2.5 left-[10%] rotate-[-2deg] rounded-xs pointer-events-none hidden sm:block" />
                <h4 className="font-display font-bold text-xs sm:text-base text-ink-black uppercase mb-1.5 sm:mb-2 flex items-center gap-1.5 select-none">
                  ⚠️ Problem Statement
                </h4>
                <p className="font-body text-xs sm:text-sm text-ink-black/85 leading-relaxed m-0">
                  {detail?.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="bg-mint/30 sm:bg-mint/35 border-l-4 sm:border-2 border-ink-black rounded-r-lg sm:rounded-xl p-3.5 sm:p-5 relative shadow-none sm:shadow-xs rotate-0 sm:rotate-[0.5deg]">
                <div className="w-12 h-4 bg-emerald-400/30 border border-black/15 absolute -top-2.5 right-[10%] rotate-[1.5deg] rounded-xs pointer-events-none hidden sm:block" />
                <h4 className="font-display font-bold text-xs sm:text-base text-ink-black uppercase mb-1.5 sm:mb-2 flex items-center gap-1.5 select-none">
                  ✨ Proposed Solution
                </h4>
                <p className="font-body text-xs sm:text-sm text-ink-black/85 leading-relaxed m-0">
                  {detail?.solution}
                </p>
              </div>
            </div>

            {/* Key Features List (Open & clean left-accent on Mobile) */}
            {detail?.keyFeatures && (
              <div className="bg-[#fefcf7] border-l-4 sm:border-2 border-ink-black rounded-r-lg sm:rounded-xl p-3.5 sm:p-7 shadow-none sm:shadow-xs relative mt-2 sm:mt-3">
                <div className="absolute -top-3 left-6 w-20 h-4.5 bg-pale-yellow border border-black/15 rotate-[-1deg] rounded-xs pointer-events-none hidden sm:block" />
                <h3 className="font-display font-extrabold text-sm sm:text-lg text-ink-black mb-3 sm:mb-4 border-b border-black/10 sm:border-b-2 sm:border-black/5 pb-2 select-none uppercase">
                  🎯 Key System Features & Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                  {detail.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm font-body text-ink-black/90 leading-relaxed">
                      <span className="text-[#ff4081] font-bold select-none shrink-0 text-sm sm:text-base">✔</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* SECTION B: User Roles & Access Control */}
          {detail?.roles && detail.roles.length > 0 && (
            <section className="flex flex-col gap-4 sm:gap-6 pt-4 border-t border-ink-black/15 sm:border-t-2 sm:border-ink-black/10">
              <div>
                <h3 className="font-display font-extrabold text-base sm:text-2xl text-ink-black tracking-tight uppercase mb-0.5 sm:mb-1">
                  👥 User Roles & Access Control
                </h3>
                <p className="font-body text-[11px] sm:text-sm text-text-muted">
                  Different stakeholder interfaces, security boundaries, and user journeys.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
                {detail.roles.map((role, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-l-4 border-y border-r border-black/10 sm:border-2 sm:border-ink-black rounded-r-lg sm:rounded-xl p-3.5 sm:p-5 shadow-none sm:shadow-xs flex flex-col justify-between gap-3 sm:gap-4"
                  >
                    <div className="flex flex-col gap-2.5 sm:gap-3">
                      <div className="flex items-center gap-2 sm:gap-2.5 border-b border-black/10 pb-2 sm:pb-3">
                        <span className="text-xl sm:text-2xl p-1.5 sm:p-2 rounded-lg bg-black/[0.04] border border-black/10">
                          {role.icon}
                        </span>
                        <div>
                          <h4 className="font-display font-bold text-sm sm:text-base text-ink-black leading-tight">
                            {role.roleName}
                          </h4>
                          <span className="font-mono text-[9px] sm:text-[10px] text-text-muted uppercase">
                            Role #{idx + 1}
                          </span>
                        </div>
                      </div>

                      <ul className="list-none pl-0 m-0 flex flex-col gap-1.5 sm:gap-2">
                        {role.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-body text-ink-black/85 leading-relaxed">
                            <span className="text-text-muted shrink-0">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION C: Project Gallery & Screenshots */}
          {detail?.screenshots && detail.screenshots.length > 0 && (
            <section className="flex flex-col gap-4 sm:gap-6 pt-4 border-t border-ink-black/15 sm:border-t-2 sm:border-ink-black/10">
              <div>
                <h3 className="font-display font-extrabold text-base sm:text-2xl text-ink-black tracking-tight uppercase mb-0.5 sm:mb-1">
                  🖼️ Visual Gallery & Screenshots
                </h3>
                <p className="font-body text-[11px] sm:text-sm text-text-muted">
                  High-resolution visual captures of key workflows, interfaces, and system panels.
                </p>
              </div>

              <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-5 pt-1 sm:pt-2">
                {detail.screenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    className="break-inside-avoid bg-white border border-black/15 sm:border-2 sm:border-ink-black rounded-lg sm:rounded-xl p-1.5 sm:p-3 mb-3 sm:mb-5 shadow-none sm:shadow-2xs hover:shadow-xs transition-all duration-300 group"
                  >
                    <div className={`w-full bg-neutral-100 rounded-md sm:rounded-lg overflow-hidden border border-black/10 relative ${
                      shot.type === 'Mobile UI' || shot.type === 'Mobile View' ? 'py-3 sm:py-4 flex justify-center bg-[#f7f5f0]' : ''
                    }`}>
                      <img
                        src={shot.url}
                        alt={shot.caption}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        className={`protected-image pointer-events-none transition-transform duration-500 group-hover:scale-102 ${
                          shot.type === 'Mobile UI' || shot.type === 'Mobile View'
                            ? 'max-w-[75%] sm:max-w-[70%] h-auto object-contain bg-white p-1.5 sm:p-2 border border-black/10 rounded shadow-xs'
                            : 'w-full h-auto object-cover'
                        }`}
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-2 sm:mt-3 flex items-center justify-between gap-2 border-t border-black/10 pt-1.5 sm:pt-2.5">
                      <span className="font-body text-[11px] sm:text-xs font-semibold text-ink-black truncate">
                        {shot.caption}
                      </span>
                      <span className="text-[8.5px] sm:text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded bg-black/[0.05] border border-black/10 text-text-dark shrink-0">
                        {shot.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION D: Database Structure & API Integration */}
          {(detail?.database || detail?.apiEndpoints) && (
            <section className="flex flex-col gap-4 sm:gap-6 pt-4 border-t border-ink-black/15 sm:border-t-2 sm:border-ink-black/10">
              <div>
                <h3 className="font-display font-extrabold text-base sm:text-2xl text-ink-black tracking-tight uppercase mb-0.5 sm:mb-1">
                  🗄️ Database Architecture & Schemas
                </h3>
                <p className="font-body text-[11px] sm:text-sm text-text-muted">
                  {detail?.database?.description || 'Data models, relational schemas, and backend storage structure.'}
                </p>
              </div>

              {detail?.database?.tables && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
                  {detail.database.tables.map((table, tIdx) => (
                    <div
                      key={tIdx}
                      className="bg-white border border-black/15 sm:border-2 sm:border-ink-black rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-none sm:shadow-2xs flex flex-col gap-2"
                    >
                      <div className="font-mono text-xs sm:text-sm font-bold text-ink-black border-b border-black/10 pb-1.5 flex justify-between select-none">
                        <span>{table.name}</span>
                        <span className="text-[10px] text-text-muted font-sans font-semibold">table</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {table.fields.map((field, fIdx) => (
                          <span
                            key={fIdx}
                            className="font-mono text-[9.5px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded bg-black/[0.04] border border-black/10 text-text-dark font-medium"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* SECTION E: Local Setup & Terminal Quickstart */}
          {detail?.setup && (
            <section className="flex flex-col gap-4 sm:gap-6 pt-4 border-t border-ink-black/15 sm:border-t-2 sm:border-ink-black/10">
              <div>
                <h3 className="font-display font-extrabold text-base sm:text-2xl text-ink-black tracking-tight uppercase mb-0.5 sm:mb-1">
                  🛠️ Local Development & Quickstart
                </h3>
                <p className="font-body text-[11px] sm:text-sm text-text-muted">
                  Sequential commands to clone, configure, and boot the application locally.
                </p>
              </div>

              <div className="bg-[#fefcf7] border border-black/15 sm:border-2 sm:border-ink-black rounded-lg sm:rounded-xl p-3.5 sm:p-6 shadow-none sm:shadow-xs flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-col gap-3 sm:gap-4 font-mono text-sm">
                  {detail.setup.steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5 sm:gap-2 border-b border-black/10 pb-3 sm:pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between gap-2 sm:gap-4">
                        <span className="font-body text-[11px] sm:text-xs text-text-dark font-bold uppercase truncate">
                          Step {idx + 1}: {step.desc}
                        </span>
                        <button
                          onClick={() => handleCopy(step.cmd, idx)}
                          className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-black/20 bg-white text-[9px] sm:text-[10px] font-mono font-bold hover:bg-pale-yellow active:scale-95 transition-all cursor-pointer select-none shrink-0"
                        >
                          {copiedIdx === idx ? 'Copied ✓' : 'Copy'}
                        </button>
                      </div>
                      <div className="bg-black/[0.04] border border-black/15 rounded-md sm:rounded-lg p-2.5 sm:p-3 font-mono text-[11px] sm:text-sm text-ink-black select-all overflow-x-auto whitespace-nowrap">
                        $ {step.cmd}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Bottom Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 sm:pt-6 border-t border-ink-black/15 sm:border-t-2 sm:border-ink-black/10">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-soft-blue border-2 border-ink-black text-xs sm:text-sm font-mono font-bold text-ink-black neo-shadow hover:neo-shadow-hover active:scale-95 transition-all cursor-pointer"
            >
              <span>← Back to Gallery</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border-2 border-ink-black text-xs sm:text-sm font-mono font-bold text-ink-black neo-shadow hover:bg-pale-yellow active:scale-95 transition-all cursor-pointer"
            >
              <span>Top of Page ↑</span>
            </button>
          </div>

        </motion.article>
      </motion.main>

      {/* Giant Stacked Typography Footer */}
      <footer className="w-full border-t-2 border-ink-black bg-[var(--bg-primary)] pt-10 sm:pt-14 pb-8 px-4 sm:px-8 md:px-16 lg:px-20 mt-16 sm:mt-24 flex justify-center select-none overflow-hidden relative z-10">
        <div className="max-w-[1600px] w-full flex flex-col justify-between">
          {/* Top Info Bar */}
          <div className="flex flex-row justify-between items-center gap-2 pb-5 sm:pb-8 border-b-2 border-ink-black/10 font-mono text-xs sm:text-sm font-bold text-ink-black uppercase">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-pale-yellow border-2 border-ink-black neo-shadow-sm text-xs sm:text-sm font-extrabold">
                © 2026
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-3 text-text-muted text-[9.5px] xs:text-[11px] sm:text-xs">
              <span>CASE STUDY DOCUMENTATION</span>
              <span>•</span>
              <span>MYTAMAKIKII.WEB.ID</span>
            </div>
          </div>

          {/* Massive Stacked Name with calibrated responsive clamping */}
          <div className="py-6 sm:py-12 md:py-16 flex flex-col items-start leading-[0.85] tracking-tighter w-full">
            <span className="font-display font-black text-[13.5vw] xs:text-[14.2vw] sm:text-[14.5vw] md:text-[14vw] lg:text-[13vw] 2xl:text-[12.5rem] text-ink-black uppercase hover:text-soft-blue transition-colors duration-300">
              PRATAMA
            </span>
            <span className="font-display font-black text-[13.5vw] xs:text-[14.2vw] sm:text-[14.5vw] md:text-[14vw] lg:text-[13vw] 2xl:text-[12.5rem] text-ink-black uppercase hover:text-sticker-pink transition-colors duration-300">
              PUTRA
            </span>
            <span className="font-display font-black text-[13.5vw] xs:text-[14.2vw] sm:text-[14.5vw] md:text-[14vw] lg:text-[13vw] 2xl:text-[12.5rem] text-ink-black uppercase hover:text-mint transition-colors duration-300">
              PURWANTO
            </span>
          </div>

          {/* Bottom Disclaimer */}
          <div className="pt-6 border-t-2 border-ink-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] sm:text-xs font-mono text-text-muted">
            <span>Some assets and components may be subject to copyright • Non-profit personal portfolio.</span>
            <span className="shrink-0">Crafted in Cilacap, ID 🇮🇩</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

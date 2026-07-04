import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OverviewTab from './OverviewTab'
import RolesTab from './RolesTab'
import DatabaseTab from './DatabaseTab'
import SetupTab from './SetupTab'
import GalleryTab from './GalleryTab'
import { projectDetails } from '../../../data/projectDetails'

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

export default function JwdBeasiswaDetail({ project, onBack }) {
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const detail = projectDetails[9]

  const tabs = [
    { id: 'overview', label: '📖 Overview', color: 'var(--accent-pink)' },
    { id: 'roles', label: '👥 Roles & Features', color: 'var(--accent-mint)' },
    { id: 'database', label: '🗄️ DB Structure', color: 'var(--accent-blue)' },
    { id: 'setup', label: '🛠️ Local Setup', color: 'var(--accent-peach)' },
    { id: 'gallery', label: '🖼️ Gallery', color: 'var(--accent-lavender)' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab detail={detail} />
      case 'roles':
        return <RolesTab detail={detail} />
      case 'database':
        return <DatabaseTab detail={detail} />
      case 'setup':
        return <SetupTab detail={detail} />
      case 'gallery':
        return <GalleryTab detail={detail} />
      default:
        return null
    }
  }

  return (
    <div
      className="min-h-screen bg-[var(--bg-primary)] flex flex-col w-full relative z-50 pb-20"
      style={{
        backgroundImage: `linear-gradient(rgba(160, 160, 190, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(160, 160, 190, 0.12) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Header bar */}
      <div className="sticky top-0 z-30 bg-[var(--bg-secondary)] border-b border-black/10 px-4 py-3 flex items-center justify-between shadow-xs gap-3">
        <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-mono text-[var(--text-dark)] overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="opacity-60 hidden sm:inline">tama-porto</span>
          <span className="opacity-40 hidden sm:inline">/</span>
          <span className="opacity-60 hidden sm:inline">projects</span>
          <span className="opacity-40 hidden sm:inline">/</span>
          <span className="font-semibold">{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
          <span className="opacity-40">/</span>
          <span className="text-[var(--text-handwrite)] bg-[var(--accent-yellow)] px-1.5 py-0.5 rounded-sm text-[9px] md:text-[10px] font-sans rotate-[-1deg] shrink-0">README.md</span>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-[var(--accent-pink)] border border-black/10 text-xs font-semibold text-[var(--text-dark)] hover:bg-[var(--accent-pink)]/85 active:scale-95 transition-all cursor-pointer shadow-3xs rotate-[1deg] shrink-0 whitespace-nowrap"
        >
          ← <span className="hidden sm:inline">Back to Gallery</span><span className="sm:hidden">Back</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 md:py-14 flex flex-col justify-start"
      >
        {/* Project Header Binder Card */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="inline-block px-2.5 py-0.5 rounded-sm text-[9px] font-semibold tracking-wider uppercase border border-black/10 bg-white text-[var(--text-dark)] shadow-3xs">
              {project.status}
            </span>
          </div>
          <h1 className="font-display font-semibold text-2xl md:text-3xl lg:text-4xl text-[var(--text-dark)] tracking-tight m-0 uppercase leading-none">
            {project.title}
          </h1>
          <p className="font-body text-xs md:text-sm text-[var(--text-muted)] italic m-0">
            {detail?.tagline || project.desc}
          </p>
        </div>

        {/* Paper Binder / Markdown Box */}
        <div className="bg-white border border-black/10 rounded-sm shadow-md relative flex flex-col overflow-hidden">
          {/* File Viewer Header */}
          <div className="bg-[var(--bg-secondary)]/30 border-b border-black/10 px-4 py-2.5 flex items-center justify-between text-xs font-mono select-none">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--text-dark)]">
              <ReadmeIcon className="opacity-70 shrink-0" />
              <span>README.md</span>
            </div>
            <span className="text-[10px] opacity-60 font-sans">Interactive Project Binder</span>
          </div>

          {/* Interactive Index Tabs (Notebook Folders style) */}
          <div className="flex overflow-x-auto border-b border-black/10 bg-[var(--bg-secondary)]/10 px-2 pt-2 gap-1 scrollbar-none select-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-3 py-2 text-xs font-semibold font-body rounded-t-sm border border-b-0 border-black/10 cursor-pointer transition-all flex-shrink-0 relative top-[1px]"
                  style={{
                    backgroundColor: isActive ? 'white' : 'transparent',
                    borderTopColor: isActive ? 'black/15' : 'transparent',
                    borderLeftColor: isActive ? 'black/15' : 'transparent',
                    borderRightColor: isActive ? 'black/15' : 'transparent',
                    opacity: isActive ? 1 : 0.65,
                    transform: isActive ? 'scaleY(1.05) translateY(-1px)' : 'none',
                    zIndex: isActive ? 5 : 1,
                  }}
                >
                  {tab.label}
                  {isActive && (
                    <div 
                      className="absolute left-0 right-0 top-0 h-[3px] rounded-t-sm"
                      style={{ backgroundColor: tab.color }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

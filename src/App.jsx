import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import BackgroundElements from './components/layout/BackgroundElements'
import Loader from './components/layout/Loader'
import { projects } from './data/projects'

const VisualReveal = lazy(() => import('./components/sections/VisualReveal'))
const About = lazy(() => import('./components/sections/About'))
const Journey = lazy(() => import('./components/sections/Journey'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Certifications = lazy(() => import('./components/sections/Certifications'))
const Hobbies = lazy(() => import('./components/sections/Hobbies'))
const Contact = lazy(() => import('./components/sections/Contact'))
const ProjectDetail = lazy(() => import('./components/sections/ProjectDetail'))

// Helper to get active project ID from pathname (e.g. /projects/ticketly)
function getProjectIdFromPath() {
  if (typeof window === 'undefined') return null
  const path = window.location.pathname
  const match = path.match(/^\/projects\/([a-zA-Z0-9_-]+)/)
  if (match) {
    const slugOrId = match[1]
    const proj = projects.find(p => p.slug === slugOrId || String(p.id) === slugOrId)
    return proj ? proj.id : null
  }
  return null
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeProjectId, setActiveProjectId] = useState(() => getProjectIdFromPath())
  const [savedScrollY, setSavedScrollY] = useState(0)

  // Sync state when browser back/forward buttons are clicked
  useEffect(() => {
    const handlePopState = () => {
      const idFromPath = getProjectIdFromPath()
      setActiveProjectId(idFromPath)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Scroll-Spy: Update URL hash dynamically in address bar as user scrolls
  useEffect(() => {
    if (isLoading || activeProjectId) return

    const sectionIds = ['hero', 'about', 'journey', 'projects', 'skills', 'certifications', 'hobbies', 'contact']
    let timeoutId = null

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.35
        let currentSection = ''

        for (const id of sectionIds) {
          const el = document.getElementById(id)
          if (el) {
            const top = el.offsetTop
            const height = el.offsetHeight
            if (scrollPosition >= top && scrollPosition < top + height) {
              currentSection = id
              break
            }
          }
        }

        if (currentSection) {
          const newHash = `#${currentSection}`
          if (window.location.hash !== newHash) {
            window.history.replaceState(null, '', newHash)
          }
        }
      }, 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Trigger initial section check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isLoading, activeProjectId])

  const handleOpenDetail = (id) => {
    setSavedScrollY(window.scrollY)
    const proj = projects.find(p => p.id === id)
    if (proj) {
      window.history.pushState({ projectId: id }, '', `/projects/${proj.slug}`)
    }
    setActiveProjectId(id)
  }

  const handleCloseDetail = () => {
    setActiveProjectId(null)
    window.history.pushState(null, '', '/')
    // Restore scroll position after mount
    setTimeout(() => {
      window.scrollTo({
        top: savedScrollY,
        behavior: 'instant'
      })
    }, 50)
  }

  const activeProject = projects.find(p => p.id === activeProjectId)

  return (
    <div className="min-h-screen flex flex-col justify-start relative w-full">
      {/* Y2K OS Style Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {activeProject ? (
            <Suspense fallback={null}>
              <ProjectDetail 
                project={activeProject} 
                onBack={handleCloseDetail} 
              />
            </Suspense>
          ) : (
            <>
              {/* GSAP-Powered Mobile-Responsive Navbar */}
              <Navbar />

              {/* Floating Background Stickers & Doodles */}
              <BackgroundElements />

              {/* Scrapbook Section Stack */}
              <main className="flex-grow w-full relative z-10">
                <Hero />
                <Suspense fallback={null}>
                  <VisualReveal />
                  <About />
                  <Journey />
                  <Projects onOpenDetail={handleOpenDetail} />
                  <Skills />
                  <Certifications />
                  <Hobbies />
                  <Contact />
                </Suspense>
              </main>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default App


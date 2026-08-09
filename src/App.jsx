import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import BackgroundElements from './components/layout/BackgroundElements'
import Loader from './components/layout/Loader'
import { projects } from './data/projects'
import BirthdayToast from './components/birthday/BirthdayToast'

const VisualReveal = lazy(() => import('./components/sections/VisualReveal'))
const About = lazy(() => import('./components/sections/About'))
const Journey = lazy(() => import('./components/sections/Journey'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Certifications = lazy(() => import('./components/sections/Certifications'))
const Hobbies = lazy(() => import('./components/sections/Hobbies'))
const Contact = lazy(() => import('./components/sections/Contact'))
const ProjectDetail = lazy(() => import('./components/sections/ProjectDetail'))
const BirthdayPage = lazy(() => import('./components/birthday/BirthdayPage'))

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

// Helper to check if current pathname is /20
function checkIsBirthdayPath() {
  if (typeof window === 'undefined') return false
  return window.location.pathname === '/20'
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeProjectId, setActiveProjectId] = useState(() => getProjectIdFromPath())
  const [isBirthdayRoute, setIsBirthdayRoute] = useState(() => checkIsBirthdayPath())
  const [showBirthdayToast, setShowBirthdayToast] = useState(false)
  const [savedScrollY, setSavedScrollY] = useState(0)

  // Sync state when browser back/forward buttons are clicked
  useEffect(() => {
    const handlePopState = () => {
      const idFromPath = getProjectIdFromPath()
      setActiveProjectId(idFromPath)
      setIsBirthdayRoute(checkIsBirthdayPath())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Auto Date Tweak: Check if today is 15 August 2026
  useEffect(() => {
    const now = new Date()
    const isBirthdayDay = now.getMonth() === 7 && now.getDate() === 15 && now.getFullYear() === 2026
    if (isBirthdayDay) {
      document.title = 'Tama — 20'
    }
  }, [])

  // Logo 5-click easter egg counter logic
  const [logoClicks, setLogoClicks] = useState([])
  const handleLogoClick = () => {
    const now = Date.now()
    const recentClicks = [...logoClicks, now].filter(t => now - t <= 3000)
    setLogoClicks(recentClicks)

    if (recentClicks.length >= 5) {
      setShowBirthdayToast(true)
      setLogoClicks([])
    }
  }

  // Keyboard Easter Egg sequence listener (Press '2' then '0')
  useEffect(() => {
    let lastKey = ''
    let keyTimeout = null

    const handleKeyDown = (e) => {
      // Ignore key events when typing inside form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return
      }

      if (e.key === '2') {
        lastKey = '2'
        if (keyTimeout) clearTimeout(keyTimeout)
        keyTimeout = setTimeout(() => { lastKey = '' }, 1500)
      } else if (e.key === '0' && lastKey === '2') {
        setShowBirthdayToast(true)
        lastKey = ''
        if (keyTimeout) clearTimeout(keyTimeout)
      } else {
        lastKey = ''
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (keyTimeout) clearTimeout(keyTimeout)
    }
  }, [])

  // Scroll-Spy: Update URL hash dynamically in address bar as user scrolls
  useEffect(() => {
    if (isLoading || activeProjectId || isBirthdayRoute) return

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
  }, [isLoading, activeProjectId, isBirthdayRoute])

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
    setTimeout(() => {
      window.scrollTo({
        top: savedScrollY,
        behavior: 'instant'
      })
    }, 50)
  }

  const handleNavigateToBirthday = () => {
    setSavedScrollY(window.scrollY)
    window.history.pushState({ path: '/20' }, '', '/20')
    setIsBirthdayRoute(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleBackToPortfolio = () => {
    setIsBirthdayRoute(false)
    window.history.pushState(null, '', '/')
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
          {/* Easter Egg Popup Toast */}
          <AnimatePresence>
            {showBirthdayToast && (
              <BirthdayToast
                onClose={() => setShowBirthdayToast(false)}
                onNavigateToBirthday={handleNavigateToBirthday}
              />
            )}
          </AnimatePresence>

          {isBirthdayRoute ? (
            <Suspense fallback={null}>
              <BirthdayPage onBackToPortfolio={handleBackToPortfolio} />
            </Suspense>
          ) : activeProject ? (
            <Suspense fallback={null}>
              <ProjectDetail 
                project={activeProject} 
                onBack={handleCloseDetail} 
              />
            </Suspense>
          ) : (
            <>
              {/* GSAP-Powered Mobile-Responsive Navbar */}
              <Navbar onLogoClick={handleLogoClick} />

              {/* Floating Background Stickers & Doodles */}
              <BackgroundElements />

              {/* Scrapbook Section Stack */}
              <main className="flex-grow w-full relative z-10">
                <Hero onOpenBirthday={handleNavigateToBirthday} />
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

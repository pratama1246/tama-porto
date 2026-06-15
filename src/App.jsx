import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Journey from './components/sections/Journey'
import VisualReveal from './components/sections/VisualReveal'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Certifications from './components/sections/Certifications'
import Hobbies from './components/sections/Hobbies'
import Contact from './components/sections/Contact'
import BackgroundElements from './components/layout/BackgroundElements'
import Loader from './components/layout/Loader'
import { projects } from './data/projects'
import ProjectDetail from './components/sections/ProjectDetail'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeProjectId, setActiveProjectId] = useState(null)
  const [savedScrollY, setSavedScrollY] = useState(0)

  const handleOpenDetail = (id) => {
    setSavedScrollY(window.scrollY)
    setActiveProjectId(id)
  }

  const handleCloseDetail = () => {
    setActiveProjectId(null)
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
            <ProjectDetail 
              project={activeProject} 
              onBack={handleCloseDetail} 
            />
          ) : (
            <>


              {/* GSAP-Powered Mobile-Responsive Navbar */}
              <Navbar />

              {/* Floating Background Stickers & Doodles */}
              <BackgroundElements />

              {/* Scrapbook Section Stack */}
              <main className="flex-grow w-full relative z-10">
                <Hero />
                <VisualReveal />
                <About />
                <Journey />
                <Projects onOpenDetail={handleOpenDetail} />
                <Skills />
                <Certifications />
                <Hobbies />
                <Contact />
              </main>
            </>
          )}
        </>
      )}

    </div>
  )
}

export default App


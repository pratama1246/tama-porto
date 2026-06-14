import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import VisualReveal from './components/sections/VisualReveal'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Certifications from './components/sections/Certifications'
import Hobbies from './components/sections/Hobbies'
import Contact from './components/sections/Contact'
import BackgroundElements from './components/layout/BackgroundElements'
import CircularText from './components/reactbits/CircularText'
import Loader from './components/layout/Loader'

function App() {
  const [isLoading, setIsLoading] = useState(true)

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
          {/* Rotating Circular Text Seal (Desktop only, fixed in bottom left) */}
          <CircularText
            text="TAMA*GALLERY*ESTD*2026*"
            spinDuration={24}
            onHover="speedUp"
            className="hidden md:block fixed bottom-16 left-16 z-[99]"
            radius={35}
          />

          {/* GSAP-Powered Mobile-Responsive Navbar */}
          <Navbar />

          {/* Floating Background Stickers & Doodles */}
          <BackgroundElements />

          {/* Scrapbook Section Stack */}
          <main className="flex-grow w-full relative z-10">
            <Hero />
            <VisualReveal />
            <About />
            <Projects />
            <Skills />
            <Certifications />
            <Hobbies />
            <Contact />
          </main>
        </>
      )}

    </div>
  )
}

export default App


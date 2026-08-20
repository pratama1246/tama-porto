import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default') // 'default' | 'link' | 'drag' | 'view'
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth liquid spring trailing (kelenturan halus & elastis)
  const springConfig = { damping: 22, stiffness: 280, mass: 0.55 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e) => {
      const target = e.target

      // Check for draggable cards
      if (target.closest('.cursor-grab, .cursor-grabbing, [data-cursor="drag"]')) {
        setCursorType('drag')
        return
      }

      // Check for project cards / links
      if (target.closest('[data-cursor="view"], .project-card')) {
        setCursorType('view')
        return
      }

      // Check for regular interactive links / buttons
      if (target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer')) {
        setCursorType('link')
        return
      }

      setCursorType('default')
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible])

  if (!isVisible) return null

  // Dynamic styles based on hover context (Solid Soft Neobrutal Pastel)
  const getRingVariants = () => {
    switch (cursorType) {
      case 'link':
        return {
          width: 58,
          height: 58,
          backgroundColor: '#FFD1DC', // Pastel sticker pink
          borderColor: '#1A1A1A',
          scale: isClicking ? 0.88 : 1,
          opacity: 0.92,
          borderRadius: 9999
        }
      case 'drag':
        return {
          width: 86,
          height: 36,
          backgroundColor: '#FFF9C4', // Pale yellow sticky note
          borderColor: '#1A1A1A',
          scale: isClicking ? 0.92 : 1,
          opacity: 0.95,
          borderRadius: 9999
        }
      case 'view':
        return {
          width: 86,
          height: 36,
          backgroundColor: '#D0F0C0', // Mint
          borderColor: '#1A1A1A',
          scale: isClicking ? 0.92 : 1,
          opacity: 0.95,
          borderRadius: 9999
        }
      default:
        return {
          width: 44,
          height: 44,
          backgroundColor: 'rgba(255, 255, 255, 0.45)',
          borderColor: '#1A1A1A',
          scale: isClicking ? 0.75 : 1,
          opacity: 0.65,
          borderRadius: 9999
        }
    }
  }

  return (
    <div className="hidden lg:block pointer-events-none">
      {/* 1. Mini Polaroid Smiley (Favicon) as Custom Cursor Pointer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.82 : cursorType === 'link' ? 1.12 : 1,
          rotate: isClicking ? 8 : cursorType === 'link' ? -10 : -4,
          opacity: cursorType === 'drag' || cursorType === 'view' ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" className="drop-shadow-xs">
          {/* Polaroid background frame */}
          <rect x="2" y="2" width="28" height="28" rx="3" fill="#ffffff" stroke="#1A1A1A" strokeWidth="2" />
          {/* Inner photo area (pastel yellow accent) */}
          <rect x="5" y="5" width="22" height="17" rx="1" fill="#ffeaa7" stroke="#1A1A1A" strokeWidth="2" />
          {/* Cute smiley face in the photo area */}
          <circle cx="12" cy="12" r="1.5" fill="#1A1A1A" />
          <circle cx="20" cy="12" r="1.5" fill="#1A1A1A" />
          <path d="M12,16 Q16,19 20,16" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Tape/sticker decoration at the top (pastel pink accent) */}
          <rect x="10" y="1" width="12" height="4" fill="#ffb3c6" transform="rotate(-5, 16, 3)" stroke="#1A1A1A" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* 2. Outer Soft Neobrutal Ring / Context Pill (Trailing with elastic fluid spring) */}
      <motion.div
        className="fixed top-0 left-0 border-2 border-ink-black pointer-events-none z-[99998] flex items-center justify-center neo-shadow-sm select-none overflow-hidden"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={getRingVariants()}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      >
        <AnimatePresence mode="wait">
          {cursorType === 'drag' && (
            <motion.span
              key="drag"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.12 }}
              className="text-[10px] font-mono font-extrabold text-ink-black tracking-wider uppercase whitespace-nowrap"
            >
              DRAG ✋
            </motion.span>
          )}
          {cursorType === 'view' && (
            <motion.span
              key="view"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.12 }}
              className="text-[10px] font-mono font-extrabold text-ink-black tracking-wider uppercase whitespace-nowrap"
            >
              VIEW ↗
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

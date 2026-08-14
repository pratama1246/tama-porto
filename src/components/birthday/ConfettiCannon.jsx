// src/components/birthday/ConfettiCannon.jsx
// High-density slow-falling floating celebratory confetti engine

import { useEffect, useRef } from 'react'

export default function ConfettiCannon({ triggerOnMount = true }) {
  const canvasRef = useRef(null)

  const blastConfetti = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = [
      '#f43f5e', '#fb7185', '#fda4af', '#38bdf8', '#0ea5e9',
      '#7dd3fc', '#fbbf24', '#f59e0b', '#fde047', '#a855f7',
      '#c084fc', '#34d399', '#6ee7b7', '#f472b6', '#fed7aa',
      '#bae6fd', '#e9d5ff', '#ffedd5'
    ]

    const shapes = ['rect', 'ribbon', 'circle', 'streamer']
    const particles = []
    const particleCount = 320 // Filled screen density

    // 1. Left Edge High Cannon (Shoots high arc to center-right)
    for (let i = 0; i < 110; i++) {
      const angle = (Math.PI / 180) * (Math.random() * 32 + 38) // 38° to 70°
      const speed = Math.random() * 18 + 14
      particles.push({
        x: -15,
        y: window.innerHeight * 0.9,
        vx: Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.08 + 0.03,
        gravity: Math.random() * 0.06 + 0.08, // Ultra-slow gentle gravity (0.08 to 0.14)
        drag: 0.972,
        opacity: 1,
        delay: 0
      })
    }

    // 2. Right Edge High Cannon (Shoots high arc to center-left)
    for (let i = 0; i < 110; i++) {
      const angle = (Math.PI / 180) * (Math.random() * 32 + 38)
      const speed = Math.random() * 18 + 14
      particles.push({
        x: window.innerWidth + 15,
        y: window.innerHeight * 0.9,
        vx: -Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.08 + 0.03,
        gravity: Math.random() * 0.06 + 0.08,
        drag: 0.972,
        opacity: 1,
        delay: 150 // Staggered slightly
      })
    }

    // 3. Screen Top Canopy Fillers (Slow floating flutterers across the top)
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: -(Math.random() * 100 + 10),
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 2 + 1,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 3,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.07 + 0.04,
        gravity: Math.random() * 0.05 + 0.07,
        drag: 0.98,
        opacity: 1,
        delay: Math.random() * 600 + 200 // Staggered rain
      })
    }

    let animationFrameId
    const startTime = performance.now()
    const duration = 8500 // 8.5 seconds slow floating celebration

    const render = (time) => {
      const elapsed = time - startTime
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let activeParticles = 0

      for (let p of particles) {
        if (elapsed < p.delay) continue

        p.x += p.vx + Math.sin(p.wobble) * 2.2
        p.y += p.vy
        p.vy += p.gravity
        p.vx *= p.drag
        p.vy *= p.drag
        p.rotation += p.rotationSpeed
        p.wobble += p.wobbleSpeed

        // Fade out gently after 5.5s
        if (elapsed > 5500) {
          p.opacity = Math.max(0, 1 - (elapsed - 5500) / 3000)
        }

        if (p.opacity > 0 && p.y < canvas.height + 60) {
          activeParticles++
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate((p.rotation * Math.PI) / 180)
          ctx.globalAlpha = p.opacity
          ctx.fillStyle = p.color

          if (p.shape === 'circle') {
            ctx.beginPath()
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
            ctx.fill()
          } else if (p.shape === 'ribbon') {
            ctx.fillRect(-p.size, -p.size / 3.5, p.size * 2.4, p.size / 1.6)
          } else if (p.shape === 'streamer') {
            ctx.fillRect(-p.size * 1.5, -p.size / 4, p.size * 3, p.size / 2.5)
          } else {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.35)
          }
          ctx.restore()
        }
      }

      if (activeParticles > 0 && elapsed < duration) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    window.addEventListener('resize', handleResize)

    if (triggerOnMount) {
      // 900ms delay for smooth mount
      const timer = setTimeout(() => {
        blastConfetti()
      }, 900)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', handleResize)
      }
    }

    return () => window.removeEventListener('resize', handleResize)
  }, [triggerOnMount])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />
      {/* Floating Confetti Re-Blast Button */}
      <button
        onClick={blastConfetti}
        title="Blast Confetti! 🎉"
        className="fixed bottom-6 right-6 z-40 px-3.5 py-2 bg-white/90 hover:bg-white text-[var(--text-dark)] rounded-full border border-black/10 shadow-md text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-xs transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
      >
        🎉 <span>Blast Confetti!</span>
      </button>
    </>
  )
}

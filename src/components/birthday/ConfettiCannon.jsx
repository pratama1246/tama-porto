// src/components/birthday/ConfettiCannon.jsx
// Ultra-slow floating celebratory confetti engine (Slow-motion flutter, especially on mobile)

import { useEffect, useRef } from 'react'

export default function ConfettiCannon({ triggerOnMount = true }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationFrameIdRef = useRef(null)

  const addConfettiBurst = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = window.innerWidth || document.documentElement.clientWidth || 380
    const height = window.innerHeight || document.documentElement.clientHeight || 700
    const isMobile = width < 768

    canvas.width = width
    canvas.height = height

    const colors = [
      '#f43f5e', '#fb7185', '#fda4af', '#38bdf8', '#0ea5e9',
      '#7dd3fc', '#fbbf24', '#f59e0b', '#fde047', '#a855f7',
      '#c084fc', '#34d399', '#6ee7b7', '#f472b6', '#fed7aa',
      '#bae6fd', '#e9d5ff', '#ffedd5'
    ]

    const shapes = ['rect', 'ribbon', 'circle', 'streamer']
    const newParticles = []
    const burstCount = isMobile ? 100 : 150
    const baseSpeed = isMobile ? 8 : 13
    const speedVar = isMobile ? 5 : 10

    // 1. Left Edge Cannon (Shoots high arc to center-right)
    for (let i = 0; i < Math.floor(burstCount * 0.45); i++) {
      const angle = (Math.PI / 180) * (Math.random() * 28 + 42) // 42° to 70° high launch
      const speed = Math.random() * speedVar + baseSpeed
      newParticles.push({
        x: isMobile ? 0 : -15,
        y: height * 0.88,
        vx: Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        size: isMobile ? Math.random() * 6 + 4 : Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2.5,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.06 + 0.02,
        gravity: isMobile ? 0.035 : 0.045, // Ultra-slow floating descent
        drag: isMobile ? 0.982 : 0.98, // Floaty air resistance
        opacity: 1,
        life: 0,
        maxLife: isMobile ? 560 : 520 // ~9 to 10 seconds of slow float
      })
    }

    // 2. Right Edge Cannon (Shoots high arc to center-left)
    for (let i = 0; i < Math.floor(burstCount * 0.45); i++) {
      const angle = (Math.PI / 180) * (Math.random() * 28 + 42)
      const speed = Math.random() * speedVar + baseSpeed
      newParticles.push({
        x: isMobile ? width : width + 15,
        y: height * 0.88,
        vx: -Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        size: isMobile ? Math.random() * 6 + 4 : Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2.5,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.06 + 0.02,
        gravity: isMobile ? 0.035 : 0.045,
        drag: isMobile ? 0.982 : 0.98,
        opacity: 1,
        life: 0,
        maxLife: isMobile ? 560 : 520
      })
    }

    // 3. Top Canopy Fillers
    for (let i = 0; i < Math.floor(burstCount * 0.1); i++) {
      newParticles.push({
        x: Math.random() * width,
        y: -(Math.random() * 30 + 10),
        vx: (Math.random() - 0.5) * 2.5,
        vy: Math.random() * 1.2 + 0.5,
        size: isMobile ? Math.random() * 6 + 4 : Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
        gravity: isMobile ? 0.03 : 0.04,
        drag: 0.985,
        opacity: 1,
        life: 0,
        maxLife: isMobile ? 560 : 520
      })
    }

    // Append new particles up to 500 cap
    const combined = [...particlesRef.current, ...newParticles]
    const MAX_PARTICLES = 500
    if (combined.length > MAX_PARTICLES) {
      particlesRef.current = combined.slice(combined.length - MAX_PARTICLES)
    } else {
      particlesRef.current = combined
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth || document.documentElement.clientWidth || 380
        canvasRef.current.height = window.innerHeight || document.documentElement.clientHeight || 700
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Continuous smooth animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const remainingParticles = []

      for (let p of particlesRef.current) {
        p.life++
        p.x += p.vx + Math.sin(p.wobble) * 2.4
        p.y += p.vy
        p.vy += p.gravity
        p.vx *= p.drag
        p.vy *= p.drag
        p.rotation += p.rotationSpeed
        p.wobble += p.wobbleSpeed

        // Gentle fade out in last 140 frames (~2.3 seconds)
        if (p.life > p.maxLife - 140) {
          p.opacity = Math.max(0, (p.maxLife - p.life) / 140)
        }

        if (p.opacity > 0 && p.y < canvas.height + 60 && p.x > -60 && p.x < canvas.width + 60) {
          remainingParticles.push(p)

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
            ctx.fillRect(-p.size, -p.size / 3.5, p.size * 2.2, p.size / 1.6)
          } else if (p.shape === 'streamer') {
            ctx.fillRect(-p.size * 1.4, -p.size / 4, p.size * 2.8, p.size / 2.5)
          } else {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.3)
          }
          ctx.restore()
        }
      }

      particlesRef.current = remainingParticles
      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    animationFrameIdRef.current = requestAnimationFrame(animate)

    // Guaranteed Auto-Blast on Mount (Wave 1 at 300ms, Wave 2 at 700ms)
    let timer1, timer2
    if (triggerOnMount) {
      timer1 = setTimeout(() => {
        addConfettiBurst()
      }, 300)

      timer2 = setTimeout(() => {
        addConfettiBurst()
      }, 700)
    }

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current)
      if (timer1) clearTimeout(timer1)
      if (timer2) clearTimeout(timer2)
      window.removeEventListener('resize', handleResize)
    }
  }, [triggerOnMount])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />
      {/* Floating Confetti Re-Blast Button */}
      <button
        onClick={addConfettiBurst}
        title="Blast Confetti! 🎉"
        className="fixed bottom-6 right-6 z-40 px-3.5 py-2 bg-white/90 hover:bg-white text-[var(--text-dark)] rounded-full border border-black/10 shadow-md text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-xs transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
      >
        🎉 <span>Blast Confetti!</span>
      </button>
    </>
  )
}

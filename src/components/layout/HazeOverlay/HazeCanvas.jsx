import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { hazeConfig } from '../../../data/haze'

export default function HazeCanvas({ isActive }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isActive) return

    const ctx = canvas.getContext('2d')
    let animId
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    // Pre-render soft puff sprite on offscreen canvas for 60fps performance
    const puff = document.createElement('canvas')
    const pSize = 180
    puff.width = puff.height = pSize
    const pctx = puff.getContext('2d')
    const grad = pctx.createRadialGradient(pSize / 2, pSize / 2, 0, pSize / 2, pSize / 2, pSize / 2)
    grad.addColorStop(0, 'rgba(180, 125, 60, 0.35)')
    grad.addColorStop(0.5, 'rgba(140, 95, 50, 0.15)')
    grad.addColorStop(1, 'rgba(40, 30, 25, 0)')
    pctx.fillStyle = grad
    pctx.fillRect(0, 0, pSize, pSize)

    // Init smoke particles
    const isMobile = window.innerWidth < 768
    const count = isMobile ? hazeConfig.particleCountMobile : hazeConfig.particleCountDesktop
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: (isMobile ? 180 : 320) + Math.random() * 180,
      vx: 0.15 + Math.random() * 0.3,
      vy: (Math.random() - 0.5) * 0.1,
      alpha: 0.12 + Math.random() * 0.18,
      wobble: Math.random() * Math.PI * 2,
    }))

    const mouse = { x: -1000, y: -1000 }
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onTouch = (e) => {
      if (e.touches[0]) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch)

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, w, h)

      // Ambient warm hazy tint
      ctx.fillStyle = 'rgba(160, 105, 50, 0.045)'
      ctx.fillRect(0, 0, w, h)

      particles.forEach((p) => {
        p.wobble += 0.008
        p.x += p.vx + Math.sin(p.wobble) * 0.2
        p.y += p.vy + Math.cos(p.wobble) * 0.2

        // Soft cursor wind deflection
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 180 && dist > 0) {
          const force = (1 - dist / 180) * 1.8
          p.x += (dx / dist) * force
          p.y += (dy / dist) * force
        }

        // Loop boundaries smoothly
        if (p.x - p.size > w) p.x = -p.size
        if (p.y - p.size > h) p.y = -p.size
        if (p.y + p.size < 0) p.y = h + p.size

        ctx.globalAlpha = p.alpha
        ctx.drawImage(puff, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
      })

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', onResize)
    }
  }, [isActive])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </motion.div>
  )
}

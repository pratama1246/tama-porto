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

    // 1. Pre-render sprite gumpalan kabut tebal putih-keabuan (high density)
    const puff = document.createElement('canvas')
    const pSize = 340
    puff.width = puff.height = pSize
    const pctx = puff.getContext('2d')
    const grad = pctx.createRadialGradient(pSize / 2, pSize / 2, 0, pSize / 2, pSize / 2, pSize / 2)
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
    grad.addColorStop(0.3, 'rgba(248, 245, 238, 0.78)')
    grad.addColorStop(0.65, 'rgba(230, 225, 215, 0.45)')
    grad.addColorStop(1, 'rgba(205, 200, 190, 0)')
    pctx.fillStyle = grad
    pctx.fillRect(0, 0, pSize, pSize)

    // 2. Inisialisasi gumpalan awan kabut tebal & lebar
    const isMobile = window.innerWidth < 768
    const count = isMobile ? hazeConfig.particleCountMobile : hazeConfig.particleCountDesktop
    const clouds = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: (isMobile ? 320 : 500) + Math.random() * 320,
      vx: 0.2 + Math.random() * 0.35,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: 0.45 + Math.random() * 0.4, // Opacity tebal nyata (hingga 85%)
      wobble: Math.random() * Math.PI * 2,
    }))

    // 3. Serpihan abu gambut halus yang lebih banyak
    const ashCount = isMobile ? 20 : 40
    const ashFlakes = Array.from({ length: ashCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 1.8 + Math.random() * 2.6,
      vx: 0.3 + Math.random() * 0.4,
      vy: 0.6 + Math.random() * 0.7,
      alpha: 0.55 + Math.random() * 0.4,
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

    // 4. Animation render loop (Clear murni tanpa bikin layar gelap/kusam)
    const render = () => {
      ctx.clearRect(0, 0, w, h)

      // Lapisan selimut kabut putih transparan tipis (memberi efek depth atmosfer berkabut)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.fillRect(0, 0, w, h)

      // Gambar gumpalan kabut putih
      clouds.forEach((c) => {
        c.wobble += 0.006
        c.x += c.vx + Math.sin(c.wobble) * 0.25
        c.y += c.vy + Math.cos(c.wobble) * 0.2

        // Kursor menepis/menyibak gumpalan kabut
        const dx = c.x - mouse.x
        const dy = c.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 200 && dist > 0) {
          const force = (1 - dist / 200) * 2.5
          c.x += (dx / dist) * force
          c.y += (dy / dist) * force
        }

        // Looping layar saat kabut keluar batas
        if (c.x - c.size / 2 > w) c.x = -c.size / 2
        if (c.y - c.size / 2 > h) c.y = -c.size / 2
        if (c.y + c.size / 2 < 0) c.y = h + c.size / 2

        ctx.globalAlpha = c.alpha
        ctx.drawImage(puff, c.x - c.size / 2, c.y - c.size / 2, c.size, c.size)
      })

      // Gambar serpihan abu gambut melayang
      ashFlakes.forEach((a) => {
        a.wobble += 0.02
        a.x += a.vx + Math.sin(a.wobble) * 0.4
        a.y += a.vy

        if (a.x > w) a.x = 0
        if (a.y > h) a.y = 0

        ctx.globalAlpha = a.alpha
        ctx.fillStyle = '#3a322c'
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2)
        ctx.fill()
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
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </motion.div>
  )
}

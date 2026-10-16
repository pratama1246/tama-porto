import { useState } from 'react'
import HazeCanvas from './HazeCanvas'
import HazeBadge from './HazeBadge'
import { hazeConfig } from '../../../data/haze'

export default function HazeOverlay({ isLoading = false }) {
  const [isActive, setIsActive] = useState(() => {
    if (typeof window === 'undefined') return true
    const saved = sessionStorage.getItem(hazeConfig.storageKey)
    return saved !== null ? saved === 'true' : true
  })

  const handleToggle = () => {
    setIsActive((prev) => {
      const next = !prev
      sessionStorage.setItem(hazeConfig.storageKey, String(next))
      return next
    })
  }

  // Tampilkan hanya setelah loader awal selesai
  if (isLoading) return null

  return (
    <>
      <HazeCanvas isActive={isActive} />
      <HazeBadge isActive={isActive} onToggle={handleToggle} />
    </>
  )
}

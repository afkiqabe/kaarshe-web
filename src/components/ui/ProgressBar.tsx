'use client'

import { useEffect, useState } from 'react'

export function ProgressBar() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setWidth(scrollPercent)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-neutral-200 z-[100]">
      <div
        className="h-full bg-accent-burgundy transition-all duration-150"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
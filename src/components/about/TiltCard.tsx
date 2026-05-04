'use client'
import React, { useRef } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  glare?: boolean
}

function TiltCard({ children, className = '', intensity = 12, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = x / rect.width
    const py = y / rect.height
    const rx = (0.5 - py) * intensity
    const ry = (px - 0.5) * intensity

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    })
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(rafRef.current)
    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative will-change-transform transition-transform duration-300 ease-out spotlight-card ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:opacity-100"
          style={{
            background:
              'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.25), transparent 40%)',
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </div>
  )
}

export { TiltCard }

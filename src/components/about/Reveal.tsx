'use client'
import React, { useEffect, useRef } from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  variant?: 'up' | 'left' | 'right' | 'flip'
  delay?: number
  threshold?: number
}

function Reveal({ children, className = '', variant = 'up', delay = 0, threshold = 0.15 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('is-visible'), delay)
            obs.unobserve(el)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay, threshold])

  const variantClass =
    variant === 'left' ? 'reveal-left'
    : variant === 'right' ? 'reveal-right'
    : variant === 'flip' ? 'reveal-flip'
    : 'reveal-on-scroll'

  return (
    <div ref={ref} className={`${variantClass} ${className}`}>
      {children}
    </div>
  )
}

export { Reveal }

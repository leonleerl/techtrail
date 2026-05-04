'use client'
import React, { useRef } from 'react'

interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'div' | 'a'
  onClick?: () => void
  href?: string
}

function Magnetic({ children, className = '', strength = 0.4, as = 'div', onClick, href }: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate3d(0,0,0)'
  }

  const commonProps = {
    ref: ref as React.Ref<never>,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: `inline-block transition-transform duration-300 ease-out will-change-transform ${className}`,
  }

  if (as === 'button') {
    return (
      <button {...commonProps} onClick={onClick}>
        {children}
      </button>
    )
  }
  if (as === 'a') {
    return (
      <a {...commonProps} href={href}>
        {children}
      </a>
    )
  }
  return <div {...commonProps}>{children}</div>
}

export { Magnetic }

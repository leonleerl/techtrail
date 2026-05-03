'use client'
import React from 'react'

interface GlitchTextProps {
  text: string
  className?: string
}

function GlitchText({ text, className = '' }: GlitchTextProps) {
  return (
    <span
      data-text={text}
      className={`glitch-text ${className}`}
    >
      {text}
    </span>
  )
}

export { GlitchText }

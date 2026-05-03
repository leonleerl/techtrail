'use client'
import { useEffect, useState } from 'react'

const phrases = [
  'Hi 👋, I am a Software Developer.',
  'I am a AWS Certified Solutions Architect – Associate.',
  'I craft Web3 dApps & Smart Contracts.',
  'I build immersive React experiences.',
  'I sing with my guitar 🎸',
]

function TypewriterText() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    const speed = isDeleting ? 35 : 70
    const t = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, displayText.length + 1)
        setDisplayText(next)
        if (next === current) {
          setTimeout(() => setIsDeleting(true), 1800)
        }
      } else {
        const next = current.slice(0, displayText.length - 1)
        setDisplayText(next)
        if (next === '') {
          setIsDeleting(false)
          setPhraseIndex((phraseIndex + 1) % phrases.length)
        }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [displayText, isDeleting, phraseIndex])

  return (
    <p className="typing-cursor text-xl md:text-2xl max-w-3xl mx-auto bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-400 dark:from-cyan-300 dark:via-fuchsia-400 dark:to-amber-300 bg-clip-text text-transparent font-semibold animate-gradient-x tracking-wide">
      {displayText}
    </p>
  )
}

export { TypewriterText }

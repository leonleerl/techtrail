'use client'
import { useState, useEffect } from 'react'

function TypewriterText() {
  const text = "Hi 👋, I am a Software Developer 💻."
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
      {displayText}
    </p>
  )
}

export { TypewriterText }
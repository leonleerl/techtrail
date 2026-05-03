'use client'
import React, { useEffect, useState } from 'react'

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
        setProgress(pct)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* 顶部进度条 */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 shadow-[0_0_12px_rgba(236,72,153,0.7)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 右下角圆环进度 */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:block pointer-events-none">
        <div className="relative w-14 h-14">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth="3" />
            <circle
              cx="28" cy="28" r="24" fill="none"
              stroke="url(#progGrad)" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 24}
              strokeDashoffset={2 * Math.PI * 24 * (1 - progress / 100)}
              style={{ transition: 'stroke-dashoffset 0.15s linear', filter: 'drop-shadow(0 0 6px rgba(168,85,247,0.7))' }}
            />
            <defs>
              <linearGradient id="progGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </>
  )
}

export { ScrollProgress }

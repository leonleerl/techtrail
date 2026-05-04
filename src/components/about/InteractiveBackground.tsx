'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'

interface Particle {
  id: number
  left: string
  size: number
  duration: number
  delay: number
  hue: number
}

interface InteractiveBackgroundProps {
  particleCount?: number
}

function InteractiveBackground({ particleCount = 40 }: InteractiveBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 18 + 10,
      delay: Math.random() * 12,
      hue: 180 + Math.random() * 120,
    }))
  }, [particleCount])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${e.clientX}px`)
        el.style.setProperty('--my', `${e.clientY}px`)
      })
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {/* 渐变底色 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-[#050810] dark:via-[#0a0f1a] dark:to-[#0f1625]" />

      {/* 3D 透视网格 */}
      <div className="absolute inset-0 cyber-grid cyber-grid-animated opacity-40 dark:opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* 大型彩色光晕（漂浮） */}
      <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem] rounded-full bg-fuchsia-400/30 dark:bg-fuchsia-600/20 blur-3xl animate-floaty" />
      <div className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] rounded-full bg-cyan-400/30 dark:bg-cyan-500/20 blur-3xl animate-floaty" style={{ animationDelay: '1.5s' }} />
      <div className="absolute -bottom-40 left-1/4 w-[32rem] h-[32rem] rounded-full bg-violet-400/30 dark:bg-indigo-500/25 blur-3xl animate-floaty" style={{ animationDelay: '3s' }} />

      {/* 粒子层 */}
      {mounted && (
        <div className="absolute inset-0">
          {particles.map(p => (
            <span
              key={p.id}
              className="absolute bottom-0 rounded-full animate-float-up"
              style={{
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: `hsl(${p.hue}, 90%, 65%)`,
                boxShadow: `0 0 ${p.size * 4}px hsl(${p.hue}, 90%, 65%)`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* 鼠标跟随光斑（CSS 变量驱动） */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(139, 92, 246, 0.18), transparent 45%)',
        }}
      />

      {/* 顶部 / 底部噪点遮罩 */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/60 to-transparent dark:from-[#050810]/80" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/60 to-transparent dark:from-[#050810]/80" />
    </div>
  )
}

export { InteractiveBackground }

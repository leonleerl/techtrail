'use client'
import Image from 'next/image'
import React from 'react'

interface Tech {
  name: string
  iconSrc?: string
  emoji?: string
  hue: number
}

const techStack: Tech[] = [
  { name: 'Python', iconSrc: '/python-icon.png', hue: 50 },
  { name: 'Linux', iconSrc: '/linux-icon.png', hue: 40 },
  { name: 'React', iconSrc: '/react-icon.png', hue: 195 },
  { name: 'TypeScript', iconSrc: '/typescript-icon.png', hue: 220 },
  { name: 'Tailwind', iconSrc: '/tailwind-icon.png', hue: 200 },
  { name: 'Next.js', emoji: '▲', hue: 280 },
  { name: 'Zustand', iconSrc: '/zustand-icon.png', hue: 30 },
  { name: 'NextAuth', iconSrc: '/next-auth-icon.png', hue: 320 },
  { name: 'AWS', iconSrc: '/aws-icon.png', hue: 30 },
  { name: 'Docker', emoji: '🐳', hue: 210 },
  { name: 'Node.js', iconSrc: '/nodejs-icon.png', hue: 130 },
  { name: 'C#', iconSrc: '/csharp-icon.png', hue: 280 },
  { name: 'ASP.NET', iconSrc: '/dotnet-icon.png', hue: 270 },
  { name: 'WPF', iconSrc: '/csharp-icon.png', hue: 290 },
  { name: 'Avalonia', iconSrc: '/avalonia-icon.png', hue: 260 },
]

function TechCard({ tech, idx }: { tech: Tech; idx: number }) {
  const ref = React.useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.transform = `perspective(800px) rotateX(${(0.5 - py) * 18}deg) rotateY(${(px - 0.5) * 18}deg) translateZ(20px) scale(1.08)`
  }
  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0) scale(1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative rounded-2xl p-5 transition-transform duration-300 ease-out cursor-pointer will-change-transform"
      style={{
        transformStyle: 'preserve-3d',
        background: `linear-gradient(135deg, hsl(${tech.hue} 80% 96% / 0.95), hsl(${(tech.hue + 30) % 360} 80% 92% / 0.95))`,
        boxShadow: `0 8px 24px -8px hsl(${tech.hue} 70% 50% / 0.35)`,
        animationDelay: `${idx * 80}ms`,
      }}
    >
      {/* dark overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 dark:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(135deg, hsl(${tech.hue} 60% 14%), hsl(${(tech.hue + 40) % 360} 50% 18%))`,
          boxShadow: `0 0 24px hsl(${tech.hue} 80% 60% / 0.4), inset 0 0 20px hsl(${tech.hue} 80% 60% / 0.2)`,
        }}
      />
      {/* 流光 */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
      </div>

      <div className="relative flex flex-col items-center gap-2" style={{ transform: 'translateZ(30px)' }}>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner backdrop-blur"
          style={{
            background: `radial-gradient(circle at 30% 30%, hsl(${tech.hue} 100% 75%), hsl(${tech.hue} 70% 55%))`,
            boxShadow: `0 0 20px hsl(${tech.hue} 90% 60% / 0.6), inset 0 2px 8px rgba(255,255,255,0.4)`,
          }}
        >
          {tech.iconSrc ? (
            <Image src={tech.iconSrc} alt={tech.name} width={36} height={36} className="w-9 h-9 object-contain drop-shadow" />
          ) : (
            <span className="text-white drop-shadow">{tech.emoji}</span>
          )}
        </div>
        <span
          className="text-sm font-bold tracking-wide text-slate-800 dark:text-white"
          style={{ textShadow: '0 1px 0 rgba(255,255,255,0.6)' }}
        >
          {tech.name}
        </span>
      </div>

      {/* 角标 */}
      <span
        className="absolute top-2 right-2 text-[10px] font-mono opacity-60 dark:opacity-80"
        style={{ color: `hsl(${tech.hue} 60% 35%)` }}
      >
        {String(idx + 1).padStart(2, '0')}
      </span>
    </div>
  )
}

function TechStack() {
  return (
    <div className="mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          <span className="bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent">
            Tech Arsenal
          </span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300 font-mono">
          {'<'} the weapons I wield {'/>'}
        </p>
      </div>

      {/* 横向滚动条带（保留原有效果） */}
      <div className="relative overflow-hidden mb-10 rounded-2xl">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#050810] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#050810] to-transparent z-10" />
        <div className="inline-flex w-max animate-scroll py-4">
          {[0, 1].map(loop => (
            <div className="flex" key={loop}>
              {techStack.map((tech, index) => (
                <div
                  key={`${loop}-${index}`}
                  className="flex-shrink-0 mx-3 px-5 py-3 rounded-xl flex items-center gap-3 shadow-lg backdrop-blur-md border border-white/40 dark:border-white/10"
                  style={{
                    background: `linear-gradient(135deg, hsl(${tech.hue} 90% 92% / 0.9), hsl(${(tech.hue + 40) % 360} 90% 88% / 0.9))`,
                  }}
                >
                  {tech.iconSrc ? (
                    <Image src={tech.iconSrc} alt={tech.name} width={26} height={26} className="w-7 h-7 object-contain" />
                  ) : (
                    <span className="text-2xl">{tech.emoji}</span>
                  )}
                  <span className="font-semibold text-sm whitespace-nowrap text-slate-800">{tech.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 3D 网格卡片 */}
      <div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
        style={{ perspective: '1000px' }}
      >
        {techStack.map((tech, idx) => (
          <TechCard key={tech.name} tech={tech} idx={idx} />
        ))}
      </div>
    </div>
  )
}

export { TechStack }

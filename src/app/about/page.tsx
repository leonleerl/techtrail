'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  TypewriterText,
  TechStack,
  InteractiveBackground,
  TiltCard,
  GlitchText,
  Magnetic,
  Reveal,
  ScrollProgress,
} from '@/components/about'

const skills = [
  { src: '/react-icon.png', label: 'React Front-End Development', hue: 195 },
  { src: '/aws-icon.png', label: 'AWS Certified Solutions Architect – Associate', hue: 310 },
  { src: '/blockchain.png', label: 'Web3 Solidity Smart Contracts', hue: 270 },
  { src: '/dotnet-icon.png', label: 'C# WPF Desktop Apps', hue: 310 },
]

const socials = [
  { src: '/github-icon.png', label: 'GitHub', href: 'https://github.com/leonleerl', text: 'github.com/leonleerl' },
  { src: '/linkedin-icon.png', label: 'LinkedIn', href: 'https://www.linkedin.com/in/leon-li-7603582b7', text: 'linkedin.com/in/leon-li' },
  { src: '/twitter.png', label: 'X', href: 'https://x.com/leonleerl', text: 'x.com/leonleerl' },
]

const experiences = [
  {
    when: '2024 — 2025',
    title: 'University of Western Australia',
    org: 'Master of Information Technology',
    desc: 'Pursued advanced studies in IT with focus on full-stack development, cloud computing, and modern software engineering practices.',
    accent: 'from-emerald-400 via-teal-500 to-cyan-500',
  },
  {
    when: '2019 — 2023',
    title: 'Chengdu Neusoft University',
    org: 'Bachelor of Engineering',
    desc: 'Data Science and Big Data Technology — built foundations in algorithms, distributed systems, and data engineering.',
    accent: 'from-violet-400 via-purple-500 to-fuchsia-500',
  },
]

export default function AboutPage() {
  const router = useRouter()

  return (
    <>
      <ScrollProgress />
      <InteractiveBackground />

      <main className="relative min-h-screen text-slate-800 dark:text-slate-100 selection:bg-fuchsia-500/40 selection:text-white">
        {/* ============== HERO ============== */}
        <section className="relative min-h-[100vh] flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
          {/* 装饰旋转环 */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="absolute w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full border border-fuchsia-500/20 dark:border-fuchsia-400/20 animate-spin-slow" />
            <div className="absolute w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full border border-cyan-500/20 dark:border-cyan-400/20 animate-spin-reverse" />
            <div className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full border border-amber-500/20 dark:border-amber-400/20 animate-spin-slow" style={{ animationDuration: '30s' }} />
          </div>

          <div className="relative max-w-6xl w-full mx-auto z-10">
            <Reveal>
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/30 dark:border-white/10 text-xs font-mono tracking-widest uppercase text-slate-700 dark:text-slate-200">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Available for opportunities
                </span>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h1 className="text-center font-black tracking-tighter text-[clamp(3.5rem,12vw,9rem)] leading-[0.85] mb-6">
                <GlitchText
                  text="Leon Li"
                  className="bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                />
              </h1>
            </Reveal>

            <Reveal delay={250}>
              <h2 className="text-center text-2xl md:text-4xl font-bold mb-3 tracking-tight">
                <span className="text-stroke-thin text-slate-900 dark:text-white">Software</span>{' '}
                <span className="bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                  Software Engineer
                </span>
              </h2>
            </Reveal>

            <Reveal delay={350}>
              <div className="text-center mb-12">
                <TypewriterText />
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Magnetic as="button" onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}>
                  <span className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 shadow-[0_8px_30px_rgba(168,85,247,0.45)] hover:shadow-[0_12px_50px_rgba(168,85,247,0.7)] transition-shadow shine-on-hover overflow-hidden cursor-pointer">
                    <span>Explore my universe</span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform">↓</span>
                  </span>
                </Magnetic>
                <Magnetic as="button" onClick={() => router.push('/blogs')}>
                  <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold border-2 border-slate-300/70 dark:border-white/20 bg-white/40 dark:bg-white/5 backdrop-blur-md hover:bg-white/70 dark:hover:bg-white/10 transition-colors text-slate-800 dark:text-white cursor-pointer">
                    Read my blogs →
                  </span>
                </Magnetic>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ============== INTRO ============== */}
        <section id="intro" className="relative max-w-6xl mx-auto px-6 py-20">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="font-mono text-sm tracking-widest text-fuchsia-600 dark:text-fuchsia-400 mb-2">
                  ◆ 01 / INTRODUCTION
                </p>
                <h2 className="text-4xl md:text-6xl font-black">
                  <span className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent">
                    About me
                  </span>
                </h2>
              </div>
              <div className="hidden md:block h-px flex-1 mx-6 bg-gradient-to-r from-transparent via-slate-300 dark:via-white/20 to-transparent" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-5 gap-10 items-center">
            {/* 左侧文本 */}
            <div className="md:col-span-3 space-y-5 text-base md:text-lg leading-relaxed">
              <Reveal variant="left">
                <p className="text-slate-700 dark:text-slate-200">
                  Hi there <span className="inline-block animate-floaty">👋</span>, I&apos;m{' '}
                  <span className="font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                    Leon
                  </span>
                  , a Software Engineer who loves crafting immersive digital experiences.
                </p>
              </Reveal>

              <Reveal variant="left" delay={100}>
                <p className="text-slate-600 dark:text-slate-300">My experience spans:</p>
              </Reveal>

              <ul className="space-y-3">
                {skills.map((s, i) => (
                  <Reveal key={s.label} variant="left" delay={150 + i * 100}>
                    <li className="group/skill relative">
                      <div
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 hover:border-transparent hover:translate-x-2 transition-all duration-300 relative overflow-hidden"
                        style={{ boxShadow: `0 4px 20px -8px hsl(${s.hue} 70% 55% / 0.4)` }}
                      >
                        <div
                          className="absolute inset-0 opacity-0 group-hover/skill:opacity-100 transition-opacity"
                          style={{
                            background: `linear-gradient(90deg, hsl(${s.hue} 90% 95% / 0.6), transparent)`,
                          }}
                        />
                        <div
                          className="relative w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, hsl(${s.hue} 100% 75%), hsl(${s.hue} 70% 55%))`,
                            boxShadow: `0 0 16px hsl(${s.hue} 90% 60% / 0.5)`,
                          }}
                        >
                          <Image src={s.src} alt={s.label} width={22} height={22} className="w-5 h-5 object-contain" />
                        </div>
                        <span className="relative font-bold text-slate-800 dark:text-white">{s.label}</span>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>


              <Reveal variant="left" delay={580}>
                <p className="text-slate-700 dark:text-slate-200">
                  Beyond code, I love learning natural languages and speak four:{' '}
                  <span className="font-bold">English 🇦🇺, Mandarin 🇨🇳, Japanese 🇯🇵, Spanish 🇪🇸</span>. Just got my Japanese
                  <span className="font-bold"> JLPT N3</span> certification in December 2025.
                </p>
                <p>
                  I just launched my Japanese Learning App on App Store: <a href="https://apps.apple.com/au/app/kanalearn-hiragana-katakana/id6758657312" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition-colors font-semibold">KanaLearn: Hiragana & Katakana</a>. I believe this will help you if you just start to learn it!
                </p>
              </Reveal>

              <Reveal variant="left" delay={650}>
                <div className="grid sm:grid-cols-3 gap-3 pt-2">
                  {socials.map(s => (
                    <Magnetic key={s.label} strength={0.25}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white/10 dark:to-white/5 text-white border border-white/10 hover:border-cyan-400/60 hover:shadow-[0_0_24px_rgba(34,211,238,0.4)] transition-all backdrop-blur"
                      >
                        <Image src={s.src} alt={s.label} width={20} height={20} className="w-5 h-5 brightness-0 invert opacity-90" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] uppercase tracking-widest text-slate-400">{s.label}</div>
                          <div className="text-xs font-mono truncate group-hover/social:text-cyan-300 transition-colors">
                            {s.text}
                          </div>
                        </div>
                        <span className="text-xs opacity-50 group-hover/social:opacity-100 group-hover/social:translate-x-0.5 transition">↗</span>
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </Reveal>

              <Reveal variant="left" delay={750}>
                <p className="text-slate-700 dark:text-slate-200 relative pt-2">
                  I love playing electric guitar 🎸.&nbsp;
                  <a
                    href="#guitar-video"
                    className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-4 text-cyan-600 dark:text-cyan-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition-colors font-semibold"
                    onClick={e => {
                      e.preventDefault()
                      document.getElementById('guitar-video')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }}
                  >
                    Check this out ↓
                  </a>
                </p>
              </Reveal>
            </div>

            {/* 右侧 3D 头像卡 */}
            <Reveal variant="right" className="md:col-span-2">
              <div className="relative group" style={{ perspective: '1500px' }}>
                {/* 装饰网格 */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-fuchsia-400/20 to-amber-400/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />

                <TiltCard intensity={16} className="rounded-3xl">
                  <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-amber-400 animate-gradient-x" style={{ backgroundSize: '300% 300%' }}>
                    <div className="rounded-3xl overflow-hidden bg-white dark:bg-[#0a0f1a] relative">
                      <Image
                        src="/leon.JPG"
                        alt="Leon"
                        width={500}
                        height={500}
                        className="w-full h-auto object-cover"
                        style={{ transform: 'translateZ(0)' }}
                      />
                      {/* hover 提示卡 */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-xs font-mono shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 border border-white/10">
                        I write tech blogs ✍️
                      </div>
                      {/* 底部信息条 */}
                      <div
                        className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-transparent text-white"
                        style={{ transform: 'translateZ(40px)' }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-cyan-300 font-mono">Profile</div>
                            <div className="font-bold text-lg">Leon Li</div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-[10px] uppercase tracking-widest text-amber-300 font-mono">Location</div>
                            <div className="font-bold text-sm">Australia</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>

                {/* 漂浮装饰标签 */}
                <div className="absolute -bottom-6 -left-4 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 animate-floaty rotate-[-6deg] hidden md:block" style={{ animationDelay: '0.5s' }}>
                  <span className="text-xs font-mono">⚛️ React Lover</span>
                </div>
                <div className="absolute -top-4 -right-4 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 animate-floaty rotate-[6deg] hidden md:block" style={{ animationDelay: '1.2s' }}>
                  <span className="text-xs font-mono">⛓️ Web3 Builder</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============== GUITAR VIDEO ============== */}
        <section className="relative max-w-6xl mx-auto px-6 py-16">
          <Reveal>
            <div className="text-center mb-8">
              <p className="font-mono text-sm tracking-widest text-amber-600 dark:text-amber-400 mb-2">
                ◆ 02 / OFF-DUTY MODE
              </p>
              <h2 className="text-4xl md:text-6xl font-black">
                <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
                  🎸 Playing Time
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal variant="flip">
            <div className="relative group" style={{ perspective: '2000px' }}>
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-500 blur-2xl opacity-30 group-hover:opacity-60 transition-opacity" />
              <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-500 animate-gradient-x" style={{ backgroundSize: '300% 300%' }}>
                <video
                  id="guitar-video"
                  src="/api/blob/hktk.mp4"
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full rounded-3xl bg-black"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============== FEATURED PROJECTS ============== */}
        <section className="relative max-w-6xl mx-auto px-6 py-20">
          <Reveal>
            <p className="font-mono text-sm tracking-widest text-cyan-600 dark:text-cyan-400 mb-2 text-center">
              ◆ 03 / SHOWCASE
            </p>
          </Reveal>
          <Reveal delay={50}>
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300 font-mono">
                {'// '}built with passion · powered by curiosity
              </p>x
            </div>
          </Reveal>

          <div className="space-y-12">
            {/* —— Project 01 · KanaLearn —— */}
            <Reveal variant="left" delay={120}>
              <TiltCard intensity={6} className="rounded-3xl group/proj">
                <div
                  className="relative rounded-3xl p-[2px] bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 animate-gradient-x"
                  style={{ backgroundSize: '300% 300%' }}
                >
                  <div className="relative rounded-3xl bg-white/90 dark:bg-[#0a0f1a]/95 backdrop-blur-md p-8 md:p-10 overflow-hidden">
                    {/* 巨型装饰水印 */}
                    <div className="pointer-events-none absolute -right-6 -bottom-10 select-none">
                      <span
                        className="block text-[16rem] leading-none font-black text-stroke text-rose-500/20 dark:text-rose-400/20"
                        style={{ transform: 'translateZ(0)' }}
                      >
                        あ
                      </span>
                    </div>
                    <div className="pointer-events-none absolute -left-2 top-2 select-none rotate-12">
                      <span className="block text-[8rem] leading-none font-black text-stroke text-purple-500/15 dark:text-purple-400/15">
                        ア
                      </span>
                    </div>
                    {/* 渐变光斑 */}
                    <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-rose-400/20 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-400/20 blur-3xl" />

                    <div className="relative grid md:grid-cols-12 gap-8 items-start" style={{ transform: 'translateZ(20px)' }}>
                      {/* 左侧：编号 + 主标题 */}
                      <div className="md:col-span-5">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase text-white bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/30">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                            </span>
                            Live on App Store
                          </span>
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">PROJECT_01</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black leading-[0.95] tracking-tight mb-2">
                          <span className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                            KanaLearn
                          </span>
                        </h3>
                        <p className="text-base md:text-lg font-semibold text-slate-700 dark:text-slate-200 mb-1">
                          Hiragana & Katakana · iOS App
                        </p>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
                          Swift / iOS Development
                        </p>

                        <div className="flex flex-wrap gap-2 mb-7">
                          {['Swift', 'SwiftUI', 'iOS', 'IAP', 'TestFlight', 'App Store'].map(t => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold border border-rose-500/30 dark:border-rose-400/30 bg-rose-50/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 backdrop-blur-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <Magnetic
                          as="a"
                          href="https://apps.apple.com/au/app/kanalearn-hiragana-katakana/id6758657312"
                          strength={0.3}
                        >
                          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 shadow-[0_8px_30px_rgba(236,72,153,0.45)] hover:shadow-[0_12px_50px_rgba(236,72,153,0.7)] transition-shadow shine-on-hover overflow-hidden cursor-pointer">
                            <span aria-hidden></span>
                            <span>Get on App Store</span>
                            <span className="text-lg group-hover/proj:translate-x-1 transition-transform">↗</span>
                          </span>
                        </Magnetic>
                      </div>

                      {/* 右侧：要点列表 */}
                      <div className="md:col-span-7">
                        <ul className="space-y-3.5">
                          {[
                            'Built & launched a production-ready iOS application for Japanese kana learning, with 50+ active users.',
                            'Successfully published on the Apple App Store — managed the full release lifecycle including TestFlight distribution, metadata configuration, and App Review compliance.',
                            'Implemented multiple learning modes (random quiz, row-based selection) and progress tracking features to boost engagement and retention.',
                            'Integrated and troubleshot in-app purchase (IAP) functionality within Apple\u2019s ecosystem, resolving purchase flow and review-related issues.',
                          ].map((line, i) => (
                            <li key={i} className="flex gap-3 group/item">
                              <span
                                className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-mono font-black text-white bg-gradient-to-br from-rose-500 to-purple-600 shadow-md shadow-pink-500/30 group-hover/item:scale-110 group-hover/item:rotate-6 transition-transform"
                              >
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed pt-0.5">
                                {line}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* —— Project 02 · Wildlife Mapping —— */}
            <Reveal variant="right" delay={180}>
              <TiltCard intensity={6} className="rounded-3xl group/proj">
                <div
                  className="relative rounded-3xl p-[2px] bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 animate-gradient-x"
                  style={{ backgroundSize: '300% 300%' }}
                >
                  <div className="relative rounded-3xl bg-white/90 dark:bg-[#0a0f1a]/95 backdrop-blur-md p-8 md:p-10 overflow-hidden">
                    {/* 巨型地球水印 */}
                    <div className="pointer-events-none absolute -right-10 -bottom-16 select-none animate-spin-slow" style={{ animationDuration: '40s' }}>
                      <span className="block text-[18rem] leading-none">🌏</span>
                    </div>
                    <div className="pointer-events-none absolute top-6 right-12 select-none">
                      <span className="block text-5xl animate-floaty" style={{ animationDelay: '0.4s' }}>🦘</span>
                    </div>
                    <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-400/20 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl" />

                    {/* 装饰经纬线 */}
                    <div className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.12]">
                      <div className="absolute inset-0" style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, transparent 0, transparent 40px, currentColor 40px, currentColor 41px), repeating-linear-gradient(90deg, transparent 0, transparent 40px, currentColor 40px, currentColor 41px)',
                        color: '#06b6d4',
                      }} />
                    </div>

                    <div className="relative grid md:grid-cols-12 gap-8 items-start" style={{ transform: 'translateZ(20px)' }}>
                      {/* 左侧：要点列表（先列表后标题，与第一张错位） */}
                      <div className="md:col-span-7 md:order-2">
                        <ul className="space-y-3.5">
                          {[
                            'Built an interactive 3D globe-based wildlife dashboard with Next.js, React, and Mapbox GL JS — visualising kangaroo observation data across Australia.',
                            'Implemented migration prediction animation (2026–2030) using time-based interpolation and linear regression models trained in AWS SageMaker.',
                            'Designed a geospatial backend with PostgreSQL + PostGIS running in Docker, enabling efficient spatial queries via GIST indexing for large datasets.',
                            'Developed RESTful APIs with Next.js App Router, supporting real-time filtering (species, year) and high-volume rendering of 100,000+ records.',
                            'Managed global app state with Zustand — cleanly separating map, species, and migration logic for scalability.',
                          ].map((line, i) => (
                            <li key={i} className="flex gap-3 group/item">
                              <span
                                className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-mono font-black text-white bg-gradient-to-br from-emerald-500 to-blue-600 shadow-md shadow-cyan-500/30 group-hover/item:scale-110 group-hover/item:rotate-6 transition-transform"
                              >
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed pt-0.5">
                                {line}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 右侧（视觉位左侧）：编号 + 主标题 */}
                      <div className="md:col-span-5 md:order-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30">
                            🌐 Full-Stack · 3D Viz
                          </span>
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">PROJECT_02</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black leading-[0.95] tracking-tight mb-2">
                          <span className="bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                            aus-wildlife
                          </span>
                        </h3>
                        <p className="text-base md:text-lg font-semibold text-slate-700 dark:text-slate-200 mb-1">
                          Wildlife Distribution Mapping Dashboard
                        </p>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
                          Next.js + AWS-ready Data Architecture
                        </p>

                        <div className="flex flex-wrap gap-2 mb-2">
                          {['Next.js', 'React', 'Mapbox GL', 'PostgreSQL', 'PostGIS', 'Docker', 'Zustand', 'SageMaker'].map(t => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold border border-cyan-500/30 dark:border-cyan-400/30 bg-cyan-50/80 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 backdrop-blur-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* 数据指标 */}
                        <div className="mt-6 grid grid-cols-3 gap-3">
                          {[
                            { v: '100K+', l: 'Records' },
                            { v: '2026-30', l: 'Forecast' },
                            { v: '3D', l: 'Globe' },
                          ].map(s => (
                            <div
                              key={s.l}
                              className="rounded-xl px-3 py-2.5 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-950/40 dark:to-cyan-950/40 border border-cyan-200/60 dark:border-cyan-800/40"
                            >
                              <div className="text-lg md:text-xl font-black bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                {s.v}
                              </div>
                              <div className="text-[10px] uppercase tracking-widest font-mono text-slate-500 dark:text-slate-400">
                                {s.l}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </section>

        {/* ============== TECH STACK ============== */}
        <section className="relative max-w-6xl mx-auto px-6 py-10">
          <Reveal>
            <p className="font-mono text-sm tracking-widest text-violet-600 dark:text-violet-400 mb-2 text-center">
              ◆ 04 / ARSENAL
            </p>
          </Reveal>
          <Reveal delay={100}>
            <TechStack />
          </Reveal>
        </section>

        {/* ============== EXPERIENCE TIMELINE ============== */}
        <section className="relative max-w-6xl mx-auto px-6 py-20">
          <Reveal>
            <div className="text-center mb-16">
              <p className="font-mono text-sm tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
                ◆ 05 / JOURNEY
              </p>
              <h2 className="text-4xl md:text-6xl font-black">
                <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            {/* 中央时间线（桌面） */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-fuchsia-400/40 to-transparent" />
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-amber-400 opacity-30 blur-md" />

            <div className="space-y-12 md:space-y-20">
              {experiences.map((exp, idx) => {
                const isLeft = idx % 2 === 0
                return (
                  <Reveal
                    key={idx}
                    variant={isLeft ? 'left' : 'right'}
                    delay={idx * 80}
                    className="relative"
                  >
                    <div className={`md:flex md:items-center ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                      {/* 卡片侧 */}
                      <div className="md:w-[calc(50%-2.5rem)]">
                        <TiltCard intensity={8} className="rounded-2xl">
                          <div className={`relative rounded-2xl p-[1.5px] bg-gradient-to-br ${exp.accent}`}>
                            <div className="rounded-2xl bg-white/85 dark:bg-[#0a0f1a]/90 backdrop-blur-md p-6 relative overflow-hidden">
                              <div className="flex items-start justify-between mb-3 gap-3">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold text-white bg-gradient-to-r ${exp.accent} shadow-lg`}>
                                  {exp.when}
                                </span>
                                <span className="text-3xl opacity-20 font-black tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                              </div>
                              <h3 className={`text-xl md:text-2xl font-bold mb-1 bg-gradient-to-r ${exp.accent} bg-clip-text text-transparent`}>
                                {exp.title}
                              </h3>
                              <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">{exp.org}</div>
                              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{exp.desc}</p>

                              {/* 角装饰 */}
                              <div className="absolute top-0 right-0 w-20 h-20 opacity-30">
                                <div className={`absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br ${exp.accent}`} />
                                <div className={`absolute top-3 right-8 w-3 h-3 rounded-full bg-gradient-to-br ${exp.accent} opacity-60`} />
                                <div className={`absolute top-8 right-3 w-3 h-3 rounded-full bg-gradient-to-br ${exp.accent} opacity-60`} />
                              </div>
                            </div>
                          </div>
                        </TiltCard>
                      </div>

                      {/* 节点 */}
                      <div className="hidden md:flex items-center justify-center w-20 flex-shrink-0">
                        <div className={`relative w-6 h-6 rounded-full bg-gradient-to-br ${exp.accent} timeline-node-pulse ring-4 ring-white dark:ring-[#0a0f1a]`}>
                          <div className="absolute inset-0 rounded-full animate-ping opacity-60 bg-white" />
                        </div>
                      </div>

                      {/* 占位（对侧） */}
                      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============== CTA ============== */}
        <section className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <Reveal>
            <p className="font-mono text-sm tracking-widest text-rose-600 dark:text-rose-400 mb-4">
              ◆ END_TRANSMISSION
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent animate-gradient-x">
                Stay curious.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
              Want to dive deeper? Read my thoughts on engineering, architecture, and life on the road.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Magnetic as="button" onClick={() => router.push('/blogs')} strength={0.5}>
              <span className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-lg text-white bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 shadow-[0_10px_40px_rgba(168,85,247,0.5)] hover:shadow-[0_15px_60px_rgba(168,85,247,0.8)] transition-shadow shine-on-hover overflow-hidden cursor-pointer group">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">Visit my blogs</span>
                <span className="relative text-xl group-hover:translate-x-2 transition-transform">➜</span>
              </span>
            </Magnetic>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-12 text-xs font-mono text-slate-500 dark:text-slate-400 tracking-widest">
              {'<'} crafted with caffeine, code & curiosity {'/>'}
            </p>
          </Reveal>
        </section>
      </main>
    </>
  )
}

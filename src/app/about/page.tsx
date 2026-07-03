'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const skills = [
  { src: '/react-icon.png', label: 'Next.js Full-Stack Development' },
  { src: '/aws-icon.png', label: 'AWS Certified Solutions Architect – Associate' },
  { src: '/blockchain.png', label: 'Web3 Solidity Smart Contracts' },
  { src: '/dotnet-icon.png', label: 'C# WPF Desktop Apps' },
]

const socials = [
  { src: '/github-icon.png', label: 'GitHub', href: 'https://github.com/leonleerl', text: 'github.com/leonleerl' },
  { src: '/linkedin-icon.png', label: 'LinkedIn', href: 'https://www.linkedin.com/in/runlong-li-7603582b7/', text: 'linkedin.com/in/runlong-li-7603582b7' },
  { src: '/twitter.png', label: 'X', href: 'https://x.com/leonleerl', text: 'x.com/leonleerl' },
]

const techStack: { name: string; iconSrc?: string; emoji?: string }[] = [
  { name: 'Python', iconSrc: '/python-icon.png' },
  { name: 'Linux', iconSrc: '/linux-icon.png' },
  { name: 'React', iconSrc: '/react-icon.png' },
  { name: 'TypeScript', iconSrc: '/typescript-icon.png' },
  { name: 'Tailwind', iconSrc: '/tailwind-icon.png' },
  { name: 'Next.js', emoji: '▲' },
  { name: 'Zustand', iconSrc: '/zustand-icon.png' },
  { name: 'NextAuth', iconSrc: '/next-auth-icon.png' },
  { name: 'AWS', iconSrc: '/aws-icon.png' },
  { name: 'Docker', emoji: '🐳' },
  { name: 'Node.js', iconSrc: '/nodejs-icon.png' },
  { name: 'C#', iconSrc: '/csharp-icon.png' },
  { name: 'ASP.NET', iconSrc: '/dotnet-icon.png' },
  { name: 'WPF', iconSrc: '/csharp-icon.png' },
  { name: 'Avalonia', iconSrc: '/avalonia-icon.png' },
]

const projects = [
  {
    title: 'Family Video',
    subtitle: 'AI-Powered Cloud Video Platform',
    stack: 'Next.js + PostgreSQL + AWS + OpenAI + AI Agent',
    tags: ['Next.js', 'PostgreSQL', 'AWS S3', 'Lambda', 'CloudFront', 'MediaConvert', 'Transcribe', 'OpenAI', 'RAG'],
    points: [
      'Designed and developed a cloud-native platform for uploading, organising, and sharing family videos, enabling intelligent memory management through AI-powered summaries, semantic search, and automated metadata generation.',
      'Architected and implemented a serverless media processing pipeline using AWS S3, Lambda, CloudFront, MediaConvert, Amazon Transcribe, Glue DataBrew, API Gateway, and CloudShell, enabling secure uploads, automated video transcoding, subtitle generation, metadata transformation, and scalable global content delivery.',
      'Optimised cross-region video delivery for users across Australia, Japan, and China by leveraging Amazon CloudFront, significantly reducing latency and resolving playback issues for family members accessing videos from mainland China.',
      'Built a RAG-based AI Agent using LLM technologies to retrieve video context and generate intelligent responses from transcripts, summaries, and metadata, allowing users to search and interact with their family memories using natural language.',
      'Designed relational database schemas with PostgreSQL and developed RESTful APIs to manage videos, albums, users, AI-generated metadata, and retrieval workflows following modern backend engineering practices.',
    ],
  },
  {
    title: 'KanaLearn',
    subtitle: 'Hiragana & Katakana · iOS App',
    stack: 'Swift / iOS Development',
    tags: ['Swift', 'SwiftUI', 'iOS', 'IAP', 'TestFlight', 'App Store'],
    href: 'https://apps.apple.com/au/app/kanalearn-hiragana-katakana/id6758657312',
    hrefLabel: 'Get on App Store',
    points: [
      'Built & launched a production-ready iOS application for Japanese kana learning, with 50+ active users.',
      'Successfully published on the Apple App Store — managed the full release lifecycle including TestFlight distribution, metadata configuration, and App Review compliance.',
      'Implemented multiple learning modes (random quiz, row-based selection) and progress tracking features to boost engagement and retention.',
      'Integrated and troubleshot in-app purchase (IAP) functionality within Apple\u2019s ecosystem, resolving purchase flow and review-related issues.',
    ],
  },

]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-slate-800 dark:text-slate-200">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-12 mt-10">
        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Runlong Li</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Software Engineer</p>
          <Link
            href="/blogs"
            className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Read my blogs →
          </Link>
        </header>

        {/* About */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            About me
          </h2>
          <p>
            Hi there 👋, I&apos;m a Software Engineer who loves
            crafting immersive digital experiences.
          </p>
          <p className="text-slate-600 dark:text-slate-400">My experience spans:</p>
          <ul className="space-y-2">
            {skills.map(s => (
              <li key={s.label} className="flex items-center gap-3">
                <Image src={s.src} alt={s.label} width={22} height={22} className="w-5 h-5 object-contain" />
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
          <p>
            Beyond code, I love learning natural languages and speak four:{' '}
            <span className="font-semibold">English 🇦🇺, Mandarin 🇨🇳, Japanese 🇯🇵, Spanish 🇪🇸</span>. Just got my
            Japanese <span className="font-semibold">JLPT N3</span> certification in December 2025. Next goal is <span className="font-semibold">JLPT N2</span> in December 2026!
          </p>
          <p>
            I just launched my Japanese Learning App on App Store:{' '}
            <a
              href="https://apps.apple.com/au/app/kanalearn-hiragana-katakana/id6758657312"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              KanaLearn: Hiragana &amp; Katakana
            </a>
            . I believe this will help you if you just start to learn it!
          </p>
          <p>
            I love playing electric guitar 🎸.{' '}
            <a href="#guitar-video" className="text-blue-600 dark:text-blue-400 hover:underline">
              Check this out ↓
            </a>
          </p>
        </section>



        {/* Guitar video */}
        <section className="space-y-4" id="guitar-video">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            Playing Time 🎸
          </h2>
          <video
            src="/api/blob/hktk.mp4"
            controls
            preload="metadata"
            playsInline
            className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-black"
          />
        </section>


        {/* Projects */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            Featured Projects
          </h2>
          {projects.map(p => (
            <div
              key={p.title}
              className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 space-y-3"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{p.subtitle}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">{p.stack}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-xs border border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                {p.points.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {p.hrefLabel} ↗
                </a>
              )}
            </div>
          ))}
        </section>

        {/* Tech stack */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            Tech Stack
          </h2>
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white dark:from-gray-950 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white dark:from-gray-950 to-transparent" />
            <div className="inline-flex w-max animate-scroll py-2">
              {[0, 1].map(loop => (
                <div className="flex" key={loop}>
                  {techStack.map((tech, index) => (
                    <div
                      key={`${loop}-${index}`}
                      className="flex-shrink-0 mx-2 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-200 dark:border-gray-700"
                    >
                      {tech.iconSrc ? (
                        <Image src={tech.iconSrc} alt={tech.name} width={24} height={24} className="w-6 h-6 object-contain" />
                      ) : (
                        <span className="text-xl">{tech.emoji}</span>
                      )}
                      <span className="text-sm font-medium whitespace-nowrap text-slate-700 dark:text-slate-300">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

                        {/* Socials */}
                        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            Links
          </h2>
          <ul className="space-y-2">
            {socials.map(s => (
              <li key={s.label} className="flex items-center gap-3">
                <Image src={s.src} alt={s.label} width={20} height={20} className="w-5 h-5 object-contain dark:brightness-0 dark:invert" />
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {s.text}
                </a>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  )
}

'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GithubPinnedRepos } from '@/components/ui/GithubPinnedRepos'
import { Button } from '@/components/ui'
import { useRouter } from 'next/navigation'
import { TypewriterText, TechStack } from '@/components/about'


function AboutPage() {

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:bg-web3-gradient dark:text-metallic-50 mt-1">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">About Me</h1>
          <div className="w-20 h-1 bg-gray-900 dark:bg-white mx-auto mb-6"></div>
          <TypewriterText />
        </div>

        {/* Main Hero Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/2.jpeg"
            alt="My Photo"
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Introduction Section */}
        <div className="mb-20 mx-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-white leading-relaxed">
                Hi there 👋, I&apos;m Leon, a Software Engineer.
              </p>
              <p className="text-gray-700 dark:text-white leading-relaxed">
                My experience spans:
              </p>
              <ul className="text-gray-700 dark:text-white leading-relaxed list-none space-y-2 pl-0">
                <li>
                  <span className="font-bold text-gray-900 dark:text-white inline-flex items-center gap-1 ml-1 align-middle">
                    <Image
                      src="/react-icon.png"
                      alt="React"
                      width={10}
                      height={10}
                      className="w-4 h-4 object-cover"
                    />
                    <span className="font-bold text-gray-900 dark:text-white">React Front-End Development</span>
                  </span>
                </li>
                <li>
                  <span className="font-bold text-gray-900 dark:text-white inline-flex items-center gap-1 ml-1 align-middle">
                    <Image
                      src="/blockchain.png"
                      alt="React"
                      width={10}
                      height={10}
                      className="w-4 h-4 object-cover"
                    />
                    <span className="font-bold text-gray-900 dark:text-white">Web3 Solidity Smart Contracts</span>
                  </span>
                </li>
                <li>
                  <span className="font-bold text-gray-900 dark:text-white inline-flex items-center gap-1 ml-1 align-middle">
                    <Image
                      src="/dotnet-icon.png"
                      alt="C#"
                      width={10}
                      height={10}
                      className="w-4 h-4 object-cover"
                    />
                    <span className="font-bold text-gray-900 dark:text-white">C# WPF Desktop Apps</span>
                  </span>
                </li>
              </ul>
              <p className="text-gray-700 dark:text-white leading-relaxed">
                I&apos;m also an{' '}
                <span className="font-bold text-gray-900 dark:text-white inline-flex items-center gap-1 ml-1 align-middle">
                  <Image
                    src="/aws-icon.png"
                    alt="AWS"
                    width={10}
                    height={10}
                    className="w-4 h-4 object-cover"
                  />
                  <span className="font-bold text-gray-900 dark:text-white">
                    AWS Certified Solutions Architect – Associate.
                  </span>
                </span>
              </p>
              <p className="text-gray-700 dark:text-white leading-relaxed">
                Beyond code, I love learning natural languages and speak four: English 🇦🇺, Mandarin 🇨🇳, Japanese 🇯🇵,
                and Spanish 🇪🇸. Just got my Japanese JLPT N3 certification in December, 2025.
              </p>
              <div className="text-gray-700 dark:text-white leading-relaxed flex flex-wrap gap-x-2 gap-y-1 items-center">
                <Image src="/github-icon.png" alt="GitHub" width={10} height={10} className="w-4 h-4 object-cover" />
                <span className="font-bold text-gray-900 dark:text-white shrink-0">GitHub:</span>
                <Link href="https://github.com/leonleerl" className="text-blue-400 underline break-all">
                  https://github.com/leonleerl
                </Link>
              </div>
              <div className="text-gray-700 dark:text-white leading-relaxed flex flex-wrap gap-x-2 gap-y-1 items-center">
                <Image src="/linkedin-icon.png" alt="Linkedin" width={10} height={10} className="w-4 h-4 object-cover" />
                <span className="font-bold text-gray-900 dark:text-white shrink-0">Linkedin:</span>
                <Link
                  href="https://www.linkedin.com/in/leon-li-7603582b7"
                  className="text-blue-400 underline break-all"
                >
                  https://www.linkedin.com/in/leon-li-7603582b7
                </Link>
              </div>
              <div className="text-gray-700 dark:text-white leading-relaxed flex flex-wrap gap-x-2 gap-y-1 items-center">
                <Image src="/twitter.png" alt="Linkedin" width={10} height={10} className="w-4 h-4 object-cover" />
                <span className="font-bold text-gray-900 dark:text-white shrink-0">X:</span>
                <Link href="https://x.com/leonleerl" className="text-blue-400 underline break-all">
                  https://x.com/leonleerl
                </Link>
              </div>
              <div className="text-gray-700 dark:text-white leading-relaxed relative">
                Not only that, I am a big fan of <span className="font-bold text-gray-900 dark:text-white">Detective Conan</span>. I like singing with{' '}
                <span className="font-bold text-gray-900 dark:text-white">guitar 🎸</span> at my spare time for fun and
                relief.&nbsp;
                <a
                  href="#guitar-video"
                  className="underline cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('guitar-video')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  A guitar playing video is here
                </a>
                <Image
                  src="/point-to-guitar-video.png"
                  alt="Point to guitar video"
                  width={20}
                  height={20}
                  className="hidden xl:block w-20 h-20 object-cover absolute -bottom-12 right-9 -rotate-15"
                />
              </div>
            </div>
            <div className="ml-10 relative group">
              <div className="absolute top-12 -right-14 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-10 pointer-events-none">
                <div className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg relative">
                  <div className="text-sm">Hi mate, I wrote lots of tech blogs.</div>
                  <div className="absolute left-1/12 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-gray-700 rotate-45" />
                </div>
              </div>
              <Image
                src="/leon.JPG"
                alt="I'm Leon"
                width={450}
                height={450}
                className="rounded-2xl border-1 border-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Video Section */}

        <video id="guitar-video" src="/guitar.mov" controls className='rounded-2xl border-1 border-gray-900 w-full mb-20'></video>


        {/* Github repos */}
        <GithubPinnedRepos username="leonleerl" />


        {/* Tech Stack */}
        <TechStack />

        {/* Experience Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Experience</h2>
          <div className="space-y-12">
          {/* WordPress Development*/}
          <div className="flex gap-4">
              <div className="flex-shrink-0 w-36 text-right">
                <span className="text-lg font-bold text-gray-900 dark:text-white">2025.10 - now</span>
              </div>
              <div className="flex-grow border-l-4 border-gray-900 pl-8 pb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">WordPress Project</h3>
                <p className="text-gray-700 dark:text-white leading-relaxed">
                Developed a full WordPress personal website for a local author in Albany, Australia, featuring collaboration booking, new book showcases, animated UI effects, contact pages, and a complete CRUD-based admin dashboard.
                </p>
              </div>
            </div>
            {/* AI Travel Agent Project */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-36 text-right">
                <span className="text-lg font-bold text-gray-900 dark:text-white">2025.7 - 2025.8</span>
              </div>
              <div className="flex-grow border-l-4 border-gray-900 pl-8 pb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI Travel Agent</h3>
                <p className="text-gray-700 dark:text-white leading-relaxed">
                Built an AI-powered travel recommendation assistant using React and Node.js, leveraging LangChain, MCP, and Google Maps API to deliver intelligent trip planning with interactive map-based attraction visualisation.
                </p>
              </div>
            </div>
            {/* Frontend Developer (Internship) */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-36 text-right">
                <span className="text-lg font-bold text-gray-900 dark:text-white">2024.11 - 2025.3</span>
              </div>
              <div className="flex-grow border-l-4 border-gray-900 pl-8 pb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Frontend Developer (Internship)</h3>
                <p className="text-gray-600 dark:text-white mb-3 font-semibold">Coders for Causes</p>
                <p className="text-gray-700 dark:text-white leading-relaxed">
                  Developed an online mathematics examination platform using Next.js and TypeScript.
                  Implemented core features including real-time test delivery, automated grading, and student performance analytics.
                  Collaborated with the team to ensure responsive design and optimal user experience across different devices.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-36 text-right">
                <span className="text-lg font-bold text-gray-900 dark:text-white">2024 - 2025</span>
              </div>
              <div className="flex-grow border-l-4 border-gray-300 pl-8 pb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">University of Western Australia</h3>
                <p className="text-gray-600 dark:text-white mb-3 font-semibold">Master of Information Technology</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-36 text-right">
                <span className="text-lg font-bold text-gray-900 dark:text-white">2019 - 2023</span>
              </div>
              <div className="flex-grow border-l-4 border-gray-300 pl-8 pb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Chengdu Neusoft University</h3>
                <p className="text-gray-600 dark:text-white mb-3 font-semibold">Bachelor of Engineering (Data Science and Big Data Technology)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="text-center pt-12 border-t-2 border-gray-200 dark:border-cold-blue-400/50 ">
          <Button className='bg-blue-400 hover:bg-blue-300 dark:bg-cold-blue-500 dark:hover:bg-cold-blue-400 dark:shadow-armor-blue dark:border dark:border-cold-blue-400/50 text-white cursor-pointer text-lg p-6' onClick={() => { router.push('/blogs') }}>Visit my blogs ➡️</Button>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

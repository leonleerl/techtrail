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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 mt-4">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Me</h1>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-2 items-center">
            <div>
              <p className="text-gray-700 leading-relaxed mb-3">
              Hi there 👋, I&apos;m Leon, a passionate developer 💻. I&apos;m always fascinated by the latest technologies and spend a lot of time coding. 
              </p>
              <div className="text-gray-700 leading-relaxed mb-3">
                I&apos;m particularly enthusiastic about the 
                <span className="font-bold text-gray-900 inline-flex items-center gap-1 ml-1 align-middle">
                  <Image src="/react-icon.png" alt="React" width={10} height={10} className='w-4 h-4 object-cover' />
                  <span className='font-bold text-gray-900'>React ecosystem</span>
                </span>
                . React and TypeScript, along with their related technologies, are my most frequently used and strongest skills.
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
              I also have experience in 
              <span className="font-bold text-gray-900 inline-flex items-center gap-1 ml-1 align-middle">
                <Image src="/dotnet-icon.png" alt="C#" width={10} height={10} className='w-4 h-4 object-cover'/>
                <span className='font-bold text-gray-900'>C# desktop application development</span>
              </span>
              . I&apos;m highly familiar with WPF, Avalonia, and WinForms with the serial communication protocol.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
              Commonly used could services such as 
              <span className="font-bold text-gray-900 inline-flex items-center gap-1 ml-1 align-middle">
                <Image src="/aws-icon.png" alt="AWS" width={10} height={10} className='w-4 h-4 object-cover'/>
                <span className='font-bold text-gray-900'>AWS could services</span>
              </span>
              , is widely used in my personal deployed projects.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
              Beyond programming languages, I&apos;m also passionate about learning natural languages. I speak four languages: <span className="font-bold text-gray-900">English, Chinese, Japanese, and Spanish</span>.
              </p>
              <div className="text-gray-700 leading-relaxed mb-1 flex gap-1 items-center">
                <Image src="/github-icon.png" alt="GitHub" width={10} height={10} className='w-4 h-4 object-cover' />
                <div className='font-bold text-gray-900'>GitHub:</div><Link href="https://github.com/leonleerl" className="text-blue-400 underline">https://github.com/leonleerl</Link>
              </div>
              <div className="text-gray-700 leading-relaxed mb-3 flex gap-1 items-center">
                <Image src="/linkedin-icon.png" alt="Linkedin" width={10} height={10} className='w-4 h-4 object-cover' />
                <div className='font-bold text-gray-900'>Linkedin:</div> <Link href="https://www.linkedin.com/in/runlong-li-7603582b7" className="text-blue-400 underline">https://www.linkedin.com/in/runlong-li-7603582b7</Link>
              </div>

              <div className="text-gray-700 leading-relaxed relative">
                Not only that, I like singing with <span className="font-bold text-gray-900">guitar 🎸</span> and also <span className="font-bold text-gray-900">finger style</span> at my spare time for fun and relief.&nbsp;
                <a 
                  href="#guitar-video" 
                  className='underline cursor-pointer text-blue-600 hover:text-blue-800 transition-colors'
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('guitar-video')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                 A guitar playing video is here
                </a>
              
                <Image src="/point-to-guitar-video.png" alt="Point to guitar video" width={20} height={20} className='hidden xl:block w-20 h-20 object-cover absolute -bottom-12 right-9 -rotate-15' />
                </div>
            </div>
            <div className='ml-10 relative group'>
              <div className='absolute top-12 -right-14 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-10 pointer-events-none'>
                <div className='bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg relative'>
                  <div className='text-sm'>Hi, I&apos;m Leon, a software developer 👨‍💻</div>
                  <div className='absolute left-1/12 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-gray-900 rotate-45'></div>
                </div>
              </div>
              <Image 
                src="/leon.JPG" 
                alt="I'm Leon" 
                width={450} 
                height={450} 
                className='rounded-2xl border-1 border-gray-900'
              />
            </div>
          </div>
        </div>

        {/* Video Section */}

        <video id="guitar-video" src="/guitar.mov" controls className='rounded-2xl border-1 border-gray-900 w-full mb-20'></video>


        {/* Second Image with Text */}
        <div className="mb-20">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/1.jpeg"
                  alt="My Photo"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">My Journey</h2>
              <div className="text-gray-700 leading-relaxed mb-4">
                After obtaining <span className='text-gray-900 font-bold'>Bachelor&apos;s Degree</span> in{' '}
                <span className='text-gray-900 font-bold'>Data Science and Big Data Technology</span> in China 🇨🇳 
                in 2023, I continued to pursue the{' '}
                <span className='text-gray-900 font-bold'>Master of Information Technology</span> at{' '}
                <span className='text-gray-900 font-bold'>the University of Western Australia</span> 🇦🇺 from 2024.
              </div>
              <div className='text-gray-700 leading-relaxed mb-4'>
              I have a solid grounding in computer science fundamentals, but it was in 2024 that 
              I truly found my passion — 
              <span className='inline-flex items-center align-middle gap-1 ml-1'>
                <Image 
                  src="/react-icon.png" 
                  alt="React" 
                  width={16} 
                  height={16} 
                  className='w-4 h-4 object-cover' 
                />
                <span className='font-bold text-gray-900'>React ecosystem</span>
              </span>
              . From the moment I started building 
              with React, I was hooked. So far, I&apos;ve developed some React applications, each one teaching me 
              something new. Through these projects, I&apos;ve built a strong foundation in <div className='text-gray-900 font-bold inline-block'>React & TypeScript</div>
              , modern state management solutions, and best practices for scalable 
              front-end architecture.
              </div>
            </div>
          </div>
        </div>

        {/* Github repos */}
        <GithubPinnedRepos username="leonleerl" />


        {/* Tech Stack */}
        <TechStack />

        {/* Experience Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Experience</h2>
          <div className="space-y-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-36 text-right">
                <span className="text-lg font-bold text-gray-900">2024.11 - 2025.3</span>
              </div>
              <div className="flex-grow border-l-4 border-gray-900 pl-8 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Frontend Developer (Internship)</h3>
                <p className="text-gray-600 mb-3 font-semibold">Coders for Causes</p>
                <p className="text-gray-700 leading-relaxed">
                Developed an online mathematics examination platform using Next.js and TypeScript. 
                Implemented core features including real-time test delivery, automated grading, and student performance analytics. 
                Collaborated with the team to ensure responsive design and optimal user experience across different devices.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-36 text-right">
                <span className="text-lg font-bold text-gray-900">2024 - 2025</span>
              </div>
              <div className="flex-grow border-l-4 border-gray-300 pl-8 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">University of Western Australia</h3>
                <p className="text-gray-600 mb-3 font-semibold">Master of Information Technology</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-36 text-right">
                <span className="text-lg font-bold text-gray-900">2019 - 2023</span>
              </div>
              <div className="flex-grow border-l-4 border-gray-300 pl-8 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Chengdu Neusoft University</h3>
                <p className="text-gray-600 mb-3 font-semibold">Bachelor of Engineering (Data Science and Big Data Technology)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="text-center pt-12 border-t-2 border-gray-200">
          <Button className='bg-blue-400 hover:bg-blue-300 text-white cursor-pointer text-lg p-6' onClick={()=>{router.push('/blogs')}}>Visit my blogs ➡️</Button>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GithubPinnedRepos } from '@/components/ui/GithubPinnedRepos'

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 mt-4">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Me</h1>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I am a Full Stack Developer with a passion for building scalable and efficient systems 💻
          </p>
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
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gray-700 leading-relaxed mb-3">
              Hi there, I&apos;m Leon, a passionate developer who loves programming 💻. I&apos;m always fascinated by the latest technologies and spend a significant amount of time coding every day. 
              </p>
              <div className="text-gray-700 leading-relaxed mb-3">
                I&apos;m particularly enthusiastic about the 
                <span className="font-bold text-gray-900 inline-flex items-center gap-1 ml-1 align-middle">
                  <Image src="/react-icon.png" alt="React" width={10} height={10} className='w-4 h-4 object-cover' />
                  <span className='font-bold text-gray-900'>React ecosystem</span>
                </span>
                . React and TypeScript, along with their related technologies, are my most frequently used and strongest skills.
              </div>
              <p className="text-gray-700 leading-relaxed">
              I also have experience in 
              <span className="font-bold text-gray-900 inline-flex items-center gap-1 ml-1 align-middle">
                <Image src="/dotnet-icon.png" alt="C#" width={10} height={10} className='w-4 h-4 object-cover'/>
                <span className='font-bold text-gray-900'>C# desktop application development</span>
              </span>
              . I&apos;m highly familiar with WPF, Avalonia, and WinForms with the serial communication protocol.

              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
              Beyond programming languages, I&apos;m also passionate about learning natural languages. I speak four languages: <span className="font-bold text-gray-900">English, Chinese, Japanese, and Spanish</span>.
              </p>
              <div className="text-gray-700 leading-relaxed mb-1 flex gap-1">
                <Image src="/github-icon.png" alt="GitHub" width={10} height={10} className='w-4 h-4 object-cover' />
                <div className='font-bold text-gray-900'>GitHub:</div><Link href="https://github.com/leonleerl" className="text-blue-400 underline">https://github.com/leonleerl</Link>
              </div>
                <div className="text-gray-700 leading-relaxed mb-3 flex gap-1">
                <Image src="/linkedin-icon.png" alt="Linkedin" width={10} height={10} className='w-4 h-4 object-cover' />

                <div className='font-bold text-gray-900'>Linkedin:</div> <Link href="https://www.linkedin.com/in/runlong-li-7603582b7" className="text-blue-400 underline">https://www.linkedin.com/in/runlong-li-7603582b7</Link>
                </div>

              <p className="text-gray-700 leading-relaxed">
                Not only that, I like singing with <span className="font-bold text-gray-900">guitar 🎸</span> and also <span className="font-bold text-gray-900">finger style</span> at my spare time for fun and relief. A guitar playing video is here ⬇️
              </p>
            </div>
            <div className='ml-16 relative group'>
              <div className='absolute top-6 -right-14 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-10 pointer-events-none'>
                <div className='bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg relative'>
                  <div className='text-sm'>Hi, I&apos;m Leon, a software engineer 👨‍💻</div>
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

        <video src="/guitar.mov" controls className='rounded-2xl border-1 border-gray-900 w-full mb-20'></video>


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
              I truly found my passion—the 
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
              with React, I was hooked. Over these years, I&apos;ve developed numerous React applications, each one teaching me 
              something new. Through these projects, I&apos;ve built a strong foundation in <div className='text-gray-900 font-bold inline-block'>React & TypeScript</div>
              , modern state management solutions, and best practices for scalable 
              front-end architecture.
              </div>
            </div>
          </div>
        </div>

        {/* Github repos */}
        <GithubPinnedRepos username="leonleerl" />

        {/* Experience Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Experience</h2>
          <div className="space-y-12">
            <div className="flex gap-8">
              <div className="flex-shrink-0 w-32 text-right">
                <span className="text-lg font-bold text-gray-900">2020 - Now</span>
              </div>
              <div className="flex-grow border-l-4 border-gray-900 pl-8 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Lorem Ipsum Position</h3>
                <p className="text-gray-600 mb-3 font-semibold">Dolor Sit Company</p>
                <p className="text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                </p>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex-shrink-0 w-32 text-right">
                <span className="text-lg font-bold text-gray-900">2018 - 2020</span>
              </div>
              <div className="flex-grow border-l-4 border-gray-300 pl-8 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Consectetur Role</h3>
                <p className="text-gray-600 mb-3 font-semibold">Adipiscing Organization</p>
                <p className="text-gray-700 leading-relaxed">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                  veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam 
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                </p>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex-shrink-0 w-32 text-right">
                <span className="text-lg font-bold text-gray-900">2015 - 2018</span>
              </div>
              <div className="flex-grow border-l-4 border-gray-300 pl-8 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tempor Position</h3>
                <p className="text-gray-600 mb-3 font-semibold">Incididunt Institute</p>
                <p className="text-gray-700 leading-relaxed">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
                  praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias 
                  excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui 
                  officia deserunt mollitia animi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Philosophy & Approach</h2>
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas 
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione 
              voluptatem sequi nesciunt.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci 
              velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam 
              quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis 
              suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae 
              consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et 
              accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti 
              atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non 
              provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et 
              dolorum fuga.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Focus</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Sed do eiusmod tempor incididunt ut labore et dolore.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-600 text-sm">
                Duis aute irure dolor in reprehenderit voluptate.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">
                Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Additional Insights</h2>
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">On Learning & Growth</h3>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                mollit anim id est laborum.
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">On Collaboration</h3>
              <p className="text-gray-700 leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
                architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas 
                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione 
                voluptatem sequi nesciunt.
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">On Innovation</h3>
              <p className="text-gray-700 leading-relaxed">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci 
                velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam 
                aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam 
                corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
              </p>
            </div>
          </div>
        </div>

        {/* Final Thoughts */}
        <div className="mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Final Thoughts</h2>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
              culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde 
              omnis iste natus error sit voluptatem accusantium.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis 
              et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia 
              voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui 
              ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="text-center pt-12 border-t-2 border-gray-200">
          <p className="text-gray-500 text-lg italic mb-4">
            &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.&quot;
          </p>
          <p className="text-gray-400 text-sm">Thank you for visiting</p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

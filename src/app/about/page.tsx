import React from 'react'
import Image from 'next/image'

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 mt-4">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Me</h1>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I am a frontend developer with a passion for building scalable and efficient systems 💻
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
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gray-700 leading-relaxed mb-3">
              Hi there, I&apos;m Leon, a passionate developer who loves programming 💻. I&apos;m always fascinated by the latest technologies and spend a significant amount of time coding every day. 
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
              I&apos;m particularly enthusiastic about the <span className="font-bold text-gray-900">React ecosystem</span>. React and TypeScript, along with their related technologies, are my most frequently used and strongest skills.
              </p>
              <p className="text-gray-700 leading-relaxed">
              I also have one year of full-time professional experience in <span className="font-bold text-gray-900">C# desktop application development</span>. I&apos;m highly proficient in WPF, Avalonia, and WinForms.

              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
              Beyond programming languages, I&apos;m also passionate about learning natural languages. I speak four languages: <span className="font-bold text-gray-900">English, Chinese, Japanese, and Spanish</span>.

              </p>
              <p className="text-gray-700 leading-relaxed">
                Not only that, I like singing with <span className="font-bold text-gray-900">guitar 🎸</span> and also <span className="font-bold text-gray-900">finger style</span> at my spare time for fun and relief. A guitar playing video is here 
              </p>
            </div>
            <div className='ml-16'>
                <Image src="/leon.JPG" alt="I'm Leon" width={400} height={400} className='rounded-2xl border-1 border-gray-900'/>
            </div>
          </div>
        </div>

        {/* Video Section */}

        <video src="/guitar.mov" controls className='rounded-2xl border-1 border-gray-900 w-full mb-20'></video>


        {/* What I Do Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Full Stack Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">C# Desktop Applications</h3>
              <p className="text-gray-600 leading-relaxed">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
                praesentium voluptatum deleniti atque.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Consectetur</h3>
              <p className="text-gray-600 leading-relaxed">
                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus 
                saepe eveniet ut et voluptates.
              </p>
            </div>
          </div>
        </div>

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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">My Journey</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
              </p>
            </div>
          </div>
        </div>

        {/* Skills/Interests Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Skills & Interests</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Professional Skills</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Lorem Ipsum Dolor</h4>
                    <p className="text-gray-600">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sit Amet Consectetur</h4>
                    <p className="text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Adipiscing Elite</h4>
                    <p className="text-gray-600">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sed Do Eiusmod</h4>
                    <p className="text-gray-600">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Personal Interests</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tempor Incididunt</h4>
                    <p className="text-gray-600">Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ut Labore Dolore</h4>
                    <p className="text-gray-600">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Magna Aliqua</h4>
                    <p className="text-gray-600">Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 font-bold mr-3">•</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Quis Nostrud</h4>
                    <p className="text-gray-600">At vero eos et accusamus et iusto odio dignissimos ducimus qui.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

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

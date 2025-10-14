'use client'
import Image from 'next/image'

function TechStack() {
  const techStack = [
    { name: 'Python', icon: <Image src={'/python-icon.png'} alt="Python" width={24} height={24} />, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Linux', icon: <Image src={'/linux-icon.png'} alt="Linux" width={24} height={24} />, color: 'bg-yellow-200 text-yellow-600' },
    { name: 'React', icon: <Image src="/react-icon.png" alt="React" width={24} height={24} />, color: 'bg-blue-100 text-blue-600' },
    { name: 'TypeScript', icon: <Image src="/typescript-icon.png" alt="TypeScript" width={24} height={24} />, color: 'bg-blue-100 text-blue-700' },
    { name: 'Tailwind CSS', icon: <Image src="/tailwind-icon.png" alt="Tailwind CSS" width={24} height={24} />, color: 'bg-gray-100 text-gray-900' },
    { name: 'Next.js', icon: '▲', color: 'bg-gray-100 text-gray-900' },
    { name: 'Zustand', icon: <Image src="/zustand-icon.png" alt="Zustand" width={24} height={24} />, color: 'bg-gray-100 text-gray-900' },
    { name: 'NextAuth.js', icon: <Image src="/next-auth-icon.png" alt="NextAuth.js" width={24} height={24} />, color: 'bg-gray-100 text-gray-900' },
    { name: 'AWS', icon: <Image src={'/aws-icon.png'} alt="AWS" width={24} height={24} />, color: 'bg-orange-100 text-orange-600' },
    { name: 'Docker', icon: '🐳', color: 'bg-blue-100 text-blue-500' },
    { name: 'Node.js', icon: <Image src={'/nodejs-icon.png'} alt="Node.js" width={24} height={24} />, color: 'bg-green-100 text-green-600' },
    { name: 'C#', icon: <Image src={'/csharp-icon.png'} alt="C#" width={24} height={24} />, color: 'bg-purple-100 text-purple-600' },
    { name: 'ASP.NET Core', icon: <Image src={'/dotnet-icon.png'} alt=".NET" width={24} height={24} />, color: 'bg-purple-200 text-purple-600' },
    { name: 'WPF', icon: <Image src={'/csharp-icon.png'} alt=".NET" width={24} height={24} />, color: 'bg-purple-200 text-purple-700' },
    { name: 'Avalonia', icon: <Image src={'/avalonia-icon.png'} alt=".NET" width={24} height={24} />, color: 'bg-purple-200 text-purple-800' },

  ]

  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Tech Stacks</h2>
      
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <div className="inline-flex w-max animate-scroll">
          <div className="flex">
            {techStack.map((tech, index) => (
              <div
                key={`first-${index}`}
                className={`flex-shrink-0 mx-4 px-6 py-4 rounded-xl ${tech.color} flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow`}
              >
                <span className="text-3xl">{tech.icon}</span>
                <span className="font-semibold text-lg whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
          
          <div className="flex">
            {techStack.map((tech, index) => (
              <div
                key={`second-${index}`}
                className={`flex-shrink-0 mx-4 px-6 py-4 rounded-xl ${tech.color} flex items-center gap-3 shadow-md hover:shadow-lg transition-shadow`}
              >
                <span className="text-3xl">{tech.icon}</span>
                <span className="font-semibold text-lg whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { TechStack }
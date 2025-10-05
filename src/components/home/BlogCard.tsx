import { EyeIcon, TimerIcon } from 'lucide-react'
import React from 'react'

function BlogCard() {
  return (
    <div className='bg-gray-200 h-40 rounded-xl flex flex-col justify-between p-4 cursor-pointer hover:bg-gray-300 hover:shadow-lg hover:shadow-gray-500/50 hover:scale-[1.01] transition-all duration-300'>
        <div className='text-xl font-bold break-words'>keyof and typeof</div>
        <div className='flex items-center gap-2'>
            <TimerIcon className='w-4 h-4' />
            <div>Jun 20, 2025</div>
        </div>
        <div></div>
        <div className='flex justify-between items-center gap-2'>
            <div className='flex items-center gap-2'>
            <div className='bg-blue-500 text-white px-2 py-1 rounded-full'>Javascript</div>
            <div className='bg-purple-500 text-white px-2 py-1 rounded-full'>React</div>
            </div>
            <div className='flex items-center gap-2'>
                <EyeIcon className='w-4 h-4' />
                <div>100</div>
            </div>
        </div>
    </div>
  )
}

export { BlogCard }

"use client"

import { EyeIcon, TimerIcon } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

interface Post {
  id: string
  slug: string
  title: string
  createdAt: string
  category: {
    id: string
    name: string
  }
  views: number
}

function BlogCard({ post }: { post: Post }) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/blogs/${post.slug}`)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    })
  }

  return (
    <div 
      onClick={handleClick}
      className='bg-gray-200 h-40 rounded-xl flex flex-col justify-between p-4 cursor-pointer hover:bg-gray-300 hover:shadow-lg hover:shadow-gray-500/50 hover:scale-[1.01] transition-all duration-300'
    >
        <div className='text-xl font-bold break-words line-clamp-2'>{post.title}</div>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
            <TimerIcon className='w-4 h-4' />
            <div>{formatDate(post.createdAt)}</div>
        </div>
        <div></div>
        <div className='flex justify-between items-center gap-2'>
            <div className='flex items-center gap-2'>
            <div className='bg-blue-500 text-white px-2 py-1 rounded-full text-sm'>{post.category.name}</div>
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-600'>
                <EyeIcon className='w-4 h-4' />
                <div>{post.views}</div>
            </div>
        </div>
    </div>
  )
}

export { BlogCard }

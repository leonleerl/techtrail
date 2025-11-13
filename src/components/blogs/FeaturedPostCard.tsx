"use client"

import { EyeIcon, CalendarIcon, StarIcon } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Post {
  id: string
  slug: string
  title: string
  description?: string
  createdAt: string
  category: {
    id: string
    name: string
  }
  views: number
  is_featured: boolean
}

interface FeaturedPostCardProps {
  post: Post
}

function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/blogs/${post.slug}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <Card 
      onClick={handleClick}
      className={cn(
        "group relative overflow-hidden cursor-pointer transition-all duration-300",
        "hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1",
        "bg-gradient-to-br from-primary/5 via-background to-background",
        "border-2 border-primary/20 hover:border-primary/40"
      )}
    >
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
          <StarIcon className="w-3.5 h-3.5 text-primary fill-primary" />
          <span className="text-xs font-semibold text-primary">Featured</span>
        </div>
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
            {post.category.name}
          </span>
        </div>
        <CardTitle className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </CardTitle>
        {post.description && (
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm md:text-base">
            {post.description}
          </p>
        )}
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <EyeIcon className="w-4 h-4" />
            <span>{post.views.toLocaleString()} views</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
          <span>Read more</span>
          <svg 
            className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </CardFooter>
    </Card>
  )
}

export { FeaturedPostCard }


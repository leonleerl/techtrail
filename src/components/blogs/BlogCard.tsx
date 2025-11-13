"use client"

import { EyeIcon, CalendarIcon, ArrowRightIcon } from 'lucide-react'
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

interface BlogCardProps {
  post: Post
}

function BlogCard({ post }: BlogCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/blogs/${post.slug}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <Card 
      onClick={handleClick}
      className={cn(
        "group h-full flex flex-col cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
        "border hover:border-primary/30"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
            {post.category.name}
          </span>
        </div>
        <CardTitle className="text-lg font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </CardTitle>
        {post.description && (
          <p className="text-muted-foreground mt-2 text-sm line-clamp-2">
            {post.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-end pt-0">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <EyeIcon className="w-3.5 h-3.5" />
            <span>{post.views.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t">
        <div className="flex items-center gap-2 text-sm font-medium text-primary/70 group-hover:text-primary group-hover:gap-3 transition-all w-full">
          <span>Read article</span>
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardFooter>
    </Card>
  )
}

export { BlogCard }

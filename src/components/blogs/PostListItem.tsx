"use client"

import { EyeIcon, MessageSquareIcon, BookmarkIcon, CalendarIcon } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
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

interface PostListItemProps {
  post: Post
  commentCount?: number
}

function PostListItem({ post, commentCount = 0 }: PostListItemProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/blogs/${post.slug}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return '1 day ago'
    } else {
      return `${diffDays} days ago`
    }
  }

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "group cursor-pointer border-b pb-3 px-5 hover:bg-accent/30 transition-colors",
        "flex"
      )}
    >
      {/* Left content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {post.category.name}
          </span>
          {post.is_featured && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
              Featured
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2.5 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>
        
        {post.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        )}
        
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-medium text-primary border border-primary/20">
              {post.title.charAt(0).toUpperCase()}
            </span>
            <span>Author</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <EyeIcon className="w-3.5 h-3.5" />
            <span>{post.views} views</span>
          </div>
          {commentCount > 0 && (
            <div className="flex items-center gap-1.5">
              <MessageSquareIcon className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-orange-500">{commentCount}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Right bookmark icon */}
      <div className="flex-shrink-0 pt-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle bookmark logic
          }}
          className="p-1.5 rounded-md hover:bg-accent transition-colors"
        >
          <BookmarkIcon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
        </button>
      </div>
    </div>
  )
}

export { PostListItem }


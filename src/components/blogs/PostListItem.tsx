"use client"

import { CalendarIcon, EyeIcon } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

interface Post {
  id: string
  slug: string
  title: string
  description?: string
  createdAt: string
  categories: {
    id: string
    name: string
  }[]
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="group cursor-pointer border-b border-slate-100 bg-white px-6 py-7 transition-all duration-300 last:border-b-0 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-950/80 dark:hover:bg-slate-900/80 sm:px-8"
    >
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold leading-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-300">
          {post.title}
        </h2>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5" />
            Created {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <EyeIcon className="h-3.5 w-3.5" />
            {post.views.toLocaleString()} views
          </span>
          {post.categories?.map((c) => (
            <span
              key={c.id}
              className="rounded-full bg-blue-100 px-2.5 py-1 text-blue-700 dark:bg-cyan-400/10 dark:text-cyan-300"
            >
              {c.name}
            </span>
          ))}
          {post.is_featured && (
            <span className="rounded-full bg-orange-100 px-2.5 py-1 text-orange-600 dark:bg-orange-400/10 dark:text-orange-300">
              Featured
            </span>
          )}
        </div>

        {post.description && (
          <p className="line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {post.description}
          </p>
        )}

        <div className="text-sm font-medium text-blue-600 transition-transform group-hover:translate-x-1 dark:text-cyan-300">
          Read more
          {commentCount > 0 ? ` / ${commentCount} comments` : ''}
        </div>
      </div>
    </article>
  )
}

export { PostListItem }


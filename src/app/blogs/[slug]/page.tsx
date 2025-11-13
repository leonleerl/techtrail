"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui'
import { MarkdownRenderer } from '@/components/ui/markdown-renderer'
import { Home, Calendar, Eye, Tag } from 'lucide-react'
import { fetchPost } from '@/lib/api-client/post.client'

// Interface for extracting Markdown headings
interface Heading {
  id: string
  text: string
  level: number
}

// Post data interface
interface Post {
  id: string
  title: string
  slug: string
  content: string
  published: boolean
  views: number
  createdAt: string
  updatedAt: string
  categoryId: string
  category: {
    id: string
    name: string
  }
}

function BlogPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Fetch post data
  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return
      
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchPost(slug)
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch post')
      } finally {
        setIsLoading(false)
      }
    }

    loadPost()
  }, [slug])

  // Extract headings from Markdown content
  useEffect(() => {
    if (!post?.content) return

    const extractedHeadings: Heading[] = []
    const lines = post.content.split('\n')
    const usedIds = new Set<string>()
    
    lines.forEach((line) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/)
      if (match) {
        const level = match[1].length
        const text = match[2]
        const baseId = text.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        
        // Ensure unique ID by appending number if duplicate
        let id = baseId
        let counter = 1
        while (usedIds.has(id)) {
          id = `${baseId}-${counter}`
          counter++
        }
        usedIds.add(id)
        
        extractedHeadings.push({ id, text, level })
      }
    })
    
    setHeadings(extractedHeadings)
  }, [post])

  // Listen to scroll and highlight current heading
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id))
      const scrollPosition = window.scrollY + 100

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i]
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(headings[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  // Scroll to heading on click
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-white">Loading...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error || 'Post not found'}</p>
          <Button onClick={() => router.push('/blogs')}>
            <Home className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
        </div>
      </div>
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-900">
      {/* Top navigation back to home button */}
      <nav className="bg-white dark:bg-slate-800 shadow-sm border-b dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/blogs')}
            className="hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Blogs
          </Button>
        </div>
      </nav>

      {/* Main content area */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-10 gap-6">
          {/* Left sidebar (1/10) */}
          <aside className="col-span-10 lg:col-span-2">
            <div className="sticky top-20 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded"></span>
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {headings.length > 0 ? (
                  headings.map((heading) => (
                    <button
                      key={heading.id}
                      onClick={() => scrollToHeading(heading.id)}
                      className={`
                        w-full text-left text-sm py-2 px-3 rounded transition-all
                        hover:bg-blue-50 hover:text-blue-600
                        ${activeId === heading.id ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 dark:text-gray-300'}
                      `}
                      style={{ paddingLeft: `${(heading.level - 1) * 12 + 12}px` }}
                    >
                      <span className="line-clamp-2">{heading.text}</span>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No headings</p>
                )}
              </nav>
            </div>
          </aside>

          {/* Right main content (9/10) */}
          <main className="col-span-10 lg:col-span-8">
            <article className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 lg:p-12">
              {/* Article title */}
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>
              
              {/* Article metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-8 pb-6 border-b dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                    {post.category.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.views} views</span>
                </div>
              </div>

              {/* Article content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <MarkdownRenderer content={post.content} />
              </div>
            </article>

            {/* Bottom back to home button */}
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={() => router.push('/blogs')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Home className="w-5 h-5" />
                Back to Blogs
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default BlogPage

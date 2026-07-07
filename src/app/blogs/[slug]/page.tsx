"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui'
import { MarkdownRenderer } from '@/components/ui/markdown-renderer'
import { Home, Calendar, Eye, Tag } from 'lucide-react'
import { fetchPost } from '@/lib/api-client/post.client'
import { NavbarBlogs } from '@/components/blogs'

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
  categories: {
    id: string
    name: string
  }[]
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

  // 从 DOM 中提取标题（在 Markdown 渲染完成后）
  useEffect(() => {
    if (!post?.content) return

    // 等待 Markdown 渲染完成
    const timer = setTimeout(() => {
      const articleElement = document.querySelector('article')
      if (!articleElement) return
      
      // 查找文章内容区域内的所有标题（排除文章标题）
      const allHeadings = Array.from(articleElement.querySelectorAll('h1, h2, h3, h4, h5, h6')) as HTMLElement[]
      
      // 过滤掉文章标题（第一个 h1，如果存在）
      const contentHeadings = allHeadings.filter((el, index) => {
        // 跳过文章标题（第一个 h1，如果存在）
        if (index === 0 && el.tagName === 'H1') {
          return false
        }
        return true
      })
      
      // 从 DOM 中提取标题信息
      const extractedHeadings: Heading[] = contentHeadings.map((element) => {
        const level = parseInt(element.tagName.charAt(1)) // H1 -> 1, H2 -> 2, etc.
        const text = element.textContent?.trim() || ''
        const id = element.id || ''
        
        return {
          id,
          text,
          level
        }
      }).filter(h => h.id) // 只保留有 id 的标题
      
      if (extractedHeadings.length > 0) {
        setHeadings(extractedHeadings)
      }
    }, 500) // 增加延迟，确保 Markdown 完全渲染

    return () => clearTimeout(timer)
  }, [post?.content])

  // Listen to scroll and highlight current heading
  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150 // 增加偏移量
      
      // 获取所有标题元素的位置
      const headingPositions = headings.map(heading => {
        const element = document.getElementById(heading.id)
        if (!element) return null
        return {
          id: heading.id,
          top: element.getBoundingClientRect().top + window.pageYOffset
        }
      }).filter((pos): pos is { id: string; top: number } => pos !== null)

      // 找到当前应该高亮的标题
      let activeHeadingId = ''
      for (let i = headingPositions.length - 1; i >= 0; i--) {
        if (headingPositions[i].top <= scrollPosition) {
          activeHeadingId = headingPositions[i].id
          break
        }
      }

      if (activeHeadingId && activeHeadingId !== activeId) {
        setActiveId(activeHeadingId)
      }
    }

    // 初始检查
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings, activeId])

  // Scroll to heading on click
  const scrollToHeading = (id: string) => {
    const scrollToElement = () => {
      const element = document.getElementById(id)
      
      if (element) {
        const offset = 120 // 偏移量，确保标题不被导航栏遮挡
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset
        const targetPosition = elementTop - offset
        
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        })
        return true
      }
      return false
    }
    
    // 立即尝试滚动
    if (!scrollToElement()) {
      // 如果找不到元素，等待一下再尝试
      setTimeout(() => {
        scrollToElement()
      }, 100)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fe] dark:bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600 dark:text-white">Loading...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fe] dark:bg-slate-950">
        <div className="text-center">
          <p className="mb-4 text-red-600 dark:text-red-400">{error || 'Post not found'}</p>
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
    <div className="min-h-screen bg-[#f7f9fe] text-slate-900 dark:bg-slate-950 dark:text-white">
      <NavbarBlogs />

      <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-20 sm:px-6 lg:px-8">
        <div className="mb-4 flex justify-start">
          <Button
            variant="ghost"
            onClick={() => router.push('/blogs')}
            className="flex items-center gap-2 rounded-full text-slate-600 bg-gray-200 transition-colors hover:bg-white hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-cyan-300"
          >
            <Home className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="rounded-2xl bg-white p-7 shadow-lg ring-1 ring-slate-200/70 dark:bg-slate-950/90 dark:ring-slate-800 sm:p-10">
            <div className="mb-8 border-b border-slate-100 pb-6 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Tag className="h-4 w-4" />
                {post.categories?.map((c) => (
                  <span
                    key={c.id}
                    className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 dark:bg-cyan-400/10 dark:text-cyan-300"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>

            <MarkdownRenderer content={post.content} className="prose-lg" />
          </article>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="max-h-[calc(100vh-120px)] overflow-y-auto rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-200/70 dark:bg-slate-950/90 dark:ring-slate-800">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <span className="h-4 w-1 rounded bg-blue-600"></span>
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {headings.length > 0 ? (
                  headings.map((heading) => (
                    <button
                      key={heading.id}
                      onClick={() => scrollToHeading(heading.id)}
                      className={`
                        w-full rounded px-3 py-2 text-left text-sm transition-all
                        hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-300
                        ${activeId === heading.id ? 'bg-blue-100 font-medium text-blue-700 dark:bg-cyan-400/10 dark:text-cyan-300' : 'text-slate-600 dark:text-slate-300'}
                      `}
                      style={{ paddingLeft: `${(heading.level - 1) * 12 + 12}px` }}
                    >
                      <span className="line-clamp-2">{heading.text}</span>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">No headings</p>
                )}
              </nav>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Created {formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Updated {formatDate(post.updatedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </aside>

        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => router.push('/blogs')}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            <Home className="h-5 w-5" />
            Back to Blogs
          </Button>
        </div>
      </main>
    </div>
  )
}

export default BlogPage

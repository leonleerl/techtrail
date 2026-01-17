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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:bg-web3-gradient flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:bg-web3-gradient flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:bg-web3-gradient">
      {/* Top navigation back to home button */}
      <nav className="bg-white dark:bg-web3-dark-200/85 dark:backdrop-blur-sm dark:border-b dark:border-cold-blue-400/50 dark:shadow-armor-blue shadow-sm border-b sticky top-0 z-50">
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
            <div className="sticky top-20 bg-white dark:bg-web3-dark-200/85 dark:backdrop-blur-sm dark:border dark:border-cold-blue-400/50 dark:shadow-armor-blue rounded-lg shadow-sm p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
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
                        hover:bg-blue-50 dark:hover:bg-cold-blue-300/20 dark:hover:shadow-web3-glow-sm hover:text-blue-600 dark:hover:text-cold-blue-500
                        ${activeId === heading.id ? 'bg-blue-100 dark:bg-cold-blue-300/30 dark:shadow-web3-glow-sm dark:border dark:border-cold-blue-400/40 text-blue-700 dark:text-cold-blue-500 font-medium' : 'text-gray-600 dark:text-metallic-200'}
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
            <article className="bg-white dark:bg-web3-dark-200/85 dark:backdrop-blur-sm dark:border dark:border-cold-blue-400/50 dark:shadow-armor-blue rounded-lg shadow-sm p-8 lg:p-12">
              {/* Article title */}
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>
              
              {/* Article metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-metallic-200 mb-8 pb-6 border-b dark:border-cold-blue-400/50 dark:shadow-web3-glow-border">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span className="bg-blue-100 dark:bg-cold-blue-300/20 dark:border dark:border-cold-blue-400/50 dark:shadow-web3-glow-sm text-blue-700 dark:text-cold-blue-500 px-3 py-1 rounded-full">
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

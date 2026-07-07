"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Post {
  id: string
  slug: string
  title: string
  views: number
  createdAt: string
}

interface Category {
  id: string
  name: string
}

interface BlogSidebarProps {
  popularPosts?: Post[]
  categories?: Category[]
  articleCount?: number
}

function BlogSidebar({ popularPosts = [], categories = [], articleCount = 0 }: BlogSidebarProps) {
  const router = useRouter()

  return (
    <aside className="w-full space-y-5 lg:w-80">
      <section className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200/70 dark:bg-slate-950/85 dark:ring-slate-800">
        <div className="relative z-0 h-20">
          <Image
            src="/perth-bg.jpeg"
            alt="Perth skyline"
            fill
            sizes="320px"
            className="object-cover object-[center_70%]"
          />
        </div>
        <div className="relative z-10 -mt-6 px-6 pb-6 text-center">
          <Image
            src="/leon.JPG"
            alt="Runlong Li avatar"
            width={88}
            height={88}
            className="mx-auto h-[88px] w-[88px] rounded-full border-4 border-white object-cover shadow-md dark:border-slate-950"
          />
          <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">Runlong Li</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Full Stack Engineer <br /> AWS Certified Solution Architect <br /> Web3 Developer
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
              <div className="font-semibold text-slate-900 dark:text-white">{articleCount}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Articles</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
              <div className="font-semibold text-slate-900 dark:text-white">{categories.length}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {popularPosts.length > 0 && (
        <section className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200/70 dark:bg-slate-950/85 dark:ring-slate-800">
          <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Recent Posts</h3>
          <div className="space-y-4">
            {popularPosts.slice(0, 5).map((post) => (
              <button
                key={post.id}
                type="button"
                onClick={() => router.push(`/blogs/${post.slug}`)}
                className="block w-full text-left"
              >
                <span className="line-clamp-2 text-sm leading-6 text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-300">
                  {post.title}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <section className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200/70 dark:bg-slate-950/85 dark:ring-slate-800">
          <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category.id}
                className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-cyan-400/10 dark:text-cyan-300"
              >
                {category.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </aside>
  )
}

export { BlogSidebar }


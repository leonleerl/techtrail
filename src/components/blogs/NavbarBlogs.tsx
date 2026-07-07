"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ThemeSwitch from '../theme-switch'

function NavbarBlogs() {
    const router = useRouter();

    const handleBlogs = () => {
        router.push('/blogs');
    }

    const handleAboutMe = () => {
        router.push('/about');
    }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/85 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/75">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex items-center gap-3 text-sm font-semibold text-slate-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-cyan-300"
        >
          <Image src='/leon.JPG' alt='Leon Li avatar' width={40} height={40} className='h-9 w-9 rounded-full object-cover ring-2 ring-white/80' />
          <span className="hidden sm:inline">Welcome to my blogs</span>
        </button>
        <div className='flex items-center gap-4 text-sm font-medium text-slate-700 dark:text-slate-200'>
          <ThemeSwitch />
          <button type="button" className='transition-colors hover:text-blue-600 dark:hover:text-cyan-300' onClick={handleBlogs}>Blogs</button>
          <button type="button" className='transition-colors hover:text-blue-600 dark:hover:text-cyan-300' onClick={handleAboutMe}>About</button>
        </div>
      </div>
    </header>
  )
}

export { NavbarBlogs }

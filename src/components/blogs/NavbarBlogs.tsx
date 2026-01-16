"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ThemeSwitch from '../theme-switch'
import { cn } from '@/lib/utils'

function NavbarBlogs() {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showRounded, setShowRounded] = useState(true);

    const handleBlogs = () => {
        router.push('/blogs');
    }

    const handleAboutMe = () => {
        router.push('/about');
    }

    useEffect(() => {
        // 第一阶段：扩展宽度，保持圆角
        const expandTimer = setTimeout(() => {
            setIsExpanded(true);
        }, 50);

        // 第二阶段：移除圆角（在扩展动画完成后）
        const removeRoundedTimer = setTimeout(() => {
            setShowRounded(false);
        }, 800); // 等待扩展动画完成后再移除圆角

        return () => {
            clearTimeout(expandTimer);
            clearTimeout(removeRoundedTimer);
        };
    }, []);

  return (
    <div className="h-14 w-full fixed top-0 left-0 right-0 z-50 overflow-hidden">
      {/* Background layer with animation */}
      <div className={cn(
        "absolute top-0 h-full bg-gray-600 dark:bg-gray-800 opacity-80 transition-all duration-700 ease-out",
        isExpanded 
          ? "w-full left-0" 
          : "w-4/5 left-1/2 -translate-x-1/2",
        showRounded ? "rounded-b-xl" : "rounded-none"
      )} />
      
      {/* Content layer */}
      <div className='relative h-full w-4/5 mx-auto flex items-center justify-between px-4 z-10'>
        <div>
          <Image src='/leon.JPG' alt='logo' width={100} height={100} className='rounded-full w-10 h-10 object-cover border-1 border-white transition-transform duration-500 hover:scale-110 hover:cursor-pointer' onClick={()=>{router.push('/')}}/>
        </div>
        <div className='flex items-center gap-2'>
          <ThemeSwitch />
          <Button className='text-white text-2xl hover:cursor-pointer transition-transform duration-300 hover:-translate-y-1' variant='ghost' onClick={handleBlogs}>Blogs</Button>
          <Button className='text-white hover:text-white text-2xl hover:cursor-pointer transition-transform duration-300 hover:-translate-y-1' variant='ghost' onClick={handleAboutMe}>About me</Button>
        </div>
      </div>
    </div>
  )
}

export { NavbarBlogs }

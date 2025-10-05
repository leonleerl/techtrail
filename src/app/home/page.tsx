'use client'
import React from 'react'
import { BlogCard, CategoryBar, Filter, Navbar } from '@/components/home';

function HomePage() {

  return (
    <div>
        <Navbar />
        <div className='flex items-center justify-between h-10 w-4/5 mx-auto gap-4 text-lg px-2 mt-2'>
            <CategoryBar />
            <Filter />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-4/5 mx-auto mt-4'>
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
        </div>
    </div>
  )
}

export default HomePage

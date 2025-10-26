"use client"

import React from 'react'
import { Button } from '@/components/ui'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function Navbar() {
    const router = useRouter();

    const handleBlogs = () => {
        router.push('/blogs');
    }

    const handleAboutMe = () => {
        router.push('/about');
    }
  return (
    <div className={`h-14 w-4/5 mx-auto fixed top-0 left-0 right-0 z-50 bg-gray-600 dark:bg-gray-800 rounded-b-xl opacity-80 transition-colors duration-300`}>
    <div className='flex items-center justify-between h-full px-4'>
        <div>
            <Image src='/leon.JPG' alt='logo' width={100} height={100} className='rounded-full w-10 h-10 object-cover border-1 border-white transition-transform duration-500 hover:scale-110 hover:cursor-pointer' onClick={()=>{router.push('/')}}/>
        </div>
        <div className='flex items-center gap-2'>
            <Button className='text-white hover:text-white text-2xl hover:cursor-pointer transition-transform duration-300 hover:-translate-y-1' variant='ghost' onClick={handleBlogs}>Blogs</Button>
            <Button className='text-white hover:text-white text-2xl hover:cursor-pointer transition-transform duration-300 hover:-translate-y-1' variant='ghost' onClick={handleAboutMe}>About me</Button>
        </div>
    </div>
</div>

  )
}

export { Navbar }

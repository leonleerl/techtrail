import React from 'react'
import { Button } from '../ui'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function Navbar() {
    const router = useRouter();

    const handleBlogs = () => {
        alert('Blogs');
    }

    const handleAboutMe = () => {
        router.push('/about');
    }
  return (
    <div className='h-14 w-4/5 mx-auto bg-gray-600 rounded-b-xl'>
    <div className='flex items-center justify-between h-full px-4'>
        <div>
            <Image src='/leon.JPG' alt='logo' width={100} height={100} className='rounded-full w-10 h-10 object-cover border-1 border-white transition-transform duration-500 hover:scale-110' onClick={()=>{router.push('/')}}/>
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

import React from 'react'

 function CategoryBar() {
  return (
    <div className='flex items-center gap-2'>
    <div>Categories:</div>
    <div className='underline hover:cursor-pointer'>All</div>
    <div className='underline hover:cursor-pointer'>Javascript</div>
    <div className='underline hover:cursor-pointer'>CSS</div>
    <div className='underline hover:cursor-pointer'>React</div>
    <div className='underline hover:cursor-pointer'>Next.js</div>
    <div className='underline hover:cursor-pointer'>Tailwind.css</div>
    <div className='underline hover:cursor-pointer'>Web3.0</div>
</div>
  )
}


export { CategoryBar }
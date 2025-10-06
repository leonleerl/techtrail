import { CategoryDto } from '@/types/category';
import React from 'react'
import { Skeleton } from '../ui';

interface CategoryBarProps {
  categories: CategoryDto[];
  isLoading: boolean;
  error: string;
}

 function CategoryBar({ categories, isLoading, error }: CategoryBarProps) {
  if (isLoading) return (
    <div className='flex items-center gap-2'>
      <div>Categories:</div>
      <Skeleton className='w-20 h-4 bg-gray-300' />
      <Skeleton className='w-20 h-4 bg-gray-300' />
      <Skeleton className='w-20 h-4 bg-gray-300' />
    </div>
  );
  if (error) return <div>Error: {error}</div>;
  return (
    <div className='flex items-center gap-2'>
    <div>Categories:</div>
    {categories.map(category => (
    <div className='underline hover:cursor-pointer' key={category.id}>{category.name}</div>
    ))}
</div>
  )
}


export { CategoryBar }
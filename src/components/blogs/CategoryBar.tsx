import { CategoryDto } from '@/types/category';
import React from 'react'
import { Skeleton } from '../ui';
import { cn } from '@/lib/utils';

interface CategoryBarProps {
  categories: CategoryDto[];
  isLoading: boolean;
  error: string | null;
  selectedCategory?: string;
  onCategoryClick?: (categoryId: string) => void;
}

function CategoryBar({ categories, isLoading, error, selectedCategory = 'all', onCategoryClick }: CategoryBarProps) {
  if (isLoading) return (
    <div className='flex items-center gap-2 overflow-x-auto pb-2'>
      <Skeleton className='w-16 h-8' />
      <Skeleton className='w-20 h-8' />
      <Skeleton className='w-20 h-8' />
      <Skeleton className='w-20 h-8' />
    </div>
  );
  
  if (error) return <div>Error: {error}</div>;
  
  const handleClick = (categoryId: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  return (
    <div className='flex items-center gap-2 overflow-x-auto pb-2'>
      <button
        onClick={() => handleClick('all')}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
          selectedCategory === 'all'
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => handleClick(category.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export { CategoryBar }

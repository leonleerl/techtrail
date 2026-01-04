"use client"

import React from 'react'
import { CategoryDto } from '@/types/category';
import { Skeleton } from '../ui';
import { cn } from '@/lib/utils';

type FilterType = 'featured' | 'latest'

interface FilterCategoryBarProps {
  categories: CategoryDto[];
  isLoading: boolean;
  error: string | null;
  activeFilter: FilterType;
  selectedCategory: string;
  onFilterChange: (filter: FilterType) => void;
  onCategoryClick: (categoryId: string) => void;
}

function FilterCategoryBar({ 
  categories, 
  isLoading, 
  error, 
  activeFilter, 
  selectedCategory, 
  onFilterChange,
  onCategoryClick 
}: FilterCategoryBarProps) {
  const filters: { id: FilterType; label: string }[] = [
    { id: 'featured', label: 'Featured' },
    { id: 'latest', label: 'Latest' },
  ]

  if (isLoading) {
    return (
      <div className='flex items-center gap-2 overflow-x-auto pb-2'>
        <Skeleton className='w-20 h-8' />
        <Skeleton className='w-20 h-8' />
        <Skeleton className='w-16 h-8' />
        <Skeleton className='w-20 h-8' />
        <Skeleton className='w-20 h-8' />
      </div>
    );
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex items-center gap-2 overflow-x-auto pb-2'>
      {/* Filter tabs */}
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
            activeFilter === filter.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          {filter.label}
        </button>
      ))}
      
      {/* Separator */}
      <div className="h-6 w-px bg-border mx-2" />
      
      {/* Category buttons */}
      <button
        onClick={() => onCategoryClick('all')}
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
          onClick={() => onCategoryClick(category.id)}
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

export { FilterCategoryBar }


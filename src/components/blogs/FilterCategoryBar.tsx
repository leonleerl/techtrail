"use client"

import React from 'react'
import { CategoryDto } from '@/types/category';
import { Skeleton, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui';
import { cn } from '@/lib/utils';
import { MoveUp, MoveDown } from 'lucide-react';

type FilterType = 'all' | 'featured' | null

interface FilterCategoryBarProps {
  categories: CategoryDto[];
  isLoading: boolean;
  error: string | null;
  activeFilter: FilterType;
  selectedCategory: string;
  sortOrder: 'asc' | 'desc';
  isLatestActive: boolean;
  onFilterChange: (filter: FilterType) => void;
  onCategoryChange: (categoryId: string) => void;
  onLatestToggle: () => void;
}

function FilterCategoryBar({ 
  categories, 
  isLoading, 
  error, 
  activeFilter, 
  selectedCategory, 
  sortOrder,
  isLatestActive,
  onFilterChange,
  onCategoryChange,
  onLatestToggle
}: FilterCategoryBarProps) {
  if (isLoading) {
    return (
      <div className='flex items-center gap-2 overflow-x-auto pb-2'>
        <Skeleton className='w-16 h-8' />
        <Skeleton className='w-20 h-8' />
        <Skeleton className='w-20 h-8' />
        <Skeleton className='w-32 h-8' />
      </div>
    );
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex items-center gap-2 overflow-x-auto p-1'>
      {/* All button */}
      <button
        onClick={() => onFilterChange('all')}
        className={cn(
          "hover:cursor-pointer transition-colors duration-300 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap",
          activeFilter === 'all'
            ? "bg-blue-600 text-white shadow-sm dark:bg-cyan-500 dark:text-slate-950"
            : "text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-300"
        )}
      >
        All
      </button>

      {/* Featured button */}
      <button
        onClick={() => onFilterChange('featured')}
        className={cn(
          "hover:cursor-pointer transition-colors duration-300 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap",
          activeFilter === 'featured'
            ? "bg-blue-600 text-white shadow-sm dark:bg-cyan-500 dark:text-slate-950"
            : "text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-300"
        )}
      >
        Featured
      </button>

      {/* Latest button with sort indicator */}
      <button
        onClick={onLatestToggle}
        className={cn(
          "hover:cursor-pointer transition-colors duration-300 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap flex items-center gap-1 w-[110px] justify-center relative",
          isLatestActive
            ? "bg-blue-600 text-white shadow-sm dark:bg-cyan-500 dark:text-slate-950"
            : "text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-300"
        )}
      >
        <span className="flex items-center gap-1">
          Latest
          {isLatestActive && (
            sortOrder === 'desc' ? (
              <MoveDown className="w-4 h-4 flex-shrink-0" />
            ) : (
              <MoveUp className="w-4 h-4 flex-shrink-0" />
            )
          )}
        </span>
      </button>

      {/* Category Select */}
      <Select 
        value={selectedCategory === 'all' ? undefined : selectedCategory} 
        onValueChange={onCategoryChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choose a category" />
        </SelectTrigger>
        <SelectContent className='bg-white dark:bg-slate-950'>
          {categories.map(category => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
    </div>
  )
}

export { FilterCategoryBar }


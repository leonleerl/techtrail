"use client"

import React from 'react'
import { CategoryDto } from '@/types/category';
import { Skeleton, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui';
import { cn } from '@/lib/utils';
import { MoveUp, MoveDown } from 'lucide-react';

type FilterType = 'all' | 'featured' | 'latest'

interface FilterCategoryBarProps {
  categories: CategoryDto[];
  isLoading: boolean;
  error: string | null;
  activeFilter: FilterType;
  selectedCategory: string;
  sortOrder: 'asc' | 'desc';
  onFilterChange: (filter: FilterType) => void;
  onCategoryChange: (categoryId: string) => void;
  onSortToggle: () => void;
}

function FilterCategoryBar({ 
  categories, 
  isLoading, 
  error, 
  activeFilter, 
  selectedCategory, 
  sortOrder,
  onFilterChange,
  onCategoryChange,
  onSortToggle
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
          "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
          activeFilter === 'all'
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        All 📖
      </button>

      {/* Featured button */}
      <button
        onClick={() => onFilterChange('featured')}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
          activeFilter === 'featured'
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        Featured 🌟
      </button>

      {/* Latest button with sort indicator */}
      <button
        onClick={() => {
          if (activeFilter === 'latest') {
            // If already on latest, toggle sort order
            onSortToggle();
          } else {
            // Otherwise, switch to latest filter
            onFilterChange('latest');
          }
        }}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1 w-[110px] justify-center relative",
          activeFilter === 'latest'
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        <span className="flex items-center gap-1">
          Latest 🕒
          {activeFilter === 'latest' && (
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
        <SelectContent className='bg-amber-100'>
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


'use client'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import { PostListItem, BlogSidebar, FilterCategoryBar } from '@/components/blogs';
import { Navbar } from '@/components/Navbar';
import { useCategories } from '@/hooks/useCategories';
import { usePosts } from '@/hooks/usePosts';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';

type FilterType = 'featured' | 'latest'

function BlogsPage() {
  const { categories, isLoading, error } = useCategories();
  const { posts, isLoading: postsLoading, error: postsError, fetchPosts } = usePosts();
  
  const [activeFilter, setActiveFilter] = useState<FilterType>('featured');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPosts, setDisplayedPosts] = useState<typeof posts>([]);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const pageSize = 20;

  // Fetch posts list
  useEffect(() => {
    fetchPosts(searchQuery, currentPage, pageSize);
  }, [fetchPosts, searchQuery, currentPage]);

  // Filter posts based on filter conditions
  const filteredPosts = useMemo(() => {
    let result = [...posts].filter(post => post.published);

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(post => post.categoryId === selectedCategory);
    }

    // Sort by filter type
    switch (activeFilter) {
      case 'featured':
        result = result.filter(post => post.is_featured);
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'latest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [posts, activeFilter, selectedCategory]);

  // Update displayed posts list
  useEffect(() => {
    if (currentPage === 1) {
      setDisplayedPosts(filteredPosts.slice(0, pageSize));
    } else {
      setDisplayedPosts(prev => [...prev, ...filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize)]);
    }
    setHasMore(filteredPosts.length > currentPage * pageSize);
  }, [filteredPosts, currentPage]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !postsLoading) {
          setCurrentPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, postsLoading]);

  // Get popular posts (sorted by views)
  const popularPosts = useMemo(() => {
    return [...posts]
      .filter(post => post.published)
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  }, [posts]);

  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setDisplayedPosts([]);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setDisplayedPosts([]);
    fetchPosts(searchQuery, 1, pageSize);
  };

  // Handle filter type change
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    setDisplayedPosts([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Main content area */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 mt-12">
        {/* Search bar */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search, discover more exciting content"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </form>
        </div>

        {/* Filter and Category bar */}
        <div className="mb-6">
          <FilterCategoryBar 
            categories={categories} 
            isLoading={isLoading} 
            error={error}
            activeFilter={activeFilter}
            selectedCategory={selectedCategory}
            onFilterChange={handleFilterChange}
            onCategoryClick={handleCategoryClick}
          />
        </div>

        {/* Content area: left post list + right sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left post list */}
          <div className="flex-1 min-w-0">
            {postsLoading && displayedPosts.length === 0 ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </Card>
                ))}
              </div>
            ) : postsError ? (
              <div className="text-center py-12">
                <p className="text-destructive text-lg">Error: {postsError}</p>
              </div>
            ) : displayedPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No articles available</p>
              </div>
            ) : (
              <>
                <Card className="overflow-hidden">
                  {displayedPosts.map((post) => (
                    <PostListItem key={post.id} post={post} />
                  ))}
                </Card>
                
                {/* Infinite scroll trigger */}
                {hasMore && (
                  <div ref={observerTarget} className="py-8 text-center">
                    {postsLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <Card key={i} className="p-4">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Loading more...</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <BlogSidebar popularPosts={popularPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsPage;

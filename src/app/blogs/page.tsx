'use client'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import { PostListItem, BlogSidebar, FilterCategoryBar, NavbarBlogs } from '@/components/blogs';
import { useCategories } from '@/hooks/useCategories';
import { usePosts } from '@/hooks/usePosts';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

type FilterType = 'all' | 'featured' | null

function BlogsPage() {
  const { categories, isLoading, error } = useCategories();
  const { posts, isLoading: postsLoading, error: postsError, fetchPosts } = usePosts();
  
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLatestActive, setIsLatestActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPosts, setDisplayedPosts] = useState<typeof posts>([]);
  const [hasMore, setHasMore] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); // Key to force refresh
  const observerTarget = useRef<HTMLDivElement>(null);

  const pageSize = 20;

  // Fetch posts list
  useEffect(() => {
    fetchPosts('', currentPage, pageSize);
  }, [fetchPosts, currentPage]);

  // Filter posts based on filter conditions
  const filteredPosts = useMemo(() => {
    let result = [...posts].filter(post => post.published);

    // Filter by category (always apply if selected)
    if (selectedCategory !== 'all') {
      result = result.filter(post => post.categoryId === selectedCategory);
    }

    // Filter by Featured (only if Featured is active)
    if (activeFilter === 'featured') {
      result = result.filter(post => post.is_featured);
    }

    // Sort by time (use sortOrder if Latest is active, otherwise default to desc)
    const currentSortOrder = isLatestActive ? sortOrder : 'desc';
    result.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return currentSortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [posts, activeFilter, selectedCategory, sortOrder, isLatestActive]);

  // Update displayed posts list
  useEffect(() => {
    if (currentPage === 1) {
      setDisplayedPosts(filteredPosts.slice(0, pageSize));
    } else {
      setDisplayedPosts(prev => [...prev, ...filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize)]);
    }
    setHasMore(filteredPosts.length > currentPage * pageSize);
  }, [filteredPosts, currentPage, pageSize, refreshKey]);

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
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Cancel Featured and Latest when selecting category
    setActiveFilter(null);
    setIsLatestActive(false);
    setSortOrder('desc');
    setCurrentPage(1);
  };

  // Handle filter type change
  const handleFilterChange = (filter: FilterType) => {
    if (filter === 'all') {
      // Clicking All: reset category and cancel Featured/Latest
      setSelectedCategory('all');
      setActiveFilter('all');
      setIsLatestActive(false);
      setSortOrder('desc');
    } else if (filter === 'featured') {
      // Clicking Featured: activate Featured, keep category if selected
      setActiveFilter('featured');
      // Don't reset category - Featured works with category
    }
    
    // Increment refreshKey to force useEffect to re-run even if other states don't change
    setRefreshKey(prev => prev + 1);
    setCurrentPage(1);
  };

  // Handle Latest toggle
  const handleLatestToggle = () => {
    if (isLatestActive) {
      // If Latest is active, toggle sort order
      setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      // If Latest is not active, activate it
      setIsLatestActive(true);
      setSortOrder('desc'); // Start with desc
    }
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarBlogs />
      
      {/* Main content area */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 mt-12">
        {/* Filter and Category bar */}
        <div className="mb-6">
          <FilterCategoryBar 
            categories={categories} 
            isLoading={isLoading} 
            error={error}
            activeFilter={activeFilter}
            selectedCategory={selectedCategory}
            sortOrder={sortOrder}
            isLatestActive={isLatestActive}
            onFilterChange={handleFilterChange}
            onCategoryChange={handleCategoryChange}
            onLatestToggle={handleLatestToggle}
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

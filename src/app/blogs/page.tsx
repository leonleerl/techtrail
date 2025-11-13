'use client'
import React, { useEffect, useMemo } from 'react'
import { BlogCard, FeaturedPostCard, CategoryBar } from '@/components/blogs';
import { Navbar } from '@/components/Navbar';
import { useCategories } from '@/hooks/useCategories';
import { usePosts } from '@/hooks/usePosts';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

function BlogsPage() {
  const { categories, isLoading, error } = useCategories();
  const { posts, isLoading: postsLoading, error: postsError, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts('', 1, 100); // Fetch more posts to show featured ones
  }, [fetchPosts]);

  // Separate featured and regular posts
  const { featuredPosts, regularPosts } = useMemo(() => {
    const featured = posts.filter(post => post.is_featured && post.published);
    const regular = posts.filter(post => !post.is_featured && post.published);
    return { featuredPosts: featured, regularPosts: regular };
  }, [posts]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 mt-12">
        
        {/* Category Bar */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <CategoryBar categories={categories} isLoading={isLoading} error={error} />
        </div>
      </div>

      {/* Loading State */}
      {postsLoading && (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {postsError && (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-destructive text-lg">Error: {postsError}</p>
          </div>
        </div>
      )}

      {/* Content */}
      {!postsLoading && !postsError && (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Featured Posts Section */}
          {featuredPosts.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Featured Articles</h2>
                <Separator className="flex-1" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <FeaturedPostCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Regular Posts Section */}
          {regularPosts.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {featuredPosts.length > 0 ? 'All Articles' : 'Articles'}
                </h2>
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">
                  {regularPosts.length} {regularPosts.length === 1 ? 'post' : 'posts'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {featuredPosts.length === 0 && regularPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles available yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogsPage;

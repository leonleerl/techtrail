'use client'
import React, { useEffect } from 'react'
import { BlogCard, CategoryBar, Filter, Navbar } from '@/components/blogs';
import { useCategories } from '@/hooks/useCategories';
import { usePosts } from '@/hooks/usePosts';

function BlogsPage() {

  const { categories, isLoading, error } = useCategories();
  const {posts, isLoading: postsLoading, error: postsError, fetchPosts} = usePosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div>
        <Navbar />
        <div className='flex items-center justify-between h-10 w-4/5 mx-auto gap-4 text-lg px-2 mt-18'>
            <CategoryBar categories={categories} isLoading={isLoading} error={error} />
            {/* <Filter /> */}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-4/5 mx-auto mt-4'>
      {postsLoading && <div>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>}
      {postsError && <div>Error: {postsError}</div>}
      {!postsLoading && !postsError && posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  </div>
);
}

export default BlogsPage;

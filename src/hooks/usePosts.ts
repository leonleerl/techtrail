import { useState, useCallback } from 'react';
import { PostFormSchemaType } from '@/schemas/post.schema';
import { toast } from 'sonner';
import * as postService from '@/lib/api-client/post.client';

interface Post {
  id: string
  title: string
  slug: string
  content: string
  published: boolean
  is_featured: boolean
  views: number
  createdAt: string
  updatedAt: string
  categoryId: string
  category: {
    id: string
    name: string
  }
}

interface PaginationState {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationState | null>(null);

  const fetchPosts = useCallback(async (title: string = "", page: number = 1, limit: number = 10) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await postService.fetchPosts(title, page, limit);
      setPosts(response.data);
      setPagination(response.meta);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addPost = useCallback(async (data: PostFormSchemaType) => {
    setIsSubmitting(true);
    try {
      await postService.createPost(data);
      await fetchPosts();
      toast.success('Post added successfully');
    } catch (err) {
      toast.error(`Error: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchPosts]);

  const updatePost = useCallback(async (slug: string, data: PostFormSchemaType) => {
    setIsSubmitting(true);
    try {
      await postService.updatePost(slug, data);
      await fetchPosts();
      toast.success('Post updated successfully');
    } catch (err) {
      toast.error(`Error: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchPosts]);

  const deletePost = useCallback(async (slug: string) => {
    try {
      await postService.deletePost(slug);
      await fetchPosts();
      toast.success('Post deleted successfully');
      return true;
    } catch (err) {
      toast.error(`Error: ${err}`);
      return false;
    }
  }, [fetchPosts]);

  return {
    posts,
    isLoading,
    error,
    isSubmitting,
    fetchPosts,
    addPost,
    updatePost,
    deletePost,
    pagination
  };
} 
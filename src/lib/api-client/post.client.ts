import { PostFormSchemaType } from "@/schemas/post.schema";
import { ValidationError, AlreadyExistsError } from "@/lib/api-response";

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

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  }
}

export async function fetchPosts(title: string = "", page: number = 1, limit: number = 10): Promise<PaginatedResponse<Post>> {
  const response = await fetch(`/api/post?title=${title}&page=${page}&limit=${limit}`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch posts');
  }
  return result.data;
}

export async function fetchPost(slug: string): Promise<Post> {
  const response = await fetch(`/api/post/${slug}`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch post');
  }
  return result.data;
}

export async function createPost(data: PostFormSchemaType): Promise<Post> {
  const response = await fetch('/api/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    if (response.status === 409) {
      throw new AlreadyExistsError(result.message || 'Post slug already exists');
    } else if (response.status === 400) {
      throw new ValidationError(result.message || 'Invalid data', result.errors);
    } else {
      throw new Error(result.message || 'Failed to create post');
    }
  }
  return result.data;
}

export async function updatePost(slug: string, data: PostFormSchemaType): Promise<Post> {
  const response = await fetch(`/api/post/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to update post');
  }
  return result.data;
}

export async function deletePost(slug: string): Promise<void> {
  const response = await fetch(`/api/post/${slug}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to delete post');
  }
} 
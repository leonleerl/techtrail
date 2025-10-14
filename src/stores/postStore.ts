// src/stores/postStore.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { apiFetch } from '@/lib/fetchHelper'
import type {
  PostDto,
  PostCreateDto,
  PostUpdateDto,
  PostQueryParams,
} from '@/types/post'
import type { ApiResponse } from '@/types/common'

interface PostState {
  // 状态
  posts: PostDto[]
  currentPost: PostDto | null
  loading: boolean
  error: string | null

  // 分页信息
  totalItems: number
  itemsPerPage: number
  currentPage: number
  totalPages: number

  // 方法
  fetchPosts: (params?: PostQueryParams) => Promise<void>
  fetchPostById: (id: string) => Promise<PostDto>
  fetchPostBySlug: (slug: string) => Promise<PostDto>
  createPost: (data: PostCreateDto) => Promise<PostDto>
  updatePost: (id: string, data: PostUpdateDto) => Promise<PostDto>
  deletePost: (id: string) => Promise<void>
  incrementViews: (id: string) => Promise<void>

  // 辅助方法
  setCurrentPost: (post: PostDto | null) => void
  clearError: () => void
  resetStore: () => void
}

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  totalItems: 0,
  itemsPerPage: 10,
  currentPage: 1,
  totalPages: 0,
}

const usePostStore = create<PostState>()(
  devtools(
    (set) => ({
      ...initialState,

      // GET - 获取文章列表
      fetchPosts: async (params?: PostQueryParams) => {
        set({ loading: true, error: null })
        try {
          const result = await apiFetch<ApiResponse<PostDto[]>>('/api/posts', {
            params,
          })

          set({
            posts: result.data || [],
            totalItems: result.meta?.totalItems || 0,
            itemsPerPage: result.meta?.itemsPerPage || 10,
            currentPage: result.meta?.currentPage || 1,
            totalPages: result.meta?.totalPages || 0,
            loading: false,
          })
        } catch (error) {
          set({
            error: (error as Error).message,
            loading: false,
          })
        }
      },

      // GET - 通过 ID 获取文章
      fetchPostById: async (id: string) => {
        set({ loading: true, error: null })
        try {
          const result = await apiFetch<ApiResponse<PostDto>>(
            `/api/posts/${id}`
          )

          set({
            currentPost: result.data || null,
            loading: false,
          })

          return result.data!
        } catch (error) {
          set({
            error: (error as Error).message,
            loading: false,
          })
          throw error
        }
      },

      // GET - 通过 slug 获取文章
      fetchPostBySlug: async (slug: string) => {
        set({ loading: true, error: null })
        try {
          const result = await apiFetch<ApiResponse<PostDto>>(
            `/api/posts/slug/${slug}`
          )

          set({
            currentPost: result.data || null,
            loading: false,
          })

          return result.data!
        } catch (error) {
          set({
            error: (error as Error).message,
            loading: false,
          })
          throw error
        }
      },

      // POST - 创建文章
      createPost: async (data: PostCreateDto) => {
        set({ loading: true, error: null })
        try {
          const result = await apiFetch<ApiResponse<PostDto>>('/api/posts', {
            method: 'POST',
            body: JSON.stringify(data),
          })

          set((state) => ({
            posts: [result.data!, ...state.posts],
            totalItems: state.totalItems + 1,
            loading: false,
          }))

          return result.data!
        } catch (error) {
          set({
            error: (error as Error).message,
            loading: false,
          })
          throw error
        }
      },

      // PUT - 更新文章
      updatePost: async (id: string, data: PostUpdateDto) => {
        set({ loading: true, error: null })
        try {
          const result = await apiFetch<ApiResponse<PostDto>>(
            `/api/posts/${id}`,
            {
              method: 'PUT',
              body: JSON.stringify(data),
            }
          )

          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === id ? result.data! : post
            ),
            currentPost:
              state.currentPost?.id === id ? result.data! : state.currentPost,
            loading: false,
          }))

          return result.data!
        } catch (error) {
          set({
            error: (error as Error).message,
            loading: false,
          })
          throw error
        }
      },

      // DELETE - 删除文章
      deletePost: async (id: string) => {
        set({ loading: true, error: null })
        try {
          await apiFetch<ApiResponse<void>>(`/api/posts/${id}`, {
            method: 'DELETE',
          })

          set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
            totalItems: state.totalItems - 1,
            currentPost:
              state.currentPost?.id === id ? null : state.currentPost,
            loading: false,
          }))
        } catch (error) {
          set({
            error: (error as Error).message,
            loading: false,
          })
          throw error
        }
      },

      // PATCH - 增加浏览次数
      incrementViews: async (id: string) => {
        try {
          await apiFetch<ApiResponse<void>>(`/api/posts/${id}/views`, {
            method: 'PATCH',
          })

          // 乐观更新本地状态
          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === id ? { ...post, views: post.views + 1 } : post
            ),
            currentPost:
              state.currentPost?.id === id
                ? { ...state.currentPost, views: state.currentPost.views + 1 }
                : state.currentPost,
          }))
        } catch (error) {
          console.error('Failed to increment views:', error)
        }
      },

      setCurrentPost: (post: PostDto | null) => {
        set({ currentPost: post })
      },

      clearError: () => {
        set({ error: null })
      },

      resetStore: () => {
        set(initialState)
      },
    }),
    { name: 'PostStore' }
  )
)

export default usePostStore
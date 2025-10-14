// src/stores/categoryStore.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { apiFetch } from '@/lib/fetchHelper'
import type {
  CategoryDto,
  CategoryCreateDto,
  CategoryUpdateDto,
  CategoryQueryParams,
} from '@/types/category'
import type { ApiResponse } from '@/types/common'

interface CategoryState {
  // 状态
  categories: CategoryDto[]
  currentCategory: CategoryDto | null
  loading: boolean
  error: string | null

  // 分页信息
  totalItems: number
  itemsPerPage: number
  currentPage: number
  totalPages: number

  // 方法
  fetchCategories: (params?: CategoryQueryParams) => Promise<void>
  fetchCategoryById: (id: string) => Promise<CategoryDto>
  createCategory: (data: CategoryCreateDto) => Promise<CategoryDto>
  updateCategory: (id: string, data: CategoryUpdateDto) => Promise<CategoryDto>
  deleteCategory: (id: string) => Promise<void>

  // 辅助方法
  setCurrentCategory: (category: CategoryDto | null) => void
  clearError: () => void
  resetStore: () => void
}

const initialState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,
  totalItems: 0,
  itemsPerPage: 10,
  currentPage: 1,
  totalPages: 0,
}

const useCategoryStore = create<CategoryState>()(
  devtools(
    (set) => ({
      ...initialState,

      // GET - 获取分类列表
      fetchCategories: async (params?: CategoryQueryParams) => {
        set({ loading: true, error: null })
        try {
          const result = await apiFetch<ApiResponse<CategoryDto[]>>(
            '/api/categories',
            { params }
          )

          set({
            categories: result.data || [],
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

      // GET - 获取单个分类
      fetchCategoryById: async (id: string) => {
        set({ loading: true, error: null })
        try {
          const result = await apiFetch<ApiResponse<CategoryDto>>(
            `/api/categories/${id}`
          )

          set({
            currentCategory: result.data || null,
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

      // POST - 创建分类
      createCategory: async (data: CategoryCreateDto) => {
        set({ loading: true, error: null })
        try {
          const result = await apiFetch<ApiResponse<CategoryDto>>(
            '/api/categories',
            {
              method: 'POST',
              body: JSON.stringify(data),
            }
          )

          // 添加到列表开头
          set((state) => ({
            categories: [result.data!, ...state.categories],
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

      // PUT - 更新分类
      updateCategory: async (id: string, data: CategoryUpdateDto) => {
        set({ loading: true, error: null })
        try {
          const result = await apiFetch<ApiResponse<CategoryDto>>(
            `/api/categories/${id}`,
            {
              method: 'PUT',
              body: JSON.stringify(data),
            }
          )

          set((state) => ({
            categories: state.categories.map((category) =>
              category.id === id ? result.data! : category
            ),
            currentCategory:
              state.currentCategory?.id === id
                ? result.data!
                : state.currentCategory,
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

      // DELETE - 删除分类
      deleteCategory: async (id: string) => {
        set({ loading: true, error: null })
        try {
          await apiFetch<ApiResponse<void>>(`/api/categories/${id}`, {
            method: 'DELETE',
          })

          set((state) => ({
            categories: state.categories.filter(
              (category) => category.id !== id
            ),
            totalItems: state.totalItems - 1,
            currentCategory:
              state.currentCategory?.id === id ? null : state.currentCategory,
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

      setCurrentCategory: (category: CategoryDto | null) => {
        set({ currentCategory: category })
      },

      clearError: () => {
        set({ error: null })
      },

      resetStore: () => {
        set(initialState)
      },
    }),
    { name: 'CategoryStore' }
  )
)

export default useCategoryStore
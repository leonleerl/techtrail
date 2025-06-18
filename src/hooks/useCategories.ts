import { useState, useCallback } from 'react';
import { CategoryDto } from '@/types/category';
import { CategoryFormSchemaType } from '@/schemas/category.schema';
import { toast } from 'sonner';
import * as categoryService from '@/lib/api-client/category.client';

interface PaginationState {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export function useCategories() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationState | null>(null);

  const fetchCategories = useCallback(async (name: string = "", page: number=1, limit: number=10) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await categoryService.fetchCategories(name, page, limit);
      setCategories(response.data);
      setPagination(response.meta);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const addCategory = useCallback(async (data: CategoryFormSchemaType): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      await categoryService.createCategory(data);
      await fetchCategories();
      toast.success('Category added successfully');
      return true;
    } catch (err) {
      toast.error(`Error: ${err}`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchCategories]);

  const updateCategory = useCallback(async (id: string, data: CategoryFormSchemaType): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      await categoryService.updateCategory(id, data);
      await fetchCategories();
      toast.success('Category updated successfully');
      return true;
    } catch (err) {
      toast.error(`Error: ${err}`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchCategories]);

  const deleteCategory = useCallback(async (id: string) => {
    try {
      await categoryService.deleteCategory(id);
      await fetchCategories();
      toast.success('Category deleted successfully');
      return true;
    } catch (err) {
      toast.error(`Error: ${err}`);
      return false;
    }
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    isSubmitting,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    pagination
  };
} 
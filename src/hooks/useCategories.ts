import { useState, useCallback } from 'react';
import { CategoryDto } from '@/types/category';
import { CategoryFormSchemaType } from '@/schemas/category.schema';
import { toast } from 'sonner';
import * as categoryService from '@/services/category.service';

export function useCategories() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchCategories = useCallback(async (name?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await categoryService.fetchCategories(name);
      setCategories(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const addCategory = useCallback(async (data: CategoryFormSchemaType) => {
    setIsSubmitting(true);
    try {
      await categoryService.createCategory(data);
      await fetchCategories();
      toast.success('Category added successfully');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Error: ${errorMessage}`);
      console.error(err);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchCategories]);

  const updateCategory = useCallback(async (id: string, data: CategoryFormSchemaType) => {
    setIsSubmitting(true);
    try {
      await categoryService.updateCategory(id, data);
      await fetchCategories();
      toast.success('Category updated successfully');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Error: ${errorMessage}`);
      console.error(err);
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
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      toast.error(`Error: ${errorMessage}`);
      console.error(err);
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
    deleteCategory
  };
} 
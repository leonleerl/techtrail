import { CategoryDto } from "@/types/category";
import { CategoryFormSchemaType } from "@/schemas/category.schema";

export async function fetchCategories(): Promise<CategoryDto[]> {
  const response = await fetch('/api/category');
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch categories');
  }
  return result.data;
}

export async function fetchCategory(id: string): Promise<CategoryDto> {
  const response = await fetch(`/api/category/${id}`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch category');
  }
  return result.data;
}

export async function createCategory(data: CategoryFormSchemaType): Promise<CategoryDto> {
  const response = await fetch('/api/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to create category');
  }
  return result.data;
}

export async function updateCategory(id: string, data: CategoryFormSchemaType): Promise<CategoryDto> {
  const response = await fetch(`/api/category/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to update category');
  }
  return result.data;
}

export async function deleteCategory(id: string): Promise<void> {
  const response = await fetch(`/api/category/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to delete category');
  }
} 
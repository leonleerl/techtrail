import { CategoryDto } from "@/types/category";
import { CategoryFormSchemaType } from "@/schemas/category.schema";
import { ValidationError, AlreadyExistsError } from "@/lib/api-response";

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  }
}

export async function fetchCategories(name: string = "", page: number = 1, limit: number = 10): Promise<PaginatedResponse<CategoryDto>> {

  const response = await fetch(`/api/category?name=${name}&page=${page}&limit=${limit}`);

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch categories');
  }
  return result;
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
    if (response.status === 409) {
      throw new AlreadyExistsError(result.message || 'Category name already exists');
    } else if (response.status === 400) {
      throw new ValidationError(result.message || 'Invalid data', result.errors);
    } else {
      throw new Error(result.message || 'Failed to create category');
    }
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
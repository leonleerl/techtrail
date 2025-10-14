
export interface CategoryDto {
  id: string;
  name: string;
}

export interface CategoryCreateDto {
  name: string;
}

export interface CategoryUpdateDto {
  name: string;
}

export interface CategoryQueryParams {
  name?: string;
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}
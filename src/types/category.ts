
// 给前端展示的结构
interface CategoryDto {
    id: string;
    name: string;
}

// 用于POST请求的结构
interface CategoryCreateDto {
    name: string;
}

// 用于PUT请求的结构
interface CategoryUpdateDto {
    name: string;
}

interface PaginatedResponse<T> {
    data: T[];
    meta: {
      totalItems: number;
      itemsPerPage: number;
      currentPage: number;
      totalPages: number;
    }
  }
  

export type { CategoryDto, CategoryCreateDto, CategoryUpdateDto, PaginatedResponse };

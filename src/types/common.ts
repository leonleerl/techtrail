
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        totalItems: number;
        itemsPerPage: number;
        currentPage: number;
        totalPages: number;
    }
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    meta?: {
        totalItems: number;
        itemsPerPage: number;
        currentPage: number;
        totalPages: number;
    }
}

export interface PostDto {
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
    category?: {
        id: string;
        name: string;
    }
}

export interface PostCreateDto {
    title: string;
    slug: string;
    content: string;
    published: boolean;
    categoryId: string;
}

export interface PostUpdateDto {
    title?: string;
    slug?: string;
    content?: string;
    published?: boolean;
    categoryId?: string;
}

export interface PostQueryParams {
    title?: string;
    page?: number;
    limit?: number;
    [key: string]: string | number | boolean | undefined;
}
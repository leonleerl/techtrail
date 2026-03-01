
export interface PostDto {
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    is_featured: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    categories: {
        id: string;
        name: string;
    }[];
}

export interface PostCreateDto {
    title: string;
    slug: string;
    content: string;
    published: boolean;
    is_featured: boolean;
    categoryIds: string[];
}

export interface PostUpdateDto {
    title?: string;
    slug?: string;
    content?: string;
    published?: boolean;
    is_featured?: boolean;
    categoryIds?: string[];
}

export interface PostQueryParams {
    title?: string;
    page?: number;
    limit?: number;
    [key: string]: string | number | boolean | undefined;
}
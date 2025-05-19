
interface PostDto{
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
}

interface PostCreateDto{
    title: string;
    slug: string;
    content: string;
    published: boolean;
    categoryId: string;
}

interface PostUpdateDto{
    title?: string;
    slug?: string;
    content?: string;
    published?: boolean;
    categoryId?: string;
}

export type { PostDto, PostCreateDto, PostUpdateDto };
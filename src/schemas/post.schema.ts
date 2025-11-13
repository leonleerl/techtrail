import { z } from "zod";

export const PostFormSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    slug: z.string().min(1, { message: "Slug is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    published: z.boolean(),
    is_featured: z.boolean(),
    categoryId: z.string(),
});

export type PostFormSchemaType = z.infer<typeof PostFormSchema>;
import { failure, success } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { PostFormSchema } from "@/schemas/post.schema";
import { PostFormSchemaType } from "@/schemas/post.schema";

// get all posts
export async function GET(req: Request) {
    try{
        const { searchParams } = new URL(req.url);

        const title = searchParams.get('title');

        const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

        const totalItems = await prisma.post.count({
            where: {
                title: {
                    contains: title || '',
                    mode: 'insensitive',
                },
            },
        });

        const totalPages = Math.ceil(totalItems / limit);

        const posts = await prisma.post.findMany({
            where: {
                title: {
                    contains: title || '',
                    mode: 'insensitive',
                },
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        return success('Posts fetched successfully', {
            data: posts,
            meta: {
                totalItems,
                totalPages,
            },
        });
    } catch (error) {
        return failure(error as Error);
    }
}

// create a new post
export async function POST(req: Request) {
    try{
        const body = await req.json();
        const parsedBody : PostFormSchemaType = PostFormSchema.parse(body);

        const postCreate = {
            title: parsedBody.title,
            slug: parsedBody.slug,
            content: parsedBody.content,
            published: parsedBody.published,
            categoryId: parsedBody.categoryId,
        }

        const result = await prisma.post.create({
            data: postCreate,
        });

        return success('Post created successfully', result);
    } catch (error) {
        return failure(error as Error);
    }
}
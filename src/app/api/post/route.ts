import { failure, success } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { PostFormSchema } from "@/schemas/post.schema";
import { PostFormSchemaType } from "@/schemas/post.schema";

// get all posts
export async function GET() {
    try{
        const posts = await prisma.post.findMany();
        return success('Posts fetched successfully', posts);
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
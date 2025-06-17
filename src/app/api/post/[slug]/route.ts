import { failure, success } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { PostFormSchemaType } from "@/schemas/post.schema";
import { PostFormSchema } from "@/schemas/post.schema";

// get a single post by slug
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try{
        const { slug } = await params;
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
        });
        return success('Post found', post);
    } catch (error) {
        return failure(error as Error);
    }
}

// update a post by slug
export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try{
        const { slug } = await params;
        const body = await req.json();
        const parsedBody : PostFormSchemaType = PostFormSchema.parse(body);

        const updatedPost = await prisma.post.update({
            where: { slug },
            data: parsedBody,
        });
        return success('Post updated', updatedPost);
    } catch (error) {
        return failure(error as Error);
    }
}

// delete a post by slug
export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try{
        const { slug } = await params;
        const deletedPost = await prisma.post.delete({
            where: { slug },
        });
        return success('Post deleted', deletedPost);
    } catch (error) {
        return failure(error as Error);
    }
}


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
                categories: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
        });
        // increment the views count
        await prisma.post.update({
            where: { slug },
            data: { views: { increment: 1 } },
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

        const { categoryIds, ...rest } = parsedBody;

        const updatedPost = await prisma.post.update({
            where: { slug },
            data: {
                title: rest.title,
                slug: rest.slug,
                content: rest.content,
                published: rest.published,
                is_featured: rest.is_featured,
                categories: {
                    set: categoryIds.map((id) => ({ id })),
                },
            },
            include: {
                categories: {
                    select: { id: true, name: true },
                },
            },
        });
        return success('Post updated', updatedPost);
    } catch (error) {
        console.error('PUT /api/post/[slug] error:', error);
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


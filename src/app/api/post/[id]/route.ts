import { failure, success } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { PostFormSchemaType } from "@/schemas/post.schema";
import { PostFormSchema } from "@/schemas/post.schema";

// get a single post by id
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try{
        const { id } = params;
        const post = await prisma.post.findUnique({
            where: { id },
        });
        return success('Post found', post);
    } catch (error) {
        return failure(error as Error);
    }
}

// update a post by id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try{
        const { id } = params;
        const body = await req.json();
        const parsedBody : PostFormSchemaType = PostFormSchema.parse(body);

        const updatedPost = await prisma.post.update({
            where: { id },
            data: parsedBody,
        });
        return success('Post updated', updatedPost);
    } catch (error) {
        return failure(error as Error);
    }
}

// delete a post by id
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try{
        const { id } = params;
        const deletedPost = await prisma.post.delete({
            where: { id },
        });
        return success('Post deleted', deletedPost);
    } catch (error) {
        return failure(error as Error);
    }
}


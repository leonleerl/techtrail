import prisma from "@/lib/prisma";
import { failure, success } from "@/lib/api-response";
import { CategoryFormSchemaType } from "@/schemas/category.schema";
import { CategoryFormSchema } from "@/schemas/category.schema";

// get a single category by id
export async function GET(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id }
  });
  
  return category 
    ? success('Category found', category)
    : failure(new Error('Category not found'));
}

// update a category by id
export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
    try{
        const {id} = await params;
        const existingCategory = await prisma.category.findUnique({
            where: {id},
        });

        if(!existingCategory){
            return failure(new Error('Category not found'));
        }

        const body = await req.json();
        const parsedBody : CategoryFormSchemaType = CategoryFormSchema.parse(body);

        const updatedCategory = await prisma.category.update({
            where: {id},
            data: parsedBody,
        });
        return success('Category updated successfully', updatedCategory);

    } catch (error) {
        return failure(error as Error);
    }
}


// delete a category by id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    try{
        const {id} = await params;
        const deletedCategory = await prisma.category.delete({
            where: {id},
        });

        return success('Category deleted successfully', deletedCategory);
    } catch (error) {
        return failure(error as Error);
    }
}
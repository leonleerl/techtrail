import prisma from "@/lib/prisma";
import { failure, success } from "@/lib/api-response";
import { CategoryDto } from "@/types";
import { CategoryFormSchema, CategoryFormSchemaType } from "@/schemas/category.schema";

// get all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    const result : CategoryDto[] = categories.map((category) => ({
        id: category.id,
        name: category.name,
    }));
    return success(
        'Categories fetched successfully', 
        result
    );
  } catch (error) {
    return failure(error as Error);
  }
}

// create a new category 
export async function POST(req: Request) {
  try{
    const body = await req.json();
    const parsedBody : CategoryFormSchemaType = CategoryFormSchema.parse(body);

    const categoryCreate = {
        name: parsedBody.name,
    }

    const result = await prisma.category.create({
        data: categoryCreate,
    });

    return success(
        'Category created successfully',
        result,
        201
    );
  } catch(error){
    return failure(error as Error);
  }
}

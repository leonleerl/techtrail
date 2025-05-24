import prisma from "@/lib/prisma";
import { failure, success } from "@/lib/api-response";
import { CategoryDto } from "@/types";
import { CategoryFormSchema, CategoryFormSchemaType } from "@/schemas/category.schema";

// if there is a search param looks like "http://localhost:3000/admin/categories?name=data", return the categories that contain the data in the name. If there is no search param, return all categories.
export async function GET(req: Request) {
  try{
    
    const { searchParams } = new URL(req.url);

    const name = searchParams.get('name');

    const categories : CategoryDto[] = await prisma.category.findMany({
      where: {
        name: {
          contains: name || '',
          mode: 'insensitive',
        },
      },
    });
    return success(
        'Categories fetched successfully',
        categories,
        200
    );
  } catch(error){
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

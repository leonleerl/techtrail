import prisma from "@/lib/prisma";
import { AlreadyExistsError, failure, success } from "@/lib/api-response";
import { CategoryDto } from "@/types";
import { CategoryFormSchema, CategoryFormSchemaType } from "@/schemas/category.schema";

// if there is a search param looks like "http://localhost:3000/admin/categories?name=data", return the categories that contain the data in the name. If there is no search param, return all categories.
export async function GET(req: Request) {
  try{
    
    const { searchParams } = new URL(req.url);

    const name = searchParams.get('name');

    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

    // 获取满足条件的总记录数
    const totalItems = await prisma.category.count({
      where: {
        name: {
          contains: name || '',
          mode: 'insensitive',
        },
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    const categories : CategoryDto[] = await prisma.category.findMany({
      where: {
        name: {
          contains: name || '',
          mode: 'insensitive',
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });

    const paginationMeta = {
      totalItems,
      itemsPerPage: limit,
      currentPage: page,
      totalPages
    };

    return success(
        'Categories fetched successfully',
        categories,
        200,
        paginationMeta
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

    // check if the name is already in the database
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: parsedBody.name,
      },
    });

    if (existingCategory) {
      return failure(new AlreadyExistsError('Category name already exists'));
    }


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

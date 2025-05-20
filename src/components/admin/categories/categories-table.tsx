"use client"

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { toast } from "sonner";
import { useCategories } from "@/hooks/useCategories";
import AddCategoryDialog from "./AddCategoryDialog";
import EditCategoryDialog from "./EditCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

export function CategoriesTable() {

  const {
    categories,
    isLoading,
    error,
    isSubmitting,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory
  } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (isLoading && categories.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <AddCategoryDialog 
          onAdd={addCategory} 
          isSubmitting={isSubmitting} 
        />
      </div>

      <Table>
        <TableCaption>A list of categories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">No categories found</TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="text-right space-x-2">
                  <EditCategoryDialog 
                    category={category} 
                    onUpdate={updateCategory} 
                    isSubmitting={isSubmitting} 
                  />
                  <DeleteCategoryDialog 
                    category={category} 
                    onDelete={deleteCategory} 
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {error && toast.error(`Error: ${error}`)}
    </div>
  );
}
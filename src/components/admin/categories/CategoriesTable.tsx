"use client"
import { useEffect, useState } from "react";
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
import { AddCategoryDialog, EditCategoryDialog, DeleteCategoryDialog, SearchBar, CategoryPagination } from "./index";
export function CategoriesTable() {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const {
    categories,
    isLoading,
    error,
    isSubmitting,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    pagination
  } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(()=>{
    fetchCategories("", currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, fetchCategories])

  // 当数据加载后更新分页信息
  useEffect(() => {
    if (pagination) {
      setTotalItems(pagination.totalItems);
      setItemsPerPage(pagination.itemsPerPage);
    }
  }, [pagination]);

  if (isLoading && categories.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <div className="flex items-center gap-2">
            <SearchBar onSearch={fetchCategories} />
            <AddCategoryDialog 
              onAdd={addCategory} 
              isSubmitting={isSubmitting} 
            />
        </div>
      </div>

      <Table>
        <TableCaption>
          <CategoryPagination 
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
          />
        </TableCaption>
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
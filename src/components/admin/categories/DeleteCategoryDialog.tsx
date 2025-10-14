"use client"

import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button
} from "@/components/ui";
import { CategoryDto } from "@/types/category";

interface DeleteCategoryDialogProps {
  category: CategoryDto;
  onDelete: (id: string) => Promise<boolean>;
}

 function DeleteCategoryDialog({ category, onDelete }: DeleteCategoryDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="bg-red-500">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-300">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete {category.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-red-600 text-white' onClick={() => onDelete(category.id)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 

export { DeleteCategoryDialog }
"use client"

import { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  Button
} from '@/components/ui';
import { CategoryDto } from '@/types/category';
import { CategoryFormSchemaType } from '@/schemas/category.schema';
import CategoryForm from './CategoryForm';

interface EditCategoryDialogProps {
  category: CategoryDto;
  onUpdate: (id: string, data: CategoryFormSchemaType) => Promise<boolean>;
  isSubmitting: boolean;
}

function EditCategoryDialog({ category, onUpdate, isSubmitting }: EditCategoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: CategoryFormSchemaType) => {
    const success = await onUpdate(category.id, data);
    if (success) {
      setIsOpen(false);
    }
    return success;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-300">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category name below. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        
        <CategoryForm
          initialData={category}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          formId="editCategoryForm"
        />
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" className='bg-green-600 text-white' form="editCategoryForm" disabled={isSubmitting}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 

export { EditCategoryDialog }
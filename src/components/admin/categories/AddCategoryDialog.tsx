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
import { CategoryFormSchemaType } from '@/schemas/category.schema';
import CategoryForm from './CategoryForm';

interface AddCategoryDialogProps {
  onAdd: (data: CategoryFormSchemaType) => Promise<boolean>;
  isSubmitting: boolean;
}

function AddCategoryDialog({ onAdd, isSubmitting }: AddCategoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: CategoryFormSchemaType) => {
    const success = await onAdd(data);
    if (success) {
      setIsOpen(false);
    }
    return success;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Enter the name for your new category.
          </DialogDescription>
        </DialogHeader>
        
        <CategoryForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          formId="addCategoryForm"
        />
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="addCategoryForm" disabled={isSubmitting}>
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 

export { AddCategoryDialog }
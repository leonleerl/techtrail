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
import { PostFormSchemaType } from '@/schemas/post.schema';
import PostForm from './PostForm';

interface AddPostDialogProps {
  onAdd: (data: PostFormSchemaType) => Promise<void>;
  isSubmitting: boolean;
}

export function AddPostDialog({ onAdd, isSubmitting }: AddPostDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: PostFormSchemaType): Promise<boolean> => {
    try {
      await onAdd(data);
      setOpen(false);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='hover:bg-blue-300 hover:text-white bg-blue-400'>Add Post</Button>
      </DialogTrigger>
      <DialogContent className="min-w-full h-[98vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Add New Post</DialogTitle>
          <DialogDescription>
            Create a new blog post. Fill in all the required information.
          </DialogDescription>
        </DialogHeader>
        <PostForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          formId="add-post-form"
        />
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="add-post-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Post'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 
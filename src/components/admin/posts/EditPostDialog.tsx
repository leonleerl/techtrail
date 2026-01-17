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

interface Post {
  id: string
  title: string
  slug: string
  content: string
  published: boolean
  is_featured: boolean
  views: number
  createdAt: string
  updatedAt: string
  categoryId: string
  category: {
    id: string
    name: string
  }
}

interface EditPostDialogProps {
  post: Post;
  onUpdate: (slug: string, data: PostFormSchemaType) => Promise<void>;
  isSubmitting: boolean;
}

export function EditPostDialog({ post, onUpdate, isSubmitting }: EditPostDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: PostFormSchemaType): Promise<boolean> => {
    try {
      await onUpdate(post.slug, data);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent className="min-w-full h-[98vh] bg-green-100 overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Modify the post information below.
          </DialogDescription>
        </DialogHeader>
        <PostForm
          initialData={post}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          formId="edit-post-form"
        />
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="edit-post-form"
            disabled={isSubmitting}
            className="hover:bg-green-300 hover:text-white bg-green-400"
          >
            {isSubmitting ? 'Updating...' : 'Update Post'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 
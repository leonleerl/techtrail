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

interface DeletePostDialogProps {
  post: Post;
  onDelete: (slug: string) => Promise<boolean>;
}

export function DeletePostDialog({ post, onDelete }: DeletePostDialogProps) {
  const handleDelete = async () => {
    await onDelete(post.slug);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="bg-red-500">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-300">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the post
            <strong> &quot;{post.title}&quot; </strong>
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-600/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 
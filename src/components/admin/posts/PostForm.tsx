"use client"

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage, 
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui';
import { PostFormSchema, PostFormSchemaType } from '@/schemas/post.schema';
import { CategoryDto } from '@/types/category';
import * as categoryService from '@/lib/api-client/category.client';

interface Post {
  id: string
  title: string
  slug: string
  content: string
  published: boolean
  views: number
  createdAt: string
  updatedAt: string
  categoryId: string
  category: {
    id: string
    name: string
  }
}

interface PostFormProps {
  initialData?: Post;
  onSubmit: (data: PostFormSchemaType) => Promise<boolean>;
  isSubmitting: boolean;
  formId: string;
}

export default function PostForm({ initialData, onSubmit, formId }: PostFormProps) {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const form = useForm<PostFormSchemaType>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      content: initialData?.content || '',
      published: initialData?.published || false,
      categoryId: initialData?.categoryId || '',
    },
  });

  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await categoryService.fetchCategories('', 1, 100); // Get all categories
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    form.setValue('title', value);
    if (!initialData) { // Only auto-generate slug for new posts
      const slug = generateSlug(value);
      form.setValue('slug', slug);
    }
  };

  const handleSubmit = async (data: PostFormSchemaType) => {
    const success = await onSubmit(data);
    if (success) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter post title..." 
                  {...field}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="post-slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your post content here..." 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={loadingCategories ? "Loading..." : "Select a category"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Published</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Make this post visible to the public
                </div>
              </div>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="w-4 h-4"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
} 
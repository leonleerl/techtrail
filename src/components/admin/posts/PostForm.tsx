"use client"

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage, 
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';
import { PostFormSchema, PostFormSchemaType } from '@/schemas/post.schema';
import { CategoryDto } from '@/types/category';
import * as categoryService from '@/lib/api-client/category.client';
import { MarkdownPreviewModal } from './MarkdownPreviewModal';

// 动态导入 Markdown 编辑器，避免 SSR 问题
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

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
  categories: {
    id: string
    name: string
  }[]
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
      is_featured: initialData?.is_featured || false,
      categoryIds: initialData?.categories?.map((c) => c.id) ?? [],
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
              <div className="flex items-center justify-between">
                <FormLabel>Content (Markdown)</FormLabel>
                <MarkdownPreviewModal 
                  content={field.value || ''} 
                  title="Markdown Preview"
                />
              </div>
              <FormControl>
                <div className="border rounded-md">
                  <MDEditor
                    value={field.value}
                    onChange={(value) => field.onChange(value || '')}
                    preview="edit"
                    hideToolbar={false}
                    height={300}
                    data-color-mode="light"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <DropdownMenu modal={false}>
                <FormControl>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between font-normal h-9 px-3"
                    >
                      {loadingCategories
                        ? "Loading..."
                        : field.value.length > 0
                          ? categories
                              .filter((c) => field.value.includes(c.id))
                              .map((c) => c.name)
                              .join(", ")
                          : "Select categories"}
                      <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                </FormControl>
                <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                  {categories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category.id}
                      checked={field.value.includes(category.id)}
                      onCheckedChange={(checked) => {
                        const next = checked
                          ? [...field.value, category.id]
                          : field.value.filter((id) => id !== category.id);
                        field.onChange(next);
                      }}
                    >
                      {category.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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

        <FormField
          control={form.control}
          name="is_featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Featured</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Pin this post to the top
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
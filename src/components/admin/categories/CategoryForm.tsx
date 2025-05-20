"use client"

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage, 
  Input
} from '@/components/ui';
import { CategoryFormSchema, CategoryFormSchemaType } from '@/schemas/category.schema';
import { CategoryDto } from '@/types/category';

interface CategoryFormProps {
  initialData?: CategoryDto;
  onSubmit: (data: CategoryFormSchemaType) => Promise<boolean>;
  isSubmitting: boolean;
  formId: string;
}

export default function CategoryForm({
  initialData,
  onSubmit,
  isSubmitting,
  formId
}: CategoryFormProps) {
  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: initialData?.name || '',
    },
  });

  // 处理提交
  const handleSubmit = async (data: CategoryFormSchemaType) => {
    const success = await onSubmit(data);
    if (success) {
      form.reset();
    }
  };

  // 当initialData更新时，更新表单值
  useEffect(() => {
    if (initialData) {
      form.setValue('name', initialData.name);
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
} 
"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Button,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    DialogClose
  } from "@/components/ui"
import { CategoryFormSchema, CategoryFormSchemaType } from "@/schemas/category.schema";
import { CategoryDto } from "@/types/category";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
function CategoriesTable() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentCategory, setCurrentCategory] = useState<CategoryDto>();
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();


  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      const result = await response.json();
      setCategories(result.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (category: CategoryDto) => {
    try {
      const response = await fetch(`/api/category/${category.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchCategories();
      } else {
        const errorData = await response.json();
        alert(`Failed to delete: ${errorData.message || 'Unknown error'}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      alert(`Error: ${errorMessage}`);
      console.error(err);
    }

  }

  const handleUpdateCategory = async (formData: CategoryFormSchemaType) => {
    try {
      setIsSaving(true);
      const response = await fetch(`/api/category/${currentCategory!.id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchCategories();
        toast.success('Category updated successfully');
        setIsSaving(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      alert(`Error: ${errorMessage}`);
      console.error(err);
    }
  }

  const handleEditDialogOpen = (category: CategoryDto) => {
    setCurrentCategory(category);
    form.setValue("name", category.name);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Operation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="font-medium">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => handleEditDialogOpen(category)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                        <Form {...form}>
                        <form id="updateCategoryForm" onSubmit={form.handleSubmit(handleUpdateCategory)} className="space-y-6">
                          <div className="grid gap-4 py-4">
                            <div className="grid items-center gap-4">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </form>
                      </Form>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" form="updateCategoryForm" disabled={isSaving}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete {category.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the data from the server.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteCategory(category)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  export { CategoriesTable };
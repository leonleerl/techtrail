"use client"
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { toast } from "sonner";
import { usePosts } from "@/hooks/usePosts";
import { AddPostDialog, EditPostDialog, DeletePostDialog, SearchBar, PostPagination } from "./index";

export function PostsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const {
    posts,
    isLoading,
    error,
    isSubmitting,
    fetchPosts,
    addPost,
    updatePost,
    deletePost,
    pagination
  } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts("", currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, fetchPosts])

  useEffect(() => {
    if (pagination) {
      setTotalItems(pagination.totalItems);
      setItemsPerPage(pagination.itemsPerPage);
    }
  }, [pagination]);

  if (isLoading && posts.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Posts</h2>
        <div className="flex items-center gap-2">
          <SearchBar onSearch={fetchPosts} />
          <AddPostDialog 
            onAdd={addPost} 
            isSubmitting={isSubmitting} 
          />
        </div>
      </div>

      <Table>
        <TableCaption>
          <PostPagination 
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
          />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">No posts found</TableCell>
            </TableRow>
          ) : (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.slug}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {post.category?.name || 'No Category'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    post.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </TableCell>
                <TableCell>{post.views.toLocaleString()}</TableCell>
                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right space-x-2">
                  <EditPostDialog 
                    post={post} 
                    onUpdate={updatePost} 
                    isSubmitting={isSubmitting} 
                  />
                  <DeletePostDialog 
                    post={post} 
                    onDelete={deletePost} 
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {error && toast.error(`Error: ${error}`)}
    </div>
  );
}
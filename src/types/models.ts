// TypeScript types matching database models for frontend use

interface Like {
  userId: string;
  postId: string;
  createdAt: Date;
  user?: User;
  post?: Post;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId?: string | null;
  
  // Relations
  category?: Category | null;
  comments?: Comment[];
  likes?: Like[];
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  postId: string;
  userId: string;
  
  // Relations
  post?: Post;
  user?: User;
}

interface User {
  id: string;
  username?: string | null;
  password?: string | null;
  email: string;
  googleId?: string | null;
  image?: string | null;
  createdAt: Date;
  
  // Relations
  comments?: Comment[];
  likes?: Like[];
}

interface Category {
  id: string;
  name: string;
  
  // Relations
  posts?: Post[];
}

interface Admin {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
}

// Composite types with related data
interface PostWithCategory extends Post {
  category: Category;
}

interface PostWithComments extends Post {
  comments: Comment[];
}

interface PostWithLikes extends Post {
  likes: Like[];
}

interface CommentWithUser extends Comment {
  user: User;
}

interface UserWithComments extends User {
  comments: Comment[];
}

export type {
  Like,
  Post,
  Comment,
  User,
  Category,
  Admin,
  PostWithCategory,
  PostWithComments,
  PostWithLikes,
  CommentWithUser,
  UserWithComments,
};


export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  postCount: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  categoryId: string;
  category?: Category;
  authorId: string;
  author?: User;
  published: boolean;
  status: 'published' | 'draft';
  featured: boolean;
  trending: boolean;
  views: number;
  likes: number;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author?: User;
  createdAt: Date;
}

export interface AIPromptRequest {
  prompt: string;
  categoryId: string;
}

export interface AIGeneratedContent {
  title: string;
  content: string;
  excerpt: string;
  suggestedImage: string;
}

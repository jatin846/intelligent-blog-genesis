
import { Category, User, Post, Comment } from '@/types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    description: 'Latest tech trends and innovations',
    color: 'bg-blue-500',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Life tips and personal development',
    color: 'bg-green-500',
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    name: 'Business',
    slug: 'business',
    description: 'Business insights and entrepreneurship',
    color: 'bg-purple-500',
    createdAt: new Date('2024-01-03')
  },
  {
    id: '4',
    name: 'Health',
    slug: 'health',
    description: 'Health and wellness tips',
    color: 'bg-red-500',
    createdAt: new Date('2024-01-04')
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@gmail.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-03')
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in 2024',
    slug: 'future-of-ai-2024',
    content: 'Artificial Intelligence continues to evolve at an unprecedented pace...',
    excerpt: 'Explore the latest AI trends and innovations that will shape our future.',
    featuredImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
    categoryId: '1',
    authorId: '1',
    published: true,
    views: 1250,
    likes: 45,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: '10 Productivity Tips for Remote Workers',
    slug: 'productivity-tips-remote-workers',
    content: 'Working from home has become the new normal for many professionals...',
    excerpt: 'Boost your productivity while working from home with these proven strategies.',
    featuredImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
    categoryId: '2',
    authorId: '2',
    published: true,
    views: 890,
    likes: 32,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '3',
    title: 'Building a Successful Startup: Lessons Learned',
    slug: 'building-successful-startup',
    content: 'Starting a business is one of the most challenging yet rewarding experiences...',
    excerpt: 'Key insights and lessons from successful entrepreneurs.',
    featuredImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    categoryId: '3',
    authorId: '1',
    published: true,
    views: 756,
    likes: 28,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    content: 'Great article! Very insightful.',
    postId: '1',
    authorId: '2',
    createdAt: new Date('2024-01-16')
  },
  {
    id: '2',
    content: 'Thanks for sharing these tips!',
    postId: '2',
    authorId: '3',
    createdAt: new Date('2024-01-13')
  }
];

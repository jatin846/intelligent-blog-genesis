
import { Category, User, Post, Comment } from '@/types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    description: 'Latest tech trends and innovations',
    color: 'bg-blue-500',
    postCount: 8,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Life tips and personal development',
    color: 'bg-green-500',
    postCount: 5,
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    name: 'Business',
    slug: 'business',
    description: 'Business insights and entrepreneurship',
    color: 'bg-purple-500',
    postCount: 3,
    createdAt: new Date('2024-01-03')
  },
  {
    id: '4',
    name: 'Health',
    slug: 'health',
    description: 'Health and wellness tips',
    color: 'bg-red-500',
    postCount: 2,
    createdAt: new Date('2024-01-04')
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@gmail.com',
    role: 'admin',
    bio: 'Passionate about creating amazing content with AI technology.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    bio: 'Tech enthusiast and blogger who loves exploring new technologies.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    bio: 'Lifestyle blogger and wellness coach.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-03')
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in 2024',
    slug: 'future-of-ai-2024',
    content: 'Artificial Intelligence continues to evolve at an unprecedented pace. From machine learning breakthroughs to revolutionary applications in healthcare, finance, and education, AI is reshaping how we live and work. This comprehensive guide explores the latest trends, emerging technologies, and predictions for AI development in 2024 and beyond.\n\nKey areas of growth include natural language processing, computer vision, and autonomous systems. Companies are investing heavily in AI research, leading to more sophisticated and accessible AI tools for businesses and consumers alike.',
    excerpt: 'Explore the latest AI trends and innovations that will shape our future.',
    featuredImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
    categoryId: '1',
    authorId: '1',
    published: true,
    status: 'published',
    featured: true,
    views: 1250,
    likes: 45,
    comments: 12,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: '10 Productivity Tips for Remote Workers',
    slug: 'productivity-tips-remote-workers',
    content: 'Working from home has become the new normal for many professionals. While remote work offers flexibility and comfort, it also presents unique challenges that can impact productivity. Here are ten proven strategies to help you stay focused, motivated, and efficient while working from home.\n\n1. Create a dedicated workspace\n2. Establish a routine\n3. Use time-blocking techniques\n4. Minimize distractions\n5. Take regular breaks\n6. Communicate effectively with your team\n7. Use productivity tools and apps\n8. Set boundaries between work and personal life\n9. Stay physically active\n10. Continuously evaluate and adjust your approach',
    excerpt: 'Boost your productivity while working from home with these proven strategies.',
    featuredImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
    categoryId: '2',
    authorId: '2',
    published: true,
    status: 'published',
    featured: false,
    views: 890,
    likes: 32,
    comments: 8,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '3',
    title: 'Building a Successful Startup: Lessons Learned',
    slug: 'building-successful-startup',
    content: 'Starting a business is one of the most challenging yet rewarding experiences an entrepreneur can undertake. Through countless hours of research, planning, and execution, successful founders have learned valuable lessons that can guide aspiring entrepreneurs.\n\nThis article shares insights from seasoned entrepreneurs who have built successful companies from the ground up. From identifying market opportunities to scaling operations, these lessons provide a roadmap for startup success.',
    excerpt: 'Key insights and lessons from successful entrepreneurs.',
    featuredImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    categoryId: '3',
    authorId: '1',
    published: true,
    status: 'published',
    featured: true,
    views: 756,
    likes: 28,
    comments: 6,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '4',
    title: 'The Complete Guide to Healthy Living',
    slug: 'complete-guide-healthy-living',
    content: 'Living a healthy lifestyle is more than just eating right and exercising regularly. It encompasses physical, mental, and emotional well-being. This comprehensive guide provides actionable tips and strategies for achieving optimal health and maintaining it long-term.',
    excerpt: 'Your ultimate guide to achieving and maintaining optimal health.',
    featuredImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    categoryId: '4',
    authorId: '3',
    published: true,
    status: 'published',
    featured: false,
    views: 623,
    likes: 19,
    comments: 4,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '5',
    title: 'Draft: Upcoming Tech Trends',
    slug: 'upcoming-tech-trends-draft',
    content: 'This is a draft post about upcoming technology trends...',
    excerpt: 'A preview of the latest technology trends coming in 2024.',
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    categoryId: '1',
    authorId: '1',
    published: false,
    status: 'draft',
    featured: false,
    views: 0,
    likes: 0,
    comments: 0,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
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

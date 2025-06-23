
import { supabase } from '@/integrations/supabase/client';
import { Category, Post, User, Comment } from '@/types';

export const databaseService = {
  // Categories
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      color: cat.color,
      postCount: 0, // Will be calculated separately
      createdAt: new Date(cat.created_at)
    }));
  },

  // Posts
  async getPosts(): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories(id, name, slug, color),
        profiles(id, name, email, avatar)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      featuredImage: post.featured_image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      categoryId: post.category_id,
      category: post.categories ? {
        id: post.categories.id,
        name: post.categories.name,
        slug: post.categories.slug,
        description: '',
        color: post.categories.color,
        postCount: 0,
        createdAt: new Date()
      } : undefined,
      authorId: post.author_id,
      author: post.profiles ? {
        id: post.profiles.id,
        name: post.profiles.name,
        email: post.profiles.email,
        avatar: post.profiles.avatar,
        bio: '',
        role: 'user' as const,
        createdAt: new Date()
      } : undefined,
      published: post.published,
      status: post.status as 'published' | 'draft',
      featured: post.featured,
      trending: post.trending,
      views: post.views,
      likes: post.likes,
      comments: 0, // Will be calculated separately
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at)
    }));
  },

  async getFeaturedPosts(): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories(id, name, slug, color),
        profiles(id, name, email, avatar)
      `)
      .eq('published', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3);
    
    if (error) {
      console.error('Error fetching featured posts:', error);
      return [];
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      featuredImage: post.featured_image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      categoryId: post.category_id,
      category: post.categories ? {
        id: post.categories.id,
        name: post.categories.name,
        slug: post.categories.slug,
        description: '',
        color: post.categories.color,
        postCount: 0,
        createdAt: new Date()
      } : undefined,
      authorId: post.author_id,
      author: post.profiles ? {
        id: post.profiles.id,
        name: post.profiles.name,
        email: post.profiles.email,
        avatar: post.profiles.avatar,
        bio: '',
        role: 'user' as const,
        createdAt: new Date()
      } : undefined,
      published: post.published,
      status: post.status as 'published' | 'draft',
      featured: post.featured,
      trending: post.trending,
      views: post.views,
      likes: post.likes,
      comments: 0,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at)
    }));
  },

  async getTrendingPosts(): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories(id, name, slug, color),
        profiles(id, name, email, avatar)
      `)
      .eq('published', true)
      .eq('trending', true)
      .order('views', { ascending: false })
      .limit(6);
    
    if (error) {
      console.error('Error fetching trending posts:', error);
      return [];
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      featuredImage: post.featured_image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      categoryId: post.category_id,
      category: post.categories ? {
        id: post.categories.id,
        name: post.categories.name,
        slug: post.categories.slug,
        description: '',
        color: post.categories.color,
        postCount: 0,
        createdAt: new Date()
      } : undefined,
      authorId: post.author_id,
      author: post.profiles ? {
        id: post.profiles.id,
        name: post.profiles.name,
        email: post.profiles.email,
        avatar: post.profiles.avatar,
        bio: '',
        role: 'user' as const,
        createdAt: new Date()
      } : undefined,
      published: post.published,
      status: post.status as 'published' | 'draft',
      featured: post.featured,
      trending: post.trending,
      views: post.views,
      likes: post.likes,
      comments: 0,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at)
    }));
  },

  async getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories(id, name, slug, color),
        profiles(id, name, email, avatar)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single();
    
    if (error) {
      console.error('Error fetching post:', error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt || '',
      featuredImage: data.featured_image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      categoryId: data.category_id,
      category: data.categories ? {
        id: data.categories.id,
        name: data.categories.name,
        slug: data.categories.slug,
        description: '',
        color: data.categories.color,
        postCount: 0,
        createdAt: new Date()
      } : undefined,
      authorId: data.author_id,
      author: data.profiles ? {
        id: data.profiles.id,
        name: data.profiles.name,
        email: data.profiles.email,
        avatar: data.profiles.avatar,
        bio: '',
        role: 'user' as const,
        createdAt: new Date()
      } : undefined,
      published: data.published,
      status: data.status as 'published' | 'draft',
      featured: data.featured,
      trending: data.trending,
      views: data.views,
      likes: data.likes,
      comments: 0,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  },

  async incrementPostViews(slug: string): Promise<void> {
    const { error } = await supabase.rpc('increment_post_views', { post_slug: slug });
    if (error) {
      console.error('Error incrementing post views:', error);
    }
  }
};

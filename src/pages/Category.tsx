
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PostCard } from '@/components/PostCard';
import { Badge } from '@/components/ui/badge';
import { Folder } from 'lucide-react';
import { databaseService } from '@/lib/database';
import type { Category as CategoryType, Post } from '@/types';

const Category = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, postsData] = await Promise.all([
          databaseService.getCategories(),
          databaseService.getPosts()
        ]);
        
        const foundCategory = categoriesData.find(c => c.slug === slug);
        const categoryPosts = postsData.filter(post => 
          post.categoryId === foundCategory?.id && post.status === 'published'
        );
        
        setCategory(foundCategory || null);
        setPosts(categoryPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className={`w-20 h-20 rounded-full ${category.color} flex items-center justify-center mx-auto mb-6`}>
            <Folder className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {category.description}
          </p>
          <Badge className={`${category.color} text-white text-lg px-4 py-2`}>
            {posts.length} posts
          </Badge>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Check back later for new content in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;


import { useParams } from 'react-router-dom';
import { mockCategories, mockPosts } from '@/lib/mockData';
import { PostCard } from '@/components/PostCard';
import { Badge } from '@/components/ui/badge';
import { Folder } from 'lucide-react';

const Category = () => {
  const { slug } = useParams();
  const category = mockCategories.find(c => c.slug === slug);
  const categoryPosts = mockPosts.filter(post => 
    post.categoryId === category?.id && post.status === 'published'
  );

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
            {categoryPosts.length} posts
          </Badge>
        </div>

        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryPosts.map((post) => (
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

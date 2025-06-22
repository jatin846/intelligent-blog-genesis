
import { Link } from 'react-router-dom';
import { Heart, Eye, Calendar, User } from 'lucide-react';
import { Post, Category, User as UserType } from '@/types';
import { mockCategories, mockUsers } from '@/lib/mockData';
import { Card, CardContent } from './ui/card';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const category = mockCategories.find(c => c.id === post.categoryId);
  const author = mockUsers.find(u => u.id === post.authorId);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white">
      <div className="relative overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {category && (
          <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white rounded-full ${category.color}`}>
            {category.name}
          </span>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          {author && (
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{author.name}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{post.createdAt.toLocaleDateString()}</span>
          </div>
        </div>

        <Link to={`/post/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link
            to={`/post/${post.slug}`}
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Read More →
          </Link>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

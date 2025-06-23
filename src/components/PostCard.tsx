
import { Link } from 'react-router-dom';
import { Heart, Eye, Calendar, User, Flame, Star } from 'lucide-react';
import { Post } from '@/types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface PostCardProps {
  post: Post;
  featured?: boolean;
  showTrendingBadge?: boolean;
}

export function PostCard({ post, featured = false, showTrendingBadge = false }: PostCardProps) {
  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white border border-gray-100 hover:border-gray-200 ${
      featured ? 'h-full' : ''
    }`}>
      <div className="relative overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            featured ? 'h-64 md:h-80' : 'h-48'
          }`}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {post.category && (
            <Badge className={`${post.category.color} text-white border-0 text-xs font-medium`}>
              {post.category.name}
            </Badge>
          )}
          {post.featured && (
            <Badge className="bg-yellow-500 text-white border-0 text-xs font-medium">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Featured
            </Badge>
          )}
          {(showTrendingBadge || post.trending) && (
            <Badge className="bg-orange-500 text-white border-0 text-xs font-medium">
              <Flame className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className={`p-6 ${featured ? 'md:p-8' : ''}`}>
        {/* Author and Date */}
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          {post.author && (
            <div className="flex items-center space-x-2">
              {post.author.avatar ? (
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
              <span className="font-medium text-gray-700">{post.author.name}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{post.createdAt.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/post/${post.slug}`}>
          <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight ${
            featured ? 'text-2xl md:text-3xl mb-4' : 'text-lg'
          }`}>
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className={`text-gray-600 mb-4 leading-relaxed ${
          featured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'
        }`}>
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link
            to={`/post/${post.slug}`}
            className="text-gray-900 font-medium hover:text-blue-600 transition-colors text-sm"
          >
            Read more →
          </Link>
          
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{post.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

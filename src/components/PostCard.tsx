
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
    <Card className={`group hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white border-0 shadow-lg ${
      featured ? 'h-full' : ''
    }`}>
      <div className="relative overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
            featured ? 'h-64 md:h-80' : 'h-48'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {post.category && (
            <Badge className={`${post.category.color} text-white border-0 shadow-lg`}>
              {post.category.name}
            </Badge>
          )}
          {post.featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Featured
            </Badge>
          )}
          {(showTrendingBadge || post.trending) && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
              <Flame className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className={`p-6 ${featured ? 'md:p-8' : ''}`}>
        {/* Author and Date */}
        <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
          {post.author && (
            <div className="flex items-center space-x-2">
              {post.author.avatar ? (
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
              <span className="font-medium">{post.author.name}</span>
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
          <h3 className={`font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight ${
            featured ? 'text-2xl md:text-3xl mb-4' : 'text-xl'
          }`}>
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className={`text-slate-600 mb-6 leading-relaxed ${
          featured ? 'text-lg line-clamp-4' : 'line-clamp-3'
        }`}>
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Link
            to={`/post/${post.slug}`}
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group/link"
          >
            Read More 
            <span className="ml-1 group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>
          
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


import { useParams } from 'react-router-dom';
import { Calendar, User, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { mockPosts, mockCategories, mockUsers } from '@/lib/mockData';

const PostDetail = () => {
  const { slug } = useParams();
  const post = mockPosts.find(p => p.slug === slug);
  const category = post ? mockCategories.find(c => c.id === post.categoryId) : null;
  const author = post ? mockUsers.find(u => u.id === post.authorId) : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600">The post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          {category && (
            <Badge className={`${category.color} text-white mb-4`}>
              {category.name}
            </Badge>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center space-x-6">
              {author && (
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">{author.name}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{post.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
            {post.excerpt}
          </div>
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {post.content}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-8 mb-12">
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Like ({post.likes})</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-6">Comments ({post.comments})</h3>
            <div className="space-y-6">
              <div>
                <Textarea 
                  placeholder="Write a comment..." 
                  className="mb-4"
                  rows={4}
                />
                <Button>Post Comment</Button>
              </div>
              
              {/* Sample Comments */}
              <div className="space-y-4 border-t pt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">John Doe</span>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-gray-700">Great article! Very informative and well-written.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Jane Smith</span>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                  <p className="text-gray-700">Thanks for sharing this. Looking forward to more content like this!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  );
};

export default PostDetail;

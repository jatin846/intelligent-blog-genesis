
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  FileText, 
  FolderOpen, 
  TrendingUp, 
  Eye, 
  Heart,
  MessageCircle,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockPosts, mockUsers, mockCategories } from '@/lib/mockData';
import { siteConfig } from '@/config/site';

const AdminDashboard = () => {
  const totalPosts = mockPosts.length;
  const publishedPosts = mockPosts.filter(p => p.status === 'published').length;
  const draftPosts = mockPosts.filter(p => p.status === 'draft').length;
  const totalUsers = mockUsers.length;
  const totalCategories = mockCategories.length;
  const totalViews = mockPosts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = mockPosts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = mockPosts.reduce((sum, post) => sum + post.comments, 0);

  const recentPosts = mockPosts.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">Welcome back! Here's what's happening with {siteConfig.name}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link to="/admin/posts/create">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-blue-300 hover:border-blue-500">
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <Plus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold text-blue-600">Create AI Post</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/admin/categories">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <FolderOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-semibold text-purple-600">Manage Categories</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/admin/posts">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-600">All Posts</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/admin/users">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="font-semibold text-orange-600">Manage Users</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                {publishedPosts} published, {draftPosts} drafts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across all posts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLikes.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Community engagement
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalComments.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Active discussions
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Posts
              </CardTitle>
              <CardDescription>Latest posts in your blog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-1">{post.title}</h4>
                      <p className="text-sm text-gray-500">{post.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Eye className="w-3 h-3" />
                        {post.views}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Quick Overview
              </CardTitle>
              <CardDescription>Key metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Users</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{totalUsers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">Categories</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">{totalCategories}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Published Posts</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{publishedPosts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    <span className="font-medium">Avg. Views/Post</span>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">
                    {Math.round(totalViews / totalPosts)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

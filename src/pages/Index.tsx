
import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, TrendingUp, Calendar, Eye, Star, ArrowRight, Flame, BookOpen } from 'lucide-react';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/config/site';
import { databaseService } from '@/lib/database';
import { Category, Post } from '@/types';
import { Link } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData, featuredData, trendingData] = await Promise.all([
          databaseService.getPosts(),
          databaseService.getCategories(),
          databaseService.getFeaturedPosts(),
          databaseService.getTrendingPosts()
        ]);

        setPosts(postsData);
        setCategories(categoriesData);
        setFeaturedPosts(featuredData);
        setTrendingPosts(trendingData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.categoryId === selectedCategory;
      return matchesSearch && matchesCategory && post.status === 'published';
    });

    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => b.views - a.views);
      case 'liked':
        return filtered.sort((a, b) => b.likes - a.likes);
      case 'oldest':
        return filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      default:
        return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
  }, [searchQuery, selectedCategory, sortBy, posts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-blue-600 mb-6 shadow-lg">
              <Star className="w-4 h-4 fill-current" />
              Welcome to the Future of Blogging
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              {siteConfig.name}
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Discover extraordinary stories, insights, and ideas that shape tomorrow. Join our community of curious minds and passionate creators.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                <Input
                  type="text"
                  placeholder="Search for amazing stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-16 pr-6 py-6 text-lg rounded-2xl border-0 bg-white/95 backdrop-blur-sm shadow-xl focus:shadow-2xl transition-all ring-2 ring-transparent focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Stories
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-slate-300 hover:border-blue-500 rounded-xl px-8 py-6 text-lg font-semibold bg-white/80 backdrop-blur-sm">
                <ArrowRight className="w-5 h-5 mr-2" />
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm border-y border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {posts.length}+
              </div>
              <div className="text-slate-600 font-medium">Amazing Stories</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {categories.length}+
              </div>
              <div className="text-slate-600 font-medium">Categories</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {posts.reduce((sum, post) => sum + post.views, 0)}+
              </div>
              <div className="text-slate-600 font-medium">Total Views</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                AI-Powered
              </div>
              <div className="text-slate-600 font-medium">Content Creation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Star className="w-4 h-4 fill-current" />
                FEATURED
              </div>
              <h2 className="text-5xl font-bold text-slate-900 mb-6">Editor's Choice</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Handpicked stories that deserve your attention
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <div key={post.id} className={`${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <PostCard post={post} featured={index === 0} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">Explore by Topic</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Dive deep into subjects that matter to you
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <div className={`${category.color} hover:scale-105 transition-all duration-300 rounded-2xl p-6 text-center cursor-pointer shadow-lg hover:shadow-xl`}>
                  <div className="text-white">
                    <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{posts.filter(p => p.categoryId === category.id).length} posts</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Posts */}
      {trendingPosts.length > 0 && (
        <section className="py-20 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Flame className="w-4 h-4" />
                TRENDING NOW
              </div>
              <h2 className="text-5xl font-bold text-slate-900 mb-6">What's Hot</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                The most popular stories everyone's talking about
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingPosts.map((post) => (
                <PostCard key={post.id} post={post} showTrendingBadge />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">All Stories</h2>
            <p className="text-xl text-slate-600">Discover more amazing content</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 rounded-xl border-slate-200 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 rounded-xl border-slate-200">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 rounded-xl border-slate-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Latest
                    </div>
                  </SelectItem>
                  <SelectItem value="popular">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      Most Popular
                    </div>
                  </SelectItem>
                  <SelectItem value="liked">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Most Liked
                    </div>
                  </SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Posts Grid */}
          {filteredAndSortedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">📚</div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">No stories found</h3>
              <p className="text-xl text-slate-600 mb-8">Try adjusting your search or browse our categories</p>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-8 py-4">
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;

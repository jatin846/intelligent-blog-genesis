
import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, TrendingUp, Calendar, Eye, Star, ArrowRight, Flame, BookOpen, Users, Award, Zap, ChevronRight } from 'lucide-react';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-2 border-gray-900 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gray-900 text-white mb-6 px-4 py-2 text-sm font-medium">
              Welcome to {siteConfig.name}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Discover Amazing<br />
              <span className="text-gray-600">Stories & Ideas</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of readers exploring insightful articles, trending topics, and expert perspectives on technology, lifestyle, business, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium">
                <BookOpen className="w-5 h-5 mr-2" />
                Start Reading
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 hover:border-gray-900 px-8 py-4 text-lg font-medium">
                Browse Categories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">{posts.length}+</div>
              <div className="text-gray-600 font-medium">Articles</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">{categories.length}+</div>
              <div className="text-gray-600 font-medium">Categories</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {Math.round(posts.reduce((sum, post) => sum + post.views, 0) / 1000)}K+
              </div>
              <div className="text-gray-600 font-medium">Readers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">100%</div>
              <div className="text-gray-600 font-medium">Quality Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Stories</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Handpicked articles that showcase the best of our content
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Topics</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover content organized by your interests
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">
                      {posts.filter(p => p.categoryId === category.id).length} articles
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Posts */}
      {trendingPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Flame className="w-4 h-4" />
                Trending Now
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular This Week</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The most-read articles by our community
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Readers Love Us</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We deliver high-quality content that informs, inspires, and engages
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Authors</h3>
              <p className="text-gray-300">Content written by industry experts and thought leaders</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fresh Content</h3>
              <p className="text-gray-300">New articles published regularly to keep you informed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community Driven</h3>
              <p className="text-gray-300">Join thousands of readers in meaningful discussions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get the latest articles and insights delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 border-gray-200 focus:border-gray-900 focus:ring-gray-900"
            />
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* All Posts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-lg text-gray-600">Discover more amazing content</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12 bg-gray-50 rounded-xl p-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border-gray-200">
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
                <SelectTrigger className="w-48 border-gray-200">
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
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
              <p className="text-lg text-gray-600 mb-8">Try adjusting your search or browse our categories</p>
              <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4">
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

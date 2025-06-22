
import { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, Calendar, Eye } from 'lucide-react';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockPosts, mockCategories } from '@/lib/mockData';
import { siteConfig } from '@/config/site';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = mockPosts.filter(post => {
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
  }, [searchQuery, selectedCategory, sortBy]);

  const featuredPosts = mockPosts.filter(post => post.featured && post.status === 'published').slice(0, 3);
  const trendingPosts = mockPosts.filter(post => post.status === 'published').sort((a, b) => b.views - a.views).slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Welcome to {siteConfig.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            {siteConfig.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search amazing posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-full border-0 bg-white/95 backdrop-blur-sm shadow-lg focus:shadow-xl transition-all"
              />
            </div>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8 py-4 font-semibold">
              Explore Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">{mockPosts.length}+</div>
              <div className="text-gray-600">Amazing Posts</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">{mockCategories.length}+</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">10K+</div>
              <div className="text-gray-600">Happy Readers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">AI-Powered</div>
              <div className="text-gray-600">Content Creation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Posts</h2>
              <p className="text-xl text-gray-600">Handpicked content just for you</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-xl text-gray-600">Discover content by topic</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {mockCategories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "secondary"}
                className={`cursor-pointer px-6 py-3 text-sm font-medium transition-all hover:scale-105 ${
                  selectedCategory === category.id 
                    ? `${category.color} text-white` 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-white shadow-sm border-gray-200"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-white shadow-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-white shadow-sm">
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
                      Most Viewed
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredAndSortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredAndSortedPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Trending Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Now</h2>
            <p className="text-xl text-gray-600">Most popular posts this week</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

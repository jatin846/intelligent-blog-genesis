
import { siteConfig } from '@/config/site';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, Zap, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 mb-6">
            About Us
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to {siteConfig.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing content creation with the power of artificial intelligence. 
            Our platform combines cutting-edge technology with human creativity to deliver 
            exceptional blog content that engages and inspires.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">AI-Powered</h3>
              <p className="text-gray-600">
                Advanced AI creates high-quality, engaging content automatically
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600">
                Generate complete blog posts in seconds, not hours
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Precision</h3>
              <p className="text-gray-600">
                Targeted content that matches your exact requirements
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Community</h3>
              <p className="text-gray-600">
                Join thousands of content creators using our platform
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission Section */}
        <Card className="mb-16">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At {siteConfig.name}, we believe that everyone deserves access to high-quality content creation tools. 
              Our mission is to democratize content creation by making it faster, easier, and more accessible than ever before. 
              Whether you're a blogger, marketer, or business owner, our AI-powered platform helps you create compelling content 
              that resonates with your audience and drives results.
            </p>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-blue-600">10,000+</div>
            <div className="text-gray-600">Posts Generated</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-purple-600">5,000+</div>
            <div className="text-gray-600">Happy Users</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-green-600">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

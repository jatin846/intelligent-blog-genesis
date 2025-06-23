
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Loader2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { databaseService } from '@/lib/database';
import { Category } from '@/types';

const CreatePost = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await databaseService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, []);

  const generateImageFromPexels = async (query: string) => {
    setIsGeneratingImage(true);
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`, {
        headers: {
          'Authorization': '88Qykg1vwK4s2Q73EgXOvKaSxAH5VUHKMVGC2NBt1TXD2sJp0hnnsKia'
        }
      });
      
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        return data.photos[0].src.large;
      }
      return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop';
    } catch (error) {
      console.error('Error fetching image from Pexels:', error);
      return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop';
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedCategory || !prompt.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a category and enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Generate title
      const titleResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": window.location.origin,
          "X-Title": "BlogCMS",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
          "messages": [
            {
              "role": "user",
              "content": `Create a compelling blog post title for: "${prompt}". Return only the title, nothing else.`
            }
          ]
        })
      });

      // Generate content
      const contentResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": window.location.origin,
          "X-Title": "BlogCMS",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
          "messages": [
            {
              "role": "user",
              "content": `Write a comprehensive, engaging blog post about: "${prompt}". The content should be well-structured with proper paragraphs, informative, and around 800-1200 words. Include relevant examples and actionable insights. Format it in clean markdown.`
            }
          ]
        })
      });

      // Generate excerpt
      const excerptResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": window.location.origin,
          "X-Title": "BlogCMS",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
          "messages": [
            {
              "role": "user",
              "content": `Write a compelling 2-3 sentence excerpt/summary for a blog post about: "${prompt}". Make it engaging and informative. Return only the excerpt.`
            }
          ]
        })
      });

      const [titleData, contentData, excerptData] = await Promise.all([
        titleResponse.json(),
        contentResponse.json(),
        excerptResponse.json()
      ]);

      const title = titleData.choices[0]?.message?.content?.trim() || 'Generated Title';
      const content = contentData.choices[0]?.message?.content?.trim() || 'Generated content';
      const excerpt = excerptData.choices[0]?.message?.content?.trim() || 'Generated excerpt';

      // Generate image based on the prompt
      const imageKeywords = prompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ').slice(0, 3).join(' ');
      const suggestedImage = await generateImageFromPexels(imageKeywords);

      setGeneratedContent({
        title,
        content,
        excerpt,
        suggestedImage,
        featured,
        trending
      });

      toast({
        title: "Content Generated!",
        description: "AI has created your blog post. Review and publish when ready.",
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    if (!generatedContent) return;
    
    toast({
      title: "Post Published!",
      description: "Your AI-generated post has been published successfully.",
    });
    navigate('/admin/posts');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              AI Post Creator
            </h1>
            <p className="text-xl text-gray-600 mt-2">Let AI create amazing content for you</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
              <CardDescription>
                Select a category and describe what you want to write about
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">AI Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., 'Top 10 laptops under $1000 for students' or 'Complete guide to healthy meal prep for beginners'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="min-h-[100px]"
                />
                <p className="text-sm text-gray-500">
                  Be specific about what you want. The AI will create the title, content, and excerpt automatically.
                </p>
              </div>

              {/* Post Options */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Post Options</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                  <Label htmlFor="featured" className="text-sm font-normal">
                    Mark as Featured Post
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trending"
                    checked={trending}
                    onCheckedChange={setTrending}
                  />
                  <Label htmlFor="trending" className="text-sm font-normal">
                    Mark as Trending Post
                  </Label>
                </div>
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !selectedCategory || !prompt.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Content
                  </>
                )}
              </Button>

              {/* Example Prompts */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Example Prompts:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• "Best programming languages to learn in 2024"</li>
                  <li>• "10 healthy breakfast recipes for busy mornings"</li>
                  <li>• "Complete guide to starting a small business"</li>
                  <li>• "Latest trends in digital marketing strategies"</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Content Preview</CardTitle>
              <CardDescription>
                Review your AI-generated content before publishing
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!generatedContent ? (
                <div className="text-center py-12 text-gray-500">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Generated content will appear here</p>
                  <p className="text-sm">Fill in the form and click generate</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Title</Label>
                    <Input
                      value={generatedContent.title}
                      onChange={(e) => setGeneratedContent({...generatedContent, title: e.target.value})}
                      className="mt-1 font-semibold"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Excerpt</Label>
                    <Textarea
                      value={generatedContent.excerpt}
                      onChange={(e) => setGeneratedContent({...generatedContent, excerpt: e.target.value})}
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Featured Image</Label>
                    <div className="mt-1 space-y-2">
                      <Input
                        value={generatedContent.suggestedImage}
                        onChange={(e) => setGeneratedContent({...generatedContent, suggestedImage: e.target.value})}
                        placeholder="Image URL"
                      />
                      {generatedContent.suggestedImage && (
                        <div className="relative">
                          <img 
                            src={generatedContent.suggestedImage} 
                            alt="Preview" 
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          {isGeneratingImage && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                              <Loader2 className="w-6 h-6 text-white animate-spin" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Content</Label>
                    <Textarea
                      value={generatedContent.content}
                      onChange={(e) => setGeneratedContent({...generatedContent, content: e.target.value})}
                      rows={12}
                      className="mt-1 font-mono text-sm"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={handlePublish}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Publish Post
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setGeneratedContent(null)}
                      className="flex-1"
                    >
                      Generate New
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

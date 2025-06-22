
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { mockCategories } from '@/lib/mockData';
import { AIService } from '@/lib/aiService';

const CreatePost = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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
      const content = await AIService.generateBlogPost({ prompt, categoryId: selectedCategory });
      setGeneratedContent(content);
      toast({
        title: "Content Generated!",
        description: "AI has created your blog post. Review and publish when ready.",
      });
    } catch (error) {
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
    
    // Here you would normally save to your database
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
                    {mockCategories.map((category) => (
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
                    <Label className="text-sm font-medium text-gray-700">Featured Image URL</Label>
                    <Input
                      value={generatedContent.suggestedImage}
                      onChange={(e) => setGeneratedContent({...generatedContent, suggestedImage: e.target.value})}
                      className="mt-1"
                    />
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

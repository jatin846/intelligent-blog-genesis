
import { siteConfig } from '@/config/site';
import { AIPromptRequest, AIGeneratedContent } from '@/types';

export class AIService {
  private static async callOpenRouter(prompt: string): Promise<string> {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${siteConfig.openRouterApiKey}`,
          "HTTP-Referer": siteConfig.url,
          "X-Title": siteConfig.name,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
          "messages": [
            {
              "role": "user",
              "content": prompt
            }
          ]
        })
      });

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI content');
    }
  }

  static async generateBlogPost(request: AIPromptRequest): Promise<AIGeneratedContent> {
    const titlePrompt = `Create a compelling blog post title for: "${request.prompt}". Return only the title, nothing else.`;
    
    const contentPrompt = `Write a comprehensive, engaging blog post about: "${request.prompt}". 
    The content should be well-structured with proper paragraphs, informative, and around 800-1200 words. 
    Include relevant examples and actionable insights. Format it in clean markdown.`;
    
    const excerptPrompt = `Write a compelling 2-3 sentence excerpt/summary for a blog post about: "${request.prompt}". 
    Make it engaging and informative. Return only the excerpt.`;

    try {
      const [title, content, excerpt] = await Promise.all([
        this.callOpenRouter(titlePrompt),
        this.callOpenRouter(contentPrompt),
        this.callOpenRouter(excerptPrompt)
      ]);

      // Generate a suggested image URL based on the topic
      const imageKeywords = request.prompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ').slice(0, 3).join('-');
      const suggestedImage = `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop&q=${imageKeywords}`;

      return {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim(),
        suggestedImage
      };
    } catch (error) {
      console.error('Error generating AI content:', error);
      throw error;
    }
  }
}

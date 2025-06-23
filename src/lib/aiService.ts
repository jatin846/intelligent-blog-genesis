
import { AIPromptRequest, AIGeneratedContent } from '@/types';

export class AIService {
  private static async callOpenRouter(prompt: string): Promise<string> {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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

  private static async generateImageFromPexels(query: string): Promise<string> {
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

      // Generate image based on the prompt keywords
      const imageKeywords = request.prompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ').slice(0, 3).join(' ');
      const suggestedImage = await this.generateImageFromPexels(imageKeywords);

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

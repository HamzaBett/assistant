import { AIProvider } from './provider';

export class GeminiProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateContent(prompt: string): Promise<string> {
    // Placeholder for Gemini API call
    console.log(`Generating content with Gemini for prompt: ${prompt}`);
    return Promise.resolve('This is a response from Gemini.');
  }
}

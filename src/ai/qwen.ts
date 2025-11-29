import { AIProvider } from './provider';

export class QwenProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateContent(prompt: string): Promise<string> {
    // Placeholder for Qwen API call
    console.log(`Generating content with Qwen for prompt: ${prompt}`);
    return Promise.resolve('This is a response from Qwen.');
  }
}

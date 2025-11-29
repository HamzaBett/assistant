import { AIProvider } from './provider';
import { QwenProvider } from './qwen';
import { GeminiProvider } from './gemini';

export class AIProviderFactory {
  static createProvider(provider: string, apiKey: string): AIProvider {
    switch (provider) {
      case 'qwen':
        return new QwenProvider(apiKey);
      case 'gemini':
        return new GeminiProvider(apiKey);
      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  }
}

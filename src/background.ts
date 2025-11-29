import * as CryptoJS from 'crypto-js';
import { AIProviderFactory } from './ai/factory';

// IMPORTANT: In a real extension, this key should be managed more securely.
const ENCRYPTION_KEY = 'your-super-secret-key';

function decryptData(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('AI Assistant extension installed.');
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generate_content') {
    chrome.storage.local.get('qwenApiKey', (data) => {
      if (data.qwenApiKey) {
        const decryptedApiKey = decryptData(data.qwenApiKey as string);
        const provider = AIProviderFactory.createProvider('qwen', decryptedApiKey);
        provider.generateContent(request.prompt).then((content) => {
          sendResponse({ content });
        });
      } else {
        sendResponse({ content: 'API key not found.' });
      }
    });
    return true; // Indicates that the response is sent asynchronously
  }
});

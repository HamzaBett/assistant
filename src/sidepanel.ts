import * as CryptoJS from 'crypto-js';

// IMPORTANT: In a real extension, this key should be managed more securely.
const ENCRYPTION_KEY = 'your-super-secret-key';

import { saveFile, listFiles, deleteFile } from './storage';

function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
}

async function renderFileList() {
  const fileList = document.getElementById('file-list');
  if (!fileList) return;

  fileList.innerHTML = '';
  const files = await listFiles();

  files.forEach((file) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', async () => {
      await deleteFile(file.id);
      renderFileList(); // Re-render the list after deletion
    });

    listItem.appendChild(deleteButton);
    fileList.appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const messageDisplay = document.getElementById('message-display');
  const messageInput = document.getElementById('message-input') as HTMLInputElement;
  const sendButton = document.getElementById('send-button');

  if (sendButton && messageInput && messageDisplay) {
    sendButton.addEventListener('click', () => {
      const message = messageInput.value;
      if (message) {
        const userMessageElement = document.createElement('p');
        userMessageElement.textContent = `You: ${message}`;
        messageDisplay.appendChild(userMessageElement);

        chrome.runtime.sendMessage({ action: 'generate_content', prompt: message }, (response) => {
          const aiMessageElement = document.createElement('p');
          aiMessageElement.textContent = `AI: ${response.content}`;
          messageDisplay.appendChild(aiMessageElement);
        });

        messageInput.value = '';
      }
    });
  }

  const fillFormButton = document.getElementById('fill-form-button');
  if (fillFormButton) {
    fillFormButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].id) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js']
          }, () => {
            chrome.tabs.sendMessage(tabs[0].id!, { action: 'fill_form' }, (response) => {
              console.log(response);
            });
          });
        }
      });
    });
  }

  const settingsForm = document.getElementById('settings-form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const qwenApiKeyInput = document.getElementById('qwen-api-key') as HTMLInputElement;
      const geminiApiKeyInput = document.getElementById('gemini-api-key') as HTMLInputElement;

      if (qwenApiKeyInput && geminiApiKeyInput) {
        const qwenApiKey = qwenApiKeyInput.value;
        const geminiApiKey = geminiApiKeyInput.value;

        if (qwenApiKey) {
          const encryptedQwenKey = encryptData(qwenApiKey);
          chrome.storage.local.set({ qwenApiKey: encryptedQwenKey });
        }

        if (geminiApiKey) {
          const encryptedGeminiKey = encryptData(geminiApiKey);
          chrome.storage.local.set({ geminiApiKey: encryptedGeminiKey });
        }

        alert('API keys saved successfully!');
      }
    });
  }

  const fileInput = document.getElementById('file-input') as HTMLInputElement;
  const saveFileButton = document.getElementById('save-file-button');

  if (saveFileButton && fileInput) {
    saveFileButton.addEventListener('click', async () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = async (event) => {
          if (event.target && typeof event.target.result === 'string') {
            await saveFile(file.name, file.type, event.target.result);
            alert('File saved successfully!');
            renderFileList();
          }
        };
        reader.readAsText(file);
      } else {
        alert('Please select a file to save.');
      }
    });
  }

  renderFileList(); // Initial render of the file list
});

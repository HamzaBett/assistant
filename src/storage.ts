import * as CryptoJS from 'crypto-js';

// IMPORTANT: This key should be managed more securely in a real extension.
const ENCRYPTION_KEY = 'your-super-secret-key-for-files';

interface FileMetadata {
  id: string;
  name: string;
  type: string;
  size: number;
  timestamp: number;
}

interface StoredFile {
  metadata: FileMetadata;
  content: string; // Encrypted content
}

async function encryptFileContent(content: string): Promise<string> {
  return CryptoJS.AES.encrypt(content, ENCRYPTION_KEY).toString();
}

async function decryptFileContent(encryptedContent: string): Promise<string> {
  const bytes = CryptoJS.AES.decrypt(encryptedContent, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export async function saveFile(name: string, type: string, content: string): Promise<FileMetadata> {
  const id = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const timestamp = Date.now();
  const size = new TextEncoder().encode(content).length;

  const encryptedContent = await encryptFileContent(content);

  const metadata: FileMetadata = { id, name, type, size, timestamp };
  const storedFile: StoredFile = { metadata, content: encryptedContent };

  await chrome.storage.local.set({ [id]: storedFile });
  return metadata;
}

export async function getFileContent(id: string): Promise<string | null> {
  const data = await chrome.storage.local.get(id);
  const storedFile: StoredFile = data[id] as StoredFile;

  if (storedFile && storedFile.content) {
    return decryptFileContent(storedFile.content);
  }
  return null;
}

export async function listFiles(): Promise<FileMetadata[]> {
  const allData = await chrome.storage.local.get(null);
  const files: FileMetadata[] = [];
  for (const key in allData) {
    if (key.startsWith('file-')) { // Assuming file IDs start with 'file-'
      const storedFile: StoredFile = allData[key] as StoredFile;
      if (storedFile && storedFile.metadata) {
        files.push(storedFile.metadata);
      }
    }
  }
  return files;
}

export async function deleteFile(id: string): Promise<void> {
  await chrome.storage.local.remove(id);
}

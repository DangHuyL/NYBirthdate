// Simple IndexedDB helper for storing user uploaded images and audio locally

const DB_NAME = 'BirthdaySurpriseDB';
const DB_VERSION = 1;
const STORE_MEDIA = 'media_files';
const STORE_CONFIG = 'user_config';

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_MEDIA)) {
        db.createObjectStore(STORE_MEDIA, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_CONFIG)) {
        db.createObjectStore(STORE_CONFIG, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

export async function saveMediaFile(id, fileData) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_MEDIA, 'readwrite');
      const store = tx.objectStore(STORE_MEDIA);
      const req = store.put({ id, data: fileData, timestamp: Date.now() });
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to save media file to IndexedDB', err);
    return false;
  }
}

export async function getMediaFile(id) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_MEDIA, 'readonly');
      const store = tx.objectStore(STORE_MEDIA);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to get media file from IndexedDB', err);
    return null;
  }
}

export async function saveUserConfig(config) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_CONFIG, 'readwrite');
      const store = tx.objectStore(STORE_CONFIG);
      const req = store.put({ id: 'current_config', config });
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to save user config', err);
    return false;
  }
}

export async function getUserConfig() {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_CONFIG, 'readonly');
      const store = tx.objectStore(STORE_CONFIG);
      const req = store.get('current_config');
      req.onsuccess = () => resolve(req.result ? req.result.config : null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to get user config', err);
    return null;
  }
}

import { openDB } from 'idb';

const DB_NAME    = 'story-app-db';
const STORE_NAME = 'stories';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    }
  });
}

export async function saveStories(stories = []) {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  for (const s of stories) {
    tx.store.put(s);
  }
  await tx.done;
}

export async function getAllStories() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function deleteStory(id) {
  console.log('[DEBUG] deleteStory() menerima ID:', id, typeof id);
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}

import authModel from './authModel.js';
import { saveStories, getAllStories, deleteStory, getDB } from '../../db.js';

export default {
  async fetchStories() {
    const res = await fetch('https://story-api.dicoding.dev/v1/stories', {
      headers: { Authorization: `Bearer ${authModel.getToken()}` }
    });
    if (!res.ok) throw new Error('Fetch gagal');
    const { listStory } = await res.json();
    // await saveStories(listStory);
    return listStory;
  },

  // fallback kalau offline
  async getCachedStories() {
    return await getAllStories();
  },
  async saveStoriesToIDB(stories) {
    await saveStories(stories);
  },
  async removeStory(id) {
    return await deleteStory(id);
  },

    async saveStories(stories) {
    await saveStories(stories);  // fungsi helper dari db.js, simpan array
  },

  async saveStory(story) {
    const db = await getDB();
    const tx = db.transaction('stories', 'readwrite');
    await tx.store.put(story);
    await tx.done;
  }
};

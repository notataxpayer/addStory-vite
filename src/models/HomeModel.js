// import authModel from './authModel.js';

// export default {
//   async fetchStories() {
//     const res = await fetch('https://story-api.dicoding.dev/v1/stories', {
//       headers: {
//         Authorization: `Bearer ${authModel.getToken()}`
//       }
//     });
//     if (!res.ok) throw new Error('Failed to fetch stories');
//     const data = await res.json();
//     return data.listStory;
//   }
// };


import authModel from './authModel.js';
import { saveStories, getAllStories, deleteStory } from '../../db.js';

export default {
  async fetchStories() {
    const res = await fetch('https://story-api.dicoding.dev/v1/stories', {
      headers: { Authorization: `Bearer ${authModel.getToken()}` }
    });
    if (!res.ok) throw new Error('Fetch gagal');
    const { listStory } = await res.json();
    // simpan ke IndexedDB untuk offline
    await saveStories(listStory);
    return listStory;
  },

  // fallback kalau offline
  async getCachedStories() {
    return await getAllStories();
  },

  async removeStory(id) {
    return await deleteStory(id);
  }
};

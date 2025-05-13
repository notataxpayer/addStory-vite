import authModel from './authModel.js';

export default {
  async fetchStories() {
    const res = await fetch('https://story-api.dicoding.dev/v1/stories', {
      headers: {
        Authorization: `Bearer ${authModel.getToken()}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch stories');
    const data = await res.json();
    return data.listStory;
  }
};

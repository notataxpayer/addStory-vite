import authModel from '../models/authModel.js';
import homeView from '../views/HomeView.js';

export default {
  async loadStories() {
    try {
      const res = await fetch('https://story-api.dicoding.dev/v1/stories', {
        headers: { Authorization: `Bearer ${authModel.getToken()}` }
      });
      const data = await res.json();
      homeView.renderStories(data.listStory);
    } catch (error) {
      alert('Failed to load stories');
    }
  }
};

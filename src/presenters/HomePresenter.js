
import homeView from '../views/HomeView.js';
import homeModel from '../models/HomeModel.js';

export default {
  async loadStories() {
    try {
      const stories = await homeModel.fetchStories();
      homeView.renderStories(stories);
    } catch (error) {
      alert('Failed to load stories');
    }
  }
};

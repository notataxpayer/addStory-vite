import homeModel from '../models/HomeModel.js';
import offlineView from '../views/OfflineStoriesView.js';

export default {
  async loadOfflineStories() {
    const stories = await homeModel.getCachedStories();
    offlineView.renderOfflineStories(stories);
  },
  
  async deleteStory(id) {
    await homeModel.removeStory(id);
  }
};

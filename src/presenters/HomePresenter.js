import homeView from '../views/HomeView.js';
import homeModel from '../models/HomeModel.js';
import notificationModel from '../models/notificationModel.js';

export default {
  storieslocal: [],
  async loadStories() {
    let stories;
    try {
      stories = await homeModel.fetchStories();
    } catch (err) {
      stories = await homeModel.getCachedStories();
    }
    this.storieslocal = stories;
    homeView.renderStories(stories);
  },
  
  async saveAllStory() {
    if (!this.storieslocal.length) return;
    await homeModel.saveStoriesToIDB(this.storieslocal);
    alert('Semua story berhasil disimpan ke IndexedDB');
  },
  async saveStory(story) {
    if (!story) return;
    await homeModel.saveStory(story);
    alert(`Story "${story.name}" berhasil disimpan.`);
  },
  async deleteStory(id) {
    await homeModel.removeStory(id);
    return this.loadStories();
  },

  async checkSubscription() { return notificationModel.isSubscribed(); },
  async toggleNotification() {
    console.log('📢 toggleNotification DIPANGGIL');
    const subscribed = await this.checkSubscription();
    if (subscribed) {
      await notificationModel.unsubscribe();
    } else {
      const granted = await notificationModel.askPermission();
      if (granted) {
        await notificationModel.subscribeUserToPush();
      } else {
        throw new Error('Permission denied');
      }
    }
  }
};

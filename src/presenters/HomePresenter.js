
// import homeView from '../views/HomeView.js';
// import homeModel from '../models/HomeModel.js';
// import notificationModel from '../models/notificationModel.js';

// export default {
//   async loadStories() {
//     try {
//       const stories = await homeModel.fetchStories();
//       homeView.renderStories(stories);
//     } catch (error) {
//       alert('Failed to load stories');
//     }
//   },
//   async checkSubscription() {
//     return await notificationModel.isSubscribed();
//   },
//   async toggleNotification() {
//     const isSub = await notificationModel.isSubscribed();
//     if (isSub) {
//       await notificationModel.unsubscribe();
//       return false;
//     } else {
//       await notificationModel.subscribeUser();
//       return true;
//     }
//   }
// };


// new code
import homeView        from '../views/HomeView.js';
import homeModel       from '../models/HomeModel.js';

export default {
  async loadStories() {
    let stories;
    try {
      stories = await homeModel.fetchStories();
    } catch (err) {
      stories = await homeModel.getCachedStories();
    }
    homeView.renderStories(stories);
  },

  async deleteStory(id) {
    await homeModel.removeStory(id);
    // reload UI
    return this.loadStories();
  },

  async checkSubscription() { /* ... */ },
  async toggleNotification() { /* ... */ }
};

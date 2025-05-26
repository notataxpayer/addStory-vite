import notificationModel from '../models/notificationModel.js';
import authModel from '../models/authModel.js';

export default {
  // async initPush() {
  //   if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
  //     console.warn('Push not supported');
  //     return;
  //   }

  //   try {
  //     const granted = await notificationModel.askPermission();
  //     if (!granted) {
  //       alert('Push notification permission denied.');
  //       return;
  //     }
  //     await notificationModel.subscribeUser();

  //   } catch (error) {
  //     console.error('Push init error:', error);
  //   }
  // }
};

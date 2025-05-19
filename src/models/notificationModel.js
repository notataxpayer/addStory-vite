const VAPID_PUBLIC_KEY = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';


function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = window.atob(base64);
  return new Uint8Array([...raw].map(c => c.charCodeAt(0)));
}

export default {
    async isSubscribed() {
        const registration = await navigator.serviceWorker.getRegistration();
        const subscription = await registration?.pushManager.getSubscription();
        return !!subscription;
    },
    
  async askPermission() {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  },
  async subscribeUserToPush() {
  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: this._urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  const token = localStorage.getItem('token');
  const payload = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.getKey('p256dh')
        ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh'))))
        : '',
      auth: subscription.getKey('auth')
        ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth'))))
        : '',
    },
  };

  // Kirim subscription ke server
  await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  console.log('✅ Subscribed successfully.');
  return subscription;
},


//   subs
  async subscribeUser() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: this._urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  const token = localStorage.getItem('token');
  const payload = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.getKey('p256dh') 
        ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')))) 
        : '',
      auth: subscription.getKey('auth') 
        ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')))) 
        : ''
    }
  };

  await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });console.log('✅ Subscribed successfully.');
    
},

//   unsub
async unsubscribe() {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      console.warn('No service worker found.');
      return;
    }

    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      console.log('User is not subscribed.');
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://story-api.dicoding.dev/v1//notifications/subscribe`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ endpoint: subscription.endpoint })
      });
      await subscription.unsubscribe();
      console.log('✅ Unsubscribed successfully.');
    } catch (err) {
      console.error('❌ Failed to unsubscribe:', err);
    }
  },

  
  _urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const raw = atob(base64);
    return new Uint8Array([...raw].map(char => char.charCodeAt(0)));
  }
};

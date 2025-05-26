import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { createHandlerBoundToURL } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// precaching
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

self.skipWaiting();
clientsClaim();

// SPA routing
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'))
);

// cachingnya leaflet
registerRoute(
  /^https:\/\/unpkg\.com\/leaflet.*$/,
  new CacheFirst({
    cacheName: 'leaflet-cache',
    plugins: [new ExpirationPlugin({maxEntries:5, maxAgeSeconds: 60*60*24*30})]
  }),
  'GET'
);

// notif push
self.addEventListener('push', event => {
  console.log('[SW] Push received');

  let defaultNotification = {
    title: 'Default',
    options: {
      body: 'Default body',
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
    }
  };

  let notificationData = defaultNotification;

  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      console.error('[SW] Gagal parsing push data:', e);
    }
  }

  event.waitUntil(
    self.registration.showNotification(
      notificationData.title,
      Object.assign(
        {
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png',
        },
        notificationData.options 
      )
    )
  );
});

// notif redirect
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/#/home'));
});

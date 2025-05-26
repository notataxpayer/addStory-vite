const CACHE_NAME = 'story-app-shell-v1';
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',          
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/style.css',          
  '/src/main.js',       
  '/src/router.js',                
  '/router.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys.filter(key => key !== CACHE_NAME)
              .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.pathname.startsWith('/v1/stories')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/index.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(cached =>
      cached || fetch(request).catch(() => {
        // Fallback gambar
        if (request.destination === 'image') {
          return caches.match('/icon-192x192.png');
        }
      })
    )
  );
});


self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  let data = {};
  if (event.data) {
    data = event.data.json();
    console.log('[Service Worker] Push data:', data);
  }

  const title = data.title || 'Default title';
  const options = {
    body: data.body || 'Default body',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});





self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/#home') 
  );
});

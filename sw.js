const CACHE_NAME = 'ptj-v' + new Date().getTimezoneOffset() + '-' + Date.now();

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vercel.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cachedNames = caches.keys();
  const expectedName = CACHE_NAME;
  
  Promise.all(cachedNames.map((name) => {
    if (name !== expectedName) {
      return caches.delete(name);
    }
  }));
});

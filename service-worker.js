
// A simple service worker for caching and offline support.

const CACHE_NAME = '3enu-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // IMPORTANT: Add paths to your icon files here, for example:
  // '/icons/icon-192x192.png',
  // '/icons/icon-512x512.png'
];

// Install event: Open a cache and add the core assets to it.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: Clean up old caches.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Serve cached content when offline.
self.addEventListener('fetch', event => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response from cache.
        if (response) {
          return response;
        }

        // Not in cache - fetch from network.
        return fetch(event.request).then(
          networkResponse => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // We don't cache the Google Script iframe
                if (!event.request.url.includes('script.google.com')) {
                   cache.put(event.request, responseToCache);
                }
              });

            return networkResponse;
          }
        );
      })
      .catch(() => {
        // If both cache and network fail, you can serve a fallback page.
        // For this app, we just let the browser handle the error.
      })
  );
});

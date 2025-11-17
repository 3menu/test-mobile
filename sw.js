const CACHE_NAME = 'pwa-wrapper-cache-v1';
const urlsToCache = [ '/', '/index.html' ]; // Chỉ cần cache trang vỏ bọc

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(res => res || fetch(e.request))));

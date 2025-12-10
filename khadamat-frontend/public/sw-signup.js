
// Service Worker for Khadamat Signup Page - Caching Strategy
const CACHE_NAME = 'khadamat-signup-v1';
const ASSETS_TO_CACHE = [
  '/auth/signup',
  '/_next/static/css/main.css',
  '/_next/static/chunks/main.js',
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/framework.js',
  '/_next/static/chunks/polyfills.js',
  '/_next/static/chunks/auth/signup.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened signup cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/auth/signup')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
  }
});

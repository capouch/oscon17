var CACHE_NAME = 'scene-history-v1';
var urlsToCache = [
  '/',
  '/index.html',
  'manifest.json',
  '/css/main.css',
  '/js/vendor.bundle.js',
  '/js/bundle.js',
  'libs/bootstrap-4.0.0-alpha4.min.js',
  'libs/jquery-3.1.1.min.js',
  'libs/firebase-3.1.0.js',
  'libs/firebase-app-3.1.0.js',
  'libs/firebase-auth-3.1.0.js',
  '/img/background.png'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Service worker up: ' + event.request.url)
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log('Returning cached value for: ' + event.request.url)
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

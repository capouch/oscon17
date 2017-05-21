var CACHE_NAME = 'scene-history-v1';
var urlsToCache = [
  '/',
  '/index.html',
  'manifest.json',
  '/css/main.css',
  '/css/font-awesome.min.css',
  '/js/vendor.bundle.js',
  '/js/bundle.js',
  'libs/bootstrap.min.js',
  'libs/jquery.min.js',
  'libs/firebase.js',
  'libs/firebase-app.js',
  'libs/firebase-auth.js',
  '/img/background.jpg'
];

// Need this to be global to this module
var thisMessage = {}

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
        pushManager.subscribe()
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('SW Intercepting: ' + event.request.url)
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

// Copied from https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/good-notification
self.addEventListener('push', event => {
  thisMessage = JSON.parse(event.data.text())

  console.log('[Service Worker] Push Received.');
  console.log('This message text: ' + thisMessage.text)
  console.log('URL: ' + thisMessage.url)
  console.log(`[Service Worker] Push had this data: "${event.data}"`);

  const title = 'Scene History';
  const options = {
    body: thisMessage.text,
    // icon: 'images/icon.png',
    // badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
})

  self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();
  targetURL = '/' + thisMessage.url
  // Is this necessary?
  targetURL = encodeURI(targetURL)
  console.log('SW gonna waitUntil: ' + targetURL)
  // event.waitUntil(
  // clients.openWindow(targetURL)
  var promise = new Promise(function(resolve) {
        setTimeout(resolve, 10);
    }).then(function() {
        // return the promise returned by openWindow, just in case.
        // Opening any origin only works in Chrome 43+.
        return clients.openWindow(targetURL);
    });
    // Now wait for the promise to keep the permission alive.
    event.waitUntil(promise);
  })

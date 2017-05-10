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
  '/img/background.png'
];

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
  console.log('Service worker got: ' + event.request.url)
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
  let thisMessage = event.data.text(),
    thisData = event.data
    console.log("We got this message: " + thisMessage)
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data text: "${event.data.text()}"`);
    console.log(`[Service Worker] Push had this data: "${event.data}"`);
    console.log('[Service Worker] push full data ' + thisData)

    const title = 'Scene History';
    const options = {
      body: thisMessage,
      // icon: 'images/icon.png',
      // badge: 'images/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
  })

  self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://www.scene-history.org')
  )
})

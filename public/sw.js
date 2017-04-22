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

// Copied from https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/good-notification
self.addEventListener('push', event => {
  var dataPromise,
    message = 'We got data!!';
  console.log(event);
  if ('data' in event) {
    dataPromise = Promise.resolve(event.data.text());
  } else {
    dataPromise = fetch('notification/end/point/data.json')
      .then(response => {
        return response.json();
      });
  }

  event.waitUntil(
    dataPromise
    .then(msgData => {
      // Now tell the user.
      return self.registration.showNotification('Notiication: ', {
        // Whether you show data and how much you show depends on
        // content of the data itself.
        body: message,
        // icon: 'images/icon.png'
      });
    })
  );
});

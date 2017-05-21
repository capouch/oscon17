// Setup service worker and notiication services
//   Adapted from the code in https://codelabs.developers.google.com/codelabs/push-notifications/#0

// VAPID key
const applicationServerPublicKey = 'BJZhZZUqIwbwbGci_pheC3wTwNFcF5btmH7JPCFCF22gk7iJaXmrLznrtBQI_C_HtWZh9BFnwCVKfz7oVgTmaPA'

let pushButton = null;

console.log('Setting isSubscribed to false')
var isSubscribed = false;
var permStatus = 'denied'
var swRegistration = null;

// Register service worker and check for push support
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);
    swRegistration = swReg
    //initializeUI()
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

// Called after service worker installation
function initializeUI() {
  /* Fix button stuff later
  pushButton = document.querySelector('.js-push-btn');
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });
  */

  Notification.requestPermission(function(status) {
    permStatus = status;
    console.log('Notification permission status:', status);
  });

  // Set the initial subscription value
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      console.log('Service worker got subscription')
      isSubscribed = !(subscription === null);
      console.log('And found it to be ' + isSubscribed)
      })
    })

    // Tell server about sub
    // updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('WTF? ' + JSON.stringify(subscription))
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }
    // updateBtn();
}

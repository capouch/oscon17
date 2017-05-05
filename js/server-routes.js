/*
 * server-routes.js - module to provide server-side routing
*/

import sharp from 'sharp'
import multer from 'multer'
import cb from 'cb'
import webPush from 'web-push'

// Set of possible notification classes
const notifyGroups = ["watch", "warning", "closure", "amber", "police"]

// Multer handles MIME multi-part uploads
//   Configure it for this usage instance
// const multer = require('multer'),
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
    },
  // Add random suffix to avoid filename clashes
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
    }
  })
// This function uses multer to handle the upload process
// Note: we still need to set the Dropzone knob for "only one file at a time"
const upload  =  multer( {storage: storage }).single('file')

let savedSubscription = null,
  messageType = null,
  customMessage = null,
  subscriptions = []

export default function ( router, server ) {
  const options = {
    root: __dirname + '/../public'
   }

   // Home and view routes
  router.get('/', function(req, res) {
    res.sendFile('index.html', options)
  })

  // These repetitive routes need abstracting
  router.get('/home', function(req, res) {
    console.log('Server home chosen')
    res.sendFile('index.html', options)
  })

  router.get('/upload', function(req, res) {
    console.log('Server upload chosen')
    res.sendFile('index.html', options)
  })

  router.get('/browse', function(req, res) {
    console.log('Server browse chosen')
    res.sendFile('index.html', options)
  })

  router.get('/slides*', function(req, res) {
    console.log('Server slides chosen')
    res.sendFile('index.html', options)
  });

  router.get('/edit*', function(req, res) {
    console.log('Server edit chosen')
    res.sendFile('index.html', options)
  });

  router.get('/asset*', function(req, res) {
    console.log('Server asset chosen')
    res.sendFile('index.html', options)
  });

  router.get('/zoomer*', function(req, res) {
    console.log('Server zoomer chosen')
    res.sendFile('index.html', options)
  });

  /* Not going to allow server loading until the async thing is figured out
  router.get('/subscribe', function(req, res) {
    console.log('Server notify chosen')
    res.sendFile('index.html', options)
  });
 */


  // Send a notification to one or more subscribed clients
  router.get(['/sknnzix', '/sknnzix/:msg', '/sknnzix/:type/:msg'], function(req, res) {
    messageType = req.params.type
    if (typeof messageType != 'undefined' && (!notifyGroups.includes(messageType))) {
      // console.log('Illegal type detected ' + messageType)
      messageType = 'illegal'
      }
    customMessage = req.params.msg
    // Let the debuggers know what's going on under the hood
    console.log('Sending notifications with ' + customMessage + ' and ' + messageType)
    console.log(' to ' + Object.keys(subscriptions).length + ' subscribers')
    // res.sendFile('index.html', options)
    sendNotifications(customMessage);
    res.sendStatus(200);
  });

  // Post route to accept demo push subscription
  router.post('/save-subscription/', function (req, res) {
    const isValidSaveRequest = (req, res) => {
      // TODO: check for complete subscription data
      console.log('Taglist? ' + JSON.stringify(req.body.tags))
      if (!req.body || !req.body.endpoint) {
        // Not a valid subscription.
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          error: {
            id: 'no-endpoint',
            message: 'Subscription must have an endpoint.'
          }
        }));
        return false;
      }
      return true;
    };
    return saveSubscriptionToDatabase(req.body, req.ip, req.connection.remotePort)
    .then(function(subscriptionId) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ data: { success: true } }));
    })
    .catch(function(err) {
      res.status(500);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        error: {
          id: 'unable-to-save-subscription',
          message: 'The subscription was received but we were unable to save it to our database.'
        }
      }));
    });

    // Non-persistent save routine--refreshes with server restart
    function saveSubscriptionToDatabase(subscription, ipAddr, port) {
      console.log('In save part of routine')
      // console.log('Sub details' + JSON.stringify(subscription))
      let source = ipAddr + ':' + port
      // Cut syntactic cruft from front of address
      source = source.slice(7)
      console.log('Source: ' +  source)
      savedSubscription = subscription
      subscriptions[source] = subscription
      // Debugging time; let's log whole array
      for (let [source, subscription] of Object.entries(subscriptions)) {
          console.log("Entry: " + JSON.stringify(subscriptions[source]) + ' for ' + source)
        }
      // sendNotification(subscription)
      return new Promise(function(resolve, reject) {

        // TODO: add persistence
        /*
        db.insert(subscription, function(err, newDoc) {
          if (err) {
            reject(err);
            return;
          }
          */
          // resolve(newDoc._id);
          resolve(true)
        })
      }
    })

  // Fetch uploaded file handled by "storage" object in multer
  // Process resulting files for later viewing
  router.post('/uploadHandler', function(req, res) {
    if (req.body) {
        console.log('Req body: ' + JSON.stringify(req.body))
    }

    /* POST-PROCESSING ENTRY POINT */

    // 1. Attempt to upload file
    // 2. Process images
    // 3. Pass pointers back to requesting client
    upload(req, res, function(err) {
      if (err) {
        return res.end('Error uploading file')
      }
      console.log('Uploading file: ' + req.file.filename)

      // Here we leverage sharp.js to rapidly process the uploaded image
      const storedFilename = req.file.filename,
        filePath = './uploads/' + storedFilename,
        dziBase = './public/tiles/' + storedFilename

      // We should test for image size, etc., right here to be smarter below!

      // Make a thumbnail 200 px wide, scaled, MUST BE JPG for lightbox
      sharp(filePath)
        .resize(200)
        .jpeg()
        .toFile('./public/thumbs/' + storedFilename + '-thumb', function(err) {
          console.log(err)
        })

      // This scales down larger images to cut down file size
      //   (except currently it scales up, too . . . . )
      sharp(filePath)
        .resize(1000)
        .png()
        .toFile('./public/images/' + storedFilename + '-1k', function(err) {
          console.log(err)
        })

      // Generate zoomer tiles
      sharp(filePath).tile(256)
        .toFile(dziBase, function(err, info) {
          console.log(err)
        })
      // Pass back name -- maybe more soon??
      res.send(JSON.stringify(storedFilename))
      //res.sendStatus(200);
    })
  })
  // Service routines for push notifications
  function sendNotifications(customMessage) {
    // Track index in case we have to delete
    let counter = 0;
    // Iterate through current list of subscriptions
    for (let [source, subscription] of Object.entries(subscriptions)) {
      // console.log("Entry: " + JSON.stringify(subscriptions[source]) + ' for ' + source)
      let payload = 'This is your generic server notification!!';
      if (typeof customMessage !== 'undefined') {
        payload = customMessage
      }
      // console.log('At sending, we have tags of: ' + JSON.stringify(subscription.tags))
      // Code to send notify; remove item if subscription has lapsed
      if (subscription.tags.includes(messageType) || messageType == null) {
      const pushOptions = {
        vapidDetails: {
          subject: 'mailto:brianc@palaver.net',
          publicKey: 'BJZhZZUqIwbwbGci_pheC3wTwNFcF5btmH7JPCFCF22gk7iJaXmrLznrtBQI_C_HtWZh9BFnwCVKfz7oVgTmaPA',
          privateKey: 'VCtWHVxRI-MuLAYzcONx-UW38Hwi2qKK2RND_QsgvS8'
        },
      }

      webPush.sendNotification(
        subscription,
        payload,
        pushOptions
      )
      // Remove item from array if message server rejects
      .catch((err) => {
        if (err.statusCode === 410) {
          console.log('Removing bad subscription from array')
          delete subscriptions[source]
        } else {
          console.log('Subscription is no longer valid: ', err);
        }
      })
    }
      counter++
    }
  }
}

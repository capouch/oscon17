/*
 * server-routes.js - module to provide server-side routing
*/

import sharp from 'sharp'
import multer from 'multer'
import cb from 'cb'
import webPush from 'web-push'

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

export default function ( router, server ) {
  const options = {
    root: __dirname + '/../public'
   }

// Actual routes

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

  router.get('/login-out', function(req, res) {
    console.log('Server login/out chosen')
    res.sendFile('index.html', options)
  });

  // Post route to accept demo push subscription
  // For OSCON demo purposes only--NOT ROBUST!
  router.post('/save-subscription/', function (req, res) {
    const isValidSaveRequest = (req, res) => {
      // Check the request body has at least an endpoint.
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
    return saveSubscriptionToDatabase(req.body)
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

    // This doesn't even come close to working . .
    function saveSubscriptionToDatabase(subscription) {
      return new Promise(function(resolve, reject) {
        db.insert(subscription, function(err, newDoc) {
          if (err) {
            reject(err);
            return;
          }

          resolve(newDoc._id);
        });
      });
    };
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
  const pushSubscription = {
    // Values to be gotten from saved subscription registration
    endpoint: '< Push Subscription URL >',
    keys: {
      p256dh: '< User Public Encryption Key >',
      auth: '< User Auth Secret >'
    }
  };

  const payload = 'This is a friendly server notification!!';

  const pushOptions = {
    vapidDetails: {
      subject: 'mailto:brianc@palaver.net',
      publicKey: 'BJZhZZUqIwbwbGci_pheC3wTwNFcF5btmH7JPCFCF22gk7iJaXmrLznrtBQI_C_HtWZh9BFnwCVKfz7oVgTmaPA',
      privateKey: 'VCtWHVxRI-MuLAYzcONx-UW38Hwi2qKK2RND_QsgvS8'
    },
  }

  webPush.sendNotification(
    pushSubscription,
    payload,
    pushOptions
  );
}

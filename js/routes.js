/*
 * routes.js - module to provide routing
 * Danilo Zekovic
 */

// Note that these are SERVER-SIDE routes
// --- Local variables
'use strict';
import sharp from 'sharp'

var
  configRoutes,

  // Multer handles MIME multi-part uploads
  //   Configure it for this usage instance
  multer = require('multer'),
  cb = require('cb'),
  storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
    },
  // Add random suffix to avoid filename clashes
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
    }
  });
  // This function uses multer to handle the upload process
  let upload  =  multer( {storage: storage }).single('file');

// --- End variable declarations

// --- Public API

configRoutes = function ( router, server ) {
  var options = {
    root: __dirname + '/../public'
   };

  router.get('/', function(req, res) {
    res.sendFile('index.html', options);
  });

  router.get('/home', function(req, res) {
    console.log('Server home chosen');
    res.sendFile('index.html', options);
  });

  router.get('/upload', function(req, res) {
    console.log('Server upload chosen');
    res.sendFile('index.html', options);
  });

  router.get('/browse', function(req, res) {
    console.log('Server browse chosen');
    res.sendFile('index.html', options);
  });

  router.get('/slides', function(req, res) {
    console.log('Server browse chosen');
    res.sendFile('index.html', options);
  });

  router.get('/zoomer/*', function(req, res) {
    console.log('Server zoomer chosen');
    res.sendFile('index.html', options);
  });

  router.get('/login', function(req, res) {
    console.log('Server login chosen');
    res.sendFile('index.html', options);
  });

  // Fetch uploaded file handled by "storage" object in multer
  // Process resulting files for later viewing
  router.post('/uploadHandler', function(req, res) {
    if (req.body) {
        console.log('Req body: ' + JSON.stringify(req.body));
    }

    /* POST-PROCESSING ENTRY POINT */

    // 1. Attempt to upload file
    // 2. Process images
    // 3. Pass pointers back to requesting client
    upload(req, res, function(err) {
      if (err) {
        return res.end('Error uploading file');
      }
      console.log('Uploading file: ' + req.file.filename);

      // Crude proof of concept: generate thumbnail and zoom tiles
      let storedFilename = req.file.filename,
        filePath = './uploads/' + storedFilename,
        dziBase = './public/tiles/' + storedFilename + '.dzi';
      // Make a thumbnail 200 px wide, scaled
      sharp(filePath)
        .resize(200)
        .toFile('./public/thumbs/' + storedFilename + '-thumb', function(err) {
          console.log(err);
        });
      // Generate zoomer tiles too
      sharp(filePath).tile(256)
        .toFile(dziBase, function(err, info) {
          console.log(err);
        });
    // Pass back name -- maybe more soon??
    res.send(JSON.stringify(storedFilename));
    //res.sendStatus(200);
  });
});
}

// The old-fashioned way!!
module.exports = { configRoutes : configRoutes };

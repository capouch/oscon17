/*
 * routes.js - module to provide server-side routing
*/

import sharp from 'sharp'
import multer from 'multer'
import cb from 'cb'

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

// set up a route to redirect http to https
 router.get('*',function(req,res){
     res.redirect('https://www.scene-history.org'+req.url)
 })

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

  router.get('/zoomer*', function(req, res) {
    console.log('Server zoomer chosen')
    res.sendFile('index.html', options)
  });

  router.get('/login-out', function(req, res) {
    console.log('Server login/out chosen')
    res.sendFile('index.html', options)
  });

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
        dziBase = './public/tiles/' + storedFilename + '.dzi'

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
}

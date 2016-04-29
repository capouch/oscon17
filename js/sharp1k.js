#!/usr/bin/env node
//  sharpConvert.js: Convert an image file into Deep Zoom format
//     Brian Capouch 13 December 2015
//       Modified 19 February 2016: Convert from optimist/prompt to yargs
//     Output: .dzi file and directory of tile images
//

// Set up functionality
var sharp    = require('sharp'),
    argv = require('yargs')
      .usage('Usage $0 --file [file] ')
      .demand(['file'])
      .argv;

// Get input from user
var infile = argv.file;

// Get input from user (or use argv values provide via override)

// Perform conversion
      sharp(infile)
        .resize(1000)
        .toFile('../public/images/' + infile + '-1k', function(err) {
          console.log(err);
        });
function onErr(err) {
  console.log(err);
  return 1;
}


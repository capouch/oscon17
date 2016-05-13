var app = require('app');  // Module to control application life.
var path = require('path');
var url = require('url');

// console.log(app.getAppPath());

// global.sharedObj = {filePath: app.getAppPath()};

var window = require('electron-window');  // Module to create native browser window.

var args = {
  baseDir: app.getAppPath()
}

// Report crashes to our server.
crashReporter = require('crash-reporter');
crashReporter.start({
  productName: 'Scene:History',
  companyName: 'SJC 2016 SPA',
  submitURL: 'https://your-domain.com/url-to-submit',
  autoSubmit: true
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {

  // Create the browser window.
/*  mainWindow = window.createWindow({
      width: 1280,
      height: 720,
      'minWidth': 800,
      'minHeight': 540,
      frame: true
   });
   */

   windowOptions = {
     width: 1280,
     height: 600,
     'minWidth': 800,
     'minHeight': 540,
     'autoHideMenuBar': true,
     webPreferences: {
       nodeIntegration: false
     }
   }

  mainWindow = window.createWindow(windowOptions);

  indexPath = path.resolve(__dirname, 'public', 'index.html')
  var indexUrl = url.format({
    protocol: 'file',
    pathname: indexPath,
    slashes: true,
    // hash: encodeURIComponent(JSON.stringify(someArgs))
  })

  // and load the index.html of the app.
  // mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.showUrl(indexPath, args, function ()
    {
      console.log('Window now ready');
    }
  )

  // mainWindow.openDevTools();
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
});

var app = require('app');  // Module to control application life.

var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
crashReporter = require('crash-reporter');
crashReporter.start({
  productName: 'Scene:History',
  companyName: 'SJC 2016 SPA',
  submitURL: 'https://your-domain.com/url-to-submit',
  autoSubmit: true
});

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
  mainWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      'minWidth': 800,
      'minHeight': 540,
      frame: true
   });
  // mainWindow = new BrowserWindow({width: 1024, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // mainWindow.openDevTools();
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

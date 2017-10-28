// ES6 wrapper
require('babel-core/register')({
  presets: [ 'env', 'stage-0']
});
require('./server-test');
require('babel-polyfill')

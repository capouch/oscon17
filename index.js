// ES6 wrapper
require('babel-core/register')({
  presets: [ 'es2015', 'stage-0']
});
require('./main');
require('babel-polyfill')

// ES6 wrapper for server side
require('babel-core/register')({
  presets: [ 'es2015', 'stage-0']
});
require('./server-es6');

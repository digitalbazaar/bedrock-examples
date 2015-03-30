var bedrock = require('bedrock');
var path = require('path');

require('bedrock-express');

require('bedrock-requirejs');
require('bedrock-server');

require('bedrock-views');

bedrock.config.views.paths.push(
  path.join(__dirname)
);

var config = bedrock.config;
config.requirejs.config.packages.push({
  name: 'example',
  main: './example.js',
  location: '/bower-components/example'
});
config.requirejs.optimize.config.packages.push({
  name: 'example',
  main: './example.js',
  location: path.join(__dirname, 'example')
});
config.express.static.push({
  route: '/bower-components/example',
  path: path.join(__dirname, 'example')
});
config.requirejs.autoload.push('example');


bedrock.start();
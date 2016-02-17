var bedrock = require('bedrock');
var path = require('path');
var config = bedrock.config;

require('bedrock-express');
require('bedrock-requirejs');
require('bedrock-server');
require('bedrock-views');

// basic-modals pseudo bower package
var rootPath = path.join(__dirname);
config.requirejs.bower.packages.push({
  path: path.join(rootPath, 'example'),
  manifest: path.join(rootPath, 'bower.json')
});

bedrock.start();

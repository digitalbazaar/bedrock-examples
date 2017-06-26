var bedrock = require('bedrock');
var path = require('path');
var config = bedrock.config;

require('bedrock-express');
require('bedrock-server');
require('bedrock-views');

var rootPath = path.join(__dirname);
config.views.system.packages.push({
  path: path.join(rootPath, 'components'),
  manifest: path.join(rootPath, 'package.json')
});

config.views.system.importAllIgnore.push('bootstrap');

bedrock.start();

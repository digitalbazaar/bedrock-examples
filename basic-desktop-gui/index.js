/*
 * Bedrock-based Desktop GUI Example
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var path = require('path');

require('bedrock-express');
require('bedrock-server');
require('bedrock-topcube');
require('bedrock-views');

// default configuration
bedrock.config.topcube.name = 'Bedrock';
bedrock.config.topcube.width = 1024;
bedrock.config.topcube.height = 768;

// add pseudo bower package for frontend
bedrock.config.requirejs.bower.packages.push({
  path: path.join(__dirname, 'components', 'example'),
  manifest: {
    name: 'example',
    moduleType: 'amd',
    main: './example.js',
    dependencies: {
      angular: '~1.3.0'
    }
  }
});

bedrock.start();

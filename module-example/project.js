var bedrock = require('bedrock');

// bedrock modules to load
require('./bedrock-example-server');
require('./bedrock-example-listener');

// change the port to use
bedrock.config['example-server'].port = 8123;

bedrock.start();

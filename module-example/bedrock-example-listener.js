var bedrock = require('bedrock');
require('./bedrock-example-listener');

// emitted to allow listeners to be attached to the example server
bedrock.events.on('example.server.ready', function(server) {
  server.on('request', function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
  });
});
var bedrock = require('bedrock');
var http = require('http');

// setup default module config
bedrock.config['example-server'] = {port: 80};

var server = http.createServer();

// emitted prior to command line parsing
bedrock.events.on('bedrock-cli.init', function() {
  // add a new subcommand executed via: node project.js debug
  var command = bedrock.program
    .command('debug')
    .description('display registered http listeners')
    .option(
      '--debug-event <event>',
      'The event to print listeners for. [request]')
    .action(function() {
      // save the parsed command information
      bedrock.config.cli.command = command;
    });
});

// emitted after the command line has been parsed
bedrock.events.on('bedrock-cli.ready', function() {
  var command = bedrock.config.cli.command;
  if(command.name() !== 'debug') {
    // `debug` not specified on the command line, return early
    return;
  }

  // emitted after all bedrock.start listeners have run
  bedrock.events.on('bedrock.ready', function() {
    // print out all the listeners that registered with the server
    var event = command.debugEvent || 'request';
    var listeners = server.listeners(event);
    console.log('listeners for event: ' + event);
    listeners.forEach(function(listener, index) {
      console.log(index, listener.toString());
    });
  });
});

// emitted before initialization, to allow any further configuration
bedrock.events.on('bedrock.configure', function() {
  if(bedrock.config.foo) {
    bedrock.config.foo.bar = true;
  }
});

// emitted for early initialization, prior to dropping process privileges
bedrock.events.on('bedrock.init', function(callback) {
  // listen on port 80
  server.listen(bedrock.config['example-server'].port, function() {
    // ready, call callback to allow bedrock to continue processing events
    callback();
  });

  // emitted for modules to do or schedule any unprivileged work on start up
  bedrock.events.on('bedrock.start', function(callback) {
    // emit a custom event giving other modules access to the example server
    bedrock.events.emit('example.server.ready', server, function() {
      callback();
    });
  });
});

// emitted after all bedrock.ready listeners have run
bedrock.events.on('bedrock.started', function() {
  console.log('everything is running now');
});
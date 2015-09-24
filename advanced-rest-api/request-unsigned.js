/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var request = require('request');

var options = {
  url: 'https://bedrock.dev:18443/people/Alice',
  method: 'DELETE',
  strictSSL: false,
  json: true
};
request(options, function(err, res, body) {
  if(err) {
    return console.log('ERROR', err);
  }
  console.log('Status Code:', res.statusCode);
  console.log('Body:', res.body);
});

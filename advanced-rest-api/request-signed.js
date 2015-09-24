/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var request = require('request');
var async = require('async');
var identities = require('./configs/client.config').identities;

async.forEachOf(identities, function(value, key, callback) {
  deletePerson(key, callback);
}, function(err) {
  if(err) {
    console.log('Error:', err);
  }
});

function deletePerson(user, callback) {
  var options = {
    url: 'https://bedrock.dev:18443/people/Alice',
    method: 'DELETE',
    strictSSL: false,
    json: true,
    httpSignature: {
      key: identities[user].keys.privateKey,
      keyId: 'https://bedrock.dev:18443/i/' + user + '/keys/1',
      headers: ['date', 'host', 'request-line']
    }
  };
  request(options, function(err, res, body) {
    if(err) {
      return callback(err);
    }
    console.log('----', user, '----------------------------------------------');
    console.log('Status Code:', res.statusCode);
    console.log('Body:', res.body);
    callback();
  });
}

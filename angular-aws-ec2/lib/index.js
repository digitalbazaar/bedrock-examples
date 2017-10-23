/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const async = require('async');
const bedrock = require('bedrock');
const config = bedrock.config;
const request = require('request');
require('bedrock-express');
require('bedrock-server');
require('bedrock-views');
require('bedrock-webpack');

// load config
require('./config');

// NOTE: this configuration is appropriate for a bedrock application running
// behind AWS ELB (Elastic Load Balancer). ELB allows a self signed certificate
// to be used on the back-end server

// documentation from the AWS meta-data API
// http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
bedrock.events.on('bedrock.configure', callback => {
  const metaBase = 'http://169.254.169.254/latest/meta-data';
  const lhn = `${metaBase}/local-hostname/`;
  const lip = `${metaBase}/local-ipv4/`;
  return async.auto({
    lhn: callback => request.get(lhn, (err, res) => callback(err, res.body)),
    lip: callback => request.get(lip, (err, res) => callback(err, res.body)),
  }, (err, results) => {
    if(err) {
      return callback(err);
    }
    // bind the server to the local IP discovered from the meta-data API
    config.server.bindAddr = [results.lip];
    // configure domain as required (e.g. example.com)
    config.server.domain = results.lhn;
    // host must be configured to prevent the (non-standard 18443) HTTPS port
    // from being appendend to the baseUri
    config.server.host = config.server.domain;
    callback();
  });
});

bedrock.start();

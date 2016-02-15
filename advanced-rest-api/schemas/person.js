/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var schemas = require('bedrock-validation').schemas;

var schema = {
  type: 'object',
  title: 'Credential',
  properties: {
    'type': {
      required: true,
      type: 'string'
    },
    name: schemas.personName({required: true}),
    birthDate: schemas.w3cDateTime({required: false})
  }
};

module.exports = function(extend) {
  if(extend) {
    return bedrock.util.extend(true, bedrock.util.clone(schema), extend);
  }
  return schema;
};

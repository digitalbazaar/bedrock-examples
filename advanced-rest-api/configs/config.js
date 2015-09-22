/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;
var path = require('path');

var baseUri = 'https://bedrock.dev:18443';
var baseIdPath = 'https://bedrock.dev:18443/i';
var userName = '';
var permissions = config.permission.permissions;
var roles = config.permission.roles;

config.demo = {};
config.demo.identities = {};

// custom configuration
config.mongodb.name = 'bedrock_rest_dev'; // default: bedrock_dev
config.mongodb.host = 'localhost';        // default: localhost
config.mongodb.port = 27017;              // default: 27017
config.mongodb.username = 'bedrock_rest'; // default: bedrock
config.mongodb.password = 'password';     // default: password

// the mongodb database 'bedrock_rest_dev' and the 'bedrock_rest' user will
// be created on start up following a prompt for the admin user credentials

permissions.PERSON_DELETE = {
  id: 'PERSON_DELETE',
  label: 'Delete Person',
  comment: 'Required to delete a Person.'
};

roles['demo.admin'] = {
  id: 'demo.administrator',
  label: 'Demo Administrator',
  comment: 'Role for demo administrators.',
  sysPermission: [permissions.PERSON_DELETE.id]
};

function createIdentity(userName, role) {
  var newIdentity = {
    id: baseIdPath + '/' + userName,
    type: 'Identity',
    sysSlug: userName,
    label: userName,
    email: userName + '@bedrock.dev',
    sysPassword: 'password',
    sysPublic: ['label', 'url', 'description'],
    sysResourceRole: [{sysRole: role}],
    url: baseUri,
    description: userName
  };
  return newIdentity;
}

function createKey(options) {
  var userName = options.userName;
  var publicKey = options.publicKey;
  var newKey = {
    publicKey: {
      '@context': 'someContextURL',
      id: baseIdPath + '/' + userName + '/keys/1',
      type: 'CryptographicKey',
      owner: baseIdPath + '/' + userName,
      label: 'Signing Key 1',
      publicKeyPem: publicKey
    }
  };
  return newKey;
}

// user with a valid 4096 bit RSA keypair
userName = 'rsa4096';
config.demo.identities[userName] = {};
config.demo.identities[userName].identity =
  createIdentity(userName, 'bedrock.admin');
config.demo.identities[userName].keys = createKey({
  userName: userName,
  publicKey: '-----BEGIN PUBLIC KEY-----\n' +
    'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxBTbcgMr6WY74XoUkXBg\n' +
    'n+0PUP2XE4fbcvALoBSBIlMcWep8TUl4/BGM2FBwbgeEgp9ZRJ8dObiK+ZqQjFOh\n' +
    'Gfj0PYP3Xb0c5Djrm0qmC8NRgVO4h2QNEX3Keps1bC6+S096n5XS9qiRsMfr4vN5\n' +
    'ohV9svSP9mmRs+iEs3UBWJl6uoMpkopCxViI1GhhYGjCoB+MGnVJbgEwPjA4POAm\n' +
    'WyMm76tSx0vpI0HLFdN0S9tghrl4jkAzFaBILMfoakx/LpFOiAApivM7HF6YeDZT\n' +
    'MOk6wVYMbbd1jiiy4PLj+nKl96K7RMU+RQZekAZ6Y2FU7wrAbOVBwaXaaRUTVIrN\n' +
    'hOCl7ihXo4w348rVNmDT0pejbSx2QbOY/X7NfUePIkOpyekRChGCrQL3KIicpKCA\n' +
    'bJG83U4niPsynBI3Y/zWvDgs8R/FxEc/UdlBB6Mr9jAeOhbY5vhH1E5dyThJD9Px\n' +
    'pmlY2PuzeAUscsfoXzxHRo2CLzanbvKJKXxMpMVl9lPyvVQHAevVZJO+kJf+Mpzw\n' +
    'Q5X4x/THt7NpSLDjpTsISQGc+0X3DhKvYzcW0iW/bDc9IqXuCPGqa/xf7XhNRLzg\n' +
    '41J2uX0nX9yWwl1opexN3dCxCsYNKTqBTq3uY1aK6WnWWXWt4t8G42A3bKv/7Ncu\n' +
    '9jEBOHnbHLXdQPk+q6wFNfECAwEAAQ==\n' +
    '-----END PUBLIC KEY-----\n'
});

/* user with a valid 2048 bit RSA keypair
 * rsa2048 user is given the 'demo.admin' role which allows the user to
 * delete a person.
 */
userName = 'rsa2048';
config.demo.identities[userName] = {};
config.demo.identities[userName].identity =
  createIdentity(userName, 'demo.admin');
config.demo.identities[userName].keys = createKey({
  userName: userName,
  publicKey: '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzhqhuJVKXVbPkexJfMUN\n' +
    'y5bqhfHJ3lX9NkpzxyPijuaQgGC23gUYlE97LFad/QKa06dm0zjO1ThYCAR0mjOE\n' +
    'A1z6Aaf0kuGZ6JWbS0QdfhZ53sNA0t22sRPgil2FFYDgtKwf9Ez09CuE8FWUYeVJ\n' +
    'MFmU/bE3y0bbceXo1n5yX6/Ek/oDoBI/32IaivwVEW+7SxOJykrCvIoFyo2O9Ejh\n' +
    'muZLzse3/kaCoQKF5YPBEsODNW6QrIH2seaO1Rlg51s2lj4XgS+XljsH+KaFOqYL\n' +
    'Oe7DZl9Ffg6veYo3iMu2IRFxvEyy3DtQsnaew6vk7Pvh9ZyXnPVeCrFj+k0SVumO\n' +
    'twIDAQAB\n' +
    '-----END PUBLIC KEY-----\n'
});

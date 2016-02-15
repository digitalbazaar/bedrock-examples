/*
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
var identities = {};
exports.identities = identities;
var userName = null;
// user with a valid 4096 bit RSA keypair
userName = 'rsa4096';
identities[userName] = {};
identities[userName].keys = {
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
    '-----END PUBLIC KEY-----\n',
  privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
    '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\n' +
    '-----END RSA PRIVATE KEY-----\n'
};

// user with a valid 2048 bit RSA keypair
userName = 'rsa2048';
identities[userName] = {};
identities[userName].keys = {
  userName: userName,
  publicKey: '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzhqhuJVKXVbPkexJfMUN\n' +
    'y5bqhfHJ3lX9NkpzxyPijuaQgGC23gUYlE97LFad/QKa06dm0zjO1ThYCAR0mjOE\n' +
    'A1z6Aaf0kuGZ6JWbS0QdfhZ53sNA0t22sRPgil2FFYDgtKwf9Ez09CuE8FWUYeVJ\n' +
    'MFmU/bE3y0bbceXo1n5yX6/Ek/oDoBI/32IaivwVEW+7SxOJykrCvIoFyo2O9Ejh\n' +
    'muZLzse3/kaCoQKF5YPBEsODNW6QrIH2seaO1Rlg51s2lj4XgS+XljsH+KaFOqYL\n' +
    'Oe7DZl9Ffg6veYo3iMu2IRFxvEyy3DtQsnaew6vk7Pvh9ZyXnPVeCrFj+k0SVumO\n' +
    'twIDAQAB\n' +
    '-----END PUBLIC KEY-----\n',
  privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEogIBAAKCAQEAzhqhuJVKXVbPkexJfMUNy5bqhfHJ3lX9NkpzxyPijuaQgGC2\n' +
    '3gUYlE97LFad/QKa06dm0zjO1ThYCAR0mjOEA1z6Aaf0kuGZ6JWbS0QdfhZ53sNA\n' +
    '0t22sRPgil2FFYDgtKwf9Ez09CuE8FWUYeVJMFmU/bE3y0bbceXo1n5yX6/Ek/oD\n' +
    'oBI/32IaivwVEW+7SxOJykrCvIoFyo2O9EjhmuZLzse3/kaCoQKF5YPBEsODNW6Q\n' +
    'rIH2seaO1Rlg51s2lj4XgS+XljsH+KaFOqYLOe7DZl9Ffg6veYo3iMu2IRFxvEyy\n' +
    '3DtQsnaew6vk7Pvh9ZyXnPVeCrFj+k0SVumOtwIDAQABAoIBAF3/FVx6ccTp75as\n' +
    'fcNyl10Pgfv+jsNg0i+teuoKeqwTiTmTYjMVfeU97n4FLt6SDoyS3zlbwjDKFpPp\n' +
    'fEhLUFy8TaTttYQ7cZb6jC2ibhTwKTqoL+s7hLNzzkcsaaKp+VFM4vHnGxw0sNdv\n' +
    'IFIZYOy1HlcpOLnzoedrJGqWlpD+ZfKi5j6cVmGsPwlaNt/0b7BG9raHFl1pVFGh\n' +
    'Sz+rQeWFhLgPDxivMIZ99OIohsPSriNxA6z+YUyYIbLxbM7tiiMNzBDep3998qXI\n' +
    'icRcAc4q/pGkIfdqjw2HP7PM/0+qQd+nPDC61ZOkOfCmMuj0g5heY6tvZHmClEml\n' +
    'lpInF7kCgYEA7cyl83f5GgRRGH18pNnI/gwzA1z1AcRZLqkxw6rEBZaqQhrgXEGP\n' +
    'NsXPV1J8hmrafY6BjOF5bogvNcKJ4DCp4nZE6u+coB8tTsiSddX5U5Y9Ug9WHOQW\n' +
    'dqrW+k46cLACrqrRyQAmE8DwLJCu8aP3nMEu5ZQbBRoatczWf06JDWMCgYEA3eD0\n' +
    'y51s7lZPzyveAursVUb5Votdm9yN13knRA3pIBWtjFB9zTnXCVfO7wVXlAmZXiCx\n' +
    'h5vW7eg3PQV7D2mYjtmlgFiThS5BckWOzzDS7t1925v+zo16MS8N2Lny9oSQXQIa\n' +
    '4A/FzavQ7l4NRT4cGiHeQ+YAVYXvu5ASyAkKE50CgYBSFGpPkGCmD0lil6XXTOjo\n' +
    'b5OIHKTg+EIELhhkPmQsvaWE7bv1fBePw1VfAbTDvMwvvGmRFB6S/WS2PLDUdled\n' +
    'OE9vfEdmqXw9DlQnYjUOGfSOh4aksEHksfFEMo5PaSFz4rhIlcmO1fDQoRwRghQs\n' +
    'wi2KxsVQzILdr5d2F8iMmwKBgEyos4tCCefS1GI8wsj5R8wy6GTZY+885Zjj2Agw\n' +
    'UjJuqvaGvOBSMpSczPdSPi78nguiehPjaP/rsmIX6auqjTYVxpOwhs+F6sDDfZLi\n' +
    'SI6U4i4lGIVe5i/mFP+jR2ma5ZHs70Io0Ou9iENDJYyd5/Gzb+q/pa/mxaxlG8gX\n' +
    'L28VAoGALyR/L1jQMbtPqgFTIR5q1cLvVCo/JiESDpozPqvWuCJF1TS1DIr2m7cV\n' +
    'M1mckfd+e9mtN349obLW+GXuTmIv+eVVxB4yMUA7XSSnE8JdecBCL7J2Uen+5Ufg\n' +
    'YFG4JWw245y+hCxsK6B+6P3yvotl85MbB8QT30MRFcxZnjttTmk=\n' +
    '-----END RSA PRIVATE KEY-----\n'
};

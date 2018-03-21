# Bedrock REST API Example

This example demonstrates how to setup a RESTful API to interface with a MongoDB database.

Notice the dependencies in the package.json, [bedrock][], [bedrock-express][], and [bedrock-mongodb][]. These dependencies provide us with the base bedrock package, [Express][] capabilities, and an interface with [MongoDB][].

The additional dependencies relate to the included AngularJS front-end designed to interact with the REST API.  See the [angular-basic][] example for additional details about implementing an AngularJS front-end.

**Note**: This demo will require a [host file entry][] for `bedrock.local` pointing to `127.0.0.1` (localhost).

## Installation

```
npm install
```

## Running the demo

```
npm start
```

then, direct a web browser to `https://bedrock.local:18443/`

[bedrock-express]:https://github.com/digitalbazaar/bedrock-express
[bedrock-mongodb]:https://github.com/digitalbazaar/bedrock-mongodb
[bedrock]:https://github.com/digitalbazaar/bedrock
[Express]:http://expressjs.com/
[MongoDB]:https://www.mongodb.org/
[host file entry]:http://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/
[angular-basic]:../angular-basic

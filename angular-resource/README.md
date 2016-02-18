# Bedrock Angular REST Example

This example extends the [basic-rest-api][] example and demonstrates the use of
the [bedrock-angular-resource][] module.

bedrock-angular-resource is an AngularJS module that includes
`brResourceService` which provides a `Collection` class that can be used to
access a remote REST collection resource.

You can see how the `Collection` class is implemented by studying
[people-controller.js][] and [people-service.js][].

**Note**: This demo will require a [host file entry][] for `bedrock.dev`
pointing to `127.0.0.1` (localhost).

## Installation

```
npm install
```

## Running the demo

```
npm start
```

then, direct a web browser to `https://bedrock.dev:18443/`

[basic-rest-api]:../basic-rest-api
[people-controller.js]:./example/people-controller.js
[people-service.js]:./example/people-service.js
[bedrock-angular-resource]:https://github.com/digitalbazaar/bedrock-angular-resource
[host file entry]:http://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/

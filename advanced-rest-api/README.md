# bedrock-advanced-rest-api
[Bedrock][] Advanced REST API Example Project.
* Using [JSON-LD][]
* Using HTTP-Signatures and User Permissions

## Installation
```
npm install
```
The HTTP-Signatures demo will require a host file entry for `bedrock.dev`
pointing to `127.0.0.1` (localhost).  The host header is validated and signed by
the HTTP-Signature software.

## Starting the Server
```
npm start
```

## Using JSON-LD
This example demonstrates how JSON-LD framing can be used to restructure
incoming API data into a consistent format.

After starting the server, direct a browser to `https://bedrock.dev:18443`.
The buttons at the top of the screen can be used to access a number of object
templates.  Click one of the buttons and you may study and or manipulate the
object.  Next, click the `Add Person` button and you will see how the object is
transformed by the JSON-LD frame.

The API endpoint used in this example is `app.post('/people/:name')` defined in
`index.js`.

The incoming object is also validated using [bedrock-validation][] and the
'person' schema found in `/schemas/person.js`.

## Using HTTP-Signatures and User Permissions
This example demonstrates how HTTP-Signatures can be used to authenticate API
requests and how user permissions can be used to control access to resources.

This process involves the following bedrock modules:
* [bedrock-passport][] which provides HTTP-Signatures authentication for the
API endpoint.
* [bedrock-identity][] for managing users.
* [bedrock-permission][] for managing access control to resources via
configurable permissions and roles.

### The Command-Line Programs
#### Unsigned Request
The request for this example are made using the `request-unsigned.js` script.

After starting the server, run the script:
```
node request-unsigned.js
```
The script should produce the following output:
```
Status Code: 400
Body: { message: 'Not authenticated.',
  type: 'PermissionDenied',
  details: { httpStatusCode: 400 },
  cause: null }

```
#### Signed Requests
The requests for this example are made using the `request-signed.js` script.
The private keys used in this example are configured in
`configs/client.config.js`.

After starting the server, run the script:
```
node request-signed.js
```
The script should produce the following output:
```
---- rsa4096 ----------------------------------------------
Status Code: 403
Body: { message: 'Insufficient Privileges',
  type: 'InsufficientPrivileges',
  details:
   { httpStatusCode: 403,
     details: { authenticatedUser: 'https://bedrock.dev:18443/i/rsa4096' } },
  cause: null }
---- rsa2048 ----------------------------------------------
Status Code: 200
Body: { status: 'success',
  authenticatedUser: 'https://bedrock.dev:18443/i/rsa2048' }
```
note:  The HTTP-Signatures demo will require a host file entry for `bedrock.dev`
pointing to `127.0.0.1` (localhost).  The host header is validated and signed by
the HTTP-Signature software.

### Overview
In this example, the server has user accounts and public keys for two users:
`rsa4096` and `rsa2048`
* rsa4096 is a valid user account, but does not have permissions to delete a
person.
* rsa2048 is a valid user account that has been assigned the `demo.admin` role
which includes the `PERSON_DELETE` permission.

User profiles and permissions are defined in the configuration file
`/configs/config.js`.

The API endpoint used here is `app.delete('/people/:name')` defined in
`index.js`.  The bedrock-passport method `ensureAuthenticated` is specified
here as Express middleware.  The bedrock-identity method `checkPermission` is
then used to determine if the authenticated user has sufficient privileges for
the action.

[Bedrock]: https://github.com/digitalbazaar/bedrock
[JSON-LD]: http://json-ld.org/
[bedrock-validation]: https://github.com/digitalbazaar/bedrock-validation
[bedrock-passport]: https://github.com/digitalbazaar/bedrock-passport/tree/2.x
[bedrock-identity]: https://github.com/digitalbazaar/bedrock-identity/tree/2.x
[bedrock-permission]: https://github.com/digitalbazaar/bedrock-permission

# bedrock-rest-api
Bedrock Rest API Example Project

## Rest API Example

To start, we must create a file, package.json, to setup our environment.

```json
{
  "name" : "bedrock-rest-api",
  "version" : "0.0.0",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "bedrock": "^1.0.0",
    "bedrock-express": "^1.0.0",
    "bedrock-mongodb": "^1.0.0"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "main": "index.js"
}
```

Now install the listed dependencies with
```
npm install
```
Notice that we have three dependencies in our package.json, bedrock, bedrock-express and bedrock-mongodb. These dependencies provide us with the base bedrock package, express capabilities, and interfacing with mongodb.

Now to create our project, we will need to create the main file, "index.js".

To start off, we may place these lines in index.js.

```js
var bedrock = require('bedrock');
var database = require('bedrock-mongodb');
require('bedrock-express');
```

These require statements will pull in bedrock, mongodb, and express to use in our project

To configure mongodb we have to add properties to the bedrock configuration object, as follows:

```js
bedrock.config.mongodb.name = 'bedrock_rest_dev'; // default: bedrock_dev
bedrock.config.mongodb.host = 'localhost';      // default: localhost
bedrock.config.mongodb.port = 27017;            // default: 27017
bedrock.config.mongodb.username = 'bedrock_rest'; // default: bedrock
bedrock.config.mongodb.password = 'password';   // default: password
```

When the code first runs it will ask for the mongodb admin account to set up the project user

Now to set up a collection in mongodb add the following lines:

```js
bedrock.events.on('bedrock-mongodb.ready', function(callback) {
  database.openCollections(['people'], function(err) {
    if(err) {
      return callback(err);
    }
    callback();
  });
});
```
This will create a mongodb collection called people, and expose this collection through
```js
database.collections.people
```

Now to start configuring the api routes add the following code block

```js
bedrock.events.on('bedrock-express.configure.routes', function(app) {

});
```
This is a bedrock event listener, waiting for the event "bedrock-express.configure.routes" to be fired off. This event is triggered by our bedrock-express module once the express module is ready for routes to be added. We add routes to the app object.

Now we can add our different http request types and their corresponding routes to create our rest api.


## Get
To start here is a basic get route to list all the people in our database:
```js
app.get('/users', function(req, res){
  database.collections.people.find({}).toArray(function(err, docs){
    res.send(docs);
  });
});
```
This will find all the people in our database and send them back as a response in array form

## Post

Now to add in the ability to add people:

```js
app.post('/users/:name', function(req, res){
  database.collections.people.insert([{name: req.param("name")}],
   function(err, result){
    res.send(result.result);
  });
});
```
This route demonstrates the use of a parameter in the route, that can then be accessed by using req.param("name").
For example a Post request to /users/TestUser will add the name TestUser to the database.

## Delete

Finally will will add the ability to delete people in the database by sending a delete request.

```js
app.delete('/users/:name', function(req, res){
  database.collections.people.remove({name: req.param("name")},
    function(err, result){
      res.send(result.result);
  });
});
```

## Starting bedrock
Now that we have added all of our routes to the application, we will start the bedrock service by adding this line at the end:

```js
bedrock.start();
```

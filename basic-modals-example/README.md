##Modal Example

The goal of this example is to create a page in which users may click a button, "Add Person", and add a person to a list of people. When the button is clicked, a modal will appear that allows the user to enter information about the person they would like to add to the list.

To start, we must create a file, package.json, to setup our environment.

```json
{
  "name": "bedrock-modal-example",
  "version": "0.0.1",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "bedrock": "^1.0.0",
    "bedrock-express": "^1.4.0",
    "bedrock-server": "^1.0.0",
    "bedrock-views": "^1.5.0",
    "bower": "^1.7.7"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "directories": {},
  "main": "index.js"
}

Now install the dependencies with
```
npm install
```
Notice the dependencies we have in our package.json. Bedrock-express provides us with with express capabilities, while bedrock-views gives us a template for our front-end tasks. Notice that Bower is also included as a dependency to help us manage our front-end necessities.

We will also need to make a bower.json file, so we may have the correct dependencies on the front-end.

Create a file named bower.json with the following
```json
{
  "name": "basic-website",
  "version": "1.0.0",
  "private": true,
  "description": "Bedrock basic website example dependencies.",
  "dependencies": {
    "angular": "~1.3.15",
    "bedrock-angular": "^1.0.0",
    "bedrock-angular-alert": "^1.0.0",
    "bedrock-angular-modal": "^1.0.0"
  },
  "resolutions": {
    "angular": "~1.3.15"
  }
}
```
Now if we run
```
bower install
```
the front end dependencies we need for our project will be installed.

Now, lets create a file, index.js, to help us start our bedrock project.

Place the following in index.js
```javascript
var bedrock = require('bedrock');
var path = require('path');
require('bedrock-express');
require('bedrock-requirejs');
require('bedrock-server');
require('bedrock-views');

bedrock.start();
```

Now, we have everything we need to run bedrock and we can start messing around with bedrock's front-end capabilities.

To run your server and be able to visit it in a browser type the following in your project's directory
```
npm start
```

A server will begin to run and if you visit the localhost:, you will see bedrock-views' home page.

Now, to add on to the template provided we will need to make some additions to index.js

```javascript
var bedrock = require('bedrock');
var path = require('path');

require('bedrock-express');

require('bedrock-requirejs');
require('bedrock-server');

require('bedrock-views');

bedrock.config.views.paths.push(
  path.join(__dirname)
);

var config = bedrock.config;
config.requirejs.config.packages.push({
  name: 'example',
  main: './example.js',
  location: '/bower-components/example'
});
config.requirejs.optimize.config.packages.push({
  name: 'example',
  main: './example.js',
  location: path.join(__dirname, 'example')
});
config.express.static.push({
  route: '/bower-components/example',
  path: path.join(__dirname, 'example')
});
config.requirejs.autoload.push('example');


bedrock.start();
```

These additions will allow us to create a file, index.html, to replace the current bedrock home page's index.html.
We may now also place any code we would like in a folder called example and it will be included with our view as we would like.

So, we may now create a file, index.html, so we may adjust how our page is displayed.
Create an index.html file with the following
```html
{% extends 'layout.html' %}

{% set pageTitle = "App" %}

{% block content %}

<div ng-view></div>

<hr />
<br-demo-warning></br-demo-warning>

{% endblock %}
```
This html file allows us to extend layout.html, which is provided within bedrock-views, and also gives us an area to place our content which we will define soon.

Now, lets create a folder called example where we can start working on some front-end examples.

Now we can create a file called examples.js within our new folder and populate it with the following

```javascript
define([
  'angular'
], function(
  angular
) {

'use strict';

var module = angular.module('app.example', ['bedrock.alert']);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Example',
    templateUrl: requirejs.toUrl('example/example.html')
  });
});

return module.name;

});
```

This javascript will set up angular for us and make it so that when the route, '/' is reached, example.html will be loaded by angular.

Now, lets create a file called "example.html" and see if we are able to load it using our code.

Create a file named "example.html" in the example folder and place the following within it.

```html
<div ng-controller="PeopleController as model">
  <a class="btn btn-default" ng-click="showMyModal=true">Add Person</a>
</div>
```

You may see that our two directives have templates attached to them, person-editor, and trait-adder.

We now need to implement those templates so that when the directive is used, there can be a view for these directives.

To create this, we will now have to create a file called example.html and populate it with the following

```html
<div ng-controller="PeopleController as model">
  <a class="btn btn-default" ng-click="showMyModal=true">Add Person</a>
  <stackable-modal stackable="showMyModal">
    <person-editor/>
  </stackable-modal>
  <div ng-show="people.length > 0">
    <h3>List of people</h3>
    <hr/>
    <ul ng-repeat="person in people">
      <li>
        {{person.name}}
        <ul ng-repeat="trait in person.traits">
          <li>
            {{trait}}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>

<script type="text/ng-template" id="person-editor">
<br-modal br-title="Add a Person to the list">
  <div name="br-modal-body">
    <div>
      <div class="row">
        <div class="col-xs-6">
          Enter a name:
        </div>
        <div class="col-xs-6">
          <input type="text" ng-model="person.name"/>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-6">
          Add a trait
        </div>
        <div class="col-xs-6">
          <a class="btn btn-primary" ng-click="showTraitModal=true">
            Add
          </a>
          <stackable-modal stackable="showTraitModal">
            <trait-adder/>
          </stackable-modal>
        </div>
      </div>
       <h4> {{name}} Traits</h4>
          <ul ng-repeat="trait in person.traits">
            <li>{{trait}}</li>
          </ul>
    </div>
  </div>
  <div name="br-modal-footer">
    <button type="button" class="btn btn-primary" ng-click="ok(person)">Ok</button>
    <button type="button"
      class="btn btn-default stackable-cancel">Cancel</button>
  </div>
</br-modal>
</script>

<script type="text/ng-template" id="trait-adder">
<br-modal br-title="Add a trait for {{person.name}}">
  <div name="br-modal-body">
    <input type = "text" ng-model="trait"/>
  </div>
  <div name="br-modal-footer">
    <button type="button" class="btn btn-primary"
      ng-click="ok(trait)">Ok</button>
    <button type="button"
      class="btn btn-default stackable-cancel">Cancel</button>
  </div>
</br-modal>
</script>
```

This html defines what our two templates will be displayed as when using the directives defined in the javascript using angular's ng-template type.

Also, the html provides us with a link that we may click which will make our stackable modal visible using the ng-show attribute on the stackable.

Using bedrock's stackable-modal allows us to have modals that are stacked on top of one another to provide more freedom with the use of modals on your websites.

Now if you run
```
npm start
```
You will see that if you click the add person link, a modal will show up allowing you to add and edit a person, and also you may add traits for people which will lead to our second modal showing up overtop of the first modal displayed.

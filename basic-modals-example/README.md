##Modal Example

To start, we must create a file, package.json, to setup our environment.

```json
{
  "name": "bedrock-modal-example",
  "version": "0.0.1",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "bedrock": "^0.3.2",
    "bedrock-express": "~0.2.0",
    "bedrock-server": "*",
    "bedrock-views": "*",
    "bower": "~1.3.12"
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
    "angular": "~1.3.10",
    "angular-bootstrap": "~0.12.0",
    "bedrock-angular": "~0.1.0",
    "bedrock-angular-modal":"*",
    "angular-stackables":"*",
    "bedrock-angular-alert":"*",
    "jquery": "~1.11.1",
    "requirejs": "~2.1.15",
    "bootstrap": "~3.3.1"
  },
  "resolutions": {
    "angular": "~1.3.10"
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
  name: 'modals',
  main: './modals.js',
  location: '/bower-components/modals'
});
config.requirejs.optimize.config.packages.push({
  name: 'modals',
  main: './modals.js',
  location: path.join(__dirname, 'modals')
});
config.express.static.push({
  route: '/bower-components/modals',
  path: path.join(__dirname, 'modals')
});
config.requirejs.autoload.push('modals');


bedrock.start();
```

These additions will allow us to create a file, index.html, to replace the current bedrock home page's index.html.
We may now also place any code we would like in a folder called modals and it will be included with our view as we would like.

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

Now, lets create a folder called modals where we can start creating some modals.

Now we can create a file called modals.js within our new folder and populate it with the following

```javascript
define([
  'angular'
], function(
  angular
) {

'use strict';

var module = angular.module('app.modals', []);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Example',
    templateUrl: requirejs.toUrl('modals/Modals.html')
  });
});


/* @ngInject */
module.controller('PersonController', function($scope) {
  $scope.person = {name:"", traits:[]};

});

/* @ngInject */
module.controller('TraitController', function($scope) {
  $scope.trait = '';
});

module.directive('personEditor', function(){
  return{
    restrict: 'E',
    require: '^stackable',
    templateUrl: 'person-editor',
    controller: 'PersonController',
    controllerAs: 'model',
    link: function(scope, element, attrs, stackable) {
      scope.ok = function(person) {
        stackable.close(person);
      };
    }
  };
});

module.directive('traitAdder', function(){
  return{
    restrict: 'E',
    require: '^stackable',
    templateUrl: 'trait-adder',
    controller: 'TraitController',
    controllerAs: 'model',
    link: function(scope, element, attrs, stackable) {
      scope.ok = function(trait) {
        stackable.close(trait);
        console.log(trait);
      };
    }
  };
});

return module.name;

});

```
This javascript will set up angular for us and make it so that when the route, '/' is reached, Modals.html can be loaded by angular. This has also created two angular directives and controllers to represent two modals that we will be creating.

You may see that our two directives have templates attached to them, person-editor, and trait-adder.

We now need to implement those templates so that when the directive is used, there can be a view for these directives.

To create this, we will now have to create a file called Modals.html and populate it with the following

```html
<a class="btn btn-default" ng-click="showMyModal=true">Add Person</a>
<stackable-modal stackable="showMyModal">
  <person-editor/>
</stackable-modal>
<h3>List of people</h3>
<hr/>

<script type="text/ng-template" id="person-editor">
<div class="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <a class="close stackable-cancel">&times;</a>
        <h3 class="modal-title">Add a Person to the list</h3>
      </div>
      <div class="modal-body">
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
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" ng-click="ok(person)">Ok</button>
        <button type="button"
          class="btn btn-default stackable-cancel">Cancel</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div--><!-- /.modal >
</script>

<script type="text/ng-template" id="trait-adder">
<div class="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <a class="close stackable-cancel">&times;</a>
        <h3 class="modal-title">Add a trait for {{person.name}}</h3>
      </div>
      <div class="modal-body">
        <input type = "text" ng-model="trait"/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary"
          ng-click="ok(trait)">Ok</button>
        <button type="button"
          class="btn btn-default stackable-cancel">Cancel</button>
      </div>
    </div>
  </div>
</div>
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
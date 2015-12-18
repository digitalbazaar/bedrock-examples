# angular-basic
angular-basic is a demonstration that shows how an AngularJS component can
be added as a _psuedo bower package_.  This demo utilizes the same directory
structure used by many of the more advanced bedrock modules.  This demo also
demonstrates best practices for defining AngularJS modules, controllers,
and directives.

**Note**:  The angular-minimal demo will require a [host file entry][] for
`bedrock.dev` pointing to `127.0.0.1` (localhost).
## Defining the Psuedo Bower Package
A _psuedo bower package_ is a way to get directories to behave like bower
packages so that bedrock can deal with both bower packages and directories in
a consistent way.  _Psuedo bower packages_ are pushed onto an array that is referenced in bedrock's configuration system as:
```
bedrock.config.requirejs.bower.packages
```
You will find the _pseudo bower package_ configuration for the angular-basic
module in `lib/config.js`.  The `manifest` property in the configuration should
reference the `bower.json` file found in the root of the module.  The `main`
property in `bower.json` references the AngularJS module definition, in
this case `./components/main.js`.  The `name` property in `bower.json` is also
important because it will be used to reference the contents of the _psuedo
bower package_ in the various AngularJS components.
## AngularJS Components
This demo demonstrates best practices for defining AngularJS modules,
controllers, and directives.  Most of the more advanced bedrock modules utilize
the same file and folder structure shown here.
### AngularJS Module Definition
The `main` property in `bower.json` references the AngularJS module definition,
in this case `./components/main.js`.  The `main.js` file is used to define
dependencies and routes for the AngularJS module.
#### Module Declaration
It is important that the `module` declaration in this file specifies a **unique** module name.  This unique module name will serve to name space the additional AngularJS sub-components.
#### Routes
The module definition file should contain the declaration for the routes handled
by the module.  In this case, the route for the root document '/' is assigned to
a template `angular-basic/components/home/home.html`.  Note that the first
element in the path, `angular-basic`, **must** correspond with the name of the
bower package as specified by the `name` property in the `bower.json` file.
#### Sub-component Dependencies
In the `define` function call at the top of the `main.js`, note that there is
a reference to `./home/home` which is a sub-component definition file which
is used to configure controllers and directives.  In more advanced
bedrock modules, sub-components are generally divided by functional area.  For
example, a separate sub-component might be defined for each AngularJS route.
### Sub-component Definition
The controllers and directives used on the home page, are configured in
`components/home/home.js`.  Note the module declaration in this file must
specify a **unique** module name, name spaced by the parent module.
#### HTML Template
As mentioned in the routes section, the template for the root document '/' is
defined in `components/home/home.html`.  Generally, controllers in bedrock use the AngularJS "_Controller As_" syntax as demonstrated here.  The controller's
scope is almost always defined as `model` in bedrock modules.  Therefore,
a controller's variables are referenced by `model.foo` in the template.
#### Controller
A controller is defined in `components/home/home-controller.js` and referenced
in the sub-componenent definition file `components/home/home.js`.  The name
that an HTML template will used to reference the controller is found in the
return of the factory function, `homeController` in this case.  Controller
definitions in bedrock modules always include the variable declaration:
```
var self = this;
```
Therefore, variables and functions that should be exposed to the HTML template
are declared as:
```
self.foo = 'Hello';
self.bar = function() {
  console.log(self.foo);
};
```

#### Directive

## Installation
```
npm install
```
## Running the demo
```
npm start
```
then, direct a web browser to `https://bedrock.dev:18443/`

[host file entry]:http://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/

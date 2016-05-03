# angular-basic

angular-basic is a demonstration of how client-side AMD modules that define
AngularJS components can be added as a _pseudo bower package_. This demo
utilizes the same directory structure used by many of the more advanced bedrock
modules. This demo shows current best practices for defining AngularJS 1.5.x
modules and components in a bedrock-based project.

**Note**: The angular-basic demo will require a [host file entry][] for
`bedrock.dev` pointing to `127.0.0.1` (localhost).

You can read more about building bedrock-based AngularJS components by visiting
[bedrock-angular][].

## Defining the Pseudo Bower Package

Defining a _pseudo bower package_ is a way to get directories to behave like
bower packages so that bedrock can deal with both bower packages and
directories in a consistent way. _Pseudo bower package_ definitions are pushed
onto an array that is referenced in bedrock's configuration system as:

```
bedrock.config.requirejs.bower.packages
```

You will find the _pseudo bower package_ definition for the angular-basic
module in `lib/config.js`.

Adding a _pseudo bower package_ definition will cause bedrock to serve
all files and subdirectories in the `path` in its definition. The `path` used
should be named `components`. This path name is known only to the server, it is
not known to or used by the client. The name used by the client is taken
from the `manifest`.

The `manifest` property in the configuration should reference the `bower.json`
file found in the root of the bedrock module. The `bower.json` file should
specify that the `moduleType` is `amd`; it is currently best practice for all
client-side modules to be written in AMD style.

The `name` property in `bower.json` will be used as the name of the
_pseudo bower package_. This name used to reference the contents of the
package on the client. The URL to a particular file in the
_pseudo bower package_ should be generated on the client by using the global var
`requirejs` and the `name` of the package:

```
requirejs.toUrl('<name>/path/to/file.html')
```

Using this method will ensure that the proper URL is used regardless of
whether bedrock is serving optimized or unoptimized client-side modules.

The `main` property in `bower.json` specifies the script to load when the
package is requested, in this case `./main.js`. This script must define the
main AMD module. This AMD module is responsible for defining and pulling in
all AngularJS components for the _pseudo bower package_.

## Client-side AMD Modules

This demo shows current best practices for using client-side AMD modules to
define AngularJS 1.5.x modules and components. Most of the more advanced
bedrock modules utilize the same file and folder structure shown here.

### Main AMD Module

The `main` property in `bower.json` references the script for the main AMD
module, relative to the package, in this case `./main.js`.

#### Main AngularJS Module Definition

The `main.js` file is used to define the main AngularJS module and any
dependencies and routes for it. It is important that the `angular.module`
declaration in this file specifies an AngularJS module name that is **unique**
throughout the entire project. The name used here is `angular-basic`. This name
is used to namespace any AngularJS submodules, which we refer to as AngularJS
components.

The `main.js` script is also responsible for specifying AMD dependencies
that define the AngularJS components. Once the AMD dependencies have
loaded, the script is responsible for declaring the main AngularJS module
and passing it to each dependency's `register` method, which is the function
they expose as their public API by convention.

#### Routes

The main AMD module file should contain the declaration for the routes handled
by the AngularJS module. Generally, each route serves a single AngularJS
component. In this case, the route for the root document `'/'` is
assigned to an inline template that instantiates the `exHome` component.

### AngularJS Components

In the AMD `define` function call at the top of the `main.js`, note that there
is a reference to `./home-component`. This relative URL will be resolved to
`components/home-component.js` on the server, which is a script containing the
AMD module that defines the `exHome` AngularJS component. This component
will be served from the `'/'` route. A separate AMD module defines each
AngularJS component. There is another component loaded by `main.js` and
defined in `./show-numbers-component`.

The name of a component is found in the `register` function, `exHome` in this
case. Note that a prefix `ex` (for `example`) is prepended to the name of the
component as a best practice. You should always include a prefix of at least
two letters, that is based on the name of your project, to help prevent naming
conflicts. Keep in mind that AngularJS automatically transforms the
component name from camelCase to snake-case. Therefore, the `exHome`
component is referenced in the HTML as `ex-home` and the
`exShowNumbers` component is referenced in the HTML as `ex-show-numbers`.

Note that the `templateUrl` specified by the `exHome` component uses
`angular-basic` as the first element in the path. This corresponds to the name
of the bower package as specified by the `name` property in the `bower.json`
file. This template URL will resolve to `components/home-component.html` on
the server.

Controller definitions in components should always include the variable
declaration:

```
var self = this;
```

Therefore, variables and functions that should be exposed on the controller
(for example, to the HTML template) are declared as:

```
self.foo = 'Hello';

self.bar = function() {
  console.log(self.foo);
};
```

#### HTML Template

As mentioned in the routes section, the root path `'/'` will load the
`exHome` component. This component's template is defined in
`components/home-component.html`. As a best practice, the component's
controller is accessed in the template using the default `$ctrl` name.

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
[bedrock-angular]:https://github.com/digitalbazaar/bedrock-angular

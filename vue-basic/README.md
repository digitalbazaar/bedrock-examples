# vue-basic

vue-basic is a demonstration of how client-side modules that define
Vue components can be added. This demo utilizes the same directory structure
used by many of the more advanced bedrock modules. This demo shows current best
practices for defining Vue 2.5.x components in a bedrock-based project.

**Note**: The vue-basic demo will require a [host file entry][] for
`bedrock.local` pointing to `127.0.0.1` (localhost).

You can read more about building bedrock-based Vue components by visiting
[bedrock-vue][].

## Client-side Modules

This demo shows current best practices for using client-side modules to
define Vue 2.5.x modules and components. Most of the more advanced
bedrock modules utilize the same file and folder structure shown here.

#### Main Vue Component Definition

TODO:

The `index.js` file is used to define the main Vue component. It is important
that the `angular.module` declaration in this file specifies an AngularJS
module name that is **unique** throughout the entire project. The name used
here is `angular-basic`. This name is used to namespace any AngularJS
submodules, which we refer to as AngularJS components.

The `index.js` script is also responsible for specifying AMD dependencies
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

In the AMD `import` function call at the top of the `index.js`, note that there
is a reference to `./home-component`. This relative URL will be resolved to
`components/home-component.js` on the server, which is a script containing the
AMD module that defines the `exHome` AngularJS component. This component
will be served from the `'/'` route. A separate AMD module defines each
AngularJS component. There is another component loaded by `index.js` and
defined in `./show-numbers-component`.

The name of a component is found in the `module.component` function, `exHome` in this
case. Note that a prefix `ex` (for `example`) is prepended to the name of the
component as a best practice. You should always include a prefix of at least
two letters, that is based on the name of your project, to help prevent naming
conflicts. Keep in mind that AngularJS automatically transforms the
component name from camelCase to snake-case. Therefore, the `exHome`
component is referenced in the HTML as `ex-home` and the
`exShowNumbers` component is referenced in the HTML as `ex-show-numbers`.

Note that the `templateUrl` specified by the `exHome` component uses
`angular-basic` as the first element in the path. This template URL will resolve to `components/home-component.html` on
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

then, direct a web browser to `https://bedrock.local:18443/`

[host file entry]:http://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/
[bedrock-angular]:https://github.com/digitalbazaar/bedrock-angular

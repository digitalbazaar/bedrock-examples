# Example Template-Skinning with new Functionality Web Application

This example demonstrates how to substitute templates (or "skin") and
add new functionality in an [AngularJS][] web application built on top of
[bedrock][].

## Installation

```
npm install
```

## Running the unskinned version

```
npm run unskinned
```

## Running the skinned version

```
npm run skinned
```

## Skinning: How To

### A Quick Bedrock Primer

[Bedrock][] is a foundation onwhich to build web applications. It uses a
modular design to help keep code well-organized and to allow a healthy
ecosystem to grow without hindrance.

[Bedrock][] web applications are typically built by installing a backend
[npm][] module, [bedrock-views][], and [bedrock-angular][].

The [bedrock-views][] module, via a dependency [bedrock-requirejs][], expects
all frontend code to behave like a [bower][] package. This means that any
packages you install via [bower][] will be automatically made available to
the browser once you've installed them and restarted your [bedrock][] server.
If you want to serve a directory that isn't in a [bower][] package, you can
manually add a [bower][] manifest for it to [bedrock][]'s configuration system.
This establishes a "pseudo bower package" for your directory, causing it to be
treated just like it was any other [bower][] package.

The [bedrock-angular][] package will create a core, generic [AngularJS][]
application for you, and automatically integrate any [bower][] packages that
contain [AngularJS][] components.

So, taken together, all you should need to do to add new frontend content to
your [bedrock][]-based [AngularJS][] web application is install [bower][]
packages or manually describe directories as if they were [bower][] packages.

### Overview

In this example, a [bedrock][] application consists of an [AngularJS][]
component, "unskinned", that defines a route, a template, a controller for
the route, and a service. It also defines a component, "skinned", that
overrides the "unskinned" template and uses a new controller and directive,
changing its look and feel and functionality. The new component reuses the
existing service.

When the "unskinned" version of the application is run, the application's
main route ("/") will display a registration form with email and password
fields. When "Register" is clicked, a registration service shows an alert
dialog.

When the "skinned" version of the application is run, the main route will
display the registration form, but this time with an additional field: a
password confirmation field. Also, instead of "Register", a "Confirm" button
is shown which will ask for confirmation before submission. Once confirmation
is obtained, the registration service from the unskinned component is used.

When the "unskinned" version starts, it only loads the "unskinned" component
via [bedrock][]'s configuration system. When the "skinned" version starts,
it loads both the "unskinned" component and the "skinned" component,
demonstrating that the "skinned" component's look and feel and functionality
overrides the "unskinned" component's.

Note that if the "skinned" component had no need to reuse any functionality
of the original "unskinned" component, then the "unskinned" component could
simply be uninstalled and replaced by the "skinned" component. However, this
example demonstrates how to reuse parts (in this case, the registration
service) of an existing component. It may be better to separate such a service
into its own component, but sometimes there are reasons not to or that option
is not available to the extender.

### Serving components

Before we can look at how to override a component in the browser, we first
need to learn how [bedrock][] makes components available to the browser. When
components are installed via [bower][] packages, [bedrock][] will automatically
parse their `bower.json` files and make them available to the browser.

Since this is only an example, both the "unskinned" and "skinned" components
aren't installed via [bower][]. So we need to manually update [bedrock][]'s
configuration to tell [bedrock][] to treat them as if they were.

To do this we create a "pseudo bower package" for each component. This can be
seen by looking at the "example-skinned" entry in `configs/skinned.js` or at
the "example-unskinned" entry in `configs/unskinned.js`. This is just a way to
get directories to behave like [bower][] packages, so that [bedrock][] can deal
with both [bower][] packages and directories in a consistent way.

These "pseudo bower packages" are pushed onto an array that is referenced in
[bedrock][]'s configuration system as:

```
bedrock.config.requirejs.bower.packages
```

### Template replacement and new functionality

Now that we know how to serve components, we need to tell [bedrock][] to
override a particular [AngularJS][] template with a different one. By replacing
the template, we can change the look and feel, instantiate a different
controller and load different directives. To do this is another configuration
change. If you look in `configs/skinned.js`, you can see an entry that is added
to a template "overrides" map. The overrides map is referred to in the
configuration system using this key:

```
bedrock.config.views.vars.angular.templates.overrides
```

Both its keys and values are URLs that are relative to [bower][] package names.
Therefore, an entry with a key of `example-unskinned/unskinned.html` and a
value of `example-skinned/skinned.html` will cause the [AngularJS][] application
to use `example-skinned/skinned.html` instead of
`example-unskinned/unskinned.html` whenever it is requested. This configuration
entry is also used by [bedrock][] when optimizing (minification, consolidation,
etc) a web application, ensuring that templates that have been overridden are
not unnecessarily served to the browser.

### Starting bedrock

Starting [bedrock][] involves requiring [bedrock][], setting configuration
values, and calling `bedrock.start`. Since this example demonstrates two
different applications, there are two different scripts that can be used
to start [bedrock][].

To run a [bedrock][] application with an "unskinned" component, run:

```
npm run unskinned
```

The script above will use a configuration file that will cause [bedrock][]
to only load the "unskinned" component. To see how the unskinned application
looks, visit the URL that is logged to the console.

To run a [bedrock][] application with a "skinned" component, run:

```
npm run skinned
```

This script will use an additional configuration file that will cause
[bedrock][] to also load the "skinned" component and to override the
template in the "unskinned" component. The new template calls for the new
controller and directive to be loaded. To see how the skinned application
looks and its new functionality, visit the URL that is logged to the console.

[AngularJS]: https://github.com/angular/angular.js
[bedrock]: https://github.com/digitalbazaar/bedrock
[bedrock-express]: https://github.com/digitalbazaar/bedrock-express
[bedrock-requirejs]: https://github.com/digitalbazaar/bedrock-requirejs
[bedrock-views]: https://github.com/digitalbazaar/bedrock-views
[bedrock-angular]: https://github.com/digitalbazaar/bedrock-angular
[bower]: http://bower.io
[npm]: https://www.npmjs.com

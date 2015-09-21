# Example Website Application

An example of using substitute templates (skinning) with a website application built on top of Bedrock.

# Installation

    npm install

# Running the software

    npm start

# Running the skinned version

    node run-script skin

# Skinning:  How-To
## Overview
A Bedrock module will typically ship with a set of built-in Angular front-end templates.  In this example, the built-in template is `/components/example/example.html`


It is possible to entirely replace a built-in Angular view template with an alternate ‘skin’.  The skin will have access to the same Angular resources (e.g. controllers, directives) as the built-in template.


The built-in template is part of the psuedo bower package called ‘example-unskinned’ which is defined in `/configs/example.js`


The skin is contained in another pseudo bower package called ‘example-skinned’ which is located in `/skin` and is defined in `/configs/skin.js`.  The skin could also be packaged and distributed as an actual bower package.


Once the skin package has been defined, the template replacement is configured by defining the override as shown at the bottom of `/configs/skin.js`.


## Step-by-Step
1. Identify and locate the built-in template.
   1. Navigate to the page on the Bedrock site that you would like to change and note the URL.
      1. In the demo, the URL is the home page or `/`
   1. Locate the definition for the built-in pseudo bower package
      1. The definition is typically found in the following locations:
         1. `/configs`
         2. `/lib/config.js`
      1. A text search using the following command in your module folder can be helpful.
         1. `grep -rnw config.requirejs.bower.packages`
   1. Make note of the path, name and main properties specified in the package definition.
      1. In the example the package is defined in `/configs/example.js`
         1. ‘path’ is defined relative to the config file which in the example is `/components`.
         2. ‘name’ is ‘example-unskinned’
         3. ‘main’ is ‘main.js’
   1. Locate the file specified by the main property in the package definition which is located in the folder defined by the path property.
      1. In the example the file is `/components/main.js`
   1. Locate the Angular route definition.
      1. The Angular route definitions are typically located in the file referenced in Step 1.iv.
      2. Locate the route definition that corresponds to the URL you identified in Step 1.i
   1. Locate the template corresponding to the route.
      1. In the example, the route `/` corresponds to the path ‘example-unskinned/example/example.html’
         1. The first part of this path is the bower package ‘name’ ‘example-unskinned’ which corresponds to the ‘path’ defined in Step 1.iii  Which resolves to `/components/example/example.html`.  This is the file that needs to be skinned.
1. Create a folder inside the Bedrock module to contain the psuedo bower package.
   1. In the example this is the `/skin` folder.
1. Create a directory structure for the skin’s pseudo bower package.
   1. It is easy to mirror the directory structure from the built-in package, however this is not a requirement.
   2. Create a folder `/skin/example`
1. Copy the built-in template
   1. Copy the template file from Step 1.vi into the folder created in step 3.
1. Create a new config file to contain the skin package definition
   1. Model the new config file after the example in `/configs/skin.js`
1. Define a pseudo bower package for the skin
   1. Set the ‘path’ property to correspond to the folder created in Step 2.
   2. Set the ‘name’ property to some unique name.
1. Define the template override in the skin config.
   1. Use the overrides definition found at the bottom of the example in `/configs/skin.js`
   2. The first argument corresponds to the template found in Step 1.vi
   3. The second argument corresponds to the package defined in Step 6 and the path to the new template file from Steps 3 and 4.
1. Save the new config file created in Steps 5 through 7.
1. Copy the Bedrock module launcher.
   1. In the example the launcher is `/index.js`
   2. Copy the launcher to some unique filename.
      1. In the example this is `/index-skin.js`
1. Require the new skin config file in the new launcher.
   1. Below the require() function for the built-in config, require the config file created in Step 5.
      1. In the example this is: `require(‘./configs/skin’)`;
1. Start the Bedrock module using the new launcher.
   1. In the example this is done with `node index-skin.js`
1. Test the new configuration
   1. Browse to the URL identified in Step 1.i
   2. At this point, the page should load successfully and appear just as it did before.
1. Modify the template
   1. Make changes to the copy of the built-in template that was created in Step 4.
   2. Save the template file.
1. View Changes
   1. While in development mode, changes made to Angular templates are are immediately available.
   2. The changes can be viewed by refreshing the page in the browser.
   3. There is no need to restart the Bedrock module to view template changes.

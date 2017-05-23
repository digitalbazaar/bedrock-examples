/* global SystemJS */
(async function() {

console.log('configuring system js');

SystemJS.config({
  baseURL: '/bower-components',
  map: {
    'plugin-babel': '/system/plugin-babel/plugin-babel.js',
    'systemjs-babel-build': '/system/plugin-babel/systemjs-babel-browser.js',
//    'package-plugin': '/system/package-loader-plugin.js'
  },
  meta: {
    '*.js': {
      babelOptions: {
        es2015: false
      }
    }//,
    // '*.json': {
    //   loader: 'package-plugin'
    // }
  },
  packageConfigPaths: [
    '/bower-components/*/bower.json'
  ],
  packages: {
    angular: {
      main: './angular.js',
      format: 'global',
      defaultExtension: 'js'
    },
    jsonld: {
      main: './js/jsonld.js',
      defaultExtension: 'js'
    }
  },
  transpiler: 'plugin-babel'
});

const angular = await SystemJS.import('angular');
const bedrock = await SystemJS.import('bedrock-angular/main.js');

// TODO: remove requirejs shim
global.requirejs = {};
requirejs.toUrl = x => x;

await SystemJS.import('/system/importAll.js');

//await SystemJS.import('angular-basic');

console.log('bootstrapping application');

bedrock.bootstrap(
  angular.module('root', ['bedrock', 'angular-basic'])
);

})();

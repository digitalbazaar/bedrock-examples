(async function() {

console.log('configuring system js');

SystemJS.config({
  baseURL: '/bower-components',
  map: {
    'requirejs/events': '/requirejs/events.js',
    'plugin-babel': '/systemjs/plugin-babel/plugin-babel.js',
    'systemjs-babel-build': '/systemjs/plugin-babel/systemjs-babel-browser.js'
  },
  meta: {
    '*.js': {
      babelOptions: {
        es2015: false
      }
    }
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
    'bedrock-angular': {
      main: './main.js',
      defaultExtension: 'js'
    },
    jsonld: {
      main: './js/jsonld.js',
      defaultExtension: 'js'
    }
  },
  // paths: {
  //   '*': '/bower-components/*'
  // },
  transpiler: 'plugin-babel'
});

const events = await SystemJS.import('requirejs/events');
const brAngular = await SystemJS.import('bedrock-angular');

events.emit('bedrock-requirejs.init', [events, brAngular]);

global.requirejs = {};
requirejs.toUrl = x => x;

await Promise.all([
  // TODO: load all the things
  SystemJS.import('angular-basic')
]);

events.emit('bedrock-requirejs.ready');

})();

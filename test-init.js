// // Tun on full stack traces in errors to help debugging
Error.stackTraceLimit=Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

System.config({
  baseURL: '/base/',
  defaultJSExtensions: true,
  paths: {
    'cx/*': 'build/cx/*.js',
    'mocks/*': 'build/mocks/*.js'
  }
});

// Import all the specs, execute their `main()` method and kick off Karma (Jasmine).
Promise.all(
  Object.keys(window.__karma__.files) // All files served by Karma.
  .filter(onlySpecFiles)
  .map(function(path) {
    return System.import(path).then(function(module) {
      if (module.hasOwnProperty('main')) {
        module.main();
      } else {
        throw new Error('Module ' + path + ' does not implement main() method.');
      }
    });
}))
.then(function() {
  __karma__.start();
}, function(error) {
  __karma__.error(error.stack || error);
});


function onlySpecFiles(path) {
  return /\.spec\.js$/.test(path);
}
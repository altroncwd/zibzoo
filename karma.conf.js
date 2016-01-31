// Karma configuration
// Generated on Mon Jan 18 2016 13:44:53 GMT-0800 (PST)

module.exports = function (config) {
  var configuration = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
    // angular-files
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/socket.io-client/socket.io.js',

      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/fastclick/lib/fastclick.js',
      'node_modules/viewport-units-buggyfill/viewport-units-buggyfill.js',
      'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
      'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
      'node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js',
      'node_modules/angular-foundation/mm-foundation.js',
      'node_modules/angular-foundation/mm-foundation-tpls.js',
      'node_modules/lodash/lodash.js',

    // client source
      'client/**/*.js',

    // client test
      'spec/client/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      'client/build/**/*.js',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'nyan', 'html'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Custom Chrome settings for Travis CI
    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['ChromeTravisCi'];
  }

  config.set(configuration);
};

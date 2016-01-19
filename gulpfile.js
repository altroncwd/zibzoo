
// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var gulp     = require('gulp');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');

// Check for --production flag
var isProduction = !!(argv.production);

// 2. FILE PATHS
// - - - - - - - - - - - - - - -

var paths = {
  assets: [
    './client/assets/**/*.*',
    '!./client/assets/scss/**/*.*'
  ],
  // Sass will check these folders for files when you use @import.
  sass: [
    'node_modules/foundation-sites/scss',
    'node_modules/font-awesome/scss',
    'node_modules/font-awesome/fonts'
  ],
  // These files are for the app's JavaScript
  appJS: [
    'node_modules/angular/angular.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
    'node_modules/fastclick/lib/fastclick.js',
    'node_modules/viewport-units-buggyfill/viewport-units-buggyfill.js',
    'node_modules/angular-foundation/mm-foundation.js',
    'node_modules/underscore/underscore.js',
    'client/app/**/*.*js'
  ]
}

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./client/build', cb);
});

// Copies everything in the client assets folder except Sass
gulp.task('copy', function() {
  return gulp.src(paths.assets, {
    base: './client/'
  })
    .pipe(gulp.dest('./client/build'))
  ;
});

// Compiles Sass
gulp.task('sass', function () {
  return gulp.src('./client/assets/scss/app.scss')
    .pipe($.sass({
      includePaths: paths.sass,
      outputStyle: (isProduction ? 'compressed' : 'nested'),
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
    }))
    .pipe(gulp.dest('./client/build/assets/css/'))
  ;
});

// Compiles and copies all the app's JavaScript
gulp.task('uglify', ['uglify:app'])

gulp.task('uglify:app', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(paths.appJS)
    .pipe(uglify)
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('./client/build/assets/js/'))
  ;
});

// Builds entire app once
gulp.task('build', function(cb) {
  sequence('clean', ['copy', 'sass', 'uglify'], cb);
});

// Default task: builds app and recompiles assets when they change
gulp.task('default', ['build'], function () {
  // Watch Sass
  gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch(['./client/app/**/*', './app/**/*'], ['uglify:app']);
});
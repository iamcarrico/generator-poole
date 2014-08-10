var gulp = require('gulp');

var paths = require('compass-options').dirs();
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var cp = require('child_process');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var deploy = require("gulp-gh-pages");

paths.imagesSrc = '_images/**/*';
paths.assets = '_site/assets';
paths.jekyll = ['**/*.html', '**/*.md', '!_site/**/*.html', '!node_modules/**/*'];

gulp.task('sass', function() {
  browserSync.notify('<span style="color: grey">Running:</span> Sass compiling');
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: paths.css,
      sass: paths.sass,
      bundle_exec: true,
      time: true
    }))
    .pipe(prefix("last 2 versions", "> 1%"))
    .pipe(gulp.dest(paths.css))
    .pipe(gulp.dest(paths.assets))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function() {
  return gulp.src(paths.imagesSrc)
    // Only grab the images that have changed.
    .pipe(changed(paths.img))
    // Optimize all the images.
    .pipe(imagemin({optimizationLevel: 5}))
    // Put them in the images directory.
    .pipe(gulp.dest(paths.img));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.sass + '/**/*.scss', ['sass']);
  gulp.watch(paths.imagesSrc, function() {
    runSequence(['images'], ['jekyll-rebuild'])
  });
  gulp.watch(paths.jekyll, ['jekyll-rebuild']);
});


//////////////////////////////
// BrowserSync Task
//////////////////////////////
gulp.task('browserSync', function () {
  browserSync.init([
    '_site/' + paths.assets +  '/**/*.css',
    '_site/**/*.html',
  ], {
    server: {
      baseDir: '_site'
    }
  });
});

// Our 'build' tasks for jekyll server.
gulp.task('jekyll-build', function (done) {
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll', ['jekyll-build']);

// Our 'dev' tasks for jekyll server, note: it builds the files, but uses extra configuration.
gulp.task('jekyll-dev', function (done) {
  browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');
  return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--config=_config.yml,_config.dev.yml'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-rebuild', function() {
  return runSequence(['jekyll-dev'], function () {
      browserSync.reload();
  });
});

// Development server
gulp.task('server', function(cb) {
  return runSequence(['images', 'sass'],
    'jekyll-dev',
    ['browserSync', 'watch'],
    cb
  );
});

gulp.task('serve', ['server']);

// Build site for production.
gulp.task('build', function(cb) {
  return runSequence(['sass', 'images'],
    'jekyll-build',
    cb
  );
});

// Deploy code
gulp.task('deploy', function(cb) {
  return runSequence(
    'build',
    'gh-pages',
    cb
  );
});

// Publish code to GitHub Pages branch.
gulp.task('gh-pages', function () {
  gulp.src("./_site/**/*")
    .pipe(deploy({
      cacheDir: '.tmp'
    })).pipe(gulp.dest('/tmp/gh-pages')); ;
});

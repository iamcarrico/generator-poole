var gulp = require('gulp');

var sass = require('gulp-ruby-sass'),
    minifyCSS = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin');
    
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
  sass: ['_sass/style.scss'],
  css: 'css',
  imagesSrc: ['_images/**/*'],
  imagesDest: ['img']
}

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass({
      sourcemap: true,
      bundleExec: true,
      loadPath: [
        'bower_components/singularity/stylesheets',
        'bower_components/breakpoint-sass/stylesheets',
        'bower_components/sass-toolkit/stylesheets',
      ]
    }))
    .pipe(gulp.dest(paths.css));
});

gulp.task('cssMin', function() {
  return gulp.src(paths.css . '/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.css));
});

gulp.task('images', function() {
  return gulp.src(paths.imagesSrc)
    // Only grab the images that have changed.
    .pipe(changed(paths.imagesDest))
    // Optimize all the images.
    .pipe(imagemin({optimizationLevel: 5}))
    // Put them in the images directory.
    .pipe(gulp.dest(paths.imagesDest));
});

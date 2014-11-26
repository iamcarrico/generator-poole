/*global describe, beforeEach, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var cp = require('child_process');
var gulp = require('gulp');

describe('Mr. Poole\'s gulp tools', function () {
  before('create and install all needed components', function (done) {
    this.timeout(3000000);
    helpers.testDirectory(path.join(__dirname, '.tmp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('poole:app', [
      '../../app'
      ]);

      helpers.mockPrompt(this.app, {
        'projectName': 'Sample Test Jekyll Site',
        'projectUrl': 'https://github.com/iamcarrico/generator-poole',
        'description': 'A little description didn\'t hurt nobody',
        'projectRepo': 'git@github.com:iamcarrico/generator-poole.git'
      });

      this.app.options['skip-welcome-message'] = true;
      this.app.run({}, function () {}).on('end', done);
    }.bind(this));
  });

  // First, we need to compile our Sass.
  it('can compile our Sass', function(done) {
    this.timeout(9000);

    require('gulp-poole')(gulp);

    // Start a gulp task for building.
    gulp.start('sass', function() {
      // The only file that comes from this is the style.css. Everything
      // else is tested from within the gulp plugin itself.
      helpers.assertFile(['css/style.css']);
      done();
    });
  });

  // Can Jekyll run without dying?
  it('can build a Jekyll site', function(done) {
    // Just in case, we are adding some extra time.
    this.timeout(15000);

    return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
      .on('close', function() {
        // Just checking if the index got in there.
        helpers.assertFile(['_site/index.html']);
        done();
    });
  });

  // We will test the gulp tools just by building the site.
  it('can run the gulp tools', function(done) {
    // Just in case, we are adding some extra time.
    this.timeout(15000);

    require('gulp-poole')(gulp);

    // Start a gulp task for building.
    gulp.start('build', function() {
      // The only file that comes from this is the style.css. Everything
      // else is tested from within the gulp plugin itself.
      helpers.assertFile(['css/style.css']);
      done();
    });
  });
});

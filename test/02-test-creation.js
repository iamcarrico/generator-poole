/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var postTitle = '2014-01-01-this-is-my-title.md';

describe('Mr. Poole', function () {

  before('sets up our test generators', function (done) {
    helpers.testDirectory(path.join(__dirname, '.tmp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('poole:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'corona:app'
        ]
      ]);

      this.post = helpers.createGenerator('poole:post', [
        '../../post'
      ]);

      this.publish = helpers.createGenerator('poole:publish', [
        '../../publish'
      ]);

      this.unpublish = helpers.createGenerator('poole:unpublish', [
        '../../unpublish',
        '../../publish'
      ]);
      done();
    }.bind(this));
  });

  it('can create expected files', function(done) {

    var expected = [
      '.editorconfig',
      'Gemfile',
      'package.json',
      'gulpfile.js'
    ];

    helpers.mockPrompt(this.app, {
      'projectName': 'Sample Jekyll Site',
      'projectUrl': 'https://github.com/iamcarrico/generator-poole',
      'description': 'A little description didn\'t hurt nobody',
      'projectRepo': 'git@github.com:iamcarrico/generator-poole.git'
    });
    this.app.options['skip-install'] = true;
    this.app.options['skip-welcome-message'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  // Can we create our own post, and save it as a draft.
  it('can create draft post', function (done) {
    helpers.mockPrompt(this.post, {
      'postTitle': 'This is My Title',
      'postDate': '2014-01-01',
      'postTime': '12:01:02',
      'postCategories': 'apples, bananas, oranges',
      'postDraft': '_drafts'
    });

    this.post.run({}, function() {
      helpers.assertFile(['_drafts/' + postTitle]);
      done();
    });
  });

  // Now, we run the publisher subgenerator, which will just take that last post
  // and move it to the _posts file.
  it('can publish my draft', function(done) {
    helpers.mockPrompt(this.publish, {
      'draftToPublish': postTitle
    });

    this.publish.run({}, function() {
      helpers.assertFile(['_posts/' + postTitle]);
      done();
    })
  });

  // Now, we run the unpublisher subgenerator, which will take that post and
  // move it right back to drafts.
  it('can unpublish my post', function(done) {
    // Note: this doesn't actually use the unpublish generator yet, as it isn't
    // passing forward the prompts correctly. But this does a similar thing.

    helpers.mockPrompt(this.publish, {
      'draftToPublish': postTitle
    });

    this.publish.options['unpublish'] = true;
    this.publish.run({}, function() {
      helpers.assertFile(['_drafts/' + postTitle]);
      done();
    })
  });
});

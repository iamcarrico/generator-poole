
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _s = require('underscore.string');
var shared = require('../shared.js');

var PoolePostGenerator = yeoman.generators.Base.extend({
  init: function () {

  }
});

PoolePostGenerator.prototype.loadUp = function() {
  var cb = this.async();

  var config = this.config.getAll();

  for (var i in config) {
    this[i] = config[i];
  }

  cb();
};

PoolePostGenerator.prototype.askFor = function() {
  var cb = this.async();

  var required = chalk.red(' (Required)');

  var prompts = [
    {
      type: 'string',
      name: 'postTitle',
      message: 'What is the tile of your post?' + required,
      validate: function (input) {
        if (input === '') {
          return 'Please enter a title';
        }
        return true;
      }
    },
    {
      type: 'string',
      name: 'postDate',
      message: 'What is the date of your post?' + required,
      validate: shared.checkDate,
      default: shared.today(),
    },
    {
      type: 'string',
      name: 'postTime',
      message: 'What is the time of the post post?' + required,
      validate: shared.checkTime,
      default: shared.now(),
    },
    {
      type: 'string',
      name: 'postCategories',
      message: 'What categories do you want to add to post? ' + chalk.green('(Separate multiple values with commas)')
    },
    {
      type: 'list',
      name: 'postDraft',
      message: 'Is this a draft or a post?',
      choices: [
        { name: 'Post', value: '_posts' },
        { name: 'Draft', value: '_drafts'}
      ],
      default: '_drafts'
    }
  ];

  this.prompt(prompts, function (props) {
    this.postTitle = props.postTitle;
    this.postSlug = _s.slugify(props.postTitle);
    this.postDate = props.postDate;
    this.postTime = props.postTime;
    // Grab all categories, split them into a CSV, then trim all whitespace.
    this.postCategories = props.postCategories.split(',').map(Function.prototype.call, String.prototype.trim);
    this.postDraft = props.postDraft;

    cb();
  }.bind(this));
};

PoolePostGenerator.prototype.makePost = function() {

  this.template('_post.md', this.postDraft + '/' + this.postDate + '-' + this.postSlug + '.md');
};

module.exports = PoolePostGenerator;

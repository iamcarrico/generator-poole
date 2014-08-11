'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var shared = require('../shared.js');

var orderOfItAll = [
  "_drafts",
  "_posts"
]

var PoolePublishGenerator = yeoman.generators.Base.extend({
  init: function () {

  }
});

PoolePublishGenerator.prototype.loadUp = function() {
  var cb = this.async();

  var config = this.config.getAll();

  for (var i in config) {
    this[i] = config[i];
  }

  if (this.options['unpublish']) {
    orderOfItAll.reverse();
    this.publish = false;
  }
  else {
    this.publish = true;
  }

  cb();
};

PoolePublishGenerator.prototype.loadFiles = function() {
  var cb = this.async();
  var self = this;

  fs.readdir(orderOfItAll[0], function(err, files) {
    if (err) {
      self.log(chalk.red('Error: ') + 'There was an error trying to read the \'' + orderOfItAll[0] + '\' directory. Is it there?');
      return false;
    }

    files = files.filter(function(element) {
      return element.match(/^\d{4}-\d{2}-\d{2}-(.*)$/);
    });

    if (files.length === 0) {
      if (self.publish) {
        self.log(chalk.red('Error: ') + 'There are no drafts that can be published');
      }
      else {
        self.log(chalk.red('Error: ') + 'There are no posts that can be unpublished');
      }

      return false;
    }

    self.fileList = files;
    cb();
  });

}

PoolePublishGenerator.prototype.askFor = function() {
  var cb = this.async();

  this.fileList.unshift({
    name: 'None (cancel)', value: false
  });

  var message = "Which draft would you like to publish?";

  if (!this.publish) {
    message = "Which post would you like to unpublish?";
  }

  var prompts = [
    {
      type: 'list',
      name: 'draftToPublish',
      message: message,
      choices: this.fileList,
      default: false
    }
  ];

  this.prompt(prompts, function (props) {
    if (!props.draftToPublish) {
      this.log('Operation canceled.');
      return false;
    }

    this.draftToPublish = props.draftToPublish;

    cb();
  }.bind(this));
};

PoolePublishGenerator.prototype.publishDraft = function() {
  var cb = this.async();
  var self = this;

  fs.rename(orderOfItAll[0] + '/' + self.draftToPublish, orderOfItAll[1] + '/' + self.draftToPublish, function() {
    if (this.publish) {
      self.log(chalk.green('Success! ') + self.draftToPublish + ' successfully published');
    }
    else {
      self.log(chalk.green('Success! ') + self.draftToPublish + ' successfully unpublished');
    }
    cb();
  });
}

module.exports = PoolePublishGenerator;

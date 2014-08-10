
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var shared = require('../shared.js');

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

  cb();
};

PoolePublishGenerator.prototype.loadFiles = function() {
  var cb = this.async();
  var self = this;

  fs.readdir('_drafts', function(err, files) {
    if (err) {
      self.log(chalk.red('Error: ') + 'There was an error trying to read the \'_drafts\' directory. Is it there?');
      return false;
    }

    if (files.length === 0) {
      self.log(chalk.red('Error: ') + 'There are no drafts that can be published');
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
  })

  var prompts = [
    {
      type: 'list',
      name: 'draftToPublish',
      message: 'Which draft would you like to publish?',
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

  fs.rename('_drafts/' + this.draftToPublish, '_posts/' + this.draftToPublish, function() {
    this.log(chalk.green('Success! ') + this.draftToPublish + ' successfully published');
    cb();
  });
}

module.exports = PoolePublishGenerator;

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var sh = require('execSync');
var _s = require('underscore.string');
var fs = require('fs');
var shared = require('../shared.js');

var PooleGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      //////////////////////////////
      // Move Yo Storage
      //////////////////////////////
      fs.renameSync('../.yo-rc.json', '.yo-rc.json');

      //////////////////////////////
      // Install dependencies unless --skip-install is passed
      //////////////////////////////
      if (!this.options['skip-install']) {
        // Leaving this in case we want to add it to be optional later.
        var bower = false;
        var npm = true;

        // Install all of the gems that we need.
        this.spawnCommand('bundle', ['install', '--path=vendor/bundle']);

        if (bower || npm) {
          this.installDependencies({
            bower: bower,
            npm: npm
          });
        }
      }

      //////////////////////////////
      // If the --git flag is passed, initialize git and add for initial commit
      //////////////////////////////
      if (this.options['git']) {
        sh.run('git init');
        sh.run('git add . && git commit -m "Mr. Poole\'s Generation"');
      }
    });
  }
});


PooleGenerator.prototype.welcome = function() {
  var cb = this.async();
  if (!this.options['skip-welcome-message']) {

    this.log(shared.welcome());
    this.log(
      chalk.green(
        'This generator will create the scaffolding for a full Jekyll site, complete with smarter Gulp settings, and deployment methods. ' + '\n'
      )
    );
  }

  cb();
};

PooleGenerator.prototype.askfor = function() {
  var cb = this.async();

  // Have Yeoman greet the user.
  //this.log(shared.welcome());

  var prompts = [
    {
      type: 'string',
      name: 'projectName',
      message: 'What\'s your projects\'s name?' + chalk.red(' (Required)'),
      validate: function (input) {
        if (input === '') {
          return 'Please enter your projects\'s name';
        }
        return true;
      }
    },
    {
      type: 'string',
      name: 'projectUrl',
      message: 'What\'s your projects\'s URL?' + chalk.red(' (Required)'),
      validate: function (input) {
        if (input === '') {
          return 'Please enter your projects\'s URL';
        }
        return true;
      }
    },
    {
      type: 'string',
      name: 'description',
      message: 'What\'s your projects\'s description?',
      default: 'My Jekyll site.'
    },
    {
      type: 'string',
      name: 'projectRepo',
      message: 'What\'s your projects\'s repository?'
    }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.projectSlug = _s.underscored(props.projectName);
    this.projectUrl = props.projectUrl;
    this.description = props.description;
    this.projectRepo = props.projectRepo;


    this.config.set('projectName', this.projectName);
    this.config.set('projectSlug', this.projectSlug);
    this.config.set('projectUrl', this.projectUrl);
    this.config.set('description', this.description);
    this.config.set('projectRepo', this.projectRepo);

    // Format date for posts
    this.currentDate = shared.today();
    this.currentTime = shared.now();

    cb();
  }.bind(this));
};

PooleGenerator.prototype.app = function() {
  // Create our project directory.
  this.mkdir(this.projectSlug);

  // Set our destination to be the new directory.
  this.destinationRoot(this.projectSlug);

  // Base settings files.
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('bowerrc', '.bowerrc');

  // Other files
  this.copy('gulpfile.js', 'gulpfile.js');
  this.copy('index.html', 'index.html');
  this.copy('about.md', 'about.md');
  this.copy('feed.xml', 'feed.xml');
  this.copy('_config.dev.yml', '_config.dev.yml');
  this.copy('404.md', '404.md');
  this.copy('Gemfile', 'Gemfile');
  this.copy('config.rb', 'config.rb');


  var keep = ['_images', 'fonts', 'js'];
  for (var i in keep) {
    this.copy('gitkeep', '' + keep[i] + '/.gitkeep');
  }

  // Folders that will be directly copied over.
  this.directory('_includes', '_includes');
  this.directory('_layouts', '_layouts');
  this.directory('_sass', '_sass');
  this.directory('_data', '_data');
  this.directory('_plugins', '_plugins');


  // Files that need to be templated.
  this.template('_package.json', 'package.json');
  //this.template('_bower.json', 'bower.json');
  this.template('_config.yml', '_config.yml');
  this.template('_posts/firstpost.md', '_posts/' + this.currentDate + '-welcome-to-poole.md');
};

module.exports = PooleGenerator;

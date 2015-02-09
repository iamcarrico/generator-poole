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
  initializing: function () {
    if (!this.options['skip-welcome-message']) {

      this.log(shared.welcome());
      this.log(
        chalk.green(
          'This generator will create the scaffolding for a full Jekyll site, complete with smarter Gulp settings, and deployment methods. ' + '\n'
        )
      );
    }

    this.pkg = require('../package.json');

    this.on('end', function () {
      //////////////////////////////
      // If the --git flag is passed, initialize git and add for initial commit
      //////////////////////////////
      if (this.options['git']) {
        sh.run('git init');
        sh.run('git add . && git commit -m "Mr. Poole\'s Generation"');
      }
    });
  },

  // Prompting tasks.
  prompting: function() {
    var cb = this.async();

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

      // Create our project directory.
      this.mkdir(this.projectSlug);
      // We are going to put everything into this sub-root.
      this.destinationRoot(this.projectSlug);

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
  },

  // Configuration files.
  configuring: function() {
    // Base settings files.
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('bowerrc', '.bowerrc');
  },

  writing: {
    // Default task level.
    app: function() {

      // Run with the Corona Sass Generator. We are putting this in the
      // intializing because we want to override a few things.
      this.composeWith('corona:app', {
        options: {
          cssDir: 'css',
          sassDir: '_sass',
          fontsDir: 'fonts',
          'skip-install': true,
          'skip-welcome-message': true,
          'skip-gemfile': true
        }
      });

      // Other files
      this.copy('gulpfile.js', 'gulpfile.js');
      this.copy('index.html', 'index.html');
      this.copy('about.md', 'about.md');
      this.copy('feed.xml', 'feed.xml');
      this.copy('_config.dev.yml', '_config.dev.yml');
      this.copy('404.md', '404.md');


      var keep = ['_images', 'fonts', 'js'];
      for (var i in keep) {
        this.copy('gitkeep', '' + keep[i] + '/.gitkeep');
      }

      // Folders that will be directly copied over.
      this.directory('_includes', '_includes');
      this.directory('_layouts', '_layouts');
      this.directory('_data', '_data');
      this.directory('_plugins', '_plugins');


      // Files that need to be templated.
      this.template('_package.json', 'package.json');
      this.template('_config.yml', '_config.yml');
      this.template('_posts/firstpost.md', '_posts/' + this.currentDate + '-welcome-to-poole.md');

      // We must use our Gemfile, not te one in
      this.copy('Gemfile', 'Gemfile');
    }
  },

  // Installation tasks to happen before end is called.
  install: function () {
    var cb = this.async();
    //////////////////////////////
    // Install dependencies unless --skip-install is passed
    //////////////////////////////
    if (!this.options['skip-install']) {

      this.installDependencies({
        npm: true,
        bower: false,
      });

      // Install our bundler components into the .vendor/bundle path, to ensure
      // no issues if users have differing environments.
      this.spawnCommand('bundle', ['install', '--path=.vendor/bundle'])
        .on('close', cb);
    }
    else {
      cb();
    }
  }
});

module.exports = PooleGenerator;

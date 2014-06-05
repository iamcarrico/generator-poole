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
      process.chdir(this.projectSlug);

      //////////////////////////////
      // Install dependencies unless --skip-install is passed
      //////////////////////////////
      if (!this.options['skip-install']) {
        var bower = this.projectOptions.indexOf('Bower') > -1 ? true : false;
        var npm = this.projectOptions.indexOf('Gulp') > -1 ? true : false;

        sh.run('bundle install --path vendor/bundle');

        if (bower || npm) {
          this.installDependencies({
            bower: bower,
            npm: npm
          });
        }
      }

      //////////////////////////////
      // Move Yo Storage
      //////////////////////////////
      fs.renameSync('../.yo-rc.json', '.yo-rc.json');

      //////////////////////////////
      // If the --git flag is passed, initialize git and add for initial commit
      //////////////////////////////
      sh.run('git init');
      sh.run('git add . && git commit -m "Mr. Poole\'s Generation"');
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(shared.welcome());

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
      shared.extras()
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.projectSlug = _s.slugify(props.projectName);
      this.projectOptions = props.projectOptions;


      this.config.set('projectName', this.projectName);
      this.config.set('projectSlug', this.projectSlug);
      this.config.set('projectOptions', this.projectOptions);

      // Format date for posts
      var date = new Date();
      this.currentDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      this.config.set('currentDate', this.currentDate);


      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir(this.projectSlug);

    // Base settings files.
    this.copy('editorconfig', this.projectSlug + '/.editorconfig');
    this.copy('jshintrc', this.projectSlug + '/.jshintrc');
    this.copy('gitignore', this.projectSlug + '/.gitignore');
    this.copy('bowerrc', this.projectSlug + '/.bowerrc');
    this.copy('Gemfile', this.projectSlug + '/Gemfile');

    // Other files
    this.copy('gulpfile.js', this.projectSlug + '/gulpfile.js');
    this.copy('index.html', this.projectSlug + '/index.html');
    this.copy('feed.xml', this.projectSlug + '/feed.xml');


    var keep = ['img', 'fonts', 'js'];
    for (var i in keep) {
      this.copy('gitkeep', this.projectSlug + '/' + keep[i] + '/.gitkeep');
    }

    // Folders that will be directly copied over.
    this.directory('_includes', this.projectSlug + '/_includes');
    this.directory('_layouts', this.projectSlug + '/_layouts');
    this.directory('_sass', this.projectSlug + '/_sass');


    // Files that need to be templated.
    this.template('_package.json', this.projectSlug + '/package.json');
    this.template('_bower.json', this.projectSlug + '/bower.json');
    this.template('_posts/firstpost.md', this.projectSlug + '/_posts/' + this.currentDate + '-welcome-to-poole.md');
  },
});

module.exports = PooleGenerator;

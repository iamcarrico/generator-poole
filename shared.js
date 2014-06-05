'use strict';
var chalk = require('chalk');

module.exports.welcome = function () {
  return '\n';
};

module.exports.extras = function () {
  return {
    type: 'checkbox',
    name: 'projectOptions',
    message: 'What options would you like to include?',
    choices: ['Gulp', 'Bower']
  };
};

module.exports.links = function () {
  return chalk.grey('\nhttp://github.com/iamcarrico/generator-poole') + ' - ' + chalk.grey('http://iamcarrico.github.io/generator-poole/\n');
};

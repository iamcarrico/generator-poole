'use strict'

var chalk = require('chalk');

module.exports.today = function () {
  var date = new Date();
  return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

module.exports.checkDate = function (val) {
  var re = /^\d{4}-\d{2}-\d{2}$/;

  if (val.match(re)) {
    return true;
  }

  return 'All dates must be YYYY-MM-DD';
}

module.exports.now = function () {
  var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
      s = (d.getSeconds()<10?'0':'') + d.getSeconds();

  return h + ':' + m + ':' + s;
}

module.exports.checkTime = function (val) {
  var re = /^\d{2}:\d{2}:\d{2}$/;

  if (val.match(re)) {
    return true;
  }

  return 'All times must be HH:MM:SS';
}

module.exports.welcome = function() {
  return '\n ' +
  '\n ' + chalk.red('.___  ___. .______                    ') + chalk.grey('_-----_') +
  '\n ' + chalk.red('|   \\/   | |   _  \\                   ') + chalk.grey('| - - |') +
  '\n ' + chalk.red('|  \\  /  | |  |_)  |                  ') + chalk.grey('|  ω  |') +
  '\n ' + chalk.red('|  |\\/|  | |      /                   ') + chalk.grey('| ___ |') +
  '\n ' + chalk.red('|  |  |  | |  |\\  \\      __          ') + chalk.grey("__'.___.'__") +
  '\n ' + chalk.red('|__|  |__| | _| `.__\\   (__)        ') + chalk.grey('´    >-<    `') +
  '\n ' + chalk.red('.______     ______     ______    __       _______') +
  '\n ' + chalk.red('|   _  \\   /  __  \\   /  __  \\  |  |     |   ____|') +
  '\n ' + chalk.red('|  |_)  | |  |  |  | |  |  |  | |  |     |  |__') +
  '\n ' + chalk.red('|   ___/  |  |  |  | |  |  |  | |  |     |   __|') +
  '\n ' + chalk.red("|  |      |  `--'  | |  `--'  | |  `----.|  |____") +
  '\n ' + chalk.red('| _|       \\______/   \\______/  |_______||_______|') + '\n';
}

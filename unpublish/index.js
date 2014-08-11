'use strict';

var yeoman = require('yeoman-generator');

var PooleUnPublishGenerator = yeoman.generators.Base.extend({
  init: function () {

  }
});

PooleUnPublishGenerator.prototype.callIt = function() {
  var cb = this.async();
  this.invoke("poole:publish", {options: {unpublish: true}}, cb);
};

module.exports = PooleUnPublishGenerator;

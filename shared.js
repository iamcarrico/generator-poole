'use strict'


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

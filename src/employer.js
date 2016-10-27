var fs = require("fs");

module.exports = function () {
  var jobs = fs.readdirSync(__dirname + "/jobs");
  for (var i in jobs) {
    var job = jobs[i];
    require(__dirname + "/jobs/" + job)();
  }
};
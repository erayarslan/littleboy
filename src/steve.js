var fs = require("fs");

module.exports = function () {
  var apps = fs.readdirSync(__dirname + "/apps");
  for (var i in apps) {
    var app = apps[i];
    require(__dirname + "/apps/" + app)();
  }
};
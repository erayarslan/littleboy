var spawner = require(__dirname + "/spawner");
var config = require(__dirname + "/config");
var ports = db("ports");

module.exports = function () {
  var portJSON = ports.toJSON();
  for (var i in portJSON) {
    var port = portJSON[i];
    spawner(port.port, port.port);
  }
};
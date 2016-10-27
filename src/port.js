var ports = db("ports");
var constants = require(__dirname + "/constants");
var start_port = constants.start_port;
var portsJSON = ports.toJSON();

for (var i in portsJSON) {
  var port = portsJSON[i];

  if (port.port >= start_port) {
    start_port = start_port + 1;
  }
}

var next_port = start_port;

module.exports = function (key) {
  var portFromDb = ports.find(function (obj) {
    return obj.key === key;
  });

  if (typeof portFromDb !== "undefined") {
    return portFromDb.port;
  } else {
    var taken_port = next_port;

    ports.push({
      key: key || "EMPTY",
      port: taken_port
    });

    next_port++;

    return taken_port;
  }
};
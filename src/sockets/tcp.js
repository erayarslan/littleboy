var tcpPort = require(__dirname + "/../config").tcpPort;
var net = require("net");

module.exports = function () {
  net.createServer(function (socket) {
    socket.on("data", function (data) {
      logger.info("GET-TCP", data.toString());
    });

    socket.on("close", function () {
      logger.info("DISCONNECTED-TCP");
    });
  }).listen(tcpPort);
};
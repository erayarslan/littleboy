module.exports = function (wss) {
  wss.on('connection', function (socket) {
    socket.on("message", function (data) {
      logger.info("GET-WS", data.toString());
    });

    socket.on("close", function () {
      logger.info("DISCONNECTED-WS");
    });
  });
};
module.exports = function (wss) {
  require(__dirname + "/sockets/web")(wss);
  require(__dirname + "/sockets/tcp")();
  logger.info("INIT-SOCKETS");
};
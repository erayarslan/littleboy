var tty = require('tty.js');
var config = require(__dirname + "/../config");
var utils = require(__dirname + "/../utils");

module.exports = function () {
  var app = tty.createServer({
    shell: 'bash',
    users: utils.prepareTerminalAppUsers(),
    port: config.apps.terminalPort,
    log: false,
    io: {"log": false}
  });

  app.listen();
  logger.info("STARTED-TERMINAL-APP", config.apps.terminalPort);
};
// sshd_config (GatewayPorts yes) conf

var spawn = require("child_process").spawn;
var config = require(__dirname + "/config");
var mail = require(__dirname + "/mail");
var nope = require(__dirname + "/utils").nope;
var apps_cfg = config.apps;

module.exports = function (from, to) {
  var crash = false;
  var running = false;

  var _spawn = function () {
    running = true;

    return spawn('expect', [
      __dirname + "/expect.sh",
      apps_cfg.reverseSshStun,
      to,
      from,
      apps_cfg.reverseSshUsername,
      apps_cfg.reverseTcpPassword
    ]);
  };

  var _defineEvents = function (_process) {
    _process.on('close', function (code) {
      running = false;
      logger.error('STOPPED-REVERSER', from, ">", to);

      if (!crash) {
        mail('STOPPED-REVERSER', from + " > " + to, nope, nope);
        crash = true;
      }

      setTimeout(function () {
        _rise();
        logger.info('RISE-REVERSER', from, ">", to);
      }, 60000);
    });

    _process.stdout.on('data', function (data) {
      logger.info(data.toString());
    });
  };

  var _rise = function () {
    _defineEvents(_spawn());
  };

  _rise();

  logger.info("STARTED-REVERSER", from, ">", to);

  setTimeout(function () {
    logger.warn("STATUS-REVERSER", from, ">", to, "|", running ? "Running" : "Stopped");
  }, 5000);
};
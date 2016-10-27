var express = require('express');
var ws = new require("ws").Server;
var http = require("http");
var config = require(__dirname + '/config');
var app = express();
var server = http.createServer(app);

module.exports = function () {
  (function (callback) {
    require(__dirname + '/express')(app, config, function () {
      require(__dirname + '/routes')(app);
      server.listen(config.port);
      require(__dirname + '/socket')(new ws({server: server}));
      callback();
    });
  })(function () {
    require(__dirname + "/employer")();
    require(__dirname + "/steve")();
    require(__dirname + "/flash")();
    require(__dirname + "/jumper")(config.sshJumper, config.defaultSsh);
  });
};
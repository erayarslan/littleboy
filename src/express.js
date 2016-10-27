var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = function (app, config, callback) {
  app.configure(function () {
    app.use(express.static(__dirname + '/../www'));
    app.use(express.compress());
    app.use(express.cookieParser());
    app.use(bodyParser.json());
    app.use(morgan('combined', {
      stream: logger._stream
    }));
    app.use(app.router);
    logger.info("CONFIGURED-EXPRESS");
    callback();
  });
};
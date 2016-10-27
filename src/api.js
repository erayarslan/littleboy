var fs = require("fs");
var uuid = require('uuid');
var path = require('path');
var spawn = require("child_process").spawn;

var users = db("users");
var tokens = db("tokens");
var files = db("files");
var spams = db("spams");
var ports = db("ports");

module.exports = {
  "login": function (req, res) {
    var info = req.body;

    var done = users.find(function (obj) {
      return obj.username === info.username &&
        obj.password === info.password;
    });

    if (typeof done === 'undefined') {
      res.status(404).json({
        "message": "user not found"
      });
    } else {
      var token = uuid();

      tokens.push({
        "username": done.username,
        "token": token
      });

      res.json({
        "status": "success",
        "message": token
      });
    }
  },
  "check-token": function (req, res) {
    var done = tokens.find(function (obj) {
      return obj.token === req.headers.token;
    });

    if (typeof done === 'undefined') {
      res.json({
        "status": "success",
        "message": 0
      });
    } else {
      res.json({
        "status": "success",
        "message": 1
      });
    }
  },
  "upload": function (req, res) {
    var id = uuid();
    var arr = req.headers["x-filename"].split(".");
    var ext = arr[arr.length - 1];
    var file_name = id + "." + ext;
    var addr = __dirname + "/../www/uploads/" + file_name;
    var file = fs.createWriteStream(addr);

    req.on('data', function (raw) {
      var bufferStore = file.write(raw);
      if (bufferStore == false) {
        req.pause();
      }
    });

    req.on('end', function () {
      logger.info("FILE-UPLOADED", req.user.username, req.headers["x-filename"], ">", file_name);
      files.push({
        username: req.user.username,
        original: req.headers["x-filename"],
        file: file_name
      });

      res.json({
        "status": "success",
        "message": file_name
      });
    });

    file.on('drain', function () {
      req.resume();
    });
  },
  "spam": function (req, res) {
    spams.push(req.body);

    res.json({
      "status": "success",
      "message": req.body
    });
  },
  "logout": function (req, res) {
    var user = req.user;
    tokens.remove({token: user.token});

    res.json({
      "status": "success",
      "message": user.token
    });
  },
  "ports": function (req, res) {
    res.json({
      "status": "success",
      "message": ports.toJSON()
    });
  },
  "files": function (req, res) {
    res.json({
      "status": "success",
      "message": files.toJSON()
    });
  },
  "push-state": function (req, res) {
    res.sendfile(path.resolve(__dirname + '/../www/index.html'));
  },
  "update": function (req, res) {
    spawn('git', ["pull"]);
    logger.info("AUTO-UPDATE-CALLED", new Date());
    res.end();
  }
};

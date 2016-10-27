var fs = require('fs');
var crypto = require('crypto');
var dbPath = require(__dirname + "/../constants").dbPath;
var interval = require(__dirname + "/../config").watcherInterval;

var fileKey = "LAST_HASH";

var temp = {
  key: fileKey,
  value: "0x00"
};

var getHash = function (callback) {
  var fd = fs.createReadStream(dbPath);
  var hash = crypto.createHash('sha1');

  hash.setEncoding('hex');

  fd.on('end', function () {
    hash.end();
    callback(hash.read());
  });

  fd.pipe(hash);
};

var getStoragedHash = function (callback) {
  logger.info("GET-HASH-FROM-STORAGE", temp.value);
  callback(temp.value);
};

var setHash = function (hash) {
  temp.value = hash;
  logger.info("SET-NEW-HASH", hash);
};

var restart = function (hash) {
  setHash(hash);
};

var loop = function () {
  getStoragedHash(function (lastHash) {
    getHash(function (hash) {
      if (lastHash !== hash) {
        logger.info("DETECTED-NEW-HASH", hash);
        restart(hash);
      } else {
        logger.info("NO-NEW-HASH");
      }
    });
  });
};

module.exports = function () {
  // set global for cancel operation
  global.watcherJob = setInterval(function () {
    loop();
  }, interval);

  logger.info("STARTED-WATCHER-JOB", interval / 1000, "sec");
};
var low = require('lowdb');
var storage = require('lowdb/file-async')

var constants = require(__dirname + "/constants");

module.exports = function (callback) {
  global.db = low(constants.dbPath, {storage: storage}, true);
  logger.info("CONNECTED-DB");
  callback();
};
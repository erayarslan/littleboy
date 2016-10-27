var mail = require(__dirname + "/../mail");
var sms = require(__dirname + "/../sms");
var request = require("request");
var interval = require(__dirname + "/../config").ipCheckInterval;
var config = db("config");
var ipKey = "LAST_IP";

var getIp = function (callback) {
  request("https://api.ipify.org/?format=json", function (e, r, b) {
    var ip = JSON.parse(b).ip;
    logger.info("GET-IP", ip);
    callback(ip);
  });
};

var keyIsExist = function (callback) {
  var lastIp = config.find(function (obj) {
    return obj.key === ipKey;
  });

  if (typeof lastIp === "undefined") {
    config.push({
      key: ipKey,
      value: "127.0.0.1"
    });

    logger.info("CREATED-IP-KEY");
  }

  callback();
};

var getStoragedIp = function (callback) {
  var lastIp = config.find(function (obj) {
    return obj.key === ipKey;
  });

  logger.info("GET-IP-FROM-STORAGE", lastIp.value);
  callback(lastIp.value);
};

var notifyToMaster = function (ip) {
  logger.info("SENDING-MAIL");
  mail("New IP", "<h1>" + ip + "</h1>", function () {
    setIp(ip);
  }, function () {
    notifyToMasterWithSms(ip);
  });
};

var notifyToMasterWithSms = function (ip) {
  logger.info("SENDING-SMS");
  sms("New IP", ip, function () {
    setIp(ip);
  });
};

var setIp = function (ip) {
  var lastIpObj = config.find(function (obj) {
    return obj.key === ipKey;
  });

  lastIpObj.value = ip;
  logger.info("SET-NEW-IP", ip);
};

var loop = function () {
  keyIsExist(function () {
    getStoragedIp(function (lastIp) {
      getIp(function (ip) {
        if (lastIp !== ip) {
          logger.info("DETECTED-NEW-IP", ip);
          notifyToMaster(ip);
        } else {
          logger.info("NO-NEW-IP");
        }
      });
    });
  });
};

module.exports = function () {
  // set global for cancel operation
  global.whoamiJob = setInterval(function () {
    loop();
  }, interval);

  logger.info("STARTED-WHOAMI-JOB", interval / 1000, "sec");
};

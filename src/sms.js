var smsConfig = require(__dirname + "/config").sms;
var client;

if (smsConfig.active) {
  client = require('twilio')(smsConfig.sid, smsConfig.token);
}

module.exports = function (subject, message, callback) {
  if (!smsConfig.active) {
    logger.error("ERROR-SMS", "NOT ACTIVE");
    return;
  }

  client.messages.create({
    to: smsConfig.masterNumber,
    from: smsConfig.user,
    body: subject + " : " + message
  }, function (err, message) {
    if (err) {
      logger.error("ERROR-SMS", err.message);
    } else {
      logger.info("SUCCESS-SMS");
      callback();
    }
  });
};
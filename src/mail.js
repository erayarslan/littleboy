var email = require("nodemailer");
var mailConfig = require(__dirname + "/config").mail;

var masterMail = mailConfig.masterMail;
var transporter = email.createTransport(mailConfig.connection);

module.exports = function (subject, message, callback, error_callback) {
  transporter.sendMail({
    from: "Me <" + mailConfig.connection.user + ">",
    to: "You" + " <" + masterMail + ">",
    subject: subject,
    html: message
  }, function (error, info) {
    if (error) {
      logger.error("ERROR-MAIL", error.message);
      error_callback();
    } else {
      logger.info("SUCCESS-MAIL");
      callback();
    }
  });
};
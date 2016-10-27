var winston = require('winston');

module.exports = function (callback) {
  winston.emitErrs = true;

  var logger = new winston.Logger({
    transports: [
      new winston.transports.File({
        level: 'error',
        filename: __dirname + '/../error.log',
        handleExceptions: true,
        json: false,
        maxsize: 524288, //0.5MB
        maxFiles: 5,
        colorize: false
      }),
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      })
    ],
    exitOnError: false
  });

  logger._stream = {
    write: function (message, encoding) {
      logger.info(message);
    }
  };

  logger.info("ACTIVATED-LOGGER");
  global.logger = logger;
  callback();
};
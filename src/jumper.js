var net = require('net');

module.exports = function (f, t) {
  net.createServer(function (from) {
    var to = net.createConnection({
      port: t
    });

    from.pipe(to);
    to.pipe(from);
  }).listen(f, function () {
    logger.info("STARTED-JUMPER", f, ">", t);
  });
};
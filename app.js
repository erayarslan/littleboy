var multiline = require("multiline");
var header = multiline(function () {
  /*

   _ _ _   _   _      _
   | (_) |_| |_| | ___| |__   ___  _   _
   | | | __| __| |/ _ \ '_ \ / _ \| | | |
   | | | |_| |_| |  __/ |_) | (_) | |_| |
   |_|_|\__|\__|_|\___|_.__/ \___/ \__, |
   |___/
   */
});

var farm = multiline(function () {
  /*

   ^__^ ^__^ ^__^ ^__^ ^__^ ^__^ ^__^
   (xx) (xx) (xx) (xx) (xx) (xx) (xx)
   (__) (__) (__) (__) (__) (__) (__)
    u    u    u    u    u    u    u
   */
});

(function (callback) {
  require(__dirname + "/src/logger")(function () {
    require(__dirname + "/src/db")(function () {
      logger.info(require("sysinfo"));
      logger.info(header);
      logger.info(farm);
      callback();
    });
  });
})(function () {
  require(__dirname + "/src/need")();
});

var tokens = db("tokens");

module.exports = {
  secure: function (req, res, next) {
    var token = req.headers.token;

    var done = tokens.find(function (obj) {
      return obj.token === token;
    });

    if (typeof done === 'undefined') {
      logger.error("ERROR-LOGIN", "TOKEN", token);
      res.status(401).json({
        "status": "error",
        "message": "unauthorized"
      });
    } else {
      req.user = done;
      logger.info("SUCCESS-LOGIN", "@", done.username);
      next();
    }
  },
  noSecure: function (req, res, next) {
    var token = req.headers.token;

    var done = tokens.find(function (obj) {
      return obj.token === token;
    });

    if (typeof done === 'undefined') {
      next();
    } else {
      req.user = done;
      res.status(409).json({
        "status": "error",
        "message": "already authorized"
      });
    }
  }
};
var users = db("users");

module.exports = {
  "prepareTerminalAppUsers": function () {
    var _res = {};
    var json = users.toJSON();
    for (var i in json) {
      _res[json[i].username] = json[i].password;
    }
    return _res;
  },
  "nope": function () {
  }
};
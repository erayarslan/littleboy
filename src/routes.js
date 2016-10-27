var security = require(__dirname + '/security');
var api = require(__dirname + '/api');

module.exports = function (app) {
  app.post('/api/login', security.noSecure, api["login"]);
  app.post('/api/upload', security.secure, api["upload"]);
  app.post('/api/logout', security.secure, api["logout"]);
  app.post('/api/spam', security.secure, api["spam"]);
  app.post('/api/ports', security.secure, api["ports"]);
  app.post('/api/files', security.secure, api["files"]);
  app.post('/api/check-token', api["check-token"]);
  app.post('/api/update', api["update"]);
  app.get('*', api["push-state"]);
};
define(function (require, exports, module) {
  var IndexView = require('../views/index');
  var ErrorView = require('../views/error');
  var LoginView = require('../views/login');
  var UploadView = require('../views/upload');
  var SpamView = require('../views/spam');
  var LogoutView = require('../views/logout');
  var PortsView = require('../views/ports');
  var FilesView = require('../views/files');

  module.exports = {
    'index': function () {
      var indexView = new IndexView();

      return indexView;
    },
    'error': function () {
      var errorView = new ErrorView();

      return errorView;
    },
    'login': function () {
      var loginView = new LoginView();

      return loginView;
    },
    'upload': function () {
      var uploadView = new UploadView();

      return uploadView;
    },
    'spam': function () {
      var spamView = new SpamView();

      return spamView;
    },
    'ports': function () {
      var portsView = new PortsView();

      return portsView;
    },
    'files': function () {
      var filesView = new FilesView();

      return filesView;
    },
    'logout': function () {
      var logoutView = new LogoutView();

      return logoutView;
    }
  };
});
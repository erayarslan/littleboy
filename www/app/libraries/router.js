define(function (require, exports, module) {
  var Backbone = require('backbone');
  var _ = require('underscore');
  var utils = require('utils');
  var cache = require('cache');
  var PageController = require('../modules/controllers/page');
  var AuthController = require('../modules/controllers/auth');
  require('backbone.middleware');

  var auth = AuthController;

  module.exports = Backbone.Router.extend({
    routes: {
      '(/)': {
        m: auth.isSecure,
        f: 'index'
      },
      'login(/)': {
        m: auth.isNotSecure,
        f: 'login'
      },
      'upload(/)': {
        m: auth.isSecure,
        f: 'upload'
      },
      'spam(/)': {
        m: auth.isSecure,
        f: 'spam'
      },
      'logout(/)': {
        m: auth.isSecure,
        f: 'logout'
      },
      'ports(/)': {
        m: auth.isSecure,
        f: 'ports'
      },
      'files(/)': {
        m: auth.isSecure,
        f: 'files'
      },
      '*path': {
        m: auth.isVoid,
        f: 'default'
      }
    },

    use: [utils.pageEventCleaner(cache.appView)],

    index: function () {
      cache.appView.renderPage(PageController.index());
    },

    login: function () {
      cache.appView.renderPage(PageController.login());
    },

    upload: function () {
      cache.appView.renderPage(PageController.upload());
    },

    spam: function () {
      cache.appView.renderPage(PageController.spam());
    },

    logout: function () {
      cache.appView.renderPage(PageController.logout());
    },

    ports: function () {
      cache.appView.renderPage(PageController.ports());
    },

    files: function () {
      cache.appView.renderPage(PageController.files());
    },

    default: function () {
      cache.appView.renderPage(PageController.error(), ['404', 'NOT FOUND']);
    }
  });
});
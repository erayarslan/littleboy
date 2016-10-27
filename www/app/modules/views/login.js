define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var LoginTemplate = require('template!../../templates/login');
  var app = require('app');
  var cache = require('cache');
  var userController = require('../controllers/user');
  require('jquery.cookie');

  module.exports = Backbone.View.extend({
    events: {
      'click #ok': 'doLogin',
      'click #cancel': 'doCancel'
    },

    doLogin: function (e) {
      e.preventDefault();

      userController.doLogin({
        username: $("#username").val(),
        password: $("#password").val()
      }, function (token) {
        $.cookie("token", token);

        cache.trigger('auth-true');
        app.router.navigate('/', true);
      });
    },

    doCancel: function (e) {
      e.preventDefault();

      $("#username").val("");
      $("#password").val("");
    },

    render: function () {
      $(this.el).html(LoginTemplate({}));
    }
  });
});
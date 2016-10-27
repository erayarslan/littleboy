define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var PortsTemplate = require('template!../../templates/ports');
  var userController = require('../controllers/user');
  require('jquery.cookie');

  module.exports = Backbone.View.extend({
    events: {
    },

    render: function () {
      var self = this;

      userController.getPorts(function (data) {
        for (var i in data) {
          $(self.el).append(PortsTemplate(data[i]));
        }
      });
    }
  });
});
define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var FilesTemplate = require('template!../../templates/files');
  var userController = require('../controllers/user');
  require('jquery.cookie');

  module.exports = Backbone.View.extend({
    events: {
    },

    render: function () {
      var self = this;

      userController.getFiles(function (data) {
        for (var i in data) {
          $(self.el).append(FilesTemplate(data[i]));
        }
      });
    }
  });
});
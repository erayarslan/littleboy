define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var SpamTemplate = require('template!../../templates/spam');
  var userController = require('../controllers/user');
  require('jquery.cookie');

  module.exports = Backbone.View.extend({
    events: {
      'click #ok': 'doSpam'
    },

    doSpam: function (e) {
      e.preventDefault();

      userController.doSpam(JSON.parse($("#spam").val()), function (data) {
        $("#spam").val(JSON.stringify(data));
      });
    },

    render: function () {
      $(this.el).html(SpamTemplate({}));
    }
  });
});
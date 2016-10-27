define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var IndexTemplate = require('template!../../templates/index');

  module.exports = Backbone.View.extend({
    events: {
    },

    render: function () {
      $(this.el).html(IndexTemplate({}));
    }
  });
});
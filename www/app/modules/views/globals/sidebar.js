define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var SidebarTemplate = require('template!../../../templates/globals/sidebar');

  module.exports = Backbone.View.extend({
    events: {},

    initialize: function () {
    },

    render: function () {
      $(this.el).html(SidebarTemplate({auth: false}));
    },

    renderWithAuth: function (auth) {
      $(this.el).html(SidebarTemplate({auth: auth}));
    }
  });
});
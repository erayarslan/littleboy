define(function (require, exports, module) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var NProgress = require('nprogress');
  var MainTemplate = require('template!../../../templates/globals/main');

  var SidebarView = require('./sidebar');

  module.exports = Backbone.View.extend({
    el: $('#container1'),

    events: {},

    initialize: function () {
      this.sidebarView = new SidebarView();
    },

    render: function () {
      $(this.el).html(MainTemplate({}));
      this.sidebarView.render();
      $('#sidebar').html($(this.sidebarView.el));
    },

    renderPage: function (activeView, args) {
      NProgress.start();
      var self = this;
      this.activeView = activeView;
      this.activeView.render.apply(this.activeView, args);
      $('#main').html($(this.activeView.el)).promise().done(function () {
        NProgress.done();

        if (!!self.activeView.ready) {
          self.activeView.ready();
        }
      });
    }
  });
});
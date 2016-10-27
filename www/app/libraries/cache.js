define(function (require, exports, module) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  var cache = {};

  _.extend(cache, Backbone.Events);

  cache.on('auth-true', function () {
    if (cache.appView !== 'undefined') {
      cache.appView.sidebarView.renderWithAuth(true);
    }
  });

  cache.on('auth-false', function () {
    if (cache.appView !== 'undefined') {
      cache.appView.sidebarView.render();
    }
  });

  module.exports = cache;
});
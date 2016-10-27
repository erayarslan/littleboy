define(function (require, exports, module) {
  var utils = require('utils');
  var cache = require('cache');
  var boss = require('boss');
  var MainView = require('modules/views/globals/main');
  var mainView = new MainView();

  boss.startCounter();

  utils.historyTrick();
  utils.tokenSync();
  utils.defineGlobalErrorHandler();

  mainView.render();

  cache.appView = mainView;

  module.exports = {
    root: module.config().root
  };
});
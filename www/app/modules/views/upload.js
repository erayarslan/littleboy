define(function (require, exports, module) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var UploadTemplate = require('template!../../templates/upload');
  var utils = require('utils');
  var uploader = utils.uploader;

  module.exports = Backbone.View.extend({
    events: {
    },

    render: function () {
      $(this.el).html(UploadTemplate({}));
    },

    ready: function () {
      new uploader($("#upload"));
    }
  });
});
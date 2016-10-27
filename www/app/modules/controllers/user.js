define(function (require, exports, module) {
  var AjaxModel = require('../models/ajax');

  module.exports = {
    doLogin: function (data, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl("/login");

      ajaxModel.save(data, {
        success: function (model, response) {
          callback(response.message);
        }
      });
    },
    "check-token": function (data, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl("/check-token");

      ajaxModel.save({}, {
        success: function (model, response) {
          callback(response.message);
        }
      });
    },
    "logout": function (data, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl("/logout");

      ajaxModel.save({}, {
        success: function (model, response) {
          callback();
        }
      });
    },
    "doSpam": function (data, callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl("/spam");

      ajaxModel.save(data, {
        success: function (model, response) {
          callback(response.message);
        }
      });
    },
    "getPorts": function (callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl("/ports");

      ajaxModel.save({}, {
        success: function (model, response) {
          callback(response.message);
        }
      });
    },
    "getFiles": function (callback) {
      var ajaxModel = new AjaxModel();
      ajaxModel.changeUrl("/files");

      ajaxModel.save({}, {
        success: function (model, response) {
          callback(response.message);
        }
      });
    }
  };
});
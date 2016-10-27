define(function (require, exports, module) {
  var counter = require("worker!libraries/workers/counter.js");
  counter.onmessage = function (e) {
    console.log(e.data);
  };

  module.exports = {
    startCounter: function () {
      counter.postMessage("start");
    }
  };
});
define(function (require, exports, module) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var tost = require('tost');
  require('jquery.cookie');
  require('jquery.noty');

  var doNoty = function (type, message) {
    noty({
      type: type,
      text: message,
      timeout: 5000,
      layout: 'bottomRight'
    });
  };

  var sucuklu = new tost(localStorage);

  module.exports = {
    historyTrick: function () {
      $(document).on('click', 'a:not([data-bypass])', function (evt) {
        var href = {prop: $(this).prop('href'), attr: $(this).attr('href')};
        var root = location.protocol + '//' + location.host;
        root += Backbone.history.options.root;

        if (href.prop && href.prop.slice(0, root.length) === root) {
          evt.preventDefault();
          Backbone.history.navigate(href.attr, true);
        }
      });
    },
    tokenSync: function () {
      var sync = Backbone.sync;

      Backbone.sync = function (method, model, options) {
        options = options || {};

        options.beforeSend = function (xhr) {
          xhr.setRequestHeader(
            'token',
            $.cookie('token') || module.config().defaultToken
          );
        };

        options.error = function (xhr, status, error) {
          doNoty('error', xhr.status === 0 ? 'server gone :(' : (typeof xhr.responseJSON !== "undefined" ? xhr.responseJSON.message : "wow"));
        };

        return sync.call(Backbone, method, model, options);
      };
    },
    pageEventCleaner: function (app) {
      return function () {
        if (app.activeView) {
          app.activeView.remove();
          app.activeView.unbind();
        }
      };
    },
    doNoty: doNoty,
    tost: sucuklu,
    defineGlobalErrorHandler: function () {
      window.onerror = function (message, url, lineNo) {
        doNoty('error', message);

        console.log('Error: ' + message +
          '\nUrl: ' + url +
          '\nLine Number: ' + lineNo);

        return true;
      }
    },
    uploader: function (dom) {
      var parent = dom;
      var uploadUrl = parent.attr('data-url');
      var click = parent.find('p');
      var fileType;

      var uploadFile = function (file) {
        var size = file.size;
        var xhr = new XMLHttpRequest();
        xhr.open('post', uploadUrl, true);
        xhr.setRequestHeader('x-filename', file.name);
        xhr.setRequestHeader('x-filesize', file.size);
        xhr.setRequestHeader('x-filetype', file.type);
        xhr.setRequestHeader(
          'token',
          $.cookie('token') || module.config().defaultToken
        );

        xhr.onload = function (e) {
          $("#files").append("<p><a href='uploads/" + JSON.parse(e.target.response).message + "' data-bypass>" + JSON.parse(e.target.response).message + "</a></p>");
        };

        xhr.onerror = function (e) {
        };

        xhr.upload.onprogress = function (e) {
          var percent = (e.loaded / size) * 100;
          $("#progress").html("%" + percent);
        };

        xhr.upload.onloadstart = function (e) {
          $("#progress").html("%" + "0");
        };

        xhr.send(file);
      };

      click.on('dragover', function (e) {
        e.preventDefault();
        parent.addClass('drop');
      });

      click.on('dragleave', function (e) {
        e.preventDefault();
        parent.removeClass('drop');
      });

      click.on('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();

        parent.removeClass('drop');

        var files = event.dataTransfer.files;
        if (!files || !files.length) {
          return false;
        }

        var file = files[0];

        fileType = file.type;

        var reader = new FileReader();
        reader.onload = function (e) {
          uploadFile(this.file);
        };

        reader.file = file;
        reader.readAsDataURL(file);

        return false;
      });

      // On click start drop event
      click.on('click', function () {
        parent.find('input[type="file"]').remove();
        var input = $('<input>').attr({
          'type': 'file',
          'name': 'file',
          'style': 'visibility:hidden; width:0; height:0'
        });

        input.on('change', function () {
          event = {
            dataTransfer: {}
          };

          console.log(event);
          event.dataTransfer.files = $(this).get(0).files;
          parent.append(input);
          click.trigger('drop');
        });
        input.trigger('click');
      });
    }
  };
});
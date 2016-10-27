require(['backbone', 'app', 'libraries/router'],
  function (Backbone, app, Router) {
    app.router = new Router();
    Backbone.history.start({pushState: true, root: app.root});
  }
);
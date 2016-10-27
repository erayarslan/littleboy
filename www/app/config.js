require.config({
  paths: {
    'underscore': '../deps/lodash/dist/lodash.underscore',
    'lodash': '../deps/lodash/dist/lodash',
    'template': '../deps/lodash-template-loader/loader',
    'worker': '../deps/requirejs-web-workers/src/worker',
    'worker-fake': '../deps/requirejs-web-workers/src/worker-fake',
    'jquery': '../deps/jquery/dist/jquery',
    'backbone': '../deps/backbone/backbone',
    'jquery.cookie': '../deps/jquery.cookie/jquery.cookie',
    'jquery.noty': '../deps/noty/js/noty/packaged/jquery.noty.packaged',
    'nprogress': '../deps/nprogress/nprogress',
    'backbone.middleware': '../deps/backbone.middleware/backbone.middleware',
    'tost': '../deps/tost/tost.min',
    'app': './app',
    'utils': './libraries/utils',
    'cache': './libraries/cache',
    'boss': './libraries/boss'
  },

  lodashLoader: {
    ext: '.tpl'
  },

  deps: ['main'],

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery']
    },
    'jquery.cookie': {
      deps: ['jquery']
    },
    'jquery.noty': {
      deps: ['jquery']
    },
    'template': {
      deps: ['lodash']
    },
    'backbone.middleware': {
      deps: ['backbone']
    }
  },

  config: {
    'modules/models/base': {
      apiUrl: 'api'
    },
    'modules/collections/base': {
      apiUrl: 'api'
    },
    'utils': {
      defaultToken: 'GETLUCKY' // if u lucky, get your lucky!
    },
    'modules/views/globals/content': {
      pageLoadTimeout: 250 // if u need
    },
    'app': {
      root: '/'
    }
  }
});

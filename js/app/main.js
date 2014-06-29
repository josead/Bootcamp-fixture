requirejs.config({
    baseUrl: 'js/lib',
    paths: {
      app: '../app',
      model: 'app/models',
      view: 'app/views',
      collection: 'app/collections'
    },
    shim: {
      'backbone': {
          deps: ['underscore', 'jquery'],
          exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        }
    }
  });

requirejs(['backbone'],
function (Backbone){
  // Main
});
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
      app: '../app',
      model: '../app/models',
      view: '../app/views',
      collection: '../app/collections'
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
requirejs(['backbone',
  'model/team',
  'model/match',

  'app/Factory',

  'collection/FetchableCollection',

  'view/MatchesCollection'],
function (Backbone, Team, Match, Factory, FetchableCollection, MatchesView){
  // Main

  // Factories
  window.teams = new Factory(Team,'fifa_code');
  window.matches = new Factory(Match,'match_number');

  // Sections / Collections
  var current = new FetchableCollection(matches,'matches/current'),
    today = new FetchableCollection(matches,'matches/today'),
    tomorrow = new FetchableCollection(matches,'matches/tomorrow'),
  // Views
    todayView = new MatchesView({collection: today});

  today.fetch();

  today.on('fetched',function(){ 
    console.log(matches);
    console.log(teams);
    console.log(todayView);
    todayView.render();

  });

 
    
  //$('.content').append(todayView.el);

});
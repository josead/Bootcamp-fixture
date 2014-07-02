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
  window.app = {};
  window.app.teams = new Factory(Team,'fifa_code');
  window.app.matches = new Factory(Match,'match_number');

  
  var collections = {},
    views = {};

  // Collections
  collections.current = new FetchableCollection(app.matches,'matches/current');
  collections.today = new FetchableCollection(app.matches,'matches/today');
  collections.tomorrow = new FetchableCollection(app.matches,'matches/tomorrow');
  collections.all = new FetchableCollection(app.matches,'matches/?by_date=DESC');

  collections.teams =  new FetchableCollection(app.teams,'teams');
  // Views
  views.current = new MatchesView({collection: collections.current});
  views.today = new MatchesView({collection: collections.today});
  views.tomorrow = new MatchesView({collection: collections.tomorrow});
  views.all = new MatchesView({collection: collections.all});

  // Routes

  var Workspace = Backbone.Router.extend({
    routes: {
      "matches/:when":        "matches",
      "groups":               "groups",
      "teams":                "teams",
      //"team/:query":          "team",
    },
    matchesPages:['current','today','tomorrow','all'],

    currentView: null,
    changeView: function(newView){
      if ( this.currentView !== null )
        this.currentView.$el.hide();
      
      this.currentView = newView;

      if ( this.currentView._rendered ) {
        this.currentView.$el.show();
      } else {
        $('.content').append(this.currentView.render().$el);
        this.currentView.$el.show();
      }
    },

    // Pages
    matches: function(when) {
      if ( _.contains(this.matchesPages, when) ){
        collections[when].fetchOnce();

        this.changeView(views[when]);
      }
    },
    groups: function() {
      //collections.today.fetchOnce();
    },
    teams: function(){
      collections.teams.fetchOnce();
    }
  });
  var routes = new Workspace();
  Backbone.history.start();

  collections.current.on('fetched',function(){ routes.changeView(views.current); });
  collections.today.on('fetched',function(){ routes.changeView(views.today); });
  collections.tomorrow.on('fetched',function(){ routes.changeView(views.tomorrow); });
  collections.all.on('fetched',function(){ routes.changeView(views.all); });
  collections.teams.on('fetched',function(){ routes.changeView(views.teams); });
  //collections.current.on('fetched',function(){ routes.changeView(views.current); });

});
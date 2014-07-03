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
  app = {};
  app.teams = new Factory(Team,'fifa_code');
  app.matches = new Factory(Match,'match_number');

  // Set match dependency
  Match.setFactoryTeams(app.teams);
  
  var collections = {},
    views = {};

  // Collections
  collections.current = new FetchableCollection(app.matches,'matches/current',this);
  collections.today = new FetchableCollection(app.matches,'matches/today');
  collections.tomorrow = new FetchableCollection(app.matches,'matches/tomorrow');
  collections.all = new FetchableCollection(app.matches,'matches/?by_date=DESC');

  collections.teams =  new FetchableCollection(app.teams,'teams');
  // Views
  views.current = new MatchesView({collection: collections.current});
  views.today = new MatchesView({collection: collections.today});
  views.tomorrow = new MatchesView({collection: collections.tomorrow});
  views.all = new MatchesView({collection: collections.all});

  //view.teams = new TeamsView({collection: collections.teams});

  // Routes

  var $content = $('.content'),
    $menu = $('#sectionsMenu');

  var Workspace = Backbone.Router.extend({
    routes: {
      "matches/:when":        "matches",
      //"groups":               "groups",
      "teams":                "teams",
      //"team/:query":          "team",
      "*actions":             "default",
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
        $content.append(this.currentView.render().$el);
        this.currentView.$el.show();
      }

      $content.removeClass('loading');
    },

    // Pages
    matches: function(when) {
      if ( ! _.contains(this.matchesPages, when) ) return;
      
      $content.addClass('loading');

      if ( when == 'current' )
        collections[when].fetch();
      else
        collections[when].fetchOnce();
    },
    /*groups: function() {
      //collections.today.fetchOnce();
    },*/
    teams: function(){
      collections.teams.fetchOnce();
    },
    default: function(){
      this.matches('today');
    }
  });
  var routes = new Workspace();
  routes.on('route',function(){
    if ( !window.location.hash ) return;

    $menu.find(".active").removeClass('active');
    $menu.find('a[href="'+ window.location.hash +'"]')
      .parent().addClass('active');
  });
  Backbone.history.start();

  collections.current.on('fetched',function(){ routes.changeView(views.current); });
  collections.today.on('fetched',function(){ routes.changeView(views.today); });
  collections.tomorrow.on('fetched',function(){ routes.changeView(views.tomorrow); });
  collections.all.on('fetched',function(){ routes.changeView(views.all); });
  collections.teams.on('fetched',function(){ routes.changeView(views.teams); });
  //collections.current.on('fetched',function(){ routes.changeView(views.current); });

});
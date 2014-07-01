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
requirejs(['backbone','collection/MatchesCollection','model/match','view/match'],
function (Backbone, MatchesCollection, Match, MatchView){
  // Main

  // Falta controller de Teams
  var today = new MatchesCollection('matches/today');
  today.fetch();
  today.on('add',function(m){console.log(m);});
  

  var mtch = new Match({"match_number":53,"location":"Estadio Nacional","datetime":"2014-06-30T13:00:00.000-03:00","status":"completed","home_team":{"country":"France","code":"FRA","goals":2},"away_team":{"country":"Nigeria","code":"NGA","goals":0},"winner":"France","winner_code":"FRA","home_team_events":[{"id":1213,"type_of_event":"yellow-card","player":"Matuidi","time":"54"},{"id":1216,"type_of_event":"substitution-out","player":"Giroud","time":"62"},{"id":1217,"type_of_event":"substitution-in","player":"Griezmann","time":"62"},{"id":1218,"type_of_event":"goal","player":"Pogba","time":"79"},{"id":1222,"type_of_event":"substitution-out","player":"Valbuena","time":"904"},{"id":1223,"type_of_event":"substitution-in","player":"Sissoko","time":"904"}],"away_team_events":[{"id":1214,"type_of_event":"substitution-out","player":"Onazi","time":"59"},{"id":1215,"type_of_event":"substitution-in","player":"Gabriel","time":"59"},{"id":1220,"type_of_event":"substitution-in","player":"Nwofor","time":"89"},{"id":1219,"type_of_event":"substitution-out","player":"Moses","time":"89"},{"id":1221,"type_of_event":"goal-own","player":"Yobo","time":"90+2"}]},null);
  var vmatch = new MatchView({model: mtch});
  $('.app').append(vmatch.render().el);

  console.log(mtch.toJSON());
  // Set routes
});
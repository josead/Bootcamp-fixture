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
requirejs(['backbone','collection/MatchesCollection','model/team','model/match', 'app/Factory'],
function (Backbone, MatchesCollection, Team, Match, Factory){
  // Main

  // Factories
  var teams = new Factory(Team),
    matches = new Factory(Match);


  var template = {fifa_code:"ARG",country:'Argentina'},
    casos = [];

  casos.push(teams.getInstance(template));
  casos.push(teams.getInstance(casos[0]));
  casos.push(teams.getInstance(template));

  console.log(casos);
  console.log(teams);

  // Set routes
});
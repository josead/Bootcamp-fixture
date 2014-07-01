define(['backbone','collection/match_events'],
  function (Backbone,MatchEvents){

  return Backbone.Model.extend({
    defaults: {
      'num': 0,
      'loc': 'unknown',
      'date': '',
      'status': 'unknown'
    },
    constructor: function(json, teams){
      Backbone.Model.apply(this);

      this.id = json.match_number;
      this.loc = json.location;
      this.date = json.datetime;
      this.status = json.status;

      this.home = {
        team: teams.fetchTeam(json.home_team.code),
        goals: json.home_team.goals,
        winning: false
      };
      this.away = {
        team: teams.fetchTeam(json.away_team.code),
        goals: json.away_team.goals,
        winning: false
      };

      this.events = new MatchEvents(json.home_team_events,json.away_team_events);

      this.winner = json.winner_code;
    },
    hasEnded: function(){
      return ( this.status == 'completed');
    },
    update: function(json){
      this.set('status',json.status);
      this.set('winner',json.winner_code);

      this.home.update(json.home_team.goals,json.home_team_events);
      this.away.update(json.away_team.goals,json.away_team_events);
    }
  });
});
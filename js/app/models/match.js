define(['backbone','model/team_match'],
  function (Backbone,TeamMatch){

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

      this.home = new TeamMatch('home',json.home_team,json.home_team_events,teams.fetchTeam(json.home_team.code),this);
      this.away = new TeamMatch('home',json.away_team,json.away_team_events,teams.fetchTeam(json.away_team.code),this);

      this.winner = json.winner_code;

      this.updateWinner();

      // Events
      this.on('change:winner',this.updateWinner);
    },
    hasEnded: function(){
      return ( this.status == 'completed');
    },
    updateWinner: function(){
      if ( this.winner == this.home.get('team').get('code') ) {
        this.home.set('winner',true);
        this.away.set('winner',false);
      } else if ( this.winner == this.away.get('team').get('code') ) {
        this.away.set('winner',true);
        this.home.set('winner',false);
      }
      console.log("Cambio el winner");
    },
    update: function(json){
      this.set('status',json.status);
      this.set('winner',json.winner_code);

      this.home.update(json.home_team.goals,json.home_team_events);
      this.away.update(json.away_team.goals,json.away_team_events);
    }
  });
});
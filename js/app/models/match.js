define(['backbone','collection/MatchEvents'],
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

      // BORRAR ESTO
      var teams = {
        fetchTeam: function(a){ return a;}
      };

      this.id = json.match_number;
      this.set('loc', json.location);
      this.set('date', json.datetime);
      this.set('status', json.status);

      this.set('home', {
        team: teams.fetchTeam(json.home_team.code),
        goals: json.home_team.goals,
        winning: false
      });
      this.set('away', {
        team: teams.fetchTeam(json.away_team.code),
        goals: json.away_team.goals,
        winning: false
      });

      this.set('events', new MatchEvents(json.home_team_events,json.away_team_events));

      this.set('winner', json.winner_code);
    },
    hasEnded: function(){
      return ( this.status == 'completed');
    },
    update: function(json){
      this.set('status',json.status);
      this.set('winner',json.winner_code);

      if ( this.get('home').goals < json.home_team.goals )
        this.trigger('change:home');
      if ( this.get('away').goals < json.away_team.goals )
        this.trigger('change:away');

      this.get('home').goals = json.home_team.goals;
      this.get('away').goals = json.away_team.goals;

      this.get('events').update(json.home_team_events.goals,json.away_team_events);
    }
  });
});
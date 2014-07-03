define(['backbone','collection/MatchEvents'],
  function (Backbone,MatchEvents){

  var teamFactory,

  Match = Backbone.Model.extend({
    defaults: {
      'num': 0,
      'loc': 'unknown',
      'date': '',
      'status': 'unknown'
    },
    constructor: function(json){
      Backbone.Model.apply(this);

      // BORRAR ESTO

      this.id = json.match_number;
      this.set('loc', json.location);
      this.set('date', json.datetime);
      this.set('status', json.status);

      this.set('home', {
        team: teamFactory.getInstance({fifa_code:json.home_team.code,country:json.home_team.country}),
        goals: json.home_team.goals,
        winning: false
      });
      this.set('away', {
        team: teamFactory.getInstance({fifa_code:json.away_team.code,country:json.away_team.country}),
        goals: json.away_team.goals,
        winning: false
      });

      this.set('events', new MatchEvents(json.home_team_events,json.away_team_events));

      this.refreshWinner();
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

      this.refreshWinner();

      this.get('events').update(json.home_team_events,json.away_team_events);
    },
    refreshWinner: function(){
      var winner = '';
      if ( this.get('home').goals == this.get('away').goals ) {
        winner = '';
        this.get('home').winning = false;
        this.get('away').winning = false;
      } else if ( this.get('home').goals > this.get('away').goals ) {
        winner = 'home';
        this.get('home').winning = true;
        this.get('away').winning = false;
      } else {
        winner = 'away';
        this.get('home').winning = false;
        this.get('away').winning = true;
      }
      this.set('winner',winner);
    }
  });

  Match.setFactoryTeams = function(f){
    teamFactory = f;
  };

  return Match;
});
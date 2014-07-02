define(['backbone'],
  function (Backbone){

  return Backbone.Model.extend({
    defaults: {
      'id': 0,
      'name': 'unknown',
      'code': '',
      'group': { 'id': 0, 'letter':'' },
      'stats': {}
    },
    constructor: function(json){
      Backbone.Model.apply(this);

      this.cid = json.fifa_code;
      this.id = json.fifa_code;
      this.set('name', json.country);
      this.set('code', json.fifa_code);
      if ( json.fifa_code == 'TBD' )
        this.set('flag', 'resources/TBD.png');
      else
        this.set('flag', 'http://www.sciencekids.co.nz/images/pictures/flags96/'+this.get('name').replace(' ','_')+'.jpg');
    },
    settings: function(json){
      this.set('id', json.id);
      this.set('group', { id: json.group_id , letter: json.group_letter});
      this.setStats(json);
    },
    setStats: function(array){
      var stats = {
        wins : array.wins,
        draws : array.draws,
        losses : array.losses,
        games_played : array.games_played,
        points : array.points,
        goals_for : array.goals_for,
        goals_against : array.goals_against,
        goal_differential : array.goal_differential
      };
      this.set('stats',stats);
    },
    update: function(array){
      //console.log("Estás updateando " + this.get('code') + " con ",array);
    }
  });
});
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
      this.set('flag', 'http://www.flags.net/images/smallflags/'+json.fifa_code+'0001.GIF');
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
    }
  });
});
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

      this.getFlag();
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
    getFlag: function(){
      var flg = this.get('name'),
        mapped = this._parseMap[this.get('code')];

      if ( mapped )
        if ( mapped === true ){
          this.set('flag', 'resources/flags/'+this.get('code')+'.jpg'); return;
        } else
          flg = mapped;

      this.set('flag', 'http://www.sciencekids.co.nz/images/pictures/flags96/'+ flg.replace(' ','_') +'.jpg');
    },
    _parseMap: {
      USA: 'United States',
      KOR: 'South Korea',
      TBD: true,
      BIH: true,
      CIV: true
    },
    update: function(array){
      //console.log("Estás updateando " + this.get('code') + " con ",array);
    }
  });
});
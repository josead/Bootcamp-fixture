define(['backbone'],
  function (Backbone){

  return Backbone.Model.extend({
    defaults: {
      'type': 'home',
      'code': '',
      'match': null,
      'winning': false,
      'team': null,
      'goals': 0,
      'events': {}
    },
    constructor: function(type,json,json_events,team,match){
      Backbone.Model.apply(this);

      this.type = type;
      this.team = team;
      this.match = match;

      this.goals = json.goals;

      this.events = json_events;
    },
    update: function(goals,json_events){
      this.set('goals',goals);
      if ( this.get('events').length < json_events.length )
        this.set('events',json_events);
    }
  });
});
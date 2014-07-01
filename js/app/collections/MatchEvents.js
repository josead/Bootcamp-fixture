define(['backbone'],
function (Backbone){

  return Backbone.Collection.extend({
    constructor: function(home,away){
      Backbone.Collection.apply(this);

      this.add(this.append(home,away,-1));

      this.lastTime = this.last.time;
    },
    append: function(home,away,from){
      var buffer = [];

      this._appendOnlyNew(buffer,home,'home',from);
      this._appendOnlyNew(buffer,away,'away',from);

      this.size = home.length + away.length;

      return _.sortBy(buffer,'time');
    },
    update: function(home,away){
      var _size = home.length + away.length;
      if (this.size >= size ) return;

      this.add(this.append(home,away,this.lastTime));
      this.lastTime = this.last.time;
    },
    _appendOnlyNew: function(out,array,team,from){
      for (var i = array.length - 1; i >= 0; i--) {
        if ( array[i].time <= from ) return;
        
        array[i].team = team;
        out.unshift(array[i]);
      }
    }
  });
});
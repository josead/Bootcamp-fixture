define(['backbone'],
function (Backbone){

  return Backbone.Collection.extend({
    constructor: function(home,away){
      Backbone.Collection.apply(this);

      this._add(this.append(home,away,-1));

      this.lastTime = this.last.time;
    },
    size: 0,
    append: function(home,away,from){
      var buffer = [];

      buffer = this._appendOnlyNew(buffer,home,'home',from);
      buffer = this._appendOnlyNew(buffer,away,'away',from);

      this.size = home.length + away.length;

      return _.sortBy(buffer,'id');
    },
    update: function(home,away){
      var _size = home.length + away.length;
      if (this.size >= _size ) return;

      this._add(this.append(home,away,this.lastTime));
      this.lastTime = this.last.time;
    },
    _add: function(arr){
      for (var i = 0, max_i = arr.length; i < max_i; i++) {
        this.add(arr[i]);
      }
    },
    _appendOnlyNew: function(out,array,team,from){
      if ( typeof array !== 'object' ) return out;

      for (var i = array.length - 1; i >= 0; i--) {
        if ( array[i].time <= from ) return out;

        array[i].team = team;
        out.unshift(array[i]);
      }
      return out;
    }
  });
});
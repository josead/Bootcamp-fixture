define(['backbone'],
function (Backbone){
  return Backbone.Collection.extend({
    constructor: function(model){
      Backbone.Collection.apply(this);
      this.model = model;
    },
    getInstance: function(model){
      var ret;
      if ( model instanceof Backbone.Model ){
        ret = this.get(model);
        if( ret == null){
          this.add(model)
          ret = model;
        }
        return ret;
      } else {
        ret = new this.model(model);
        this.add(ret);
        return ret;
      }
    }
  });
});
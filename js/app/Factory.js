define(['backbone'],
function (Backbone){

  return Backbone.Collection.extend({
    constructor: function(model,key){
      Backbone.Collection.apply(this);
      
      this.model = model;
      this.key = key;
    },
    getInstance: function(model){
      var ret;

      if ( model.id === undefined )
        ret = this.get(model[this.key]);
      else
        ret = this.get(model.id);


      if ( !ret ) {
        ret = new this.model(model);
        this.add(ret);
      } else {
        if ( model.toJSON === undefined )
          ret.update(model);
        else
          ret.update(model.toJSON());
      }
      
      return ret;
    }
  });
});
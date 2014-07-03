define(['backbone'],
function (Backbone){

  return Backbone.Collection.extend({
    constructor: function(model,key){
      Backbone.Collection.apply(this);
      
      this.model = model;
      this.key = key;
    },
    getInstance: function(model){
      var ret = this.get(model[this.key]);


      if ( !ret ) {
        ret = new this.model(model);
        this.add(ret);
      } else
        ret.update(model);
      
      return ret;
    }
  });
});
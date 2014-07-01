define(['backbone'],
function (Backbone){

  return Backbone.Collection.extend({
    constructor: function(model,key){
      Backbone.Collection.apply(this);
      this.model = model;
      this.key = key;
    },
    getInstance: function(model){
      var sel,ret,
        no_instanciable = false;

      if ( model instanceof Backbone.Model ){
        sel = model.id;
      } else if ( typeof model == "object" ) {
        sel = model[this.key];
      } else {
        no_instanciable = true;
        sel = model;
      }

      ret = this.get(sel);
      if ( !ret ) {
        if ( no_instanciable ) return null;
        
        ret = new this.model(model);
        this.add(ret);
      } else {
        if ( model instanceof Backbone.Model )
          ret.update(model.toJSON());
        else
          ret.update(model);
      }
      
      return ret;
    }
  });
});
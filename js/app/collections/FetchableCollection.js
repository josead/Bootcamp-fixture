define(['backbone'],
function (Backbone){
  return Backbone.Collection.extend({
    _urlBase: 'http://worldcup.sfg.io/',
    url: '',
    fetched: false,
    factory: null,
    constructor: function(factory,url){
      Backbone.Collection.apply(this);
      this.factory = factory;
      this.url = url;
      this.initialize(factory,url);
    },
    forEachModel: function(model){
      this.add(this.factory.getInstance(model));
    },
    fetch: function(){
      this.fetched = true;
      var self = this;
      $.get( this._urlBase + this.url)
        .done(function(data){
          for (var i = 0; i < data.length; i++)
            self.forEachModel(data[i]);
          self.trigger('fetched');
        })
        .error(function(err){
          console.log("Hubo un error");
          //self.fetch();
        });
    },
    fetchOnce: function(){
      if ( this.fetched ) return;
      this.fetch();
    }
  });
});
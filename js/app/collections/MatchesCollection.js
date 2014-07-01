define(['backbone','collection/FetchableCollection'],
function (Backbone,FetchableCollection){

  var matchFactory;

  return FetchableCollection.extend({
    forEachModel: function(model){
      var match = matchFactory.getInstance(model);
      this.add(match);
    },
    initialize: function(matchFac, url){
      matchFactory = matchFac;
      this.url = url;
    }
  });
});
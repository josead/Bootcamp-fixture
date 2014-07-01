define(['backbone','collection/FetchableCollection','model/match'],
function (Backbone,FetchableCollection,Match){

  var matchFactory;

  return FetchableCollection.extend({
    forEachModel: function(model){
      var match = matchFactory.get(model);
      this.add(match);
    },
    initialize: function(matchFac, url){
      matchFactory = matchFac;
      this.url = url;
    }
  });
});
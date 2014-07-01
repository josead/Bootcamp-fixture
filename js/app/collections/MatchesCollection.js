define(['backbone','collection/FetchableCollection','model/match'],
function (Backbone,FetchableCollection,Match){
  return FetchableCollection.extend({
    forEachModel: function(model){
      this.add(new Match(model));
    },
    initialize: function(url){
      this.url = url;
    }
  });
});
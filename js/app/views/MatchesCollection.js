define(['backbone','view/match'],
function (Backbone, MatchView){
	return Backbone.View.extend({
		tagName: 'div',

		className: 'matchsList',

		initialize: function() {
			this.collection.on('add', this.addOne, this);
		},

		render: function () {

			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function (match) {
			var matchView = new MatchView({ model: match });
			console.log(matchView);
			matchView.render();
			this.$el.append(matchView.el);
		}
	});
})
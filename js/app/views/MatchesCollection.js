define(['backbone','view/match'],
function (Backbone, MatchView){
	return Backbone.View.extend({
		tagName: 'div',
		className: 'matchsList',

		initialize: function() {
			this.collection.on('add', this.addOne, this);
			this.collection.on('empty', console.log, 'ESTA EMPTY');// TODO
		},

		render: function () {		
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function (match) {
			var matchView = new MatchView({ model: match });
			this.$el.append(matchView.render().el);
		}

	});
});
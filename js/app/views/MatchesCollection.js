define(['backbone','view/match'],
function (Backbone, MatchView){
	return Backbone.View.extend({
		tagName: 'div',
		className: 'matchsList',

		initialize: function() {
			this.collection.on('add', this.addOne, this);
			this.collection.on('empty', console.log, 'ESTA EMPTY');// TODO
		},

		_rendered: false,
		render: function () {
			if ( this._rendered ) this.$el.empty();

			this._rendered = true;

			if ( this.collection.length > 0 )
				this.collection.each(this.addOne, this);
			else
				this.$el.empty().append('<div class="empty">No matches found</div>');
			return this;
		},

		addOne: function (match) {
			var matchView = new MatchView({ model: match });
			this.$el.append(matchView.render().el);
		}

	});
});
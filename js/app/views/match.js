define(['backbone','view/MatchEvents'],
function (Backbone,eventsView) {
	return Backbone.View.extend({

		tagName: 'div',
		className: 'box match',
		template:  _.template($('#matchTemplate').html()),

		$elements: {},

		viewEvents: new eventsView,

		initialize: function() {
			this.model.on('change:home', this.updateHome, this);
			this.model.on('change:away', this.updateAway, this);
			this.model.on('change:status', this.updateStatus, this);
			// this on destroy if you dont wanna follow this match anymore
		},

		events: {
			'click': 'toggleEvents'
		},

		_rendered: false,
		render: function() {
			this._rendered = true;

			this.$el.html( this.template(this.model.toJSON()) );
			this.$el.attr('status',this.model.get('status'));

			this.$elements.home = this.$el.find('.home');
			this.$elements.away = this.$el.find('.away');
			//viewEvents.render($elements.events);
			return this;
		},

		updateHome: function() {
			this.$elements.home.html( this.template(this.model.get('home').toJSON()) );
		},

		updateAway: function() {
			this.$elements.away.html( this.template(this.model.get('away').toJSON()) );
		},

		updateStatus: function() {
			this.$el.attr('status',this.model.get('status'));
		},

		toggleEvents: function() {
			if ( this.model.get('status') == 'future' ) return;
			this.$el.find('.events').slideToggle();
		}



	});
});
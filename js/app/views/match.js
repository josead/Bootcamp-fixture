define(['backbone','view/MatchEvents'],
function(Backbone,eventsView) {
	return Backbone.View.extend({

		tagName: 'div',
		className: 'box match',
		template:  _.template($('#matchTemplate').html()),

		$elements: {},

		ViewEvents: new eventsView, 

		initialize: function() {
			this.model.on('change:home', this.updateHome, this);
			this.model.on('change:away', this.updateAway, this);
			this.model.on('change:status', this.updateStatus, this);
			// this on destroy if you dont wanna follow this match anymore
		},

		events: {
			'click': 'toggleEvents'
		},

		render: function() {
			console.log(this.model);
			this.$el.html( this.template(this.model.toJSON()) );
			this.$elements.home = this.$el.find('.home');
			this.$elements.away = this.$el.find('.away');
			//ViewEvents.render($elements.events);
			return this;
		},

		updateHome: function() {
			this.$elements.home.html( this.template(this.model.home.toJSON()) );
		},		

		updateAway: function() {
			this.$elements.away.html( this.template(this.model.away.toJSON()) );
		},

		updateStatus: function() {
			//TODO
			//toggle class maybe not
			this.$el.toggleClass();
		},

		toggleEvents: function() {
			this.$el.find('.events').slideToggle();
		}



	});
})
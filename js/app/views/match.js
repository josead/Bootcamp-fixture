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
				'click': 'showDetails',
			},

			render: function() {
				this.$el.html( this.template(this.model.toJSON()) );
				this.$elements.home = this.$el.find('home');
				this.$elements.away = this.$el.find('away');
				this.$elements.status = this.$el.find('status');
				//this.$elements.home.find('.flag').attr("src", this.model.get('home').team.flag);
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
				this.$elements.status.html( this.template(this.model.status.toJSON()) );
			},



		});
})
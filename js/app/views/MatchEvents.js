define(['backbone'],
function(Backbone) {
	return Backbone.View.extend({
		tagName: 'div',

		className: 'events',

		template: _.template($('#eventTemplate').html()),

		initialize: function () {
			this.collection.on('add', this.addOne , this);
		},

		events: {
			'mouseover .event': 'showMore'
		},

		render: function () {
			console.log(this);
			this.collection.each(this.addOne,this);
			return this;
		},

		addOne: function(e) {
			console.log(e);
			this.$el.append( this.template(e.toJSON()) );
		}

		
		
		
	});
})
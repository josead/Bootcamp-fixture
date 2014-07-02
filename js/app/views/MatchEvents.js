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
			this.collection.each(this.addOne,this);
			return this;
		},

		addOne: function(e) {
<<<<<<< HEAD
=======
			console.log(e);
>>>>>>> 3e92a0375b66bc61f183f9207265639e2b6920aa
			this.$el.append( this.template(e.toJSON()) );
		}
		
	});
});
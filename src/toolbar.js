$w.hexEditorToolbar = {
	element: null,
	options: {},
	init: function ( element, options ) {
		this.element = element;
		this.options = options;

		//If position is top we need to add class
		if (options.position == "top") {

		}

		return this;
	},
	destroy: function () {
		if (this.options.position == "top") {

		}
	}
};

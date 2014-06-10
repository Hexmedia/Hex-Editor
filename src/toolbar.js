$w.hexEditorToolbar = {
	isInitialized: false,
	plugins: [ "b", "i", "u" ],
	init: function () {
		this.isInitialized = true;

		var plugins = this.initPlugins();

		$( "body" ).prepend(

		);
	},
	destroy: function () {
	},
	initPlugins: function () {

	}
};
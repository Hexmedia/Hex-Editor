$w.hexEditor = {
	element: null,
	toolbar: null,
	options: {},
	init: function ( element, options ) {
		this.element = element;
		this.options = options;

		$( element ).data( "hex-was-editable",
			$( element ).attr( "contenteditable" ) );
		$( element ).attr( "contenteditable", true );

		this.createToolbar( options.toolbar );
		this.preventDiv();

		return this;
	},
	createToolbar: function ( settings ) {
		this.toolbar = $( this.element ).hexEditorToolbar( settings.toolbar );
	},
	destroy: function () {
		this.toolbar.destroy();

		$( this.element ).attr( "contenteditable", true );
	},
	//@todo need to rewrite it with rangy
	//@todo need to add support for different end line
	//@todo need to add support for ctrl+enter, shift+enter
	preventDiv: function () {
		$( this.element ).keydown( function ( key ) {
			//shiftkey is event.shiftKey
			if (key.keyCode === 13) {
				var br, range, sel, df;

				df = $d.createDocumentFragment();
				br = $( "<br/>" )[0];

				df.appendChild( $d.createTextNode( " \n " ) );
				df.appendChild( br );

				range = $w.getSelection().getRangeAt( 0 );
				range.deleteContents();
				range.insertNode( df );

				range = $d.createRange();
				range.setStartAfter( br );
				range.collapse( true );

				sel = $w.getSelection();
				sel.removeAllRanges();
				sel.addRange( range );

				return false;
			}
		} );
	}
};
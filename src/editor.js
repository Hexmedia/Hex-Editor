$w.hexEditor = {
	elements: [],
	currentElement: null,
	toolbar: null,
	init: function ( element, options ) {
		//Checking if its already initialized

		if ($( element ).hexEditorData( "editor" ) === false ||
			$( element ).hexEditorData( "editor" ) === undefined) {

			this.elements[this.elements.length] = element;
			this.options = options;

			$( element ).hexEditorData( "editor", true );
			$( element ).hexEditorData( "options", options );

			$( element ).hexEditorData( "contenteditable",
				$( element ).attr( "contenteditable" ) );
			$( element ).attr( "contenteditable", true );

			this.addOnFocus();

//			this.preventDiv();
		}

		return this;
	},
	destroy: function ( element ) {
		if ($( element ).hexEditorData( "contenteditable" ) !== "true") {
			$( element ).removeAttr( "contenteditable" );
		}
		$( element ).hexEditorRemoveData( "editor" );
		$( element ).hexEditorRemoveData( "options" );

		//Removing element from element table.
		for (var el in this.elements) {
			if (element == this.elements[el]) {
				this.elements.splice( el, 1 );
			}
		}

		return true;
	},
	addOnFocus: function ( element ) {
		//@todo display edit button
		//@todo display versions button
		//@todo some lighting
	}
};
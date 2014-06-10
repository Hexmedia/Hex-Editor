$w.hexEditor = {
	elements: [],
	currentElement: null,
	toolbar: null,
	init: function ( element, options ) {
		//Checking if its already initialized

		if ($( element ).hexEditorData( "editor" ) === false ||
			$( element ).hexEditorData( "editor" ) === undefined) {
			for (var el in this.elements) {
				if (this.elements[el] == element) {
					return this;
				}
			}

			this.elements[this.elements.length] = element;
			this.options = options;

			$( element ).hexEditorData( "editor", true );
			$( element ).hexEditorData( "options", options );

			$( element ).hexEditorData( "wasEditable",
				$( element ).attr( "contenteditable" ) );
			$( element ).attr( "contenteditable", true );

			this.addOnFocus();

//			this.preventDiv();
		}

		return this;
	},
	destroy: function ( element ) {
		if ($( element ).hexEditorData( "wasEditable" ) !== true) {
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
	}//,
//	//@todo need to rewrite it with rangy
//	//@todo need to add support for different end line
//	//@todo need to add support for ctrl+enter, shift+enter
//	//@todo need to rename this function
//	preventDiv: function () {
//		$( this.element ).keydown( function ( key ) {
//			//shiftkey is event.shiftKey
//			if (key.keyCode === 13) {
//				var br, range, sel, df;
//
//				df = $d.createDocumentFragment();
//				br = $( "<br/>" )[0];
//
//				df.appendChild( $d.createTextNode( " \n " ) );
//				df.appendChild( br );
//
//				range = $w.getSelection().getRangeAt( 0 );
//				range.deleteContents();
//				range.insertNode( df );
//
//				range = $d.createRange();
//				range.setStartAfter( br );
//				range.collapse( true );
//
//				sel = $w.getSelection();
//				sel.removeAllRanges();
//				sel.addRange( range );
//
//				return false;
//			}
//		} );
//	}
};
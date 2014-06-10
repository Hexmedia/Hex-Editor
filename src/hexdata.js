(function ( $ ) {
	String.prototype.hexEditorName = function () {
		return "hexEditor" + this.charAt( 0 ).toUpperCase() + this.slice( 1 );
	};

	$.fn.hexEditorData = function ( name, value ) {

		if (value === undefined) {
			return $( this ).data( name.hexEditorName() );
		} else {
			return $( this ).data( name.hexEditorName(), value );
		}
	};

	$.fn.hexEditorRemoveData = function ( name ) {
		return $( this ).removeData( name.hexEditorName() );
	};

})( jQuery );
$.fn.hexEditor = function ( action, options ) {
	if (typeof action == "undefined") {
		action = "init";
	} else if (typeof options == "undefined" && typeof action == "object") {
		options = action;
		action = "init";
	}

	switch (action) {
		case "is":
			return $( this ).hexEditorData( "editor" ) !== undefined;
		case "init":
			var settings = $.extend( {
				toolbar: {
					position: "top" //possible values (top|glued)
				}
			}, options );

			var editor = $w.hexEditor.init( this, settings );

			return editor;
		case "destroy":
			$w.hexEditor.destroy( this );
			return true;
	}
};

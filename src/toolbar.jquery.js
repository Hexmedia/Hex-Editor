$.fn.hexEditorToolbar = function ( action, options ) {
	if (typeof action == "undefined") {
		action = "init";
	} else if (typeof options == "undefined" && typeof action == "object") {
		options = action;
		action = "init";
	}

	switch (action) {
		case "init":
			var settings = $.extend( {
				position: "top" //possible values top(top|glued)
			}, options );

			if ($( this ).hexEditorData( "editor" )) {
				return $( this ).hexEditorData( "editor" );
			} else {
				var editor = $w.hexEditor.init( this, settings );

				return editor;
			}
			break;
		case "destroy":
			$( this ).hexEditorRemoveData( "toolbar" );
			$( this ).hexEditorData( "toolbar" ).destroy();
			break;
	}
};

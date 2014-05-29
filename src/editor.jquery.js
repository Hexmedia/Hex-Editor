$.fn.hexEditor = function ( action, options ) {
	if (typeof action == "undefined") {
		action = "init";
	} else if (typeof options == "undefined" && typeof action == "object") {
		options = action;
		action = "init";
	}

	switch (action) {
		case "init":
			var settings = $.extend( {
				toolbar: {
					position: "top" //possible values (top|glued)
				}
			}, options );

			if ($( this ).hexEditorData( "editor" )) {
				return $( this ).hexEditorData( "editor" );
			} else {
				var editor = $w.hexEditor.init( this, settings );

				$( this ).hexEditorData( "editor", editor );

				return editor;
			}
			break;
		case "destroy":
			$( this ).hexEditorRemoveData( "editor" );
//				$( this ).data( "hex-editor" ).destroy();
			break;
	}
};

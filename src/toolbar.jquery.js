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

			if ($( this ).hexEditorData( "toolbar" )) {
				return $( this ).hexEditorData( "toolbar" );
			} else {
				var toolbar = $w.hexEditorToolbar.init( this, settings );

				$( this ).hexEditorData( "toolbar", toolbar );

				return toolbar;
			}
			break;
		case "destroy":
			$( this ).hexEditorRemoveData( "toolbar" );
			$( this ).hexEditorData( "toolbar" ).destroy();
			break;
	}
};

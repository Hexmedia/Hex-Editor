(function ( $, $w, $d, $r ) {
	$w.QUnit.config.autostart = false;

	$w.tests = function () {
		var editor;

		module( "Data test" );

		test( 'hexEditorName', function () {
			equal( "test".hexEditorName().toString(), "hexEditorTest" );
		} );

		test( 'can add and remove', function () {
			var name = 'test', val = '12345';

			editor = $( '.editor' );

			editor.hexEditorData( name, val );

			equal( editor.hexEditorData( name ), val );

			editor.hexEditorRemoveData( name );

			equal( editor.hexEditorData( name ), undefined );
		} );

		module( "Main test" );

		test( "Initializing and Destroying", function () {
			var editor, fixture, beforeHtml;

			fixture = $( '#qunit-fixture' );

			beforeHtml = $( fixture ).html();

			editor = $( '.editor' );
			editor.hexEditor();

			equal( editor.hexEditor( 'is' ), true );
			equal( editor.attr( 'contenteditable' ), "true", "ContentEditable added" );
			editor.hexEditor( 'destroy' );
			equal( editor.hexEditor( 'is' ), false );

			equal( $( fixture ).html(), beforeHtml );

			equal( editor.attr( 'contenteditable' ), undefined, "ContentEditable remved" );

			//@todo check if there is a toolbar
		} );

		test( "Is content editable", function () {
			editor = $( '.editor' );
			editor.hexEditor();

			equal( editor.attr( 'contenteditable' ), "true", "ContentEditable added" );

			editor.hexEditor( 'destroy' );
		} );

		test( "Can use more than one instance", function () {
			var editor2;

			editor = $( ".editor" );
			editor2 = $( ".editor2" );

			editor.hexEditor();
			editor2.hexEditor();

			equal( editor.attr( 'contenteditable' ), "true", "ContentEditable added" );
			equal( editor2.attr( 'contenteditable' ), "true", "ContentEditable added" );

			editor.hexEditor( 'destroy' );
			editor2.hexEditor( 'destroy' );
		} );

		test( "Reinitializing instance", function () {
			editor = $( ".editor" );

			editor.hexEditor( {} );//test for options...
			equal( editor.attr( 'contenteditable' ), "true", "ContentEditable added" );
			editor.hexEditor();

			editor.hexEditor( 'destroy' );
		} );

		//@todo write test for elements..

		module( "Toolbar tests" );
	};
})( jQuery, window, document, window.rangy );

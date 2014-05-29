(function ( $, $w, $d, $r ) {
	$w.QUnit.config.autostart = false;

	$w.tests = function () {
		var editor;

		module( "Data test" );

		test('hexEditorName', function() {
			equal("test".hexEditorName().toString(), "hexEditorTest");
		});

		test('can add and remove', function() {
			var name = 'test', val = '12345';

			editor = $('.editor');

			editor.hexEditorData(name, val);

			equal(editor.hexEditorData(name), val);

			editor.hexEditorRemoveData(name);

			equal(editor.hexEditorData(name), undefined);
		});

		module( "Main test" );

		test( "is destroyed", function () {
			editor = $( '.editor' );
			editor.hexEditor();
			editor.hexEditor( 'destroy' );

			equal( editor.hexEditor( 'destroy' ), undefined );

			//@todo check if there is a toolbar
		} );

		test( "is content editable", function () {
			editor = $( '.editor' );
			editor.hexEditor();

			equal( editor.attr( 'contenteditable' ), "true", "ContentEditable added" );

			editor.hexEditor( 'destroy' );
		} );
	};
})( jQuery, window, document, window.rangy );

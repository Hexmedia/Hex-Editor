$w = window;
$d = document;
$r = window.rangy;
$ = jQuery;

$( $d ).ready( function () {
	$w.loadHexEditor = function ( theme ) {
		var src, plugins, ls;

		src = [ 'hexdata', 'editor', 'editor.jquery', 'toolbar', 'toolbar.jquery' ];
		plugins = [];

		theme = theme || 'default';

		ls = function ( scripts, path ) {
			var deferred;

			deferred = new $.Deferred();

			if (scripts.length === 0) {
				deferred.resolve();
			} else {
				var i, loaded, error;

				i = 0;
				loaded = function () {
					i++;

					if (i == scripts.length - 1) {
						deferred.resolve();
					}
				};

				error = function () {
					console.log( "error loading file: " + path + "/" + scripts[script] + ".js" );
					deferred.reject();
				};

				for (var script in scripts) {
					$.getScript( path + "/" + scripts[script] + ".js", loaded, error );
				}
			}

			return deferred.promise();
		};

		$.when( ls( src, "../src" ), ls( plugins, '../plugins' ) ).done( function () {
			$w.tests();

			$w.QUnit.start();
		} );
	};

	$w.loadHexEditor();
} );

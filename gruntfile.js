module.exports = function ( grunt ) {
	"use strict";

	function readOptionalJSON( filepath ) {
		var data = {};

		try {
			data = grunt.file.readJSON( filepath );
		} catch (e) {

		}

		return data;
	}

	var theme = grunt.option( 'theme' ) || "default";

	var path = require( "path" );

	if (!path.existsSync( 'themes/' + theme )) {
		console.log( "Theme does not exists" );
		return 0;
	}

	grunt.initConfig( {
			pkg: grunt.file.readJSON( 'package.json' ),
			dst: readOptionalJSON( "dist/.destination.json" ),
			clean: {
				tests: ['build/log', 'build/*', 'dist']
			},
			htmlConvert: {
				options: {
					// custom options, see below
				},
				src: {
					src: ['themes/' + theme + '/templates/*.tpl.html'],
					dest: 'build/templates/js/templates.js'
				},
				plugins: {
					src: ['plugins/*/templates/**/*.tpl.html'],
					dest: 'build/templates/js/plugins.js'
				}
			},
			concat: {
				options: {
					separator: '',
					stripBanners: true
				},
				js: {
					options: {
						banner: '/*! (C) HexMedia <%= pkg.name %> - v<%= pkg.version %> - ' +
							'<%= grunt.template.today("yyyy-mm-dd") %> */ \n' +
							'(function($, $w, $d, $r, $p, $pt) {\n' +
							'\t"use strict";\n\n',
						footer: '\n})(jQuery, window, document, window.rangy, window.hexEditor.plugins, window.hexEditor.plugins.PluginType);',
						process: function ( src ) {
							var txt, splited;

							splited = src.split( '\n' );
							txt = '';

							for (var line in splited) {
								if (typeof splited[line] != 'undefined') {
									txt += '\t' + splited[line] + '\n';
								}
							}

							return txt;
						}
					},
					src: ['build/templates/js/*.js', 'src/*.js', 'plugins/*.js', "themes/" + theme + "/*.js"],
					dest: 'dist/jquery.<%= pkg.name %>.js'
				},
				css: {
					src: ['build/themes/' + theme + '.css'],
					dest: 'dist/<%= pkg.name %>.css'
				}
			},
			uglify: {
				options: {
					banner: '/*! Hexmedia <%= pkg.name %> (C) Krystian Kuczek <krystian@hexmedia.pl> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				dist: {
					files: {
						'dist/jquery.<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
					}
				}
			},
			qunit: {
				options: {
					'--web-security': 'no',
					coverage: {
						disposeCollector: true,
						src: ['src/**/*.js', 'src/*.js', 'plugins/**/*.js'],
						instrumentedFiles: 'temp/',
						htmlReport: 'build/report/coverage',
						coberturaReport: 'build/report/',
						linesThresholdPct: 50
					}
				},
				files: ['test/**/*.html']
			},
			qunit_junit: {
				options: {
					dest: 'build/log/junit.xml'
				}
			},
			jshint: {
				files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js', "themes/**/*.js", "plugins/**/*.js"],
				options: {
					// options here to override JSHint defaults
					globals: {
						jQuery: true,
						console: true,
						module: true,
						document: true
					}
				}
			},
			jscs: {
				all: {
					options: {
//						"standard": "jquery",
						"report": "xml"
					},
					files: {
						src: [ "src", "plugins", "themes/" + theme ]
					}
				}
			},
			less: {
				files: {
					src: ["themes/" + theme + "/" + theme + ".less"],
					dest: "build/themes/" + theme + ".css"
				}
			},
			lesslint: {
				src: ['themes/**/*.less']
			},
			cssmin: {
				minify: {
					expand: true,
					src: ["dist/<%= pkg.name %>.css"],
					dest: "",
					ext: ".min.css"
				}
			},
			copy: {
				dist: {
					files: [
						{
							expand: true,
							cwd: "themes/" + theme + "/img",
							src: [ "*" ],
							dest: "dist/img/"
						}
					]
				}
			},
			watch: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint', 'qunit']
			}
		}
	);

	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-jscs' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-html-convert' );
	grunt.loadNpmTasks( 'grunt-qunit-junit' );
	grunt.loadNpmTasks( 'grunt-qunit-istanbul' );
	grunt.loadNpmTasks( 'grunt-lesslint' );

	grunt.registerTask( 'lint', ['jshint', 'jscs'] );

	grunt.registerTask( 'unit', ['qunit', 'qunit_junit' ] );

	grunt.registerTask( 'test', ['lint', 'lesslint', 'unit' ] );

	grunt.registerTask( 'build:js', [ 'htmlConvert', 'concat:js', 'uglify'] );
	grunt.registerTask( 'build:css', [ 'less', 'concat:css', 'cssmin'] );
	grunt.registerTask( 'build:img', [ 'copy' ] );

	grunt.registerTask( 'build', ['build:js', 'build:css', 'build:img'] );

	grunt.registerTask( 'default', ['clean', 'test', 'build'] );
};

'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			app: {
				options: {
					bundleOptions: {
						debug: true
					}
				},
				files: {
					'build/js/app.js': [
						'web/js/*.js',
					]
				}
			},
			deps: {
				files: {
					'build/js/deps.js': [
						'web/components/angular/angular.js',
						'web/components/angular-resource/angular-resource.js',
						'web/components/angular-sanitize/angular-sanitize.js'
					]
				}
			}
		},
		connect: {
			options: {
				port: 8080,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			server: {
				options: {
					base: [
						'build'
					]
				}
			}
		},
		clean: {
			build: [
				'build/**/*',
				'!build/.*'
			]
		},
		jshint: {
			options: {
				bitwise: true,
				curly: true,
				forin: true,
				latedef: true,
				newcap: true,
				noarg: true,
				nonew: true,
				undef: true,
				unused: true,
				strict: true,
				trailing: true,
				quotmark: 'single',
				browser: true,
				smarttabs: true,
				node: true
			},
			app: {
				options: {
					globals: {
						angular: true,
						alert: true,
						confirm: true
					}
				},
				files: {
					src: ['Gruntfile.js', 'web/js/**/*.js']
				}
			}
		},
		copy: {
			build: {
				expand: true,
				cwd: 'web',
				src: [
					'*.html',
					'*.txt',
					'img/**/*'
				],
				dest: 'build/'
			}
		},
		sass: {
			build: {
				options: {
					includePaths: require('node-bourbon').includePaths,
					outputStyle: 'nested'
				},
				files: {
					'build/css/compiled/app.css': 'web/css/app.scss'
				}
			}
		},
		cssmin: {
			build: {
				files: {
					'build/css/compiled/app.css': [
						'build/css/compiled/app.css'
					]
				}
			}
		},
		uglify: {
			build: {
				options: {
					banner: '/* <%= pkg.name %> build <%= pkg.version %> */',
					mangle: false
				},
				files: {
					'build/js/deps.js': ['build/js/deps.js'],
					'build/js/app.js': ['build/js/app.js']
				}
			}
		},
		build: {
			compile: [
				'sass:build',
				'browserify:deps',
				'browserify:app',
				'copy:build'
			],
			compress: [
				'uglify:build',
				'cssmin:build'
			],
			dist: [
				'clean:build',
				'build:compile',
				'jshint',
				'build:compress'
			]
		},
		watch: {
			options: {
				spawn: false,
				livereload: true
			},
			css: {
				files: ['web/css/*.scss'],
				tasks: ['sass:build', 'cssmin:build']
			},
			js: {
				files: ['web/js/**/*.js'],
				tasks: ['jshint', 'browserify:app']
			},
			html: {
				files: ['web/**/*.html'],
				tasks: ['copy:build']
			}
		}
	});
	
	grunt.registerMultiTask('build', 'Generate distributable build', function () {
		grunt.task.run(this.data);
	});
	
	grunt.registerTask('server', ['connect:server', 'watch:server']);
	grunt.registerTask('develop', ['build:dist', 'connect:server', 'watch']);
	grunt.registerTask('default', ['develop']);
};

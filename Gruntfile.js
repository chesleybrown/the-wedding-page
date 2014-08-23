'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
						_: true,
						angular: true,
						alert: true,
						confirm: true,
						Firebase: true
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
			options: {
				mangle: false
			},
			app: {
				options: {
					sourceMap: true,
					sourceMapIncludeSources: true,
					compress: false,
					beautify: true
				},
				files: {
					'build/js/app.js': [
						'web/js/*.js'
					]
				}
			},
			deps: {
				options: {
					compress: false,
					beautify: true
				},
				files: {
					'build/js/deps.js': [
						'web/components/lodash/dist/lodash.js',
						'web/components/angular/angular.js',
						'web/components/angular-route/angular-route.js',
						'web/components/angularfire/dist/angularfire.min.js',
						'web/components/firebase/firebase.js'
					]
				}
			},
			compress: {
				options: {
					mangle: false
				},
				files: {
					'build/js/deps.js': ['build/js/deps.js'],
					'build/js/app.js': ['build/js/app.js']
				}
			}
		},
		ngconstant: {
			options: {
				space: '	',
				name: 'config.app',
				dest: 'build/js/app.config.js'
			},
			build: {
				constants: grunt.file.readJSON('config.json')
			}
		},
		build: {
			compile: [
				'sass:build',
				'uglify:app',
				'uglify:deps',
				'ngconstant',
				'copy:build'
			],
			compress: [
				'uglify:compress',
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
				tasks: ['jshint', 'uglify:app']
			},
			html: {
				files: ['web/**/*.html', 'web/img/**/*'],
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

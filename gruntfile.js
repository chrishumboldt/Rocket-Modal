module.exports = function(grunt)
{
	// Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task
	grunt.registerTask('default', ['watch']);

	// Other tasks
	grunt.registerTask('build', ['sass', 'uglify']);

	// Initialize config
	grunt.initConfig(
	{
		// Package
		pkg: grunt.file.readJSON('package.json'),
		// SASS
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/modalplate.css': 'sass/modalplate.scss',
					'css/demo.css': 'sass/demo.scss'
				}
			}
		},
		// Uglify
		uglify: {
			my_target: {
				files: {
					'js/min/jquery-v1.10.2.min.js': ['js/jquery-v1.10.2.js'],
					'js/min/modalplate.min.js': ['js/modalplate.js']
				}
			}
		},
		// Watch
		watch: {
			// CSS
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
			// Scripts
			scripts: {
				files: 'js/*.js',
				tasks: ['uglify']
			},
			// Live reload
			options: {
				livereload: true
			}
		}
	});
}
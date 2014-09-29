module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      js: {
        options: {
          //mangle: false,
          //sourceMap: true
        },
        files: {
          '_/js/main.min.js':
          [
            'kom-dev/js/vendor/jquery-1.10.2.min.js',
            'kom-dev/js/vendor/jquery-ui.min.js',
            'kom-dev/js/vendor/jquery.royalslider.min.js',
            'kom-dev/js/vendor/grayscale.js',
            'kom-dev/js/vendor/jquery.easing.1.3.js',
            'kom-dev/js/main.js'
          ]
        }
      }
    },
    sass: {
      dist: {
        files: {
          '_/css/main.min.css': 'kom-dev/sass/main.scss',
        },
        options: {
          style: 'compressed',
          //trace: true,
          sourcemap: true
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', '**/*.js']
    },
    watch: {
      js: {
        files: ['kom-dev/js/**/*.js'],
        tasks: ['uglify:js'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['**/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      }
    }
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['watch']);


  // Default task(s).
  // grunt.registerTask('default', ['uglify']);
  // grunt.registerTask('dev',['sass','jshint','uglify']);
  // grunt.registerTask('default',['sass','uglify']);

};
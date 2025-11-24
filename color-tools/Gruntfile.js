module.exports = function(grunt) {
  // Load required Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    uglify: {
      js: {
        files: [{
          expand: true,
          cwd: 'assets/js/',
          src: ['**/*.js'],
          dest: 'dist/assets/js/',
          ext: '.min.js'
        }]
      }
    },
    cssmin: {
      css: {
        files: [{
          expand: true,
          cwd: 'assets/css/',
          src: ['**/*.css'],
          dest: 'dist/assets/css/',
          ext: '.min.css'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: [{
          expand: true,
          cwd: '.',
          src: ['*.php', '*.html'],
          dest: 'dist/',
          ext: '.php'
        }]
      }
    },
    copy: {
      main: {
        files: [
          // Copy PHP files (except index.php, about.php, etc. already minified)
          {expand: true, cwd: '.', src: ['*.php'], dest: 'dist/'},
          // Copy assets (images, fonts, etc.)
          {expand: true, cwd: 'assets/', src: ['img/**', 'fonts/**'], dest: 'dist/assets/'}
        ]
      }
    }
  });

  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin', 'copy']);
};

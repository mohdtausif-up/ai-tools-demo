module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      js: {
        files: [{
          expand: true,
          cwd: 'assets/js/',
          src: ['*.js'],
          dest: 'dist/js/',
          ext: '.min.js'
        }]
      }
    },
    cssmin: {
      css: {
        files: [{
          expand: true,
          cwd: 'assets/css/',
          src: ['*.css'],
          dest: 'dist/css/',
          ext: '.min.css'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '.',
          src: ['*.php'],
          dest: 'dist/html/',
          ext: '.php'
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin']);
};

'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    serve: {
        options: {
            host: "0.0.0.0",
            port: 9000
        }
    }
  });
  grunt.loadNpmTasks('grunt-serve');
};

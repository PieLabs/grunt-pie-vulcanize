/*
 * grunt-pie-vulcanize
 * https://github.com/PieLabs/grunt-pie-vulcanize
 *
 * Copyright (c) 2016 
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pie_vulcanize: {
      file: '../corespring-pie-multiple-choice/corespring-pie-multiple-choice.html'
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['pie_vulcanize']);

};

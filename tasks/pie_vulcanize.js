/*
 * grunt-pie-vulcanize
 * https://github.com/PieLabs/grunt-pie-vulcanize
 *
 * Copyright (c) 2016 
 * Licensed under the MIT license.
 */

'use strict';

var tmp = require('tmp');
var vulcan = require('vulcanize');
var cheerio = require('cheerio');
var fs = require('fs');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  function defaultTarget(file) {
    var suffix = '-vulcanized';
    var split = file.split('.');
    return split.length == 1 ? file + suffix : split.slice(0, -1).join('.') + suffix + '.' + split[split.length-1];
  }

  grunt.registerTask('pie_vulcanize', 'A Grunt plugin to Vulcanize a PIE', function() {
    var done = this.async();
    var config = grunt.config.data && grunt.config.data.pie_vulcanize ? grunt.config.data.pie_vulcanize : {};
    var filename = config.file || 'index.html';
    var target = config.target || defaultTarget(filename);

    var tempFile = tmp.fileSync({dir: './'});
    var htmlString = fs.readFileSync(filename).toString();
    var $ = cheerio.load(htmlString);

    $('link').each(function() {
      $(this).attr('href', ($(this).attr('href').replace('../', 'bower_components/')));
    });

    fs.writeFileSync(tempFile.name, $.html(), 'utf8');

    var Vulcanize = new vulcan({
      abspath: '',
      stripExcludes: [
      ],
      inlineScripts: false,
      inlineCss: false,
      addedImports: [
      ],
      redirects: [
      ],
      implicitStrip: true,
      stripComments: false,
      inputUrl: ''
    });

    Vulcanize.process(tempFile.name, function(err, inlinedHtml) {
      if (err) {
        grunt.log.error(err);
      } else {
        fs.writeFileSync(target, inlinedHtml, 'utf8');
        grunt.log.writeln('Wrote vulcanized output to ' + target);
      }

      tempFile.removeCallback();
      done();
    });
  });

};

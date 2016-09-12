# grunt-pie-vulcanize

A Grunt plugin to Vulcanize a PIE

## Usage

Add `grunt-pie-vulcanize` to your `package.json`:

    "grunt-pie-vulcanize": "https://github.com/PieLabs/grunt-pie-vulcanize"

Add the `pie_vulcanize` grunt configuration and npm tasks to your Gruntfile.js:

    grunt.initConfig({
      pie_vulcanize: {
        file: 'my-pie.html',
        target: 'dist/my-pie.html'
      }
    });

    grunt.loadNpmTasks('grunt-pie-vulcanize');

Run the `pie_vulcanize` grunt task:

    grunt pie_vulcanize
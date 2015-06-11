/*global module:false*/
module.exports = function(grunt) {

    require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
      babel: {
        options: {
          sourceMap: false,
          modules: 'umd'
        },
        dist: {
          files: [{
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'dist'
          }]
        }
      },
      uglify: {
        dist: {
            files: {
              'dest/slate.min.js': ['dist/js/*.js']
            }
        }
      },
      esperanto: {
        options: {
          type: 'umd',
          bundleOpts: {
            name: 'slate'
          }
        },
        files: {
          expand: true,
          cwd: 'src/js',
          src : ['**/*.js'],
          dest: 'dist/out.min.js'
        }
      }
    });

    grunt.registerTask("default", [/*"babel"/*, 'uglify'*/,'esperanto']);
    // grunt.registerTask('default', ['umd']);
};

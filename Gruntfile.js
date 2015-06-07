/*global module:false*/
module.exports = function(grunt) {

    require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
      "babel": {
        options: {
          sourceMap: true
        },
        dist: {
          files: {
            "dist/app.js": "src/js/app.js"
          }
        }
      }
    });

    grunt.registerTask("default", ["babel"]);
};

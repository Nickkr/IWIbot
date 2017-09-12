/**
 * Created by Armin on 25.05.2017.
 */
'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'public/javascripts/bundle.js',
                dest: 'public/javascripts/bundle.min.js'
            }
        },
        nodeunit: {
            files: ['openwhisk/**/*test.js']
        },
        jshint: {
            files: ['**/*.js', // lint all javascript files except the follow
                    '!Gruntfile.js',
                    '!node_modules/**',
                    '!tts-token.js',
                    '!stt-token.js',
                    '!public/javascripts/jquery.leanModal.min.js',
                    '!public/javascripts/bundle.js',
                    '!public/javascripts/bundle.min.js'],
            options: {
                jshintrc: '.jshintrc',
                reporterOutput: "" // This is to ommit bug!
            }
        },
        browserify: {
            build: {
                src: 'public/javascripts/main.js',
                dest: 'public/javascripts/bundle.js'
            }

        },
        // run once  --> grunt watch
        // After that every change on a file matching the patterns used bellow
        // will execute the corresponding task
        watch: {
           /* unittest: {
                files: '<%= nodeunit.files %>',
                tasks: ['nodeunit']
            },*/
            linting: {
                files: '<%= jshint.files %>',
                tasks: ['jshint']
            }
            /*,
            uglify: {
                files: '<%= uglify.build.src %>',
                tasks: ['uglify']
            }*/
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');     // Linter
    grunt.loadNpmTasks('grunt-contrib-nodeunit');   // Test-Framework
    grunt.loadNpmTasks('grunt-contrib-uglify');     // Minifier
    grunt.loadNpmTasks('grunt-contrib-watch');      // Watcher (if files changed, then run condigured tasks)
    grunt.loadNpmTasks('grunt-browserify');         // Convert the nodejs app to javascript which works in browsers
                                                    // (another way is to use require.js)
    // Default task.
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('localBuild', ['jshint', 'uglify', 'browserify']);
};
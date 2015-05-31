module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        less: {
            development: {
                expand : true,
                cwd : 'public/less/',
                src : '**/*.less',
                ext : '.css',
                dest : 'public/css/'
            }
        },
        watch: {
            styles: {
                files: ['public/less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
};
/**
 * Created by weilu on 15/11/27.
 */
module.exports = function(grunt) {
    var baseurl = 'src/';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: baseurl + 'js/module/',
                    src: ['util.js'],
                    dest: baseurl + 'js/dist/grunt/',
                    ext: '.min.js'
                }]
            }
        },
        concat: {
            basic: {
                src: [baseurl + 'js/module/config.js'],
                dest: baseurl + 'js/dist/grunt/basic.js'
            },
            extras: {
                src: [baseurl + 'js/module/config.js', baseurl + 'js/module/util.js', baseurl + 'js/module/jquery.util.js'],
                dest: baseurl + 'js/dist/grunt/all.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify','concat']);

};

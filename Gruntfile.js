/**
 * Created by sunboss on 2014/8/11.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // 定义一个用于插入合并输出文件之间的字符
                separator: ';'
            },
            dist: {
                // 将要被合并的文件
                src: ['app.js', 'cluster.js', 'config/**/*.js', 'mypackage/**/*.js', 'models/**/*.js', 'routes/**/*.js'],
                // 合并后的JS文件的存放位置，以项目名来命名
                dest: 'build/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/* Smartac Waterloo, Inc. <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: { except: "Smartac" }
            },
            dist: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            // define the files to lint
            files: ['Gruntfile.js', 'app.js', 'cluster.js', 'config/**/*.js', 'mypackage/**/*.js', 'models/**/*.js', 'routes/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-include-replace');

    // 在命令行上输入"grunt test"，test task就会被执行。
    grunt.registerTask('test', ['jshint', 'qunit']);

    // 只需在命令行上输入"grunt"，就会执行default task
    //grunt.registerTask('build', ['jshint', 'qunit', 'concat', 'uglify']);
    grunt.registerTask('build', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('default', ['build']);
};
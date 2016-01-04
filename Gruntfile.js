module.exports = function(grunt) {


    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    compress: true
                },
                files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: 'src/less',
                    dest: 'dist/less',
                    src: ['**/*.less'], // Actual pattern(s) to match.
                    //flatten: true,
                    ext: '.css'   // Dest filepaths will have this extension.
                    // ,rename: function (dest, matchedSrcPath, options) {
                    //     return path.join(dest, matchedSrcPath.replace('les2', 'module/1'));
                    // }
                }]
            }
        },
        concat: {
            options: {
                // 合併不同檔案時會在檔案和檔案之間加入 ; 
                separator: ';'
            },
            dist: {
                // 要合併的檔案
                src: ['src/**/*.js'],
                // 產生的檔案路徑
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': 'dist/js/*.js'
                        // 'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            // 檢查的檔案
            files: ['gruntfile.js', 'dist/js/*.js', 'src/js/*.js'],
            // 設定 JSHint 屬性查詢文件(http://www.jshint.com/docs/options/)
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'src/css',
                src: ['**/*.css', '!*.min.css'],
                dest: 'dist/css',
                ext:'.min.css'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('test', ['uglify', 'jshint']);
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    // grunt  module test


};

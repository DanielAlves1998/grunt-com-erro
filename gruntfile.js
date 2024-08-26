const htmlmin = require("grunt-contrib-htmlmin");

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: { //aqui é um ambiente de desenvolvimento, também chamado de desenvolvimento local
                files: {
                    "dev/styles/main.css": "src/styles/main.less"
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'], //quando se usa o /* de forma isalada é para puchar qualquer arquivo, e de forma dupla, e para as pastas.
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [src/index.html],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './src/scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [prebuild/index.html],
                        dest: 'dis/'
                    }
                ]
            }
        },
        htmlmin: { 
            dist: { //o dist é para um ambiente de produção
                options: {
                    removeComents: true, //remove qualquer coemtário que estiver no html
                    collapseWhitespace: true, //apaga todo o espaço em branco
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'], //aqui se coloca a pasta que quer deletar
                        //configuração do uglify
        uglify: {
            target: {
                files: {
                    'dist/script/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']); //aqui estou acessando a área de desenvolvimento
    grunt.registerTask('build', ['less:production', 'htmlmin:dis', 'replace:dist', 'clean', 'uglify']); // e aqu a área de produção
}
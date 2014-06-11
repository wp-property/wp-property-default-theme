/**
 * Build Theme
 *
 *
 *
 * @author potanin@UD
 * @version 1.1.2
 * @param grunt
 */
module.exports = function( grunt ) {

  // Require Utility Modules.
  var joinPath      = require( 'path' ).join;

  grunt.initConfig( {
    
    pkg: grunt.file.readJSON( 'package.json' ),
    
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        logo: 'http://media.usabilitydynamics.com/logo.png',
        options: {
          paths: './',
          outdir: 'static/codex'
        }
      }
    },
    
    less: {
      production: {
        options: {
          yuicompress: true,
          relativeUrls: true
        },
        files: {
          'styles/wp_properties.css': [ 'styles/src/wp_properties.less' ],
          'styles/wp_properties-ie_7.css': [ 'styles/src/wp_properties-ie_7.less' ],
          'styles/wp_properties-msie.css': [ 'styles/src/wp_properties-msie.less' ],
          
          'styles/theme-specific/denali.css': [ 'styles/src/theme-specific/denali.less' ],
          'styles/theme-specific/fb_properties.css': [ 'styles/src/theme-specific/fb_properties.less' ],
          'styles/theme-specific/twentyeleven.css': [ 'styles/src/theme-specific/twentyeleven.less' ],
          'styles/theme-specific/twentyten.css': [ 'styles/src/theme-specific/twentyten.less' ],
          'styles/theme-specific/twentytwelve.css': [ 'styles/src/theme-specific/twentytwelve.less' ]
        }
      },
      development: {
        options: {
          relativeUrls: true
        },
        files: {
          'styles/wp_properties.dev.css': [ 'styles/src/wp_properties.less' ],
          'styles/wp_properties-ie_7.dev.css': [ 'styles/src/wp_properties-ie_7.less' ],
          'styles/wp_properties-msie.dev.css': [ 'styles/src/wp_properties-msie.less' ],
          
          'styles/theme-specific/denali.dev.css': [ 'styles/src/theme-specific/denali.less' ],
          'styles/theme-specific/fb_properties.dev.css': [ 'styles/src/theme-specific/fb_properties.less' ],
          'styles/theme-specific/twentyeleven.dev.css': [ 'styles/src/theme-specific/twentyeleven.less' ],
          'styles/theme-specific/twentyten.dev.css': [ 'styles/src/theme-specific/twentyten.less' ],
          'styles/theme-specific/twentytwelve.dev.css': [ 'styles/src/theme-specific/twentytwelve.less' ]
        }
      }
    },
    
    // Minify Core and Template Scripts.
    uglify: {
      production: {
        options: {
          mangle: false,
          beautify: false
        },
        files: [
          {
            expand: true,
            cwd: 'scripts/src',
            src: [ '*.js' ],
            dest: 'scripts',
            rename: function renameScript( dest, src ) {
              return joinPath( dest, src.replace( '.js', '.js' ) );
            }
          }
        ]
      },
      development: {
        options: {
          mangle: false,
          beautify: true
        },
        files: [
          {
            expand: true,
            cwd: 'scripts/src',
            src: [ '*.js' ],
            dest: 'scripts',
            rename: function renameScript( dest, src ) {
              return joinPath( dest, src.replace( '.js', '.dev.js' ) );
            }
          }
        ]
      }
    },
    
    watch: {
      options: {
        interval: 1000,
        debounceDelay: 500
      },
      less: {
        files: [
          'style.css',
          'styles/src/*.less'
        ],
        tasks: [ 'less' ]
      },
      js: {
        files: [
          'scripts/src/*.js'
        ],
        tasks: [ 'uglify' ]
      }
    }
    
  });

  // Load tasks
  grunt.loadNpmTasks( 'grunt-markdown' );
  grunt.loadNpmTasks( 'grunt-spritefiles' );
  grunt.loadNpmTasks( 'grunt-contrib-symlink' );
  grunt.loadNpmTasks( 'grunt-contrib-yuidoc' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-less' );

  // Build Assets
  grunt.registerTask( 'default', [
    'less',
    'uglify'
  ]);

  grunt.registerTask( 'distribution', [
    'less',
    'uglify'
  ]);

  // Update Documentation
  grunt.registerTask( 'document', [
    'yuidoc'
  ]);

  // Update Environment
  grunt.registerTask( 'update', [] );

  // Automatically Rebuild
  grunt.registerTask( 'dev', [
    'watch'
  ]);

};
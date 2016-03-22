var babelPreprocessor = file => require( 'babel' )
                                   .transform( file.content, { sourceMap: true, filename: file.path } );

module.exports = function ( wallaby ) {
    return {
        files: [
            { pattern: 'jspm_packages/system.js', instrument: false },
            { pattern: 'config.js', instrument: false },

            { pattern: "src/**/*.ts", load: false }
        ],

        tests: [
           { pattern: "tests/spec/*.spec.ts", load: false }
        ],
        //preprocessors: {
        //    "tests/spec/*.spec.js": babelPreprocessor,
        //    'src/js/**/*.js': babelPreprocessor
        //},
        middleware: ( app, express ) => {
            app.use( '/jspm_packages',
                express.static( require( 'path' ).join( __dirname, 'jspm_packages' ) ) );
        },
        bootstrap: function ( wallaby ) {
            var promises = [];
            var i = 0;
            var len = wallaby.tests.length;

            wallaby.delayStart();

            System.config( {
                paths: {
                    '*': '*.js'
                }
            } );

            for ( ; i < len; i++ ) {
                promises.push( System['import']( wallaby.tests[i].replace( /\.js$/, '' ) ) );
            }

            Promise.all( promises ).then( function () {
                wallaby.start();
            } ).catch( function ( e ) { setTimeout( function () { throw e; }, 0 ); } );
        }//},
        //env: {
        //    type: 'node'
        //}
    };
};
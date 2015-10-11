var babel = require( "babel" );

module.exports = function ( wallaby ) {
    return {
        files: [
            {pattern: 'node_modules/babel/node_modules/babel-core/browser-polyfill.js', instrument: false},
            { pattern: "dist/js/vendor/jQuery.js", instrumant: false },
           "src/js/**/*.js"
        ],

        tests: [
           "tests/spec/*.spec.js"
        ],
        compilers: {
            '**/*.js':  wallaby.compilers.babel( {
                babel: babel,
                // https://babeljs.io/docs/usage/experimental/
                stage: 0
            } )
        }
    };
};
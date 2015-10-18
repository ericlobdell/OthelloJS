var babel = require( "babel" );

module.exports = function ( wallaby ) {
    return {
        files: [
            {pattern: 'node_modules/babel/node_modules/babel-core/browser-polyfill.js', instrument: false},
            { pattern: "dist/js/vendor/jQuery.js", instrument: false },
           "src/js/**/*.js",
            { pattern: "src/js/othello.js", instrument: false }
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
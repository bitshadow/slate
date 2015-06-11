var gobble = require( 'gobble' );

gobble.cwd( __dirname );

var babelWhitelist = [
    'es6.arrowFunctions',
    'es6.blockScoping',
    'es6.classes',
    'es6.constants',
    'es6.destructuring',
    'es6.parameters.default',
    'es6.parameters.rest',
    'es6.properties.shorthand',
    'es6.templateLiterals'
];

var lib = gobble( 'src/js' )
    .transform( 'babel', {
        whitelist: babelWhitelist,
        sourceMap: false
    })
    .transform( 'esperanto-bundle', {
        entry: 'app',
        type: 'umd',
        name: 'app',
        sourceMap: false
    });


built = gobble([
 lib,
 lib.transform( 'uglifyjs', { ext: '.min.js' })
]);

module.exports = built;
var favicon = require( "serve-favicon" );

/**
 * @brief Adds favicon handling to the given application instance.
 *
 * @praram[in] Express Object application is the current application instance.
 */
module.exports = function( application ) {
	application.use( favicon( __dirname + "public/favicon.ico" ) );
}

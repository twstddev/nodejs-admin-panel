var helpers = require( "../../include/helpers" );
var favicon = require( "serve-favicon" );

/**
 * @brief Adds favicon handling to the given application instance.
 */
module.exports = function() {
	return favicon( helpers.generate_public_path( "public/favicon.ico" ) );
}

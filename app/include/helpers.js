var path_utils = require( "path" );
var relative_application_path = path_utils.join( __dirname, "../../" );

/**
 * @brief Returns a path to the public folder,
 * that contains all project assets.
 *
 * @param[in] String path is the relative to public path
 */
module.exports.generate_public_path = function( path ) {
	return path_utils.join( relative_application_path, path );
};

var chai = require( "chai" );
var database_url = "mongodb://localhost/test";
var path_utils = require( "path" );
var relative_application_path = path_utils.join( __dirname, "../" );

chai.config.includeStack = true;

global.expect = chai.expect;
global.database_url = database_url;
global.mongoose = require( "mongoose" );
global.mocha_mongoose = require( "mocha-mongoose" )( database_url, {
	noClear : true
} );

/**
 * @brief Wraps given path into relative path to the application.
 *
 * @param[in] String path is a path to wrap
 */
global.generate_application_path = function( path ) {
	return path_utils.join( relative_application_path, path );
};

/**
 * @brief Connects to test database.
 *
 * @param[in] Function callback is a callback to call once
 * connection is done.
 */
global.connect_to_database = function( callback ) {
	if ( mongoose.connection.db ) {
		return callback();
	}

	mongoose.connect( database_url, callback );
};

/**
 * @brief Clears database.
 *
 * @param[in] Function callback is a callback to call once database
 * is cleared.
 */
global.clear_database = function( callback ) {
	mocha_mongoose( callback );
};

require( "express-namespace" );
require( "express-resource" );

var users_routes = require( "./routes/users" );

/**
 * @brief Implements main admin module.
 */
var Router = ( function() {
	// private scope
	
	return {
		/**
		 * @brief Registers admin routes.
		 */
		registerRoutes : function( application ) {
			application.namespace( "/admin", function() {
				application.get( "/", function( request, response ) {
					response.render( "admin/users/index", {} );
				} );

				application.resource( "users", users_routes );
			} );
		}
	}
} )();

module.exports = Router;

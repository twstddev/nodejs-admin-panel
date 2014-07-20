require( "express-namespace" );
require( "express-resource" );

var users_routes = require( "./routes/users" );
var menu_items_routes = require( "./routes/menu_items" );
var pages_routes = require( "./routes/pages" );

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
				application.post( "menu_items/sort", menu_items_routes.sort );
				application.resource( "menu_items", menu_items_routes );
				application.resource( "pages", pages_routes );
			} );
		}
	}
} )();

module.exports = Router;

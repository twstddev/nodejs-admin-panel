require( "express-namespace" );

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
				} );
			} );
		}
	}
} )();

module.exports = Router;

var helpers = require( "../include/helpers" );

var admin_router = require( helpers.generate_public_path( "app/modules/admin/router" ) );

/**
 * @brief Implements entry point for all application routes.
 */
var Router = ( function() {
	// private scope
	
	/**
	 * @brief Registers admin routes.
	 */
	var registerAdminRoutes = function( application ) {
		admin_router.registerRoutes( application );
	};

	return {
		/**
		 * @brief Fake constructor.
		 */
		init : function() {},
		
		/**
		 * @brief Registers application routes.
		 *
		 * @param[in] Object application is the application instance
		 */
		registerRoutes : function( application ) {
			registerAdminRoutes( application );
		}
	}
} )();

module.exports = Router;

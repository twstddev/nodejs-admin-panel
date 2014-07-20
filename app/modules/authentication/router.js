/**
 * @brief Implements session routes.
 */
var Router = ( function() {
	// private scope
	/**
	 * @brief Displays login template and form.
	 */
	var getLoginRoute = function( request, response ) {
		return response.render( "general/login", {} );
	};

	/**
	 * @brief Logs out current user and takes back to login page.
	 */
	var getLogoutRoute = function( request, response ) {
		request.logout();
		return response.redirect( "/login" );
	};

	return {
		/**
		 * @brief Registers session routes.
		 */
		registerRoutes : function( application ) {
			application.get( "/login", getLoginRoute );
			application.get( "/logout", getLogoutRoute );
		}
	}
} )();

module.exports = Router;

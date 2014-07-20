var MenuItem = require( helpers.generate_public_path( "app/include/models/menu_item" ) );
var Page = require( helpers.generate_public_path( "app/include/models/page" ) );

/**
 * @brief Implements JSON API interface.
 */
var Router = ( function() {
	// private scope
	/**
	 * @brief Returns the list of currently existing
	 * pages.
	 */
	var apiPages = function( request, response ) {
		Page.find( {}, "_id title slug body" )
		.exec( function( error, pages ) {
			return response.json( pages );
		} );
	};

	/**
	 * @brief Returns existing menu items.
	 */
	var apiMenuItems = function( request, response ) {
		MenuItem.find( {}, "_id title url" )
		.sort( "position" )
		.exec( function( error, menu_items ) {
			return response.json( menu_items );
		} );
	};

	return {
		/**
		 * @brief Registers api routes.
		 */
		registerRoutes : function( application ) {
			application.namespace( "/api", function() {
				application.get( "/pages", apiPages );
				application.get( "/menu_items", apiMenuItems );
			} );
		}
	}
} )();

module.exports = Router;

var MenuItem = require( helpers.generate_public_path( "app/include/models/menu_item" ) );

/**
 * @brief Displays as list of menu items.
 */
module.exports.index = function( request, response ) {
	MenuItem.find( {} )
	.exec( function( errors, menu_items ) {
		return response.render( "admin/menu_items/index", {
			menu_items : menu_items,
			success : request.flash( "success" )
		} );
	} );
};

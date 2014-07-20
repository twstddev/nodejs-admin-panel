var Page = require( helpers.generate_public_path( "app/include/models/page" ) );

/**
 * @brief Displays a list of pages.
 */
module.exports.index = function( request, response ) {
	Page.find( {} )
	.exec( function( errors, pages ) {
		return response.render( "admin/pages/index", {
			pages : pages,
			success : request.flash( "success" )
		} );
	} );
};

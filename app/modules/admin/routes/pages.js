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

/**
 * @brief Displays a new page form.
 */
module.exports.new = function( request, response ) {
	var page = new Page( {} );

	return response.render( "admin/pages/new", {
		page : page
	} );
};

/**
 * @brief Creates a new page using passed values.
 */
module.exports.create = function( request, response ) {
	var new_page = new Page( request.body );

	new_page.save( function( error ) {
		error = error || {};

		if ( _.isEmpty( error ) ) {
			request.flash( "success", "A page has been created" );
			return response.redirect( "/admin/pages" );
		}

		return response.render( "admin/pages/new", {
			page : new_page,
		 	errors : helpers.process_errors( error.errors )
		} );
	} );
};

/**
 * @brief Redirects to edit form since we don't have
 * page preview.
 */
module.exports.show = function( request, response ) {
	return response.redirect( "/admin/pages/" + request.params.page + "/edit" );
};

/**
 * @brief Renders page edit form.
 */
module.exports.edit = function( request, response ) {
	Page.findOne( { _id : request.params.page } )
	.exec( function( error, page ) {
		return response.render( "admin/pages/edit", {
			page : page
		} );
	} );
};

/**
 * @brief Update given page.
 */
module.exports.update = function( request, response ) {
	Page.findOne( { _id : request.params.page } )
	.exec( function( error, page ) {
		if ( _.isEmpty( error ) ) {
			page = _.extend( page, request.body );

			page.save( function( error ) {
				if ( _.isEmpty( error ) ) {
					request.flash( "success", "A page has been updated" );
					return response.redirect( "/admin/pages" );
				}

				return response.render( "admin/pages/edit", {
					page : page,
				   	errors : helpers.process_errors( error.errors )
				} );
			} );
		}
	} );
};

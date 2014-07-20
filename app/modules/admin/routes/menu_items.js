var MenuItem = require( helpers.generate_public_path( "app/include/models/menu_item" ) );

/**
 * @brief Displays as list of menu items.
 */
module.exports.index = function( request, response ) {
	MenuItem.find( { parent : undefined } )
	.sort( "position" )
	.exec( function( errors, menu_items ) {
		return response.render( "admin/menu_items/index", {
			menu_items : menu_items,
			success : request.flash( "success" )
		} );
	} );
};

/**
 * @brief Displays a new menu item form.
 */
module.exports.new = function( request, response ) {
	var menu_item = new MenuItem( {} );

	return response.render( "admin/menu_items/new", {
		menu_item : menu_item
	} );
};

/**
 * @brief Creates a new menu item using passed values.
 */
module.exports.create = function( request, response ) {
	var new_menu_item = new MenuItem( request.body );

	new_menu_item.save( function( error ) {
		error = error || {};

		if ( _.isEmpty( error ) ) {
			request.flash( "success", "A menu item has been created" );
			return response.redirect( "/admin/menu_items" );
		}

		return response.render( "admin/menu_items/new", {
			menu_item : new_menu_item,
			errors : helpers.process_errors( error.errors )
		} );
	} );
};

/**
 * @brief Redirects to edit form since we don't have
 * menu items preview.
 */
module.exports.show = function( request, response ) {
	return response.redirect( "/admin/menu_items/" + request.params.menu_item + "/edit" );
};

/**
 * @brief Renders menu item edit form.
 */
module.exports.edit = function( request, response ) {
	MenuItem.findOne( { _id : request.params.menu_item } )
	.exec( function( error, menu_item ) {
		return response.render( "admin/menu_items/edit", {
			menu_item : menu_item
		} );
	} );
};

/**
 * @brief Updates given menu item.
 */
module.exports.update = function( request, response ) {
	MenuItem.findOne( { _id : request.params.menu_item } )
	.exec( function( error, menu_item ) {
		if ( _.isEmpty( error ) ) {
			menu_item = _.extend( menu_item, request.body );

			menu_item.save( function( error ) {
				if ( _.isEmpty( error ) ) {
					request.flash( "success", "A menu item has been updated" );
					return response.redirect( "/admin/menu_items" );
				}

				return response.render( "admin/menu_items/edit", {
					menu_item : menu_item,
					errors : helpers.process_errors( error.errors )
				} );
			} );
		}
	} );
};

/**
 * @brief Removes requested menu item.
 */
module.exports.destroy = function( request, response ) {
	MenuItem.remove( { _id : request.params.menu_item }, function( error ) {
		request.flash( "success", "A menu item has been deleted" );
		return response.redirect( "/admin/menu_items" );
	} );
};

/**
 * @brief Sorts menu items according to the given data.
 */
module.exports.sort = function( request, response ) {
	// ugly callback again
	var save_single_item = function( item, index, callback ) {
		item.position = index;
		item.save( function( error ) {
			callback();
		} );
	};

	var save_sorted_items = function( items, parent ) {
		_.each( items, function( item, index ) {
			if ( item.id ) {
				var current_id = item.id;

				MenuItem.findOne( { _id : current_id } )
				.exec( function( error, menu_item ) {
					if ( parent ) {
						MenuItem.findOne( { _id : parent } )
						.exec( function( error, parent_item ) {
							menu_item.parent = parent_item;

							save_single_item( menu_item, index, function() {
								if ( item.children ) {
									save_sorted_items( item.children, current_id );
								}
							} );
						} );
					}
					else {
						// why do I have to do this?
						// Jesus...undefined...
						menu_item.parent = undefined;

						save_single_item( menu_item, index, function() {
							if ( item.children ) {
								save_sorted_items( item.children, current_id );
							}
						} );
					}
				} );
			}
		} );
	};

	if ( request.body.items ) {
		save_sorted_items( request.body.items );
	}

	return response.send( 200, "" );
};

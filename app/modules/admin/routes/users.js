var User = require( helpers.generate_public_path( "app/include/models/user" ) );

/**
 * @brief Displays a list of users.
 */
module.exports.index = function( request, response ) {
	response.render( "admin/users/index" );
};

/**
 * @brief Displays a new user form.
 */
module.exports.new = function( request, response ) {
	var user = new User( {} );

	response.render( "admin/users/new", {
		user : user
	} );
}

/**
 * @brief Creates a new user using passed values.
 */
module.exports.create = function( request, response ) {
	var new_user = new User( request.body );

	new_user.save( function( error ) {
		if ( error ) {
		}
		response.send( error );
	} );
}

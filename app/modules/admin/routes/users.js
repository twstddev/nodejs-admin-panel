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
		error = error || {};

		if ( request.body[ "password" ] != request.body[ "confirm-password" ] ) {
			error = {
				errors : {
					password : {
						message : "Password do not match"
					}
				}
			};
		}

		if ( !error ) {
			return response.redirect( "admin/users" );
		}

		return response.render( "admin/users/new", {
			user : new_user,
			errors : helpers.process_errors( error.errors )
		} );
	} );
}

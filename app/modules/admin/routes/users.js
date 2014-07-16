var User = require( helpers.generate_public_path( "app/include/models/user" ) );

/**
 * @brief Displays a list of users.
 */
module.exports.index = function( request, response ) {
	User.find( {} )
	.exec( function( errors, users ) {
		return response.render( "admin/users/index", {
			users : users,
			success : request.flash( "success" )
		} );
	} );
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
			request.flash( "success", "A user has been created" );
			return response.redirect( "/admin/users" );
		}

		return response.render( "admin/users/new", {
			user : new_user,
			errors : helpers.process_errors( error.errors )
		} );
	} );
}

/**
 * @brief Redirects to edit form since we don't have
 * users preview.
 */
module.exports.show = function( request, response ) {
	response.redirect( "/admin/users/" + request.params.user + "/edit" );
};

/**
 * @brief Update given user.
 */
module.exports.update = function( request, response ) {
};

/**
 * @brief Removes requested user.
 */
module.exports.destroy = function( request, response ) {
	User.remove( { _id : request.params.user }, function( error ) {
		request.flash( "success", "A user has been deleted" );
		return response.redirect( "/admin/users" );
	} );
};

var User = require( helpers.generate_public_path( "app/include/models/user" ) );

// Cheshire cat
var PrivateScope = ( function() {
	return {
		/**
		 * @brief Checks if passwords match.
		 *
		 * @param[in] String password is original password
		 * @param[in] String password_confirmation a password to compare against
		 * @param[in] Object error is the current error object to update
		 */
		validatePasswords : function( password, password_confirmation, error ) {
			if ( password != password_confirmation ) {
				error = {
					errors : {
						password : {
							message : "Password do not match"
						}
					}
				};
			}
		}
	}
} )();

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

		PrivateScope.validatePasswords( request.body[ "password" ],
			request.body[ "confirm-password" ],
			error );

		if ( _.isEmpty( error ) ) {
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
 * @brief Render user edit form.
 */
module.exports.edit = function( request, response ) {
	User.findOne( {
		_id : request.params.user
		},
		function( error, user ) {

		response.render( "admin/users/edit", {
			user : user
		} );
	} );
};

/**
 * @brief Update given user.
 */
module.exports.update = function( request, response ) {
	User.findOne( { _id : request.params.user } )
	.exec( function( error, user ) {
		if ( _.isEmpty( error ) ) {
			user = _.extend( user, request.body );

			user.save( function( error ) {
				error = error || {}

				PrivateScope.validatePasswords( request.body[ "password" ],
					request.body[ "confirm-password" ],
					error );

				if ( _.isEmpty( error ) ) {
					request.flash( "success", "A user has been updated" );
					return response.redirect( "/admin/users" );
				}
				
				return response.render( "admin/users/edit", {
					user : user,
					errors : helpers.process_errors( error.errors )
				} );
			} );
		}
	} );
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

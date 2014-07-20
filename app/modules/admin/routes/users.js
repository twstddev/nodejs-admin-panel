var User = require( helpers.generate_public_path( "app/include/models/user" ) );

// Cheshire cat
var PrivateScope = ( function() {
	return {
		/**
		 * @brief Checks if passwords match.
		 *
		 * @param[in] String password is original password
		 * @param[in] String password_confirmation a password to compare against
		 */
		validatePasswords : function( password, password_confirmation ) {
			if ( password != password_confirmation ) {
				return { 
					error : {
						errors: {
							password : {
								message : "Passwords do not match"
							}
						}
					}
				};
			}

			return false;
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

	return response.render( "admin/users/new", {
		user : user
	} );
}

/**
 * @brief Creates a new user using passed values.
 */
module.exports.create = function( request, response ) {
	var prepare_response_with_error = function( user, errors ) {
		return response.render( "admin/users/new", {
			user : user,
			errors : errors
		} );
	};
	
	var new_user = new User( request.body );

	var validation_result = PrivateScope.validatePasswords( request.body[ "password" ],
		request.body[ "confirm-password" ] );

	if ( validation_result ) {
		return prepare_response_with_error( new_user, helpers.process_errors( validation_result.error.errors ) );
	}

	new_user.save( function( error ) {
		error = error || {};


		if ( validation_result ) {
			error.errors = validation_result;
		}

		if ( _.isEmpty( error ) ) {
			request.flash( "success", "A user has been created" );
			return response.redirect( "/admin/users" );
		}

		return prepare_response_with_error( new_user, helpers.process_errors( error.errors ) );
	} );
}

/**
 * @brief Redirects to edit form since we don't have
 * users preview.
 */
module.exports.show = function( request, response ) {
	return response.redirect( "/admin/users/" + request.params.user + "/edit" );
};

/**
 * @brief Render user edit form.
 */
module.exports.edit = function( request, response ) {
	User.findOne( {
		_id : request.params.user
		},
		function( error, user ) {

			return response.render( "admin/users/edit", {
				user : user
			} );
	} );
};

/**
 * @brief Update given user.
 */
module.exports.update = function( request, response ) {
	var prepare_response_with_error = function( user, errors ) {
		return response.render( "admin/users/edit", {
			user : user,
			errors : errors
		} );
	};


	User.findOne( { _id : request.params.user } )
	.exec( function( error, user ) {
		if ( _.isEmpty( error ) ) {
			user = _.extend( user, request.body );

			user.save( function( error ) {
				error = error || {}

				var validation_result = PrivateScope.validatePasswords( request.body[ "password" ],
					request.body[ "confirm-password" ] );

				if ( validation_result ) {
					return prepare_response_with_error( user, helpers.process_errors( validation_result.error.errors ) );
				}

				if ( _.isEmpty( error ) ) {
					request.flash( "success", "A user has been updated" );
					return response.redirect( "/admin/users" );
				}
				
				return prepare_response_with_error( user, helpers.process_errors( error.errors ) );
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

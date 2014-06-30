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
	response.render( "admin/users/new" );
}

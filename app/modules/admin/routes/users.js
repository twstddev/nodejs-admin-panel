/**
 * @brief Displays a list of users.
 */
exports.index = function( request, response ) {
	response.render( "admin/users/index" );
};

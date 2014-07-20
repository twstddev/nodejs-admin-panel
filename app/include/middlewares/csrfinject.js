/**
 * @brief Adds a local variable to all responses.
 * This variable contains updated CSRF token.
 */
module.exports = function( request, response, next ) {
	response.locals.csrf_token = request.csrfToken();
	next();
};

/**
 * @brief Adds post _method value support.
 * Right now method override module works only with
 * query values o.O
 */
module.exports = function( request, response ) {
	var has_body = request.body;
	var body_is_object = ( typeof request.body == "object" );
	var body_has_method = ( _.has( request.body, "_method" ) );

	if ( has_body && body_is_object && body_has_method ) {
		var method = request.body._method;

		delete request.body._method;
		return method;
	}
};

var mongoose = require( "mongoose" );

/**
 * @brief Implements page model.
 */
var PageSchema = new mongoose.Schema( {
} );

try {
	mongoose.model( "Page", PageSchema );
}
catch( error ) {}

module.exports = mongoose.model( "Page" );

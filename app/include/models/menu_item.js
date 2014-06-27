var mongoose = require( "mongoose" );

/**
 * @brief Implement menu item model.
 */
var MenuItemSchema = new mongoose.Schema( {
} );

try {
	mongoose.model( "MenuItem", MenuItemSchema );
}
catch( error ) {}

module.exports = mongoose.model( "MenuItem" );

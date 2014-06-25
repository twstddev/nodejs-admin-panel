var mongoose = require( "mongoose" );

/**
 * @brief Implements user model.
 */
var UserSchema = new mongoose.Schema( {
	username : {
		type : String
	}
} );

try {
	mongoose.model( "User", UserSchema );
}
catch( error ) {}

module.exports = mongoose.model( "User" );

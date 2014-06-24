var mongoose = require( "mongoose" );

/**
 * @brief Implements user model.
 */
var UserSchema = new mongoose.Schema( {
} );

var User = mongoose.model( "User", UserSchema );

module.exports = User;

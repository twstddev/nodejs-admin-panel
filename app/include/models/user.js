var mongoose = require( "mongoose" );
var unique_validator = require( "mongoose-unique-validator" );

/**
 * @brief Checks if the given value is an email.
 * TODO: abstract this method out if needed.
 * For this example it can be used here.
 */
var validate_email = function( value ) {
	var email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	return email_regex.test( value );
}

/**
 * @brief Implements user model.
 */
var UserSchema = new mongoose.Schema( {
	username : {
		type : String,
		required : true,
		unique : true
	},

	email : {
		type : String,
		required : true,
		validate : [ validate_email, "Provided email is invalid" ],
		unique : true
	},

	password : {
		type : String,
		required : true
	},

	first_name : {
		type : String
	},

	last_name : {
		type : String
	}
} );

UserSchema.plugin( unique_validator );

try {
	mongoose.model( "User", UserSchema );
}
catch( error ) {}

module.exports = mongoose.model( "User" );

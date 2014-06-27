var mongoose = require( "mongoose" );
var unique_validator = require( "mongoose-unique-validator" );
var crypto = require( "crypto" );
var uuid = require( "node-uuid" );

/**
 * @brief Checks if the given value is an email.
 * TODO: abstract this method out if needed.
 * For this example it can be used here.
 */
var validate_email = function( value ) {
	var email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	return email_regex.test( value );
};

/**
 * @brief Hashes given password and returns the result.
 *
 * @param[in] String password is a password to hash
 * @param[in] String salt is a salt to use with hashing
 */
var hash_password = function( password, salt ) {
	return crypto.createHmac( "sha256", salt ).update( password ).digest( "hex" );
};

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

	salt : {
		type : String,
		required : true,
		default : uuid.v1
	},

	first_name : {
		type : String
	},

	last_name : {
		type : String
	}
} );

/**
 * @brief Checks the given passport against existing one.
 *
 * @param[in] String password it the password to check
 */
UserSchema.methods.isPasswordValid = function( password ) {
	return this.password === hash_password( password, this.salt );
}

/**
 * @brief Hashes model password on model save.
 */
UserSchema.pre( "save", function( next ) {
	this.password = hash_password( this.password, this.salt );

	next();
} );

UserSchema.plugin( unique_validator );

try {
	mongoose.model( "User", UserSchema );
}
catch( error ) {}

module.exports = mongoose.model( "User" );

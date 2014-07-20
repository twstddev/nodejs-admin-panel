var mongoose = require( "mongoose" );
var mongoose_tree = require( "mongoose-tree" );

/**
 * @brief Implement menu item model.
 */
var MenuItemSchema = new mongoose.Schema( {
	title : {
		type : String,
		required : true
	},

	url : {
		type : String,
		required : true
	},

	position : {
		type : Number,
		default : 0
	}
} );

MenuItemSchema.plugin( mongoose_tree );

try {
	mongoose.model( "MenuItem", MenuItemSchema );
}
catch( error ) {}

module.exports = mongoose.model( "MenuItem" );

var mongoose = require( "mongoose" );
var monguurl = require( "monguurl" );
var _ = require( "lodash" );

/**
 * @brief Validates if passed template is actually exists.
 */
var validate_template = function( value ) {
	return _.has( get_templates(), value );
};

/**
 * @brief Implements page model.
 */
var PageSchema = new mongoose.Schema( {
	title : {
		type : String,
		required : true
	},

	slug : {
		type : String,
		index : {
			unique : true
		}
	},

	body : {
		type : String
	},

	meta : {
		type : {}
	},
	
	template : {
		type : String,
		validate : [ validate_template, "This template is not allowed" ]
	}
} );

// load plugin that adds slug functionality
PageSchema.plugin( monguurl( {
	source : "title",
	target : "slug"
} ) );

/**
 * @brief Returns a list of allowed templates.
 */
var get_templates = function() {
	return {
		"home" : "Home",
		"about" : "About"
	};
};

PageSchema.statics.getTemplates = get_templates();

try {
	mongoose.model( "Page", PageSchema );
}
catch( error ) {}

module.exports = mongoose.model( "Page" );

/**
 * @brief This is a starting file that implements
 * application instance.
 */
var express = require( "express" );
var favicon = require( "./modules/favicon/main" );

var application = express();

application.use( favicon() );

module.exports = application;

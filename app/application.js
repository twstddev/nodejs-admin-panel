/**
 * @brief This is a starting file that implements
 * application instance.
 */
var express = require( "express" );
var favicon = require( "./modules/favicon/main" );
var router = require( "./src/router.js" );
var helpers = require( "./include/helpers" );

var application = express();

application.use( express.static( helpers.generate_public_path( "public" ) ) );
application.use( favicon() );

application.set( "views", helpers.generate_public_path( "public/views" ) );
application.set( "view engine", "vash" );

router.registerRoutes( application );

module.exports = application;

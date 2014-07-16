/**
 * @brief This is a starting file that implements
 * application instance.
 */
global.helpers = require( "./include/helpers" );
var express = require( "express" );
var body_parser = require( "body-parser" );
var favicon = require( "./modules/favicon/main" );
var router = require( "./src/router.js" );
var flash = require( "connect-flash" );

var application = express();

application.use( express.static( helpers.generate_public_path( "public" ) ) );
application.use( body_parser() );
application.use( favicon() );

application.set( "views", helpers.generate_public_path( "app/views" ) );
application.set( "view engine", "jade" );

router.registerRoutes( application );

module.exports = application;

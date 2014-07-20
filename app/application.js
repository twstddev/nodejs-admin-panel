/**
 * @brief This is a starting file that implements
 * application instance.
 */
global.helpers = require( "./include/helpers" );
global._ = require( "lodash" );
var express = require( "express" );
var body_parser = require( "body-parser" );
var favicon = require( "./modules/favicon/main" );
var router = require( "./src/router.js" );
var flash = require( "connect-flash" );
var cookie_parser = require( "cookie-parser" );
var session = require( "express-session" );
var method_override = require( "method-override" );
var csrf = require( "csurf" );
var custom_method_override = require( "./include/middlewares/methodoverride" );
var csrf_inject = require( "./include/middlewares/csrfinject" );
var authentication = require( "./include/middlewares/authentication" );

var application = express();

application.use( cookie_parser( "a super secret goes here" ) );
application.use( session( {
	secret : "another secret goes here"
} ) );
application.use( flash() );
application.use( express.static( helpers.generate_public_path( "public" ) ) );
application.use( body_parser() );
application.use( method_override( custom_method_override ) );
authentication( "/admin*", application );
application.use( csrf() );
application.use( csrf_inject );

application.use( favicon() );

application.set( "views", helpers.generate_public_path( "app/views" ) );
application.set( "view engine", "jade" );

router.registerRoutes( application );

module.exports = application;

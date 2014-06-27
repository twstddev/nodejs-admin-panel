/**
 * @brief This is a starting file that implements
 * application instance.
 */
var express = require( "express" );
var favicon = require( "./modules/favicon/main" );
var router = require( "./src/router.js" );

var application = express();

application.use( favicon() );

router.registerRoutes( application );

module.exports = application;

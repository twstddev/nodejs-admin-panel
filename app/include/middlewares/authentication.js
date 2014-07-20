var passport = require( "passport" );
var LocalStrategy = require( "passport-local" ).Strategy;
var User = require( helpers.generate_public_path( "app/include/models/user" ) );

passport.use( new LocalStrategy(
	function( username, password, done ) {
		User.findOne( { username : username } )
		.exec( function( error, user ) {
			if ( _.isEmpty( error ) ) {
				if ( !user ) {
					return done( null, false );
				}

				if ( !user.isPasswordValid( password ) ) {
					return done( null, false );
				}

				return done( null, user );
			}

			return done( null, false );
		} );
	}
) );

passport.serializeUser( function( user, done ) {
	done( null, user.id );
} );

passport.deserializeUser( function( id, done ) {
	User.findById( id, function( error, user ) {
		done( error, user );
	} );
} );

/**
 * @brief Checks whether our user is logged in.
 */
var ensure_athenticated = function( request, response, next ) {
	if ( request.isAuthenticated() ) {
		return next();
	}

	return response.redirect( "/login" );
};
 
/**
 * @brief Checks if user is currently logged in
 * otherwise redirected to login page.
 */
module.exports = function( wildcard, application ) {
	application.use( passport.initialize() );
	application.use( passport.session() );

	var passport_options = {
		successRedirect : "/admin/pages",
		failureRedirect : "/login"
	};

	// protect wildcard route
	application.all( wildcard, ensure_athenticated );

	// listen to post request on login route so we could authenticate
	// user attempt
	passport_options.failureFlash = "Incorrect login details";
	application.post( "/login", passport.authenticate( "local", passport_options ) );
};

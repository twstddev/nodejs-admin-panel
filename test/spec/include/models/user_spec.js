require( generate_application_path( "app/include/models/user" ) );
var _ = require( "lodash" );

describe( "User", function() {
	var User = mongoose.model( "User" );
	var user_data = {};

	before( function( done ) {
		connect_to_database( done );
	} );

	beforeEach( function() {
		user_data = {
			username : "admin",
			email : "admin@admin.com",
			password : "123456"
		};
	} );

	it( "allows user creation", function( done ) {
		var new_user = new User( user_data );

		new_user.save( function( error, user ) {
			expect( error ).to.be.null;

			done();
		} );
	} );

	it( "requires username", function( done ) {
		user_data.username = "";
		var new_user = User( user_data );

		new_user.save( function( error, user ) {
			expect( error ).not.to.be.null;

			done();
		} );
	} );


	it( "requires username to be unique", function( done ) {
		User.create( user_data, function() {
			user_data.email = "another@admin.com";

			User.create( user_data, function( error, user ) {
				expect( error ).not.to.be.null;

				done();
			} );
		} );
	} );

	it( "requires email", function( done ) {
		user_data.email = "";

		var new_user = new User( user_data );

		new_user.save( function( error, user ) {
			expect( error ).not.to.be.null;

			done();
		} );
	} );

	it( "validates email", function( done ) {
		user_data.email = "invalid.email";

		var new_user = new User( user_data );

		new_user.save( function( error, user ) {
			expect( error ).not.to.be.null;

			done()
		} );
	} );

	it( "requires email to be unique", function( done ) {
		User.create( user_data, function() {
			user_data.username = "user";

			User.create( user_data, function( error, user ) {
				expect( error ).not.to.be.null;

				done();
			} );
		} );
	} );

	it( "requires password", function( done ) {
		user_data.password = "";

		var new_user = new User( user_data );

		new_user.save( function( error, user ) {
			expect( error ).not.to.be.null;

			done();
		} );
	} );

	it( "checks if a given password is valid", function( done ) {
		User.create( user_data, function( error, user ) {
			var password = user_data.password;

			expect( user.isPasswordValid( password ) ).to.be.true;

			
			password = "anotherpassword";
			expect( user.isPasswordValid( password ) ).to.be.false;

			done();
		} );
	} );

	afterEach( function( done ) {
		clear_database( done );
	} );
} );

require( generate_application_path( "app/include/models/page" ) );

describe( "Page", function() {
	var Page = mongoose.model( "Page" );
	var page_data = {};
	var meta_data = {
		"first" : "value",
		"second" : {
			"nested" : "yup"
		}
	};

	before( function( done ) {
		connect_to_database( done );
	} );

	beforeEach( function() {
		page_data = {
			title : "Home",
			template : "home",
			body : "description"
		};
	} );

	it( "allows page creation", function( done ) {
		Page.create( page_data, function( error, page ) {
			expect( error ).to.be.null;

			done();
		} );
	} );

	it( "requires title", function( done ) {
		page_data.title = "";

		Page.create( page_data, function( error, page ) {
			expect( error ).not.to.be.null;

			done();
		} );
	} );

	it( "generates slug from title if nothing set as a slug", function( done ) {
		page_data.title = "My page";

		Page.create( page_data, function( error, page ) {
			expect( page.slug ).to.eq( "my-page" );

			done();
		} );
	} );

	it( "requires slug to be unique", function( done ) {
		var main_page_created = function( error, page ) {
			Page.create( page_data, function( error, page ) {
				expect( error ).not.to.be.null;

				done();
			} );
		};

		Page.create( page_data, main_page_created );
	} );

	it( "allows slug rewriting", function( done ) {
		var another_slug = "another-slug";

		page_data.slug = another_slug;

		Page.create( page_data, function( error, page ) {
			expect( page.slug ).to.be.eq( another_slug );

			done();
		} );
	} );

	it( "saves meta fields", function( done ) {
		page_data.meta = meta_data;

		Page.create( page_data, function( error, page ) {
			Page.findOne( { "_id" : page._id }, function( error, page ) {
				expect( page.meta ).to.eq( meta_data );

				done();
			} );
		} );
	} );

	it( "validates passed template", function( done ) {
		page_data.template = "none";

		Page.create( function( error, page ) {
			expect( error ).not.to.be.null;

			done();
		} );
	} );

	afterEach( function( done ) {
		clear_database( done );
	} );
} );

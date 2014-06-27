require( generate_application_path( "app/include/models/menu_item" ) );

describe( "MenuItem", function() {
	var MenuItem = mongoose.model( "MenuItem" );
	var menu_item_data = {};

	before( function( done ) {
		connect_to_database( done );
	} );

	beforeEach( function() {
		menu_item_data = {
			title : "Home",
			url : "/"
		};
	} );

	it( "allows menu item creation", function( done ) {
		var new_menu_item = new MenuItem( menu_item_data );

		new_menu_item.save( function( error ) {
			expect( error ).to.be.null;

			done();
		} );
	} );

	it( "requires title", function( done ) {
		menu_item_data.title = "";
		var new_menu_item = MenuItem( menu_item_data );

		new_menu_item.save( function( error, menu_item ) {
			expect( error ).not.to.be.null;

			done();
		} );
	} );

	it( "requires url", function( done ) {
		menu_item_data.url = "";
		var new_menu_item = MenuItem( menu_item_data );

		new_menu_item.save( function( error, menu_item ) {
			expect( error ).not.to.be.null;

			done();
		} );
	} );

	it( "allows tree structure", function( done ) {
		// TODO
		done();
	} );

	afterEach( function( done ) {
		clear_database( done );
	} );
} );

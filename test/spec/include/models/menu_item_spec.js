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
		var parent_item = null;

		var new_item_created = function( error, menu_item ) {
			expect( menu_item.parent.toString() ).to.eq( parent_item._id.toString() );

			parent_item.getChildren( function( error, menu_items ) {
				expect( menu_items.length ).to.eq( 1 );
				expect( menu_items[ 0 ].parent.toString() ).to.eq( parent_item._id.toString() );

				done();
			} );
		};

		var main_item_created = function( error, menu_item ) {
			parent_item = menu_item;

			var new_menu_item = new MenuItem( {
				title : "About",
				url : "about"
			} );

			new_menu_item.parent = menu_item;

			new_menu_item.save( new_item_created );
		};

		MenuItem.create( menu_item_data, main_item_created );
	} );

	afterEach( function( done ) {
		clear_database( done );
	} );
} );

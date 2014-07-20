/**
 * @brief This is a simple script that adds drag and drop functionality
 * to lists.
 */
( function( $ ) {
	$( function() {
		$( ".sortable" ).nestedSortable( {
			handle : ".handle",
			items : "li",
			toleranceElement : "> a",
			listType : "ul",
			update : function() {
				var $this = $( this );

				$this.find( "ul" ).addClass( "nav nav-pill nav-stacked" );

				$.ajax( {
					url : $this.data( "update-url" ),
					data : {
						items : $this.nestedSortable( "toHierarchy", { startDepthCount : 0 } )
					},
					type : "POST",
					headers : {
						"x-csrf-token" : $( "meta[name=csrf]" ).attr( "content" )
					}
				} );
			}
		} );
	} );
} )( jQuery );

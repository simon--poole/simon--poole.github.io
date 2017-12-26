$.fn.toggleClass = function( className, b ) {
	this.forEach( function( item ) {
		var classList = item.classList;
		if( typeof b !== 'boolean' ) {
			b = !classList.contains( className );
		}
		classList[ b ? 'add' : 'remove' ].apply( classList, className.split( /\s/ ) );
	});
	return this;
};
$('.navbar-burger').on('click', function(e){
    $('.navbar-burger').toggleClass('is-active');
    $('.navbar-menu').toggleClass('is-active');
})
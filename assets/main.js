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
var landing = document.getElementById('canvas');
landing.style.width="100%";
landing.style.height="100%";
landing.width = landing.offsetWidth;
landing.height = landing.offsetHeight;
var pattern;
var variance = 100;
var toggle = 1;
var seed = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 24);
function setCanvas(){
	if(variance >= 150) toggle = -1;
	if(variance <= 75) {
		toggle = 1;
		seed = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 24);
	}
	variance += (0.05 * toggle);
	pattern = Trianglify({
		width: landing.width,
		height: landing.height,
		x_colors: ['#ABC8C0', '#9D5C63', '#8ACDEA', '#7F7CAF', '#E39774'],
		seed: seed,
		cell_size: 50,
		variance: variance
	}).canvas(landing);
	document.getElementById('body').replaceChild(pattern, landing);
}
setInterval(setCanvas, 1)


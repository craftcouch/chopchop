//ChopChop! by Jonas Raneryd http://espo.in/
$.fn.chopchop = function ( options ) {
	return this.each(function () {
		
		var el = $(this),
			h,
			w;
			
		var settings = $.extend( {
	      'slices': 5, 
	      'gutters': 5, 
	      'yDiff': 5
	    }, options );
		
		var newImg = new Image();
		newImg.onload = function() {
			w = this.width;
			h = this.height;
		
			img = el.attr( 'src' ),
			struct	= '<div class="sliced" style="position:relative;width:'+(((w/settings.slices)*settings.slices)+(settings.slices*settings.gutters))+'px;">';
				for(var i = 1; settings.slices >= i; i++ ) {
					struct +='<div class="slice s'+i+'" data-slice="'+i+'"></div>';
				}
			struct	+='</div>';
				
			var $struct = $( struct );
			
			var x = 0;
			$struct.find( '.slice' ).each(function(){
				var slice = $(this).attr('data-slice');
				
				if (x%2 == 0)
					var posNeg = '-';
				else
					var posNeg = '';
				
				$(this).css({
					'background-image': 'url(' + img + ')',
					'height': h+'px',
					'width': (w/settings.slices)+'px',
					'background-position': -((w/settings.slices)*x)+'px 0',
					'position': 'absolute',
					'left': ((w/settings.slices)*(slice-1))+(settings.gutters*(slice-1))+'px',
					'top':  posNeg + settings.yDiff+'px'
				});
				
				x++;
			});
			
			el.replaceWith( $struct );
			
		}
		newImg.src = el.attr('src');
		
	});
}
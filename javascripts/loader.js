/*

Be Load Script
Version 1.0
Made by Themanoid

*/


(function($) {

    "use strict"; // Strict mode

    // Variables
    var loader = $('<div class="loader"><div class="bar-container"><div class="bar"></div></div></div>'),
     	bar = loader.find('.bar');
    
    // Prepend the loader to the body
    $('body').prepend(loader);

    // Animate the load bar
    animateLoadBar();

    // On load
    $(window).load(function(){
    	finishLoadBar();
    	loader.delay(900).fadeOut(400, function(){
	    	$(this).remove();
	    	$('.container-fluid').addClass('loaded');
	    });
    });

    function animateLoadBar(){
    	bar.animate({
    		'width' : '60%'
    	}, 900, 'easeInOutQuart');
    }

    function finishLoadBar(){
    	bar.animate({
    		'width' : '100%'
    	}, 400, 'easeInOutQuart');
    }
    
})(jQuery);

/*

Tera Slider JS
Version 2.1
Made by Themanoid

*/


(function($) {

    "use strict"; // Strict mode
    
    var $slider = $('.slider'); // Define the slider
    var $mousePos = { x: -1 }; // We need the mouse position for the slider controls
    var $autoSlide;
    var $autoSlideDirection = 'right' // Can be 'right' or 'left' to set the direction

    $(window).resize(function(){
        sliderResize();
    });
    
    $slider.mousemove(function(e){ // Get the cursor position
        var $sldr = $(this);
        if($sldr.hasClass('multi-slides')){
            $mousePos.x = e.pageX;
            if($mousePos.x > $(window).width()/2) {
                $sldr.css('cursor', 'url(images/tera-slider/slide-right.png), e-resize');
                if($('body').hasClass('dark-slide'))
                    $sldr.css('cursor', 'url(images/tera-slider/slide-right.png), e-resize');
            } else {
               $sldr.css('cursor', 'url(images/tera-slider/slide-left.png), w-resize');
                if($('body').hasClass('dark-slide'))
                    $sldr.css('cursor', 'url(images/tera-slider/slide-left.png), w-resize');
            }
        }
    });

    // For each slider
    $slider.each(function(){
        var index = 0;
        var s = $(this);
        $(this).find('li.slide').each(function(){ // For each slide
            $(this).attr('data-index',index); // Add index to element
            if(index > 0)
                s.addClass('multi-slides');
            if(index == 0)
                $(this).addClass('active'); // Add the active state to the first slide
            index++;
        });
        var $curSlide = $(this).find('.active');
        if($curSlide.hasClass('dark')) // Set dark mode if available for the first slide
            $('body').addClass('dark-slide');
        sliderResize();
        if(s.hasClass('auto-slide'))
            $autoSlide = setInterval( function() { toggleSlide(s,$autoSlideDirection); }, 4500 );
    });

    function sliderResize(){
        $slider.each(function(){ // Resize functions for each slider
            var slideCount = $(this).find('li.slide').length;
            var $sliderWidth = $(this).width();
            var $slides = $(this).find('ul.slides');
            var $curSlide = parseInt($slides.find('.active').attr('data-index'));
            $slides.width($sliderWidth*slideCount);
            $slides.css('margin-left', -$sliderWidth*($curSlide)+'px');
            $(this).find('li.slide').width(100/slideCount+'%');
            $(this).find('li.slide').height($(this).height());
        });
    }

    $('body').on('tap', '.slider', function(){
        toggleSlide($(this));
        var s = $(this);
        if(s.hasClass('auto-slide')){
            clearInterval($autoSlide);
            $autoSlide = setInterval( function() { toggleSlide(s,$autoSlideDirection); }, 4500 );
        }
    });

    function toggleSlide(e,d) {
        // Slide controls
        var $sliderWidth = e.width();
        var $slides = e.find('ul.slides');
        var $slideCount = e.find('li').length;
        var $activeSlide = e.find('.active');
        var $activeSlideIndex = parseInt($activeSlide.attr('data-index'));
        var $newSlide;
        // If direction is set
        if(d){
            if(d == 'right'){
                if(($slideCount-1) == $activeSlideIndex)
                    $newSlide = 0; 
                else
                    $newSlide = $activeSlideIndex+1; 
            } else if(d == 'left') {
                if(0 == $activeSlideIndex)
                    $newSlide = ($slideCount-1); 
                else
                    $newSlide = $activeSlideIndex-1; 
            }
        } else {
            // If clicked on next slide
            if($mousePos.x > $sliderWidth/2) {
                if(($slideCount-1) == $activeSlideIndex)
                    $newSlide = 0; 
                else
                    $newSlide = $activeSlideIndex+1; 
            }
            // If clicked on previous slide
            else {
                if(0 == $activeSlideIndex)
                    $newSlide = ($slideCount-1); 
                else
                    $newSlide = $activeSlideIndex-1; 
            }
        }        
        $slides.find('li').removeClass('active'); // First remove all active classes
        $slides.find('[data-index='+$newSlide+']').addClass('active'); // Set the current slide to active
        if($slides.find('.active').hasClass('dark')) // If the current slide is dark
            $('body').addClass('dark-slide'); // Set dark mode
        else
            $('body').removeClass('dark-slide'); // Unset dark mode
        $slides.css('margin-left','-'+$sliderWidth*($newSlide)+'px'); // Slide animation on css propert change
        setTimeout(sliderResize, 0);
    }

})(jQuery);

/*

Be JS
Version 1.1
Made by Themanoid

*/


(function($) {

    "use strict"; // Strict mode

    /* Variables */

    var $grid = $('#grid'),
        $jumbotron = $('.jumbotron');

    /* On load */

    $(window).load(function(){
        $grid.isotope();

        setTimeout(function(){ // Fixes wrong display
            $grid.isotope(); 
        },100);

        setTimeout(function(){ // Fixes wrong display
            setVerticalCenter();
        },500);

        $('.animated').addClass('start-animation'); // Start animations

        $('.item').waypoint(function(){
            $(this).addClass('visible'); // Show items
            $grid.isotope(); // Reload isotope items
        }, {offset : '70%'});

        $('.fadeIn').waypoint(function(){ // Fade in every .fadeIn class element
            $(this).addClass('visible');
        }, {offset : '70%'});
    });

    /* On Resize */

    $(window).resize(function(){
        $grid.isotope();
        setVerticalCenter();
    });

    /* Back to top button */

    var $toTop = $('<div class="back-to-top"></div>');
    $('body').append($toTop);
    $('body').on('tap', '.back-to-top', function(e){
        $('html,body').animate({scrollTop : 0}, 800, 'easeInOutExpo');
        e.preventDefault();
    });

    /* Scroll effects */

    $(window).scroll(function(){
        var scrolled = $(window).scrollTop();
        var scrolledPercentage = (100-(scrolled/$(window).height()*100))/100; // Can be used for fading effects
        if(scrolled > 200)
            $toTop.addClass('active'); // Back to top button
        else
            $toTop.removeClass('active');
    });

    /* Page transition */

    $('body').on('click', 'a.transition', function(e){
        e.stopPropagation();
        e.preventDefault();
        var href = $(this).attr('href');
        $('.container-fluid').removeClass('loaded');
        setTimeout(function(){
            window.location = href;
        }, 500);
    });

    /* Smooth anchor scroll */

    $('body').on('click', 'a.anchor', function(e){
        e.stopPropagation();
        var href = $(this).attr('href');
        $('html,body').animate({
            scrollTop : ($(href).offset().top)-60+'px'
        }, 800, 'easeInOutExpo');
        $('nav#main').slideUp(300);
        $('.menu-trigger').removeClass('active');
        e.preventDefault();
    });

    $('body').on('click', 'a', function(e){
        if($(this).attr('href') == '#'){
            e.stopPropagation();
            e.preventDefault();
        }
    });

    /* Header + Menu */

    $('body').on('click', '.menu-trigger', function(e){
        e.stopPropagation();
        if($('header').hasClass('affix'))
            $('nav#main').slideToggle(200);
        else
            $('nav#main').fadeToggle(500);
        $(this).toggleClass('active');
    });

    $('body').on('click', 'nav#main', function(){
        $('nav#main').slideUp(300);
        $('.menu-trigger').removeClass('active');
    });

    $('html').on('click', 'body', function(e){
        $('nav#main').slideUp(300);
        $('.menu-trigger').removeClass('active');
    });

    $('body.bottom-nav header').affix({
      offset: {
        top: function() { return $(window).height()-120; }
      }
    });

    $('body.top-nav header').affix({
        offset: {
            top: 0
        }
    });

    $('body.top-nav header').on('affix.bs.affix', function () {
        $('body').addClass('affixed');
    });

    $('body.top-nav header').on('affix-top.bs.affix', function () {
        $('body').removeClass('affixed');
    });

    /* Vertical centering (use .vcenter) */

    function setVerticalCenter(){
        $('.vcenter').each(function(){
            var el = $(this);
            var parent = $(this).parent();
            var parentHeight = parent.height();
            var elHeight = el.height();
            var padding = (parentHeight-elHeight)/2;
            if($(window).width() > 620)
                el.css({'padding-top' : padding+'px'});
            else
                el.css({'padding-top' : '0'});  
        });
    }

    /* Filter portfolio functions */

    //  Show filter options on trigger click
    $('.filter-trigger').on('tap', function(){
        $('.filters').toggleClass('active');
    });

    //  On filter click, filter grid
    $('.filters').on( 'tap', 'button', function(e) {
        e.stopPropagation();
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        $('.item').addClass('visible');
        e.preventDefault();
    });

    var newOffset = 60;
    if($('.filter-container').hasClass('stick'))
        newOffset = 160;

    $('.filter-container').affix({
      offset: {
        top: function() { return $('.filter-container').parent().offset().top-newOffset; }
      }
    });

})(jQuery);

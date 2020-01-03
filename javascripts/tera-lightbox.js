/*

Tera Lightbox JS
Version 2.1
Made by Themanoid

*/


(function($) {

    "use strict"; // Strict mode

    var $lightboxContainer = $('<div id="lightbox"><div class="controls"><div class="galleryPrev fa fa-angle-left"></div><div class="galleryNext  fa fa-angle-right"></div><div class="galleryClose fa fa-close"></div></div>');
    if($('.lightbox').length)
        $('body').append($lightboxContainer);
    var $gallery = [];
    var $galleryIndex = 0;

    function isYoutube(url) {
      var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      return (url.match(p)) ? RegExp.$1 : false;
    }

    function isVimeo(url) {
      var p = /player\.vimeo\.com\/video\/([0-9]*)/;
      return (url.match(p)) ? RegExp.$1 : false;
    }
    
    $('.lightbox').each(function(){ // For each lightbox link
        var href = $(this).attr('href');
        $gallery.push(href); // Push the img url to the gallery array
        $(this).attr('data-index', $galleryIndex);
        $galleryIndex++; // Next index
        $(this).on('tap', function(e){
            e.stopImmediatePropagation();
            loadLightbox($(this).attr('data-index'),href);
            e.preventDefault();
        });
    });

    $('body').on('tap', '.galleryClose', function(e) {
        $lightboxContainer.fadeOut(500, function(){
            $(this).find('.lightbox-item').remove(); // Remove contents
        }); // Fade out lightbox
    });

    $('html').on('tap', 'body', function(e) {
       $lightboxContainer.fadeOut(500, function(){
            $(this).find('.lightbox-item').remove(); // Remove contents
        }); // Fade out lightbox
    });

    // Lightbox controls
    $('body').on('tap', '.galleryNext, .galleryPrev', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        var curIndex = parseInt($('.lightbox-item').attr('data-index'));
        var newIndex;
        if($(this).hasClass('galleryNext'))
            newIndex = curIndex+1; // New index will be the next one
        else
            newIndex = curIndex-1; // New index will be the previous one
        if($gallery.length == newIndex) // If the last item is reached
            newIndex = 0; // Set index to the first one
        if(newIndex == -1) // If the first item is reached 
            newIndex = $gallery.length-1; // Set it to the last item
        $('#lightbox [data-index]').fadeOut(500, function(){
            $(this).attr('data-index', newIndex); // Give the image a new index
            loadLightbox(newIndex,$gallery[newIndex]);
        });
    });

    function loadLightbox(index,href){
        var $index = index;
        var $lightboxItem;
        $lightboxContainer.find('.lightbox-item').remove();
        if(isYoutube(href) || isVimeo(href)) { // Check if it's Vimeo or YouTube
            $lightboxItem = $('<iframe class="lightbox-item" src="'+href+'" frameborder="0" allowfullscreen data-index="'+$index+'"/></iframe>');
            $lightboxContainer.append($lightboxItem).fadeIn(); // Fade in lightbox
            $lightboxItem.delay(500).fadeIn(900); // Fade in image
        }
        else {
            $lightboxItem = $('<img class="lightbox-item" src="'+href+'" data-index="'+$index+'"/>');
            $lightboxItem = $lightboxItem.load(function(){
                $lightboxContainer.append($(this)).fadeIn(); // Fade in lightbox
                $lightboxItem.delay(500).fadeIn(900); // Fade in image
            });
        }
    }

})(jQuery);

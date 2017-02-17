$(document).ready(function() {

    $(".fab").on('mousedown', function() {
        $(this).parent(".card").toggleClass("is-expandend");

		// TweenMax.staggerFrom(".listLink", 1, { y: -100 } }, 0.5);
    })


    $(".card__content").on('mousedown', function() {

        $(this).parent(".card").toggleClass("is-expandend");

    })


















    var cf = new ContentFlow('contentFlow', {reflectionColor: "#000000"});








	// MIXITUP


    $(".mix").on("mousedown", function() {


    	// TweenMax.to($(this), 1, {scale:0,});

    	var pw = $(".projects").width();
    	var ph = $(".projects").height();


    	var cx = $(window).width()/2 - $(this).position().left - $(this).width();
    	var cy = $(window).height()/2 - $(this).position().top - $(this).height();


    	console.log( cx );
    	console.log( ph );




    	TweenMax.to($(this), 0.5, { scale: 2, x: cx, y: cy } );




    	var otherMix = $(this).siblings();
    	TweenMax.staggerTo(otherMix, 0.5, { scale: 0, opacity: 0 }, 0.01);


        
    })




    






});

/* Radians to Degrees:  x * Math.PI/180; */


$(document).ready(function() {




	$(".slides animate")
	.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
	 function(e){
	    alert("end")
	 });



	console.log($(".slides animate"))







	var spaceTime = 3000;
	rotateSlider( spaceTime );








	var yrun = "300px";
	var runTime = 0.3;
	var delayTime = 0.8;
	var opTime = 1.0;


	var rotateInterval = window.setInterval(function(){
		

		var slidesOneText = $(".slidesOne").children();
		if ( getRotationDegrees($(".slides")) == 0 ) {		
			TweenMax.set( slidesOneText, {display: "block"} );
			TweenMax.staggerFrom( slidesOneText, runTime, { delay:delayTime, y: yrun }, 0.1 );
			TweenMax.to( slidesOneText, runTime, { delay:delayTime, opacity: 1 } );

		} else {			
			TweenMax.to( slidesOneText, opTime, { opacity: 0 } );
		}



		var slidesTwoText = $(".slidesTwo").children();
		if ( getRotationDegrees($(".slides")) == -120 ) {		
			TweenMax.set( slidesTwoText, {display: "block"} );
			TweenMax.staggerFrom( slidesTwoText, runTime, { delay:delayTime, y: yrun }, 0.1 );
			TweenMax.to( slidesTwoText, runTime, { delay:delayTime, opacity: 1 } );

		} else {

			
			TweenMax.to( slidesTwoText, opTime, { opacity: 0 } );
		}



		var slidesThreeText = $(".slidesThree").children();
		if ( getRotationDegrees($(".slides")) == 120 ) {
			TweenMax.set( slidesThreeText, {display: "block"} );
			TweenMax.staggerFrom( slidesThreeText, runTime, { delay:delayTime, y: yrun }, 0.1 );
			TweenMax.to( slidesThreeText, runTime, { delay:delayTime, opacity: 1 } );

		} else {

			
			TweenMax.to( slidesThreeText, opTime, { opacity: 0 } );
		}


		// console.log( getRotationDegrees($(".slides")) );

	}, spaceTime);

	


	function getRotationDegrees(obj) {
		var matrix = obj.css("-webkit-transform") ||
		obj.css("-moz-transform")    ||
		obj.css("-ms-transform")     ||
		obj.css("-o-transform")      ||
		obj.css("transform");
		if(matrix !== 'none') {
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];
			var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		} else {
			var angle = "no angle";
		}
		//return (angle < 0) ? angle + 360 : angle;
		return angle;
	}


});










function rotateSlider(speed) {




	var rotateSlider = {
	  slideHeight : 380,
	  slideWidth : 520,
	};


	
	/* Do Math and set properties */
	rotateSlider.slideCount = $('.rotate-slider .slides li').length;
	rotateSlider.slideAngle = 360 / $('.rotate-slider .slides li').length;
	rotateSlider.sliderElement = $('.rotate-slider');
	rotateSlider.slides = $('.rotate-slider .slides li');
	rotateSlider.slidesContainer = $('.rotate-slider .slides');
	rotateSlider.slideAngle = 360 / rotateSlider.slideCount;
	rotateSlider.halfAngleRad = rotateSlider.slideAngle / 2 * Math.PI/180;
	rotateSlider.innerRadius = 1 / Math.tan(rotateSlider.halfAngleRad) * rotateSlider.slideWidth / 2;
	rotateSlider.outerRadius = Math.sqrt(Math.pow(rotateSlider.innerRadius + rotateSlider.slideHeight, 2) + (Math.pow((rotateSlider.slideWidth / 2), 2)));
	rotateSlider.upperArcHeight = rotateSlider.outerRadius - (rotateSlider.innerRadius + rotateSlider.slideHeight);
	rotateSlider.lowerArcHeight = rotateSlider.innerRadius - (rotateSlider.innerRadius * (Math.cos(rotateSlider.halfAngleRad)));
	rotateSlider.slideFullWidth = (Math.sin(rotateSlider.halfAngleRad) * rotateSlider.outerRadius) * 2;
	rotateSlider.slideFullHeight = rotateSlider.upperArcHeight + rotateSlider.slideHeight + rotateSlider.lowerArcHeight
	rotateSlider.slideSidePadding = (rotateSlider.slideFullWidth - rotateSlider.slideWidth) / 2;
	rotateSlider.fullArcHeight = rotateSlider.outerRadius - (rotateSlider.outerRadius * (Math.cos(rotateSlider.halfAngleRad)));
	rotateSlider.lowerArcOffset = (rotateSlider.slideFullWidth - (Math.sin(rotateSlider.halfAngleRad) * rotateSlider.innerRadius * 2)) / 2;
	
	/* Set height and width of slider element */
	rotateSlider.sliderElement.css('height', rotateSlider.slideHeight+'px');
	rotateSlider.sliderElement.css('width', rotateSlider.slideWidth+'px');
	
	/* Set height and width of slides container and offset width*/
	rotateSlider.slidesContainer.css('height', rotateSlider.outerRadius*2+'px');
	rotateSlider.slidesContainer.css('width', rotateSlider.outerRadius*2+'px');
	
	/* Offset width and arc height */
	rotateSlider.slidesContainer.css('transform', 'translateX(-50%)');
	rotateSlider.slidesContainer.css('top', '-'+ rotateSlider.upperArcHeight +'px');
	
	/* Generate path for slide clipping */
	var pathCoords = 'M 0 '+rotateSlider.fullArcHeight;
	pathCoords += ' A '+rotateSlider.outerRadius+' '+rotateSlider.outerRadius+' 0 0 1 '+rotateSlider.slideFullWidth+' '+rotateSlider.fullArcHeight;
	pathCoords += ' L '+(rotateSlider.slideFullWidth-rotateSlider.lowerArcOffset)+' '+rotateSlider.slideFullHeight;
	pathCoords += ' A '+rotateSlider.innerRadius+' '+rotateSlider.innerRadius+' 0 0 0 '+rotateSlider.lowerArcOffset+' '+rotateSlider.slideFullHeight+' Z';
	$('#slideClip').find('path').attr('d', pathCoords);
	
	/* Apply styles to each slide */
	var i = 0;
	rotateSlider.slides.each(function(){


		/* Set distance from point of rotation */
		$(this).css('transform-origin', 'center '+(rotateSlider.innerRadius + rotateSlider.slideHeight)+'px');
		
		/* Set slide Height and Width */
		$(this).css('height', rotateSlider.slideHeight+'px');
		$(this).css('width', rotateSlider.slideWidth+'px');
		
		/* Set calculated padding for width, upper arc height, and lower arc height */
		$(this).css('padding', rotateSlider.upperArcHeight +'px '+rotateSlider.slideSidePadding+'px '+rotateSlider.lowerArcHeight+'px '+rotateSlider.slideSidePadding+'px ');
		
		/* Offset container Arc Height */
		$(this).css('top', rotateSlider.upperArcHeight +'px');
		
		/* Offset Width, then Rotate Slide, then offset individual Top Arcs  */
		$(this).css('transform', 'translateX(-50%) rotate('+rotateSlider.slideAngle * i+'deg) translateY(-'+ rotateSlider.upperArcHeight +'px)');
		
		/* Add clipping path  */
		$(this).css('-webkit-clip-path', 'url(#slideClip)');
		$(this).css('clip-path', 'url(#slideClip)');
		
		i++;
	});
	
	/* Set Interval to rotate */
	var currentRotation = 0;
	var rotateInterval = window.setInterval(function(){
		if(!rotateSlider.slidesContainer.hasClass('animate')){
			rotateSlider.slidesContainer.addClass('animate')
		}
		currentRotation = currentRotation - rotateSlider.slideAngle;
		rotateSlider.slidesContainer.css('transform', 'translateX(-50%) rotate('+currentRotation+'deg)');



	}, speed);


	// $(".inner").each( function( index, element ){
		
	// });





}
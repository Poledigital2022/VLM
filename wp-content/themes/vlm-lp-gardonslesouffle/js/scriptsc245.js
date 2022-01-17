(function ($, root, undefined) {

	$(function () {

		'use strict';

		/** HANDLE DONATION BLOCK **/
		if($('#don-custom').length>0){
		    init_formdonationblock();
		}

		function init_formdonationblock(){
		    /*! Liens dons boutons radio */
		    //var url_base = "https://soutenir.amnesty.fr/b?cid=272&frequency=regular&amount=";
		    var url_base = 'https://soutenir.vaincrelamuco.org/b?cid=451&amount=';
		    var url_complete = "";
		    var current_value = 0;

	        url_complete = url_base+(current_value*100);
		    $('.liendonklass').attr('href',url_complete);

		    //LISTENERS
		    $('#custommontant').on('keyup',document,function(e){

		        var code = e.keyCode || e.which;
		        if(code == 13 || code == 27) { //Enter keycode
		            return;
		        }

		        var current_value = $(this).val();
		        current_value = current_value.replace(/\D/g,'');
		        current_value = current_value.replace(' ','');
		        current_value = parseInt(current_value);
		        console.log(current_value);

		        if(isNaN(current_value)){
		            $("#custommontant").val('');
		        }else{
		            $("#custommontant").val(current_value);
		        }

		        if(current_value!=0 && current_value!="" && !isNaN(current_value)){
		            url_complete = url_base+(current_value*100);
		            update_montant_deduction(current_value);
		            $('.liendonklass').attr('href',url_complete);
		            //format the number
		            $("#custommontant").val(numberWithSpaces(current_value));
		        }

		    });

		    function numberWithSpaces(x) {
		        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		    }

		    function update_montant_deduction(newvalue){
		        var amout_deductible = (Math.round(newvalue-((newvalue*66)/100)+ "e+2")/100).toFixed(0);
		        $('#montant-don').html(newvalue)
		        $('#montant-deduc').html(amout_deductible);
		    }

		}

		$('#intro .slider-intro').slick({
		  infinite: true,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  dots: true,
		  autoplay: false,
		  speed: 1000,
		  arrows: false,
		  fade: true,
		  pauseOnHover: false
		});

		$('.slider-histoire').slick({
		  infinite: false,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  dots: true,
		  autoplay: false,
		  arrows: true,
		  fade: true,
		  infinite: true,
		  appendDots: $('.controls'),
		  appendArrows: $('.controls'),
		});
		
		/*$('').slick({
		  infinite: false,
		  slidesToShow: 3,
		  slidesToScroll: 3,
		  dots: false,
		  autoplay: false,
		  arrows: false,
		  infinite: true
		});*/

		/* Slick needs no get Reinitialized on window Resize after it was destroyed */
	    $(window).on('load resize orientationchange', function() {

	    	$('.blocs-don').each(function(){
	            var $carousel = $(this);
	            /* Initializes a slick carousel only on mobile screens */
	            // slick on mobile
	            if ($(window).width() > 991) {
	                if ($carousel.hasClass('slick-initialized')) {
	                    $carousel.slick('unslick');
	                }
	            }
	            else{
	                if (!$carousel.hasClass('slick-initialized')) {
	                    $carousel.slick({
	                        slidesToShow: 1,
	                        slidesToScroll: 1,
	                        mobileFirst: true,
	                        centerMode: true,
	                        arrows: true,
	                        dots: true,
	                        autoplay: true,
		  					autoplaySpeed: 5000
	                    });
	                }
	            }
	        });
	    });

		$('.customscroll').mCustomScrollbar({
		    theme:"rounded-dark"
		});

	});

})(jQuery, this);

/** gestions des videos **/
(function($) {
    $(document).ready(function() {
		
		//listener pour quand on click commencer ou arreter la video
		$('[id^="slider_video_"]').on('click',document,function(){
			if (this.paused == true) {
				// Play the video
				this.play();
				$('.slider-histoire').slick('slickPause');
			}else{
				$('.slider-histoire').slick('slickPlay');
				this.pause();
			}
		});
		
		//listerner pour le click du nom, couper toutes les videos
		$('[id^="slick-slide-control"]').on('click',document,function(){
			$.each($('[id^="slider_video_"]'),function(index,element){
				element.pause();
				//$('.slider-histoire').slick('slickPlay');
			})
		});
		//listerner pour le click des fleches, couper toutes les videos
		$('.slick-arrow').on('click',document,function(){
			$.each($('[id^="slider_video_"]'),function(index,element){
				element.pause();
				//$('.slider-histoire').slick('slickPlay');
			})
		});
		
	});
})(jQuery, this);
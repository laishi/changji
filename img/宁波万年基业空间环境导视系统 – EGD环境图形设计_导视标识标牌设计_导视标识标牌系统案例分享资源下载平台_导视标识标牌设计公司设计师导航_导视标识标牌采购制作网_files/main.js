jQuery(document).ready(function($) {

	/*	main loader */
	main_loader = $('<span />').attr('class', 'main-loader').prependTo('html').spin({
		lines: 9, // The number of lines to draw
		length: 0, // The length of each line
		width: 6, // The line thickness
		radius: 9, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#fff', // #rgb or #rrggbb or array of colors
		speed: 1.3, // Rounds per second
		trail: 50, // Afterglow percentage
		opacity: 1 / 4, // Opacity of the lines
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'loader', // The CSS class to assign to the spinner
		zIndex: 10000, // The z-index (defaults to 2000000000)
		top: 0, // Top position relative to parent in px
		left: 0 // Left position relative to parent in px
	});

    /* Show Spinner on Page Load */
    main_loader.fadeIn(250);

    /*	Avoiding Flickering in jQuery */
	$('body').css({
            visibility: 'visible'
        }).animate({
            opacity: 1
        }, 125, function(){
            main_loader.fadeOut(125);
    });

	/*	mobile init */
	if (document.createTouch) {
		var ismobile = 1;
		$('body').addClass('ismobile');
	} else {
		/*	tooltip */
		$('.tooltip, footer .links a, .postmetas li a').aToolTip();
	}

	/*	clear on focus */
	$('input[type=text], input[type=password], textarea').clearOnFocus();

	/*	select box */
	/*$("select").selectbox({
		onOpen: function (inst) {
			$(this).next().addClass("sbHolder-open");
		},
		onClose: function (inst) {
			$(this).next().removeClass("sbHolder-open");
		},
		effect: "fade"
	});*/

	/*	masonry */
    var $items = $('.pinbox');
	$items.hide();
	var $container = $('.boxcontainer');
    if ($container.size() > 0) {
        $container.imagesLoaded( function() {
            $items.fadeIn(125);
    		$container.masonry({
    			itemSelector: '.pinbox',
    			gutter: 14,
    			columnWidth: 236,
    			isFitWidth: true,
                isOriginLeft: !$("body").hasClass("rtl"),
                transitionDuration: 0
    		})
    	});
    }

    $(".postWrap .contentbox .textbox img").each(function(){
    	if($(window).width() > 720){
	    	$(this).parent().parent().css({"margin-left":"-30px","margin-right":"-30px"});
	    }else{
	    	$(this).parent().parent().css({"margin-left":"-20px","margin-right":"-20px"});
	    }
    });

	/*	login form */
	$('#login-form').find('input[id=user_login]').each(function (ev) {
		$(this).attr("value", pinthis_phpjs_option.tr_username);
	});
	$('#login-form').find('input[id=user_pass]').each(function (ev) {
		$(this).attr("value", pinthis_phpjs_option.tr_password);
	});
	$('#login-form').find('input[id=wp-submit]').each(function (ev) {
		$(this).attr("class", "button button-color-1");
	});

	/*	comments form */
	$('.comment-respond').find('input[id=submit]').each(function (ev) {
		$(this).attr("class", "button button-color-1");
	});

	/*	search form - sidebar */
	$('#searchform').find('input[id=s]').each(function (ev) {
		$(this).attr("value", pinthis_phpjs_option.tr_search);
	});

	/*	rss - sidebar */
	$('.title-1 .rsswidget').parent().next().addClass('rssitems');

	/*	bookmrakrs - sidebar */
	$('.blogroll').find('li').each(function (ev) {
		$(this).addClass('clearfix');
	});

	/*	calendar - sidebar */
	var cal_today = $('.sidebar .contentbox #wp-calendar #today:first').html();
	$('.sidebar .contentbox #wp-calendar #today').html('<span>' + cal_today + '</span>');
	var cal_month = $('.sidebar .contentbox #wp-calendar caption:first').text();
	$('.sidebar .contentbox #wp-calendar caption').html('');
	$('.sidebar .contentbox #wp-calendar tfoot #prev, .sidebar .contentbox #wp-calendar tfoot #next').removeAttr('colspan');
	$('.sidebar .contentbox #wp-calendar tfoot #prev').next().addClass('caption').text(cal_month);

	/*	dropdown menu - sidebar */
	$('.sidebar .contentbox .sbHolder').wrap('<div class="widgetwrapper"></div>');

	/*	gallery clearfix */
	$('.textbox .gallery').addClass('clearfix');

	/*	magnific popup */
	$('.postWrap a[href$=".jpg"], .postWrap a[href$=".jpeg"], .postWrap a[href$=".png"], .postWrap a[href$=".gif"], .postWrap a[href$=".bmp"]').magnificPopup({
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		image: {
			verticalFit: true,
			titleSrc: function (item) {
				return item.el.find('img').attr('alt');
			}
		},
		gallery: {
			enabled: true
		},
		callbacks: {
			open: function () {
				$('.scrolltotop').hide();
			},
			close: function () {
				$('.scrolltotop').show();
			}
		}
	});

	/*	scroll to top */
	$(".scrolltotop").click(function (event) {
		event.preventDefault();
		var full_url = this.href;
		var parts = full_url.split("#");
		var trgt = parts[1];
		var target_offset = $("#" + trgt).offset();
		var target_top = target_offset.top;
		if ($('body').is('.admin-bar')) {
			var html_margin_top = parseInt($('html').css("marginTop"));
			target_top = target_offset.top - html_margin_top;
		}
		$('html, body').animate({
			scrollTop: target_top
		}, 500);
	});

	/*	jscrollpane */
	$('.menu-categories .dropdown .dropdown-wrapper').each(function() {
		$(this).jScrollPane();
		var api = $(this).data('jsp');
		var throttleTimeout;
		$(window).bind('resize', function() {
			if (!throttleTimeout) {
				throttleTimeout = setTimeout(function() {
					api.reinitialise();
					throttleTimeout = null;
				}, 0);
			}
		});
	});

	/*	slider */
	 $('.slider').flicker({
		arrows: pinthis_phpjs_option.arrows,
		arrows_constraint: pinthis_phpjs_option.constraint,
		auto_flick: pinthis_phpjs_option.auto_flick,
		auto_flick_delay: pinthis_phpjs_option.auto_flick_delay,
		block_text: pinthis_phpjs_option.block_text,
		dot_alignment: pinthis_phpjs_option.dot_alignment,
		dot_navigation: pinthis_phpjs_option.dot_navigation,
		flick_animation: 'transition-slide',
		flick_position: pinthis_phpjs_option.flick_position,
		theme: 'light'
	});

	/*	slide link */
	$('.slider ul li[data-rel]').css('cursor', 'pointer').click(function() {
		window.location = $(this).attr('data-rel');
		return false;
	});

	/*	infinite scroll */
	var loading = false;
	$(window).scroll(function () {
		if (!loading && $(window).scrollTop() + $(window).height() > $(document).height() - 250) {
			loading = true;
			loadContents();
		}
	});

	function loadContents() {
		var url = $('.posts-navigation.hide .next').attr('href');
		if (url) {
			main_loader.fadeIn(250);
			$.ajax({
				type: "GET",
				url: url,
				dataType: "html",
				success: function (loaded) {
					var result = $(loaded).find('.boxcontainer .pinbox');
					var nextlink = $(loaded).find('.posts-navigation .next').attr('href');
					$(loaded).imagesLoaded(function() {
						$container.append(result).masonry('appended', result);
						if (ismobile != 1) {
							$('.tooltip').aToolTip();
                            if ($('video').length || $('audio').length) {
                                $('video, audio').mediaelementplayer();
                            }
						}
					});
					main_loader.fadeOut(100);
					if (nextlink != undefined) {
						$('.posts-navigation .next').attr('href', nextlink);
					} else {
						$('.posts-navigation').remove();
					}
					loading = false;
				}
			});
		}
	}

	/*	IE debugging */
	if (navigator.userAgent.match(/msie|trident/i)) {
        $('.pinbox iframe').on('hover', function(){
            $(this).parents('.pinbox').toggleClass('hover');
        });
    }

    $(".author-info h1 i").on("click",function(){
    	if($(this).hasClass("fa-sort-down")){
    		$(".author-info .desc").hide();
    		$(".author-info .author-meta").slideDown();
    		$(this).removeClass("fa-sort-down").addClass("fa-sort-up");
    	}else{
    		$(".author-info .author-meta").slideUp();
    		$(".author-info .desc").show();
    		$(this).removeClass("fa-sort-up").addClass("fa-sort-down");
    	}
    });


});


function follow(uid) {
	jQuery.ajax({
		url: _MBT.uri+'/action/follow.php?uid='+uid,
		type: 'GET',
		dataType: 'html',
		timeout: 9000,
		error: function() {
			
		},
		success: function(data) {
			if(data == "2"){
				jQuery(".fav-action").html('取消关注');
				jQuery(".fav-action").attr('onclick','followx('+uid+')');
				jQuery('.author-fans').html(Number(jQuery('.author-fans').text())+1);
			}
		}
	});
};

function followx(uid) {
	jQuery.ajax({
		url: _MBT.uri+'/action/follow.php?uidx=' + uid,
		type: 'GET',
		dataType: 'html',
		timeout: 9000,
		error: function() {
			
		},
		success: function(data) {
			if(data == "2"){
				jQuery(".fav-action").html('加关注');
				jQuery(".fav-action").attr('onclick','follow('+uid+')');
				jQuery('.author-fans').html(Number(jQuery('.author-fans').text())-1);
			}
		}
	});
};

function follow2(a,uid) {
	jQuery.ajax({
		url: _MBT.uri+'/action/follow.php?uid='+uid,
		type: 'GET',
		dataType: 'html',
		timeout: 9000,
		error: function() {
			
		},
		success: function(data) {
			if(data == "2"){
				jQuery(a).html('取消关注');
				jQuery(a).attr('onclick','followx2('+uid+')');
			}
		}
	});
};

function followx2(a,uid) {
	jQuery.ajax({
		url: _MBT.uri+'/action/follow.php?uidx=' + uid,
		type: 'GET',
		dataType: 'html',
		timeout: 9000,
		error: function() {
			
		},
		success: function(data) {
			if(data == "2"){
				jQuery(a).html('加关注');
				jQuery(a).attr('onclick','follow2('+uid+')');
			}
		}
	});
};

function fav(pid) {
	jQuery.ajax({
		url: _MBT.uri + '/action/favorite.php?pid=' + pid,
		type: 'GET',
		dataType: 'html',
		timeout: 9000,
		error: function() {},
		success: function(data) {
			if (data == "3") {
				jQuery('.post-fav-action').attr("onclick", "javascript:favx(" + pid + ");");
				jQuery('.post-fav-action').html("<span class='icon-total-star'>取消收藏</span>");
				jQuery('.post-fav-action').addClass("active");
			}
		}
	});
};
function favx(pid) {
	jQuery.ajax({
		url: _MBT.uri + '/action/favorite.php?pidx=' + pid,
		type: 'GET',
		dataType: 'html',
		timeout: 9000,
		error: function() {},
		success: function(data) {
			if (data == "2") {
				jQuery('.post-fav-action').attr("onclick", "javascript:fav(" + pid + ");");
				jQuery('.post-fav-action').html("<span class='icon-total-star'>收藏文章</span>");
				jQuery('.post-fav-action').removeClass("active");
			}
		}
	});
};
function fav2(a,pid,c) {
	jQuery.ajax({
		url: _MBT.uri + '/action/favorite.php?pid=' + pid,
		type: 'GET',
		dataType: 'html',
		timeout: 9000,
		error: function() {},
		success: function(data) {
			if (data == "3") {
				jQuery(a).attr("onclick", "javascript:favx2(this," + pid + ","+(c+1)+");");
				jQuery(a).html('<i class="fa fa-heart"></i> '+(c+1));
			}
		}
	});
};
function favx2(a,pid,c) {
	jQuery.ajax({
		url: _MBT.uri + '/action/favorite.php?pidx=' + pid,
		type: 'GET',
		dataType: 'html',
		timeout: 9000,
		error: function() {},
		success: function(data) {
			if (data == "2") {
				jQuery(a).attr("onclick", "javascript:fav2(this," + pid + ","+(c-1)+ ");");
				jQuery(a).html('<i class="fa fa-heart-o"></i> '+(c-1));
			}
		}
	});
};
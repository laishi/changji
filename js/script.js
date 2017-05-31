$(document).ready(function() {






    var navItemL = $(".proItem").length;

    var expandW = 38;
    TweenMax.set($(".proItem"), {
        width: 100 / navItemL + '%'
    });
    $(".proItem").hover(over, out);

    function over() {
        TweenMax.to($(this), 0.8, {
            width: expandW + '%'
        });
        TweenMax.to($(this).siblings(), 0.8, {
            width: (100 - expandW) / (navItemL - 1) + '%'
        })
    }

    function out() {
        TweenMax.to($(".proItem"), 0.8, {
            width: 100 / navItemL + '%',
            ease: Back.easeOut
        })
    }












    $(".fab").on('mousedown', function() {
        $(this).parent(".card").addClass("is-expandend");

        // TweenMax.staggerFrom(".listLink", 1, { y: -100 } }, 0.5);
    })


    $(".card__content").on('mouseout', function() {

        $(this).parent(".card").removeClass("is-expandend");

    })





    var cf = new ContentFlow('contentFlow', { reflectionColor: "#000000" });








    // MIXITUP

    var sdw, sdh, sdpl, sdpt;



    $(".mix").on("mousedown", function() {

        var ww = $(document).width();
        var wh = window.innerHeight;

        var scrollTop = $(window).scrollTop();


        // TweenMax.to($(this), 1, {scale:0,});




        // $(this).siblings().each(function (index, value) { 
        //     var bgimg = $(this).css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
        //     console.log(bgimg); 
        // });






        var dw = $(this).width();
        var dh = $(this).height();

        var dp = $(this).offset();


        sdw = dw;
        sdh = dh;
        sdpl = dp.left;
        sdpt = dp.top;



        var cx = ww / 2 - dp.left - dw / 2;
        var cy = scrollTop + wh / 2 - dp.top - dh / 2;






        if ($(this).hasClass("gridMove")) {



            $(this).removeClass("gridMove");

            TweenMax.to($(this), 0.3, { scale: 1, x: -cx + dw / 2, y: -cy + dh / 2 });
            TweenMax.to($(this).siblings(), 0.6, { scale: 1, opacity: 1 });
            TweenMax.to($(this).parents(".gridFx").siblings(), 0.3, { opacity: 1 });
            TweenMax.to($(".controls"), 0.3, { opacity: 1 });
            TweenMax.set($("body"), { backgroundColor: "#CDCDCD", });

            unlockScroll()



        } else {

            // TweenMax.to('.btnClose', 0.3, { x: -cx + dw, y: -cy + dh });

            $(this).addClass("gridMove");

            TweenMax.to($(this), 0.6, { scale: 2, x: cx, y: cy, onComplete: showClose });
            TweenMax.to($(this).siblings(), 0.3, { scale: 0, opacity: 0 });
            TweenMax.to($(this).parents(".gridFx").siblings(), 0.3, { opacity: 0 });
            TweenMax.to($(".controls"), 0.3, { opacity: 0 });
            TweenMax.to($(".nav"), 0.3, { opacity: 1 });
            TweenMax.set($("body"), { backgroundColor: "#383838" });

            console.log($(this).offset().left)
            console.log($(this).offset().top)

            var btnPosX = $(this).offset().left
            var btnPosY = $(this).offset().top



            TweenMax.to('.btnClose', 0.3, { left: btnPosX, top: btnPosY });


            lockScroll();

            function showClose() {

                console.log($(this))

                // TweenMax.to('.btnClose', 0.3, { x: cx, y: cy });
            }

        }


    })








    function lockScroll() {
        $html = $('html');
        $body = $('body');
        var initWidth = $body.outerWidth();
        var initHeight = $body.outerHeight();

        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];
        $html.data('scroll-position', scrollPosition);
        $html.data('previous-overflow', $html.css('overflow'));
        $html.css('overflow', 'hidden');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        var marginR = $body.outerWidth() - initWidth;
        var marginB = $body.outerHeight() - initHeight;
        $body.css({ 'margin-right': marginR, 'margin-bottom': marginB });
    }

    function unlockScroll() {
        $html = $('html');
        $body = $('body');
        $html.css('overflow', $html.data('previous-overflow'));
        var scrollPosition = $html.data('scroll-position');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        $body.css({ 'margin-right': 0, 'margin-bottom': 0 });
    }











    $(window).scroll(function() {

    });







});
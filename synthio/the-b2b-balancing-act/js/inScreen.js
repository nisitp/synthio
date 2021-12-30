 (function($, win) {
            $.fn.inViewport = function(cb) {
                return this.each(function(i, el) {
                    function visPx() {
                        var H = $(this).height(),
                            r = el.getBoundingClientRect(),
                            t = r.top,
                            b = r.bottom;
                        return cb.call(el, Math.max(0, t > 0 ? H - t : (b < H ? b : H)));
                    }
                    visPx();
                    $(win).on("resize scroll", visPx);
                });
            };
        }(jQuery, window));
        $(".triLarge").inViewport(function(px) {
            if (px) $(this).addClass("slideInLeft");
        });

        $(".triSmall").inViewport(function(px) {
            if (px) $(this).addClass("slideInRight");
        });

        $(".quoteImg").inViewport(function(px) {
            if (px) $(this).addClass("fadeIn");
        });

$(".quizQ").inViewport(function(px) {
            if (px) $(this).addClass("zoomIn");
        });


$(".leadGen").inViewport(function(px) {
            if (px) $(this).addClass("slideInLeft");
        });


$(".ABM").inViewport(function(px) {
            if (px) $(this).addClass("slideInRight");
        });

$(".twitterIcon").inViewport(function(px) {
            if (px) $(this).addClass("rollIn");
        });

$(".checklist").inViewport(function(px) {
            if (px) $(this).addClass("fadeIn");
        });

$(".CTAbutton").inViewport(function(px) {
            if (px) $(this).addClass("fadeInUp");
        });

        
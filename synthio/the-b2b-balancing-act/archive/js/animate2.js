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
        
        $(".header").inViewport(function(px) {
            if (px) $(this).addClass("swing");
        });
        
        $(".introBull").inViewport(function(px) {
            if (px) $(this).addClass("slideInLeft");
        });

        $(".meterContain").inViewport(function(px) {
            if (px) $(this).addClass("fadeInDown");
        });
        
        
        $(".textTrigger1").inViewport(function(px) {
            if (px) $(this).textillate({ 
            in: { effect: 'flipInX', shuffle: true, }
            });
        });


        

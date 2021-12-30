
$(window).on("load, resize", function() {
    var viewportWidth = $(window).width();
    if (viewportWidth < 800) {
            $(".placeholder").addClass("scrollable-element");
    }
    
    if (viewportWidth > 800) {
            $(".placeholder").removeClass("scrollable-element");
    }
});




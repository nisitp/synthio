function setParam(uri, key, val) {
    return uri
        .replace(RegExp("([?&]"+key+"(?=[=&#]|$)[^#&]*|(?=#|$))"), "&"+key+"="+encodeURIComponent(val))
        .replace(/^([^?&]+)&/, "$1?");
}

(function($) {	
  @import './vendor/slick/slick.min.js';
  @import './vendor/jquery.uniform.js'
  @import '../../node_modules/js-cookie/src/js.cookie.js'
  
    $(document).ready(() => {
//        console.log("[Debug: Entered main script]");  
        
      // New global form stuff
        $("form[id^='mktoForm']:not('.gated'),form.marketo-form:not('.gated')").each(function() {
          var formID = $(this).attr("id").split("_")[1];

          var tyblock = $(this).data("thankyou");          
          if (typeof tyblock !== 'undefined' && tyblock.length > 0) {
            // we're going to display a thank-you block on submission so hide the block now.
//            console.log(tyblock);
            $(tyblock).hide();   
          }
          
//          console.log(" loading " + formID);
          MktoForms2.loadForm("//app-ab26.marketo.com", "333-QOT-660", formID, function(form) {
            
            var myPage = window.location.pathname.slice(1);
            console.log("here w/ " + myPage);
            var formEl = form.getFormElem(); // get jQuery element            
            if (typeof tyblock !== 'undefined' && tyblock.length > 0) {
              // we're going to display a thank-you block on submission so hide the block now.
              console.log(tyblock);
              $(tyblock).hide();   
              
              // display thank-you on success
              form.onSuccess(function(values, followUpUrl) {
                $(tyblock).show();
                formEl.hide();
                return false;
              });
            } // if thankyou
            else {
              form.onSuccess(function(values, followUpUrl) {
                location.href = followUpUrl + "?src=" + myPage;
                console.log("tried to redir to " + followUpUrl + "?src=" + myPage);
                return false;
              });              
            }
          });            
        });
        
        // resource forms
        
        $("form.marketo-form.gated").each(function() {
          
          var assetID = $(this).data("assetid");

          var formID = $(this).data("formid");
          
//          console.log("here w/ " + assetID + " and " + formID);
          var submitText = $(this).data("submit-text");

          if (formID == '' || formID === undefined) formID = 1156; // fallback to be safe
          console.log("loading form " + formID);
          
          MktoForms2.loadForm("//app-ab26.marketo.com", "333-QOT-660", formID, function(form) {
            var formEl = form.getFormElem(); // get jQuery element

            form.setValues({ optionalMessage: "Resource ID: " + assetID });            

            if (typeof submitText !== 'undefined' && submitText.length) {
              formEl.find("button[type='submit']").text(submitText);
            }
            
//            console.log(form);
            form.onSuccess(function(values, followUpUrl) {
                // generate a thank-you URL using the nonce, ID, and media ID

                var destURL = setParam(window.location.href, 'success', 'true');
                var destURL = setParam(destURL, 'n', formEl.data("nonce"));
                var destURL = setParam(destURL, 'i', formEl.data("media"));   
                var destURL = setParam(destURL, 'a', formEl.data("assetid"));                   

                destURL += "&redir=1";                
//                console.log(destURL);                
                window.location.href = destURL; 
                return false;
            });
            
//            console.log("oke");

          });// end loadform
        }); // end each form

        
      if ($(".home").length) {
            // homepage stuff
    		// Home page background Hover fixes		
    		if(!((navigator.appName == 'Microsoft Internet Explorer') || (navigator.appName == "Netscape" && navigator.appVersion.indexOf('Edge') > -1))){
    			if($(".product-features").length > 0){
    				var orgH = $(".product-features").outerHeight();
    				$(".product-features .fc-features--feature").each(function(){
    					$(this).hover(function(){
    						var hoveredH = $(".product-features").outerHeight();
    						var adjH = hoveredH - orgH;
    						$('.free-quote--shape').css({ 'top': 'calc(-200% - ' + adjH+ 'px)' });
    					}, function(){
    						$('.free-quote--shape').css({ 'top': '-200%' });
    	
    					});
    				});
    			}
    		}	
	
//        MktoForms2.loadForm("//app-ab26.marketo.com", "333-QOT-660", 1156); // now handled above
        // slider carousel - make more generic later.    
        $(".customer-block .fc-teaser-grid__items").slick({
          autoplay: true,
          autoplaySpeed: 2000,
          arrows: false,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          mobileFirst: true,
          responsive: [
            {
              breakpoint: 641,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 1441,
              settings: {
                slidesToShow: 5
              }
            }            
          ]
        }); 
        
        
        // Fix the max height of the hoverable product features
//        $(".product-features").css("max-height",$(".product-features").height());
      } // end if home  
      
      
      
      //Link promo boxes 
      if($(".fc-features").length > 0){
	      $(".fc-features .fc-features--feature").each(function(){
		      if($(this).find(".fc-features--feature__content a").length === 1){
			      $(this).css("cursor", "pointer");
			      var href= $(this).find(".fc-features--feature__content a").attr("href");
			      $(this).click(function(){
				       window.location = href;
			      });
		      }
	      });
      }
      
/* maybe do this in future but for now just manually overriding styling on home
      if ($(".fc-hero").length > 0 ) {
    	  BackgroundCheck.init({
    	    targets: 'header nav',
    	    images: '.fc-hero'
    	  });
      }
*/

      $(".resource-filter select, .resource-filter input").uniform({
          selectClass: 'resources-filter-select',
          buttonClass: 'resources-filter-submit',
          useID: false,
      });
      
      // auto-submit 
      $("#resource-filter-category").change(function() {
        $(".resources-filter-submit").click();
      });
      $(".resources-filter-submit").hide();

      
      // Strip inline fonts
      $("h2, h3, h2 span, h3 span").each(function() {
        $(this).css("font-family","inherit");
//        $(this).style.removeAttribute('font-family');
      });

  
    	// Strip Marketo css... only for homepage initially.
      MktoForms2.whenReady(function (form) {

          var formEl = form.getFormElem()[0];
          // remove element styles from root and children (may want to disable this while debugging)
          if ($("body").hasClass("home")) {
            
            for (var elsWithStyles = document.querySelectorAll('#' + formEl.id + ', #' + formEl.id + ' [style]'), i = 0, imax = elsWithStyles.length; i < imax; i++) {
                elsWithStyles[i].removeAttribute('style');
            }
        
            // disable all Marketo-sourced stylesheets
            for (var styleSheets = document.styleSheets, i = 0, imax = styleSheets.length; i < imax; i++) {
                var ssLoc = document.createElement('A');
                ssLoc.href = styleSheets[i].href;
        
                if ((ssLoc.hostname.search(/\.marketo\.com$/) !== -1) //  external STYLEs
                ||
                ((styleSheets[i].ownerNode || styleSheets[i].owningElement).parentNode == formEl)) { //  inline STYLEs within FORM tag
                    styleSheets[i].disabled = true;
                }
            }
          }
          
  
          form.onValidate(function(){
            var email = form.vals().Email;
            if(email){
              if(!isEmailGood(email)) {
                form.submitable(false);
                var emailElem = form.getFormElem().find("#Email");
                form.showErrorMessage("Must be Business email.", emailElem);
              }else{
                form.submitable(true);
              }
            }
          });
          
/*
          $("#mktoForm_1156 input").each(function() {
            $(this).attr("placeholder", $(this).attr("title"));
          });  
*/
      });
      
      
    });
})(jQuery);

function isEmailGood(email) {
  
  var invalidDomains = ["@gmail.","@yahoo.","@hotmail.","@live.","@aol.","@outlook."];
  
  for(var i=0; i < invalidDomains.length; i++) {
    var domain = invalidDomains[i];
    if (email.indexOf(domain) != -1) {
      return false;
    }
  }
  return true;
}

@import 'legacy/nav.js';

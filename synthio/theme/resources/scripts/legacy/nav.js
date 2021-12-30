(function($) {
  "use strict";

  window.qodef = {};

  qodef.windowWidth = $(window).width();
  qodef.windowHeight = $(window).height();
  qodef.body = $('body');
  qodef.menuDropdownHeightSet = false;

  //set boxed layout width variable for various calculations
  switch(true){
      case qodef.body.hasClass('qodef-grid-1300'):
          qodef.boxedLayoutWidth = 1350;
          break;
      case qodef.body.hasClass('qodef-grid-1200'):
          qodef.boxedLayoutWidth = 1250;
          break;
      case qodef.body.hasClass('qodef-grid-1000'):
          qodef.boxedLayoutWidth = 1050;
          break;
      case qodef.body.hasClass('qodef-grid-800'):
          qodef.boxedLayoutWidth = 850;
          break;
      default :
          qodef.boxedLayoutWidth = 1150;
          break;
  }

  $(window).resize(function() {
      qodef.windowWidth = $(window).width();
      qodef.windowHeight = $(window).height();

      qodefDropDownMenu();
  });

  $(document).ready(function() {
      qodefInitMobileNavigation();
      qodefMobileHeaderBehavior();
      qodefSetDropDownMenuPosition();
      qodefDropDownMenu();
  });

  $(window).load(function() {
      qodefSetDropDownMenuPosition();
  });

  function qodefInitMobileNavigation() {
      var navigationOpener = $('.qodef-mobile-header .qodef-mobile-menu-opener');
      var navigationHolder = $('.qodef-mobile-header .qodef-mobile-nav');
      var dropdownOpener = $('.qodef-mobile-nav .mobile_arrow, .qodef-mobile-nav h4, .qodef-mobile-nav a[href*="#"]');
      var animationSpeed = 200;

      //whole mobile menu opening / closing
      if(navigationOpener.length && navigationHolder.length) {
          navigationOpener.on('tap click', function(e) {
              e.stopPropagation();
              e.preventDefault();

              if(navigationHolder.is(':visible')) {
                  navigationHolder.slideUp(animationSpeed);
              } else {
                  navigationHolder.slideDown(animationSpeed);
              }
          });
      }

      //dropdown opening / closing

      if(dropdownOpener.length) {
          dropdownOpener.each(function() {
              $(this).on('tap click', function(e) {
                  var dropdownToOpen = $(this).nextAll('ul').first();

                  if(dropdownToOpen.length) {
                      e.preventDefault();
                      e.stopPropagation();

                      var openerParent = $(this).parent('li');
                      if(dropdownToOpen.is(':visible')) {
                          dropdownToOpen.slideUp(animationSpeed);
                          openerParent.removeClass('qodef-opened');
                      } else {
                          dropdownToOpen.slideDown(animationSpeed);
                          openerParent.addClass('qodef-opened');
                      }
                  }

              });
          });
      }

      $('.qodef-mobile-nav a, .qodef-mobile-logo-wrapper a').on('click tap', function(e) {
          if($(this).attr('href') !== 'http://#' && $(this).attr('href') !== '#') {
              navigationHolder.slideUp(animationSpeed);
          }
      });
  }

  function qodefMobileHeaderBehavior() {
      if(qodef.body.hasClass('qodef-sticky-up-mobile-header')) {
          var stickyAppearAmount;
          var mobileHeader = $('.qodef-mobile-header');
          var adminBar     = $('#wpadminbar');
          var mobileHeaderHeight = mobileHeader.length ? mobileHeader.height() : 0;
          var adminBarHeight = adminBar.length ? adminBar.height() : 0;

          var docYScroll1 = $(document).scrollTop();
          stickyAppearAmount = mobileHeaderHeight + adminBarHeight;

          $(window).scroll(function() {
              var docYScroll2 = $(document).scrollTop();

              if(docYScroll2 > stickyAppearAmount) {
                  mobileHeader.addClass('qodef-animate-mobile-header');
              } else {
                  mobileHeader.removeClass('qodef-animate-mobile-header');
              }

              if((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                  mobileHeader.removeClass('mobile-header-appear');
                  mobileHeader.css('margin-bottom', 0);

                  if(adminBar.length) {
                      mobileHeader.find('.qodef-mobile-header-inner').css('top', 0);
                  }
              } else {
                  mobileHeader.addClass('mobile-header-appear');
                  mobileHeader.css('margin-bottom', stickyAppearAmount);

                  //if(adminBar.length) {
                  //    mobileHeader.find('.qodef-mobile-header-inner').css('top', adminBarHeight);
                  //}
              }

              docYScroll1 = $(document).scrollTop();
          });
      }

  }


  /**
   * Set dropdown position
   */
  function qodefSetDropDownMenuPosition(){

      var menuItems = $(".qodef-drop-down > ul > li.narrow");
      menuItems.each( function(i) {

          var browserWidth = qodef.windowWidth-16; // 16 is width of scroll bar
          var menuItemPosition = $(this).offset().left;
          var dropdownMenuWidth = $(this).find('.second .inner ul').width();

          var menuItemFromLeft = 0;
          if(qodef.body.hasClass('boxed')){
              menuItemFromLeft = qodef.boxedLayoutWidth  - (menuItemPosition - (browserWidth - qodef.boxedLayoutWidth )/2);
          } else {
              menuItemFromLeft = browserWidth - menuItemPosition;
          }

          var dropDownMenuFromLeft; //has to stay undefined beacuse 'dropDownMenuFromLeft < dropdownMenuWidth' condition will be true

          if($(this).find('li.sub').length > 0){
              dropDownMenuFromLeft = menuItemFromLeft - dropdownMenuWidth;
          }

          if(menuItemFromLeft < dropdownMenuWidth || dropDownMenuFromLeft < dropdownMenuWidth){
              $(this).find('.second').addClass('right');
              $(this).find('.second .inner ul').addClass('right');
          }
      });

  }


  function qodefDropDownMenu() {

      var menu_items = $('.qodef-drop-down > ul > li');

      menu_items.each(function(i) {
          if($(menu_items[i]).find('.second').length > 0) {

              var dropDownSecondDiv = $(menu_items[i]).find('.second');

              var dropdown = $(this).find('.inner > ul');
              var dropdownWidth = dropdown.outerWidth();

              if($(menu_items[i]).hasClass('wide')) {

                  var dropdownPadding = parseInt(dropdown.css('padding-left').slice(0, -2)) + parseInt(dropdown.css('padding-right').slice(0, -2));

                  if(!$(this).hasClass('left_position') && !$(this).hasClass('right_position')) {
                      dropDownSecondDiv.css('left', 0);
                  }

                  //set columns to be same height - start
                  var tallest = 0;
                  $(this).find('.second > .inner > ul > li').each(function() {
                      var thisHeight = $(this).height();
                      if(thisHeight > tallest) {
                          tallest = thisHeight;
                      }
                  });
                  $(this).find('.second > .inner > ul > li').css("height", ""); // delete old inline css - via resize
                  $(this).find('.second > .inner > ul > li').height(tallest);
                  //set columns to be same height - end

                  if(!$(this).hasClass('wide_background')) {
                      if(!$(this).hasClass('left_position') && !$(this).hasClass('right_position')) {
                          var left_position = (qodef.windowWidth - 2 * (qodef.windowWidth - dropdown.offset().left)) / 2 + (dropdownWidth + dropdownPadding) / 2;
                          dropDownSecondDiv.css('left', -left_position);
                      }
                  } else {
                      if(!$(this).hasClass('left_position') && !$(this).hasClass('right_position')) {
                          var left_position = dropdown.offset().left;

                          dropDownSecondDiv.css('left', -left_position);
                          dropDownSecondDiv.css('width', qodef.windowWidth);

                      }
                  }
              }

              if(!qodef.menuDropdownHeightSet) {
                  $(menu_items[i]).data('original_height', dropDownSecondDiv.height() + 'px');
                  dropDownSecondDiv.height(0);
              }

              if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                  $(menu_items[i]).on("touchstart mouseenter", function() {
                      dropDownSecondDiv.css({
                          'height': $(menu_items[i]).data('original_height'),
                          'overflow': 'visible',
                          'visibility': 'visible',
                          'opacity': '1'
                      });
                  }).on("mouseleave", function() {
                      dropDownSecondDiv.css({
                          'height': '0px',
                          'overflow': 'hidden',
                          'visibility': 'hidden',
                          'opacity': '0'
                      });
                  });

              } else {
                  if(qodef.body.hasClass('qodef-dropdown-animate-height')) {
                      $(menu_items[i]).mouseenter(function() {
                          dropDownSecondDiv.css({
                              'visibility': 'visible',
                              'height': '0px',
                              'opacity': '0',
                              'margin-top': '-30px'
                          });
                          dropDownSecondDiv.stop().animate({
                              'height': $(menu_items[i]).data('original_height'),
                              'opacity': '1',
                              'margin-top': '0px'
                          }, 250, function() {
                              dropDownSecondDiv.css('overflow', 'visible');
                          });
                      }).mouseleave(function() {
                          dropDownSecondDiv.stop().animate({
                              'height': '0px'
                          }, 0, function() {
                              dropDownSecondDiv.css({
                                  'overflow': 'hidden',
                                  'visibility': 'hidden',
                                  'margin-top': '0px'
                              });
                          });
                      });
                  } else {
                      var config = {
                          interval: 0,
                          over: function() {
                              setTimeout(function() {
                                  dropDownSecondDiv.addClass('qodef-drop-down-start');
                                  dropDownSecondDiv.stop().css({'height': $(menu_items[i]).data('original_height')});
                              }, 150);
                          },
                          timeout: 150,
                          out: function() {
                              dropDownSecondDiv.stop().css({'height': '0px'});
                              dropDownSecondDiv.removeClass('qodef-drop-down-start');
                          }
                      };
                      $(menu_items[i]).hoverIntent(config);
                  }
              }
          }
      });
      $('.qodef-drop-down ul li.wide ul li a').on('click', function(e) {
          if (e.which == 1){
              var $this = $(this);
              setTimeout(function() {
                  $this.mouseleave();
              }, 500);
          }
      });

      qodef.menuDropdownHeightSet = true;
  }
})(jQuery);

var _window, _minW, _topH, _lastScrollTop=0, touch_device = false;

// remap jQuery to $
(function($){

  /* trigger when page is ready */
  $(document).ready(function (){

    _window = $(window);

    _minW = 1025;
    if( !Modernizr.touch ) {
      _minW -= 15;
    }

    _topH = ( _window.height()/2 );

    if (Modernizr.touch){
        touch_device = true;
      }

    // HAMBURGUER ICON
    $('#nav-button').click( function( evt ) {
      evt.preventDefault();
      if( $(this).hasClass('open') ) {
        $(this).removeClass('open');
        $('#nav-box').toggle();
      } else {
        $(this).addClass('open');
        $('#nav-box').toggle();
      }
    });

    // SLIDESHOW
    if( $('#slider').length ) {

      $('#slider').royalSlider({
        arrowsNav: true,
        arrowsNavAutoHide: false,
        fadeinLoadedSlide: false,
        slidesSpacing: 0,
        loop: true,
        keyboardNavEnabled: false,
        controlsInside: false,
        imageScaleMode: 'fill',
        autoScaleSlider: true,
        autoScaleSliderWidth: 16,
        autoScaleSliderHeight: 9,
        controlNavigationSpacing: 0,
        controlNavigation: 'bullets',
        thumbsFitInViewport: false,
        navigateByClick: false,
        startSlideId: 0,
        autoPlay: {
          // autoplay options go gere
          enabled: false,
          //pauseOnHover: true,
          //delay: 7500
        },
        transitionType:'move',
        globalCaption: false,
        deeplinking: {
          enabled: false,
          change: false
        },
        /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
        //imgWidth: 1920,
        //imgHeight: 1080
      });
    }

    // SLIDESHOW
    if( $('#comments-slider').length ) {

      $('#comments-slider').royalSlider({
        autoHeight: true,
        arrowsNav: true,
        fadeinLoadedSlide: false,
        controlNavigationSpacing: 0,
        controlNavigation: 'bullets',
        imageScaleMode: 'none',
        imageAlignCenter:false,
        loop: false,
        loopRewind: true,
        numImagesToPreload: 6,
        keyboardNavEnabled: true,
        usePreloader: false
      });
    }


    // Update Image Height
    updateHomeSolutionsHeight();
    updateHomeWeAreHeight();


    // SOLUTIONS
    if ( !touch_device ) {
      if( $('#solutions').length ) {

        //$('#solutions li').each(function(){
        //  $('#'+$(this).attr('id')+'-info').css('display','block');
        //  //console.log("-> "+$('#'+$(this).attr('id')+'-info').height());
        //  $('#'+$(this).attr('id')+'-info').css('display','none');
        //});

        $( "#solutions li" ).mouseenter( function() {
          /*
          if( !$('#'+$(this).attr('id')+'-info').hasClass('open') ) {
            $('#'+$(this).attr('id')+'-info').addClass('open').css('opacity',0).css('display','block').animate({ opacity: 1, top: 0 }, 450, function() { });
          }
          */
          if( !$('#'+$(this).attr('id')+'-info').hasClass('open') ) {
            $('#'+$(this).attr('id')+'-info').addClass('open').css('opacity',0).animate({ opacity: 1, top: 0 }, 450, function() { });
          }
        }).mouseleave( function() {
          /*
          if( $('#'+$(this).attr('id')+'-info').hasClass('open') ) {
            $('#'+$(this).attr('id')+'-info').removeClass('open').animate({ opacity: 0, top: '10px' }, 225, function() {
              $(this).css('opacity',0).css('display','none');
            });
          }*/
          if( $('#'+$(this).attr('id')+'-info').hasClass('open') ) {
            $('#'+$(this).attr('id')+'-info').removeClass('open').animate({ opacity: 0, top: '10px' }, 225, function() {
              $(this).css('opacity',0);
            });
          }
        });
      }
    }


    // ******************************************************************************************
    // ******************************************************************************************
    // init.GRAY SCALE
    // ***************

    // Grayscale images on Safari and Opera browsers
    if(getBrowser()=='opera' || getBrowser()=='safari'){
      var $images = $(".img-gray")
      , imageCount = $images.length
      , counter = 0;

      // One instead of on, because it need only fire once per image
      $images.one("load",function(){
        // increment counter every time an image finishes loading
        counter++;
        if (counter == imageCount) {
          // do stuff when all have loaded
          grayscale($('.img-gray'));
          $(".img-gray").hover(
            function () {
              grayscale.reset($(this));
            },
            function () {
              grayscale($(this));
            }
          );
        }
      }).each(function () {
      if (this.complete) {
        // manually trigger load event in
        // event of a cache pull
          $(this).trigger("load");
        }
      });
    };


    // Grayscale images only on browsers IE10+ since they removed support for CSS grayscale filter
    if (getInternetExplorerVersion() >= 10){
      $('.img-gray').each(function(){
        var el = $(this);
        el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"5","opacity":"0"}).insertBefore(el).queue(function(){
          var el = $(this);
          el.parent().css({"width":this.width,"height":this.height});
          el.dequeue();
        });
        this.src = grayscaleIE10(this.src);
      });

      // Quick animation on IE10+
      $('.img-gray').hover(
        function () {
          $(this).parent().find('img:first').stop().animate({opacity:1}, 200);
        },
        function () {
          $('.img_grayscale').stop().animate({opacity:0}, 200);
        }
      );

      function grayscaleIE10(src){
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var imgObj = new Image();
        imgObj.src = src;
        canvas.width = imgObj.width;
        canvas.height = imgObj.height;
        ctx.drawImage(imgObj, 0, 0);
        var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for(var y = 0; y < imgPixels.height; y++){
          for(var x = 0; x < imgPixels.width; x++){
            var i = (y * 4) * imgPixels.width + x * 4;
            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
            imgPixels.data[i] = avg;
            imgPixels.data[i + 1] = avg;
            imgPixels.data[i + 2] = avg;
          }
        }
        ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
        return canvas.toDataURL();
      };
    };

    // This block simply ads a corresponding class to the body tag so that we can target browsers with CSS classes
    if(getBrowser()=='mozilla'){
      // Mozilla
      $('body').addClass('mozilla');
    }
    else if(getBrowser()=='ie'){
      // IE Favourite
      $('body').addClass('ie');
    }
    else if(getBrowser()=='opera'){
      // Opera
      $('body').addClass('opera');
    }
    else if (getBrowser()=='safari'){ // safari
      // Safari
      $('body').addClass('safari');
    }
    else if(getBrowser()=='chrome'){
      // Chrome
      $('body').addClass('chrome');
    };
    if (getInternetExplorerVersion() >= 10){
      $('body').addClass('ie11');
    };

    // Detection function to tell what kind of browser is used
    function getBrowser(){
      /*
      var userAgent = navigator.userAgent.toLowerCase();
      console.log(userAgent);
      $.browser.chrome = /chrome/.test(userAgent);
      $.browser.safari= /webkit/.test(userAgent);
      $.browser.opera=/opera/.test(userAgent);
      $.browser.msie=/msie/.test( userAgent ) && !/opera/.test( userAgent );
      $.browser.mozilla= /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) || /firefox/.test(userAgent);

      if($.browser.chrome) return "chrome";
      if($.browser.mozilla) return "mozilla";
      if($.browser.opera) return "opera";
      if($.browser.safari) return "safari";
      if($.browser.msie) return "ie";
      */
      var ua = navigator.userAgent;
      var msie = false;
      var ff = false;
      var chrome = false;

      //Javascript Browser Detection - Internet Explorer
      if (/MSIE (\d+\.\d+);/.test(ua)) //test for MSIE x.x; True or False
      {
          var msie = (/MSIE (\d+\.\d+);/.test(ua)); //True or False
          var ieversion = new Number(RegExp.$1); //gets browser version
          //alert("ie: " + msie + ' version:' + ieversion);
          return "ie";
      }

      //Javascript Browser Detection - FireFox
      if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.ua))//test for Firefox/x.x or Firefox x.x
      {
          var ff = (/Firefox[\/\s](\d+\.\d+)/.test(navigator.ua)); //True or False
          var ffversion = new Number(RegExp.$1) //gets browser version
          //alert("FF: " + ff + ' version:' + ieversion);
          return "mozilla";
      }

      //Javascript Browser Detection - Chrome
      if (ua.lastIndexOf('Chrome/') > 0) {
          var version = ua.substr(ua.lastIndexOf('Chrome/') + 7, 2);
          //alert("chrome " + version);
          return "chrome";
      }

      //Javascript Browser Detection - Safari
      if (ua.lastIndexOf('Safari/') > 0) {
          var version = ua.substr(ua.lastIndexOf('Safari/') + 7, 2);
          //alert("Safari " + version);
          return "safari";
      }

      //Javascript Browser Detection - Android
      /*
      if (ua.indexOf("Android") >= 0) {
          var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
          if (androidversion < 2.3) {
              // do whatever
              alert("This older version of Android has some issues with CSS");
          }
      }

      //Javascript Browser Detection - Mobile
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(ua)) {

          // Check if the orientation has changed 90 degrees or -90 degrees... or 0
          window.addEventListener("orientationchange", function () {
              alert(window.orientation);
          });
      }
      */

    };

    // Since IE11 can not be detected like this because the new user agent on IE11 is trying to hide as Mozilla
    // we detect IE11 with this function
    function getInternetExplorerVersion(){
      var rv = -1;
      if (navigator.appName == 'Microsoft Internet Explorer'){
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
      }
      else if (navigator.appName == 'Netscape'){
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
      }
      return rv;
    };
    // **************
    // end.GRAY SCALE
    // ******************************************************************************************
    // ******************************************************************************************

//PROJECTS CATEGORIES MENU-------------------DOMINIQUE--------
    $( ".categories-big li" ).mouseenter(function(){
      //console.log('hello');
      $(".underline", this).animate({'width': '125px'}, 150);

        $(this).prev().find('div').addClass('hide-border');
        $(this).find('div').addClass('hide-border');

      $(this).animate({
        'background-color':'#fff', 
        'margin-top':'-=13px', 
        'height':'172px'}, 100);
      $( ".border", this).animate({
        'margin-top':'+=23px',
        'color':'#000'}, 100);//css('border','none');
      })

      $( ".categories-big li" ).mouseleave(function(){
      //console.log('hola');

        $(this).prev().find('div').removeClass('hide-border');
        $(this).find('div').removeClass('hide-border');

      $( ".categories-big" ).css('height', '159px');
      $(this).animate({'background-color':'#f8f8f8;',       
        'margin-top':'+=13px', 
        'height':'159px'}, 100);
      $( ".border", this).animate({
        'margin-top':'-=23px',
        //'border':'none',
        'color':'#999'}, 100);//css('border-right','1px #ebebeb solid');
      $(".underline", this).animate({'width': '0px'},0);
    })



<!--
//-->


if (window.matchMedia('(min-width: 650px)').matches)
{
    // do functionality on screens smaller than 768px


    $( ".image-box" ).mouseenter(function(){ 
      console.log('hello');
      $( ".projects-webapps-rollover-box", this ).fadeIn(400);
      $(".image-box-img", this ).addClass("image-blur");
$(".projects-webapps-images .btn", this).css('display','none');
$(".projects-webapps-images .rollover-btn", this).css('display','inline-block');
});
   

      $( ".image-box" ).mouseleave(function(){
      console.log('hello');
      $( ".projects-webapps-rollover-box", this ).stop(true,true).fadeOut(400);
      $(".image-box-img", this ).removeClass("image-blur");
    });
    
}


  });





  $(window).load(function() {
    updateHomeSolutionsHeight();
    updateHomeWeAreHeight();
  });


  // --- init-SCROLL
  $(window).scroll(function(){

    if ( !touch_device ) {
      var pos   = $(this).scrollTop();

      //console.log("-> pos: "+pos+" / _lastScrollTop: "+_lastScrollTop);

      if (pos > _lastScrollTop){
        // DOWNSCROLL CODE
        if (_window.scrollTop() >= (_topH)) {
          /*
          if( !$('#header-fixed').hasClass('showing') ) {
            $('#header-fixed').addClass('showing').animate({ top: 0 }, 200, 'easeOutQuart', function() { });
          }
          */
          if( !$('#header').hasClass('fixed') ) {
            $('#header-empty').css('display','block');
            $('#header').addClass('fixed').css('top','-60px').animate({ top: 0 }, 400, 'easeOutQuart', function() { });
          }
        }
      } else {
        // UPSCROLL CODE
        if (_window.scrollTop() <= (_topH)) {
          /*
          if( $('#header-fixed').hasClass('showing') ) {
            $('#header-fixed').removeClass('showing').animate({ top: '-60px', height: '60px' }, 100, 'easeInOutQuart', function() { });
          }
          */
          if( $('#header').hasClass('fixed') ) {
            $('#header').animate({ top: '-60px' }, 50, 'easeInQuart', function() {
              $(this).removeClass('fixed').css('top','0');
              $('#header-empty').css('display','none');
            });
          }
        }
      }

    }

    _lastScrollTop = pos;

  });
  // --- end.SCROLL

  // --- init.RESIZE
  $(window).resize(function() {
    updateHomeSolutionsHeight();
    updateHomeWeAreHeight();
  });
  // --- end.RESIZE


// --------------
// init.FUNCTIONS

function updateHomeSolutionsHeight() {
  //updateHomeHeightItems( $('.solutions-img') );

  if( $('.solutions-img').length ) {
    if( _window.width() >= _minW ) {
      var maxH = 0;
      $('.solutions-img').each( function( index ) {
        if( $(this).height() > maxH ) {
          maxH = $(this).height();
        }
      });
      $('.solutions-img').each( function( index ) {
        $(this).css('height',maxH);
      });
    } else {
      $('.solutions-img').each( function( index ) {
      $(this).css('height','');
    });
    }
  }

}

function updateHomeWeAreHeight() {
  //updateHomeHeightItems( $('.weare-img') );
}

function updateHomeHeightItems( $item ) {
  var maxH = 0;

  if( $item.length ) {
    //if( _window.width() >= _minW ) {
      $item.each( function( index ) {
        if( $(this).innerHeight() > maxH ) {
          maxH = $(this).innerHeight();
        }
      });
      $item.each( function( index ) {
        $(this).css('innerHeight',maxH);
      });
    //} else {
    //  $item.each( function( index ) {
    //    $(this).css('height','');
    //  });
    //}
  }
}
 


// end.FUNCTIONS
// -------------


})(window.jQuery);
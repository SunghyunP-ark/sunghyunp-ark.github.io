
(function($){
	"use strict";
	var NAY = {};
	var plugin_track = 'static/plugin/';
	$.fn.exists = function () {
        return this.length > 0;
    };

	/* ---------------------------------------------- /*
	 * Pre load
	/* ---------------------------------------------- */
	NAY.PreLoad = function() {
		document.getElementById("loading").style.display = "none"; 
	}

    /*--------------------
        * Menu Close
    ----------------------*/
    NAY.MenuClose = function(){
      $('.navbar-nav a').on('click', function() {
       var toggle = $('.navbar-toggler').is(':visible');
       if (toggle) {
         $('.navbar-collapse').collapse('hide');
       }
      });
    }


  NAY.MenuTogglerClose = function(){
    $(".toggler-menu").on('click', function(){
      $(this).toggleClass('open');
      $('.header-left').stop().toggleClass('menu-open menu-open-desk');
    });
    $('.header-left a').on('click', function() {
     var toggle = $('.toggler-menu').is(':visible');
     if (toggle) {
       $('.header-left').removeClass('menu-open');
       $('.toggler-menu').removeClass('open');
     }
    });
  }

	/* ---------------------------------------------- /*
	 * Header Fixed
	/* ---------------------------------------------- */
	NAY.HeaderFixd = function() {
		var HscrollTop  = $(window).scrollTop();  
	    if (HscrollTop >= 100) {
	       $('body').addClass('fixed-header');
	    }
	    else {
	       $('body').removeClass('fixed-header');
	    }
	}

	/*--------------------
        * One Page
    ----------------------*/
    NAY.OnePage = function(){
        $('.header-left a[href*="#"]:not([href="#"]), .go-to a[href*="#"]:not([href="#"])').on('click', function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
              var target = $(this.hash);
                  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                  if (target.length) {
                    $('html,body').animate({
                      scrollTop: target.offset().top - -2,
                      }, 1000);
                      return false;
                  }
            }
        });

        $('.header-nav a[href*="#"]:not([href="#"])').on('click', function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
              var target = $(this.hash);
                  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                  if (target.length) {
                    $('html,body').animate({
                      scrollTop: target.offset().top - 60,
                      }, 1000);
                      return false;
                  }
            }
        });
    }

    /*--------------------
        * One Page
    ----------------------*/
    NAY.OnePageTop = function(){
        $('.header-one-page a[href*="#"]:not([href="#"])').on('click', function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
              var target = $(this.hash);
                  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                  if (target.length) {
                    $('html,body').animate({
                      scrollTop: target.offset().top - 65,
                      }, 1000);
                      return false;
                  }
            }
        });
    }

	/* ---------------------------------------------- /*
	 * Mega Menu
	/* ---------------------------------------------- */

	NAY.MegaMenu = function() {
		var mDropdown = $(".m-dropdown-toggle") 
		mDropdown.on("click", function() {
	        $(this).parent().toggleClass("open-menu-parent");
	        $(this).next('ul').toggleClass("open-menu");
	        $(this).toggleClass("open");
	    });
	}

	/*--------------------
    * Counter JS
    ----------------------*/
	 NAY.Counter = function () {
	  var counter = jQuery(".counter");
	  var $counter = $('.counter');
	  if(counter.length > 0) {  
	      loadScript(plugin_track + 'counter/jquery.countTo.js', function() {
	        $counter.each(function () {
	         var $elem = $(this);                 
	           $elem.appear(function () {
	             $elem.find('.count').countTo({
	             	speed: 2000,
    				refreshInterval: 10
	             });
	          });                  
	        });
	      });
	    }
	  }


    /*--------------------
    * OwlSlider
    ----------------------*/
    NAY.Owl = function () {
      var owlslider = jQuery("div.owl-carousel");
      if(owlslider.length > 0) {  
         loadScript(plugin_track + 'owl-carousel/js/owl.carousel.min.js', function() {
           owlslider.each(function () {
            var $this = $(this),
                $items = ($this.data('items')) ? $this.data('items') : 1,
                $loop = ($this.attr('data-loop')) ? $this.data('loop') : true,
                $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
                $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : false,
                $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : true,
                $autospeed = ($this.attr('data-autospeed')) ? $this.data('autospeed') : 5000,
                $smartspeed = ($this.attr('data-smartspeed')) ? $this.data('smartspeed') : 1000,
                $autohgt = ($this.data('autoheight')) ? $this.data('autoheight') : false,
                $CenterSlider = ($this.data('center')) ? $this.data('center') : false,
                $space = ($this.attr('data-space')) ? $this.data('space') : 30;    
           
                $(this).owlCarousel({
                    loop: $loop,
                    items: $items,
                    responsive: {
                      0:{items: $this.data('xx-items') ? $this.data('xx-items') : 1},
                      480:{items: $this.data('xs-items') ? $this.data('xs-items') : 1},
                      768:{items: $this.data('sm-items') ? $this.data('sm-items') : 1},
                      980:{items: $this.data('md-items') ? $this.data('md-items') : 1},
                      1200:{items: $items}
                    },
                    dots: $navdots,
                    autoplayTimeout:$autospeed,
                    smartSpeed: $smartspeed,
                    autoHeight:$autohgt,
                    center:$CenterSlider,
                    margin:$space,
                    nav: $navarrow,
                    navText:["<i class='ti-arrow-left'></i>","<i class='ti-arrow-right'></i>"],
                    autoplay: $autoplay,
                    autoplayHoverPause: true   
                }); 
           }); 
         });
      }
    }

	/* ---------------------------------------------- /*
     * lightbox gallery
    /* ---------------------------------------------- */
    NAY.Gallery = function() {
    	if ($(".lightbox-gallery").exists() || $(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()){
    		loadScript(plugin_track + 'magnific/jquery.magnific-popup.min.js', function() {
    			if($(".lightbox-gallery").exists()){
    				$('.lightbox-gallery').magnificPopup({
				        delegate: '.gallery-link',
				        type: 'image',
				        tLoading: 'Loading image #%curr%...',
				        mainClass: 'mfp-fade',
				        fixedContentPos: true,
				        closeBtnInside: false,
				        gallery: {
				            enabled: true,
				            navigateByImgClick: true,
				            preload: [0, 1] // Will preload 0 - before current, and 1 after NAY current image
				        }
				    });	
    			}
    			if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
		            $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		                  disableOn: 700,
		                  type: 'iframe',
		                  mainClass: 'mfp-fade',
		                  removalDelay: 160,
		                  preloader: false,
		                  fixedContentPos: false
		            });
		        }
    		});
    	}
    }

     /*--------------------
    * Masonry
    ----------------------*/
    NAY.masonry = function () {
    	var portfolioWork = $('.portfolio-content');
    	if ($(".portfolio-content").exists()){
    		loadScript(plugin_track + 'isotope/isotope.pkgd.min.js', function() {
    			if ($(".portfolio-content").exists()){
					    $(portfolioWork).isotope({
					      resizable: false,
					      itemSelector: '.grid-item',
					      layoutMode: 'masonry',
					      filter: '*'
					    });
					    //Filtering items on portfolio.html
					    var portfolioFilter = $('.filter li');
					    // filter items on button click
					    $(portfolioFilter).on( 'click', function() {
					      var filterValue = $(this).attr('data-filter');
					      portfolioWork.isotope({ filter: filterValue });
					    });
					    //Add/remove class on filter list
					    $(portfolioFilter).on( 'click', function() {
					      $(this).addClass('active').siblings().removeClass('active');
					    });
    			}
    		});
    	}
	}

	/*--------------------
        * Progress Bar 
    ----------------------*/
    NAY.ProgressBar = function(){
        $(".skill-bar .skill-bar-in").each(function () {
          var bottom_object = $(this).offset().top + $(this).outerHeight();
          var bottom_window = $(window).scrollTop() + $(window).height();
          var progressWidth = $(this).attr('aria-valuenow') + '%';
          if(bottom_window > bottom_object) {
            $(this).css({
              width : progressWidth
            });
          }
        });
    }

    /*--------------------
        * particles
    ----------------------*/
    NAY.particles = function() {
      if ($("#particles-box").exists()){
        loadScript(plugin_track + 'particles/particles.min.js', function() {
        });
        loadScript(plugin_track + 'particles/particles-app.js', function() {
        });
      }
    }

     /*--------------------
        * Scroll
    ----------------------*/
    NAY.scrollBar = function() {
      if ($(".scroll-bar").exists()){
        loadScript(plugin_track + 'scroll/jquery.mCustomScrollbar.min.js', function() {
          $(".scroll-bar").mCustomScrollbar({
            theme:"minimal"
          });
        });
      }
    }


    /*--------------------
        * Type It
    ----------------------*/
    NAY.mTypeIt = function() {
    	if ($("#type-it").exists()){
            loadScript(plugin_track + 'typeit-master/typeit.min.js', function() {
                new TypeIt('#type-it', {
		            speed: 200,
		            loop:true,
		            strings: [
		              'Designer',
		              'Developer'
		            ],
		            breakLines: false
		        }); 
          });
        }
    }

	/* ---------------------------------------------- /*
	 * Skill Bar Animation
	/* ---------------------------------------------- */
	NAY.SkillBarAnimation = function() {
		var skillBarsAnimated = false;
		
		// 스킬바 애니메이션 함수
		function animateSkillBars() {
			if (skillBarsAnimated) return;
			
			$('.skill-bar').each(function() {
				var $this = $(this);
				var $skillItem = $this.closest('.skill-item');
				var targetWidth = parseInt($this.data('width'));
				
				if (targetWidth && targetWidth > 0) {
					// 애니메이션 실행
					$this.animate({
						width: targetWidth + '%'
					}, {
						duration: 2000,
						easing: 'swing',
						step: function(now) {
							// 퍼센트 표시도 함께 업데이트
							var percentage = Math.round(now);
							$skillItem.find('.skill-percentage').text(percentage + '%');
						},
						complete: function() {
							// 애니메이션 완료 후 정확한 퍼센트로 설정
							$skillItem.find('.skill-percentage').text(targetWidth + '%');
						}
					});
				}
			});
			skillBarsAnimated = true;
		}
		
		// 스크롤 이벤트로 스킬 섹션이 보일 때 애니메이션 실행
		$(window).on('scroll', function() {
			var skillsSection = $('.skills-section');
			if (skillsSection.length) {
				var sectionTop = skillsSection.offset().top;
				var sectionHeight = skillsSection.outerHeight();
				var windowTop = $(window).scrollTop();
				var windowHeight = $(window).height();
				
				if (windowTop + windowHeight > sectionTop + 100) {
					animateSkillBars();
				}
			}
		});
		
		// 페이지 로드 시에도 체크
		setTimeout(function() {
			var skillsSection = $('.skills-section');
			if (skillsSection.length) {
				var sectionTop = skillsSection.offset().top;
				var windowHeight = $(window).height();
				
				if (sectionTop < windowHeight) {
					animateSkillBars();
				}
			}
		}, 500);
	}

	/* ---------------------------------------------- /*
	 * Copy to Clipboard Function
	/* ---------------------------------------------- */
	NAY.CopyToClipboard = function() {
		$('.copy-btn').on('click', function() {
			var $this = $(this);
			var textToCopy = $this.data('copy');
			var originalIcon = $this.find('i').attr('class');
			
			// 클립보드에 복사
			if (navigator.clipboard && window.isSecureContext) {
				// 최신 브라우저의 Clipboard API 사용
				navigator.clipboard.writeText(textToCopy).then(function() {
					showCopySuccess($this, originalIcon);
				}).catch(function() {
					fallbackCopyTextToClipboard(textToCopy, $this, originalIcon);
				});
			} else {
				// 구형 브라우저를 위한 fallback
				fallbackCopyTextToClipboard(textToCopy, $this, originalIcon);
			}
		});
	}
	
	// Fallback 복사 함수
	function fallbackCopyTextToClipboard(text, $button, originalIcon) {
		var textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.top = "0";
		textArea.style.left = "0";
		textArea.style.position = "fixed";
		textArea.style.opacity = "0";
		
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		
		try {
			var successful = document.execCommand('copy');
			if (successful) {
				showCopySuccess($button, originalIcon);
			} else {
				showCopyError($button, originalIcon);
			}
		} catch (err) {
			showCopyError($button, originalIcon);
		}
		
		document.body.removeChild(textArea);
	}
	
	// 복사 성공 시각적 피드백
	function showCopySuccess($button, originalIcon) {
		$button.addClass('copied');
		$button.find('i').removeClass().addClass('fas fa-check');
		
		setTimeout(function() {
			$button.removeClass('copied');
			$button.find('i').removeClass().addClass(originalIcon);
		}, 2000);
	}
	
	// 복사 실패 시각적 피드백
	function showCopyError($button, originalIcon) {
		$button.addClass('error');
		$button.find('i').removeClass().addClass('fas fa-times');
		
		setTimeout(function() {
			$button.removeClass('error');
			$button.find('i').removeClass().addClass(originalIcon);
		}, 2000);
	}

	/* ---------------------------------------------- /*
	 * All Functions
	/* ---------------------------------------------- */
    // loadScript
	var _arr  = {};
	function loadScript(scriptName, callback) {
	    if (!_arr[scriptName]) {
	      _arr[scriptName] = true;
	      var body    = document.getElementsByTagName('body')[0];
	      var script    = document.createElement('script');
	      script.type   = 'text/javascript';
	      script.src    = scriptName;
	      // NAYn bind NAY event to NAY callback function
	      // NAYre are several events for cross browser compatibility
	      // script.onreadystatechange = callback;
	      script.onload = callback;
	      // fire NAY loading
	      body.appendChild(script);
	    } else if (callback) {
	      callback();
	    }
	};

	// Window on Load
	$(window).on("load", function(){
		NAY.masonry(),
		NAY.PreLoad();
	});
	// Document on Ready
	$(document).on("ready", function(){				
    NAY.particles(),
    NAY.scrollBar(),
		NAY.HeaderFixd(),
		NAY.OnePage(),
		NAY.OnePageTop(),
		NAY.Counter(),
		NAY.MenuClose(),
    NAY.MenuTogglerClose(),
		NAY.Gallery(),
		NAY.MegaMenu(),
		NAY.ProgressBar(),
		NAY.mTypeIt(),
		NAY.Owl(),
		NAY.SkillBarAnimation(),
		NAY.CopyToClipboard(),
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
	});

	// Document on Scrool
	$(window).on("scroll", function(){
		NAY.ProgressBar(),
		NAY.HeaderFixd(),
		NAY.SkillBarAnimation();
	});

	// Window on Resize
	$(window).on("resize", function(){
	});


})(jQuery);
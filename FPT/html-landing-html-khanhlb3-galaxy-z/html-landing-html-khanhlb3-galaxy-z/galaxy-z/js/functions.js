jQuery.fn.extend({
  cDropdown: function () {
    return this.each(function () {
      var containermenu = $(this);
      var button = containermenu.find('.cs-dropdown-button');
      var menu = containermenu.find('.cs-dropdown-menu');
      var list = containermenu.find('.cs-dropdown-menu-wrapper');
      var item = list.children();
      var option = button.find('span');
      button.click(function (e) {
        menu.addClass('open');
      });
      item.click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var txt = $(this).find('span').text();
        option.text(txt);
        menu.removeClass('open');
      })
      $(document).click(function (e) {
        e.stopPropagation();
        var container = containermenu;
        if (container.has(e.target).length === 0) {
          menu.removeClass('open');
        }
      })
    });
  },
  //mac booking
  phoneBooking: function (phoneData) {
    return this.each(function () {
      var container = $(this);
      var list = container.find('.js--order-option');
      // var series = container.find('.order__list');
      // var version = container.find('.choose-version .list');
      list.each(function () {
        var child = $(this).children();
        child.click(function () {
          var series = container.find('.order__list .item.active').attr('data-series');
          var version = container.find('.choose-version .list .item.active').attr('data-version');
          var fls = series + '-' + version;
          const product = `${fls}`;
          const objProduct = phoneData[product];
          var priceProduct = container.find('.js--order-price');
          priceProduct.text(objProduct.price);
        })
      })
    })
  },
});

(function ($) {
  $(document).ready(function () {
    $(".of-iconmntop").click(function () {
      $(".of-menutop").toggleClass("of-mnshow");
    });

    $(".of-search").click(function () {
      $(".of-searchbox").show(200);
    });

    $(".of-closesearch").click(function () {
      $(".of-searchbox").hide(200);
    });

    $(document).on("click", "[toscroll]", function (e) {
      e.preventDefault();
      var link = $(this).attr("toscroll");
      if ($(link).length > 0) {
        var posi = $(link).offset().top - 50;
        $("body,html").animate(
          {
            scrollTop: posi,
          },
          1000
        );
      }
    });

    //rule
    $(".js--more-rule").click(function () {
      $(".st-rule__viewmore").hide();
      $(".st-rule__content").css("height", "auto");
    });
    $('.js--more-shop').on('click', function () {
      $('.st-experience .list-shop').addClass('list-full');
      $('.st-experience .view-more').hide();
    })
    $(".fs-header__top__logo .fs-header-icon i").on("click", function () {
      $("html").addClass("noscroll");
    });
    $(" .fs-menuleft-block .fs-menuleft-top .menu-icon").on("click", function () {
      $("html").removeClass("noscroll");
    });

    //menu
    // cache the navigation links
    var $navigationLinks = $("#navigation > ul > li > a");
    // cache (in reversed order) the sections
    var $sections = $($(".samsung").get().reverse());

    // map each section id to their corresponding navigation link
    var sectionIdTonavigationLink = {};
    $sections.each(function () {
      var id = $(this).attr("id");
      sectionIdTonavigationLink[id] = $(
        "#navigation > ul > li > a[href=\\#" + id + "]"
      );
    });

    // throttle function, enforces a minimum time interval
    function throttle(fn, interval) {
      var lastCall, timeoutId;
      return function () {
        var now = new Date().getTime();
        if (lastCall && now < lastCall + interval) {
          // if we are inside the interval we wait
          clearTimeout(timeoutId);
          timeoutId = setTimeout(function () {
            lastCall = now;
            fn.call();
          }, interval - (now - lastCall));
        } else {
          // otherwise, we directly call the function
          lastCall = now;
          fn.call();
        }
      };
    }

    function highlightNavigation() {
      // get the current vertical position of the scroll bar
      var scrollPosition = $(window).scrollTop();

      // iterate the sections
      $sections.each(function () {
        var currentSection = $(this);
        // get the position of the section
        var sectionTop = currentSection.offset().top;

        // if the user has scrolled over the top of the section
        if (scrollPosition >= sectionTop - 70) {
          // get the section id
          var id = currentSection.attr("id");
          // get the corresponding navigation link
          var $navigationLink = sectionIdTonavigationLink[id];

          // if the link is not active
          if (!$navigationLink.hasClass("active")) {
            // remove .active class from all the links

            $navigationLinks.removeClass("active");
            // add .active class to the current link
            $navigationLink.addClass("active");
          }
          // we have found our section, so we return false to exit the each loop
          return false;
        }
      });
    }
    $(window).scroll(throttle(highlightNavigation, 100));
  });
  $('.hori-nav .choose-product .item').click(function () {
    var btn = $('.hori-nav .choose-product .item');
    btn.removeClass('active');
    $(this).addClass('active');
    $('.info-list .detail').removeClass('active');
    var seri = $(this).attr('data-series');
    $('.' + seri).addClass('active');
  })
  // video
  $(".introduce__video .img").click(function () {
    
    $(this).hide();   
    var videoURL = $("#playerID").prop("src");
    videoURL += "?autoplay=1";
    $("#playerID").prop("src", videoURL);
  });
  //modal
  $(".js--open-modal").each(function () {
    var btn = $(this).find(".btn-more");
    btn.click(function () {
      var dataTaget = $(this).attr("data-target");
      $("." + dataTaget).show();
      $("html").addClass("no-scroll");
    });
  });
  $(".js--close-modal").click(function () {
    $(".popup-modal").hide();
    $("html").removeClass("no-scroll");
  });

  $('.js--wrap-item').each(function () {
    var child = $(this).children();
    child.click(function () {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
    })
  })


  const phoneData = {
    //mini
    "galaxy-fold-ver-1": {
      price: '41.990.000đ'
    },
    "galaxy-fold-ver-2": {
      price: '44.990.000đ'
    },
    "galaxy-zflip-ver-1": {
      price: '24.990.000đ'
    },
    "galaxy-zflip-ver-2": {
      price: '26.990.000đ'
    },
  };

  $('.js--phone-order').phoneBooking(phoneData);


})(window.jQuery);

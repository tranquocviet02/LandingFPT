(function($) {
    $(document).ready(function() {
        $(".of-iconmntop").click(function() {
            $(".of-menutop").toggleClass("of-mnshow");
        });

        $(".of-search").click(function() {
            $(".of-searchbox").show(200);
        });

        $(".of-closesearch").click(function() {
            $(".of-searchbox").hide(200);
        });

        $(window).bind("scroll", function() {
            var navHeight = $(window).height();
            if ($(window).scrollTop() > navHeight) {
                $(".ss-mnbar").addClass("fixed");
            } else {
                $(".ss-mnbar").removeClass("fixed");
            }
        });

        $(document).on("click", "[toscroll]", function(e) {
            e.preventDefault();
            var link = $(this).attr("toscroll");
            if ($(link).length > 0) {
                var posi = $(link).offset().top - 50;
                $("body,html").animate({
                        scrollTop: posi,
                    },
                    1000
                );
            }
        });

        $(".fs-header__top__logo .fs-header-icon i").on("click", function() {
            $("html").addClass("noscroll");
        });
        $(" .fs-menuleft-block .fs-menuleft-top .menu-icon").on("click", function() {
            $("html").removeClass("noscroll");
        });

        //menu
        // cache the navigation links
        var $navigationLinks = $("#navigation > ul > li > a");
        // cache (in reversed order) the sections
        var $sections = $($(".galaxy-s22").get().reverse());

        // map each section id to their corresponding navigation link
        var sectionIdTonavigationLink = {};
        $sections.each(function() {
            var id = $(this).attr("id");
            sectionIdTonavigationLink[id] = $("#navigation > ul > li > a[href=\\#" + id + "]");
        });

        // throttle function, enforces a minimum time interval
        function throttle(fn, interval) {
            var lastCall, timeoutId;
            return function() {
                var now = new Date().getTime();
                if (lastCall && now < lastCall + interval) {
                    // if we are inside the interval we wait
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(function() {
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
            $sections.each(function() {
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

        // Countdown st2
        $("#clock").countdown("2021/05/31    22:00", function(event) {
            $(this).html(
                event.strftime(
                    ' <p>%D<span>Ngày</span></p> <strong> :</strong> <p id="hours">%H<span>Giờ</span></p> <strong> :</strong> <p id="minutes">%M<span>Phút</span></p>  <strong> :</strong><p id="second">%S<span>Giây</span></p>'
                )
            );
        });
        //video

        $(".st3__img").click(function() {
            $(this).hide();
            $(".st3__iframe").show();
            var videoURL = $("#playerID").prop("src");
            videoURL += "?autoplay=1";
            $("#playerID").prop("src", videoURL);
        });

        $(".js--wrap-item").each(function() {
            var child = $(this).children();
            child.click(function() {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
            });
        });

        //game
        $(".js--game-step").click(function() {
            var parent = $(this).closest(".js--game-block");
            parent.hide();
            parent.next().show();
        });
        $(".select").hide();
        $(document).on("click", ".province span", function() {
            $(this).next().toggle();
        });
        $(document).on("click", ".text-expstore  span", function() {
            $(this).next().toggle();
        });

        //st8 slide
        var slst8 = new Swiper(".st8 .swiper", {
            pagination: {
                el: ".st8 .swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".st8 .swiper-button-next",
                prevEl: ".st8 .swiper-button-prev",
            },
        });
        var slst9 = new Swiper(".st9 .swiper", {
            pagination: {
                el: ".st9 .swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".st9 .swiper-button-next",
                prevEl: ".st9 .swiper-button-prev",
            },
        });

        //booking
        $(".st-booking .phone-item").click(function() {
            var sr = $(this).attr("data-sr");
            $(".color-box").removeClass("active");
            $(".detail-specifi .detail").removeClass("active");
            $("." + sr).addClass("active");
        });
        $(".js--bk-wrap").each(function() {
            var par = $(this);
            var child = $(this).children();
            child.click(function() {
                var sr = $(".phone-item.active").attr("data-sr");
                var cl = $(".color-box.active li.active").attr("data-color");
                $(".st-booking__img img").attr("src", "images/" + sr + "-" + cl + ".png");
            });
        });

        //modal
        $(".js--open-modal").each(function() {
            var btn = $(this).find(".btn-more");
            btn.click(function() {
                var dataTaget = $(this).attr("data-target");
                $("." + dataTaget).show();
                $("html").addClass("no-scroll")
            });
        });
        $(".js--close-modal").click(function() {
            $(".popup-modal").hide();
            $("html").removeClass("no-scroll")
        });

        //menu

        var sections = $(".series-reno8");
        // throttle function, enforces a minimum time interval
        function throttle(fn, interval) {
            var lastCall, timeoutId;
            return function() {
                var now = new Date().getTime();
                if (lastCall && now < lastCall + interval) {
                    // if we are inside the interval we wait
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(function() {
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

        function handleScrollNav() {
            var scrollPosition = $(window).scrollTop();
            var heightMenu = $(".st-menu").height();
            sections.each(function() {
                if ($(this).is(":visible")) {
                    const thatPosition = $(this).position().top;
                    const thatHeight = $(this).height();
                    if (scrollPosition > thatPosition - heightMenu && scrollPosition < thatPosition + thatHeight) {
                        const id = $(this).attr("id");
                        console.log(id)
                        $(".st-menu ul li a").removeClass("active");
                        $(`.st-menu ul li a[href=#${id}]`).addClass("active");
                    }
                }
            });
        }
        $(window).scroll(throttle(handleScrollNav, 100));

        //rule
        $('.js--more-rule').click(function() {
            $('.st-rule__viewmore').hide();
            $('.st-rule__content').css('height', 'auto');
        })

        $('.fs-header__top__logo .fs-header-icon i').on('click', function() {
            $('html').addClass('noscroll');
        });
        $(' .fs-menuleft-block .fs-menuleft-top .menu-icon').on('click', function() {
            $('html').removeClass('noscroll');
        });

        //wrap item
        $('.js--wrap-item').each(function() {
            var parent = $(this);
            var item = parent.children();
            item.click(function() {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            })
        })

        var shopItem = $('.st-experience .list-shop .shop-item');
        shopItem.hide();
        shopItem.slice(0, 2).show();

        $('.js--more-shop').on('click', function() {
            $('.st-experience .list-shop').addClass('list-full');
            $('.st-experience .view-more').hide();
            shopItem.show();
        })

    });
})(window.jQuery);

const mapCharacters = () => {
    // game1 items
    var jsCharacterStep1 = ['G', 'C', 'Â', 'N', 'H', 'N', 'N', 'Ê', 'C', 'Y', 'U', 'I', 'A', 'C', 'H', 'U', 'D'];
    var jsCharacterStep2 = ['Đ', 'U', 'Y', 'Q', 'Ê', 'Ê', 'M', 'I', 'U', 'S', 'A'];

    var listGameItem1 = $('#charStep1');
    var listGameItem2 = $('#charStep2');

    jsCharacterStep1.map(function(item, index) {
        listGameItem1.append(
            `<li class="game-item">${item}</li>`
        )
    })

    jsCharacterStep2.map(function(item, index) {
        listGameItem2.append(
            `<li class="game-item">${item}</li>`
        )
    })
}
mapCharacters();
/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;
//= include ../../node_modules/waypoints/lib/jquery.waypoints.min.js ;


// CUSTOM SCRIPTS
function youtubeVideo() {
    $('#customPlaybtn').click(function (e) {
        e.preventDefault();
        $(this).parents('.section-video__poster').fadeOut(700);

        $('#youtube-video').attr({src: $(this).data('iframe')})
    })
}


$(document).ready(function () {
    //JQUERY COUNTER UP
    (function (e) {
        "use strict";
        e.fn.counterUp = function (t) {
            var n = e.extend({time: 400, delay: 10}, t);
            return this.each(function () {
                var t = e(this), r = n, i = function () {
                    var e = [], n = r.time / r.delay, i = t.text(), s = /[0-9]+,[0-9]+/.test(i);
                    i = i.replace(/,/g, "");
                    var o = /^[0-9]+$/.test(i), u = /^[0-9]+\.[0-9]+$/.test(i),
                        a = u ? (i.split(".")[1] || []).length : 0;
                    for (var f = n; f >= 1; f--) {
                        var l = parseInt(i / n * f);
                        u && (l = parseFloat(i / n * f).toFixed(a));
                        if (s) while (/(\d+)(\d{3})/.test(l.toString())) l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                        e.unshift(l)
                    }
                    t.data("counterup-nums", e);
                    t.text("0");
                    var c = function () {
                        t.text(t.data("counterup-nums").shift());
                        if (t.data("counterup-nums").length) setTimeout(t.data("counterup-func"), r.delay); else {
                            delete t.data("counterup-nums");
                            t.data("counterup-nums", null);
                            t.data("counterup-func", null)
                        }
                    };
                    t.data("counterup-func", c);
                    setTimeout(t.data("counterup-func"), r.delay)
                };
                t.waypoint(i, {offset: "100%", triggerOnce: !0})
            })
        }
    })($);

    youtubeVideo();
    //MOBILE MENU
    const nav = $('.header__nav');

    $('.btn_burger').click(function (e) {
        e.preventDefault();
        nav.addClass('open');
        jQuery('.backdrop').fadeIn();
    });

    $('.btn_close, .backdrop').click(function (e) {
        e.preventDefault();
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
    });

    // SMOOTH SCROLL TO ANCHOR
    function smoothScrollToAnchor(selector) {
        $(selector).on('click', function (event) {
            let anchor = $.attr(this, 'href');

            if (anchor.match(/^#/) && anchor !== '#') {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top
                }, 1500);
                nav.removeClass('open');
                jQuery('.backdrop').fadeOut();
                $('body').removeClass('modal_open');
            }
        })

    }

    smoothScrollToAnchor('.btn_scroll');
    smoothScrollToAnchor('.menu__link');

    //SWIPER-SLIDER
    const sliderActivity = new Swiper(".slider-activity", {
        spaceBetween: 5,
        slidesPerView: "auto",
        loop: true,
        speed: 1500,
        on: {
            afterInit: function () {
                const currSlide = this.slides[this.activeIndex];
                const modalId = $(currSlide).attr('data-modal-id');
                $('#help-modal-btn').data('modal', modalId);
                showActivityText(currSlide);
            }
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    sliderActivity.on('slideChange', function () {
        const currSlide = this.slides[this.activeIndex];
        const modalId = $(currSlide).attr('data-modal-id');
        $('#help-modal-btn').data('modal', modalId);

        showActivityText(currSlide);
    });


    function showActivityText(currSlide) {
        const textHolder = $('#slideText');
        if (textHolder && textHolder.length > 0) {
            const text = $(currSlide).find('.text-template').html();
            textHolder.html(text);
        }
    }

    //TABS
    const tabLink = $('.modal-tabs__link');
    tabLink.on('click', function (e) {
        $('.modal-tabs__link').removeClass('active');
        $(this).addClass('active');

    });

    const tabContentItem = $('.modal-tab');

    tabLink.click(function (e) {
        e.preventDefault();
        tabLink.removeClass('active');
        tabContentItem.removeClass('active');
        $(e.target).addClass('active');
        $($(e.currentTarget).attr('href')).addClass('active');
    });

    // MODAL
    $('.modal-toggle').on('click', function (e) {
        e.preventDefault();

        const modalID = $(this).data('modal');
        const modal = $('#' + modalID);
        modal.addClass('active');
        jQuery('.backdrop').fadeIn();
        $("body").addClass("modal-open");
    });

    $('.modal__close, .backdrop, .btn_scroll').on('click', function (e) {
        e.preventDefault();
        $('.modal').removeClass('active');
        jQuery('.backdrop').fadeOut();
        $("body").removeClass("modal-open");
    });


    //CHANGE COLOR LABEL

    jQuery('input:checkbox').click(function () {
        if (jQuery(this).is(':checked')) {
            jQuery(this).parent().css('color', '#000000');
        } else {
            jQuery(this).parent().css('color', '#ababab');
        }
    });

    //CHANGE BG-COLOR INPUT

    $(document).on('change', '.input', function () {
        let $this = $(this);
        let value = $.trim($this.val());
        $this.toggleClass('filled-background', value.length !== 0);
    });

    //CHANGE BG-COLOR INPUT FILE

    $('input[type="file"]').on('change', function (e) {
        const file = e.target.value;
        if (file) {
            console.log($(this).parents('.form-group'))
            $(this).parent('.form-group').addClass('has-file');
        } else {
            $(this).parent('.form-group').removeClass('has-file');
        }
    });

    // ADD LINK IN BLOCK

    $('#addLink').click(function (e) {
        e.preventDefault();
        const row = $('#rowTemplate').html();
        $('#linkList').append(row);
    });


    //ANIMATION

        var waypoints = $('.section_anim').waypoint(function (direction) {
            $(this.element).addClass('section_in-view')
        }, {
            offset: '75%'
        });



    // COUNTER
    $('.achievements .achievements__value').counterUp({
        delay: 50,
        time: 2000
    });

    $('.achievements').waypoint(function (direction) {

    }, {
        offset: '80%'
    });

});




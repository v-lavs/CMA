/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;
//= include ../../node_modules/waypoints/lib/jquery.waypoints.min.js ;


// CUSTOM SCRIPTS

$(document).ready(function () {

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
            let anchor = $.attr(this, 'href')

            if (anchor.match(/^#/) && anchor !== '#') {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top
                }, 1000);
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

    $('.modal__close, .backdrop').on('click', function (e) {
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

    // $('.add-link').click(function () {
    //     let
    //         formGroup = $(this).closest('.link-list__item'),
    //         product = formGroup.clone(true, true);
    //
    //     formGroup.after(product);
    // });
});



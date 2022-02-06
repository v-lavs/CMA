/*
* to include js file write: `//= include ./path-to-file`
* */

//= include ../../node_modules/jquery/dist/jquery.js ;
//= include ../../lib/jquery-ui.js ;
//= include ../../lib/localization-uk.js ;
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
    //COUNTER UP
    (function ($) {
        $.fn.countTo = function (options) {
            options = options || {};

            return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from: $(this).data('from'),
                    to: $(this).data('to'),
                    speed: $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals: $(this).data('decimals')
                }, options);

                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;

                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};

                $self.data('countTo', data);

                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);

                render(value);

                function updateTimer() {
                    value += increment;
                    loopCount++;

                    render(value);

                    if (typeof (settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }

                    if (loopCount >= loops) {
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;

                        if (typeof (settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }

                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };

        $.fn.countTo.defaults = {
            from: 0,
            to: 0,
            speed: 1000,
            refreshInterval: 100,
            decimals: 0,
            formatter: formatter,
            onUpdate: null,
            onComplete: null
        };

        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }
    }(jQuery));

    youtubeVideo();


    let header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
        let scrolled = $(window).scrollTop();

        if (scrolled > 100 && scrolled > scrollPrev) {
            header.addClass('header_active');
        } else {
            header.removeClass('header_active').addClass('header_scroll-top');
        }
        scrollPrev = scrolled;

        addScrollClass();
    });


    let scrolled;

    function addScrollClass() {
        scrolled = window.scrollTop || document.documentElement.scrollTop;
        if (scrolled > 40) {
            $('.header').addClass('scroll');
        } else {
            $('.header').removeClass('scroll');
        }
    }


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
                $('.how-help__btn-js').removeClass('active');
                const currSlide = this.slides[this.activeIndex];
                const actionBtn = $(currSlide).attr('data-active-btn');
                $('.' + actionBtn).addClass('active');
                showActivityText(currSlide);
            }
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    sliderActivity.on('slideChange', function () {
        $('.how-help__btn-js').removeClass('active');
        const currSlide = this.slides[this.activeIndex];
        const actionBtn = $(currSlide).attr('data-active-btn');
        $('.' + actionBtn).addClass('active');
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

    // $('input[type="file"]').on('change', function (e) {
    //     const file = e.target.value;
    //     if (file) {
    //         $(this).parent('.form-group').addClass('has-file');
    //     } else {
    //         $(this).parent('.form-group').removeClass('has-file');
    //     }
    // });

    // ADD LINK IN BLOCK

    $('#addLink').click(function (e) {
        e.preventDefault();
        const row = $('#rowTemplate').html();
        $('#linkList').append(row);
    });

    $('#linkList').on('click', '.btn-reset', function () {
        $(this).parent().remove();
    });


    //ANIMATION
    setTimeout(function () {
        $('.section-intro').addClass('section_in-view')
    }, 100);

    $('.section_anim').waypoint(function (direction) {
        $(this.element).addClass('section_in-view')
    }, {
        offset: '100%'
    });


    // COUNTER

    $('.achievements').waypoint(function (direction) {
        jQuery(function ($) {
            // custom formatting example
            $('.count-number').data('countToOptions', {
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                }
            });

            // start all the timers
            $('.timer').each(count);

            function count(options) {
                var $this = $(this);
                options = $.extend({}, options || {}, $this.data('countToOptions') || {});
                $this.countTo(options);
            }
        });
    }, {
        offset: '100%'
    });

    //DATEPICKER
    const date = new Date();
    date.setDate(date.getDate());

    $("#datepicker").datepicker({
        minDate: date,
        onSelect: function (date) {
            $('#datepicker_value').val(date)
        },

    });

    function setDatepickerPos(input, inst) {
        var rect = input.getBoundingClientRect();
        // use 'setTimeout' to prevent effect overridden by other scripts
        setTimeout(function () {
            var scrollTop = $("body").scrollTop();
            inst.dpDiv.css({ top: rect.top + input.offsetHeight + scrollTop });
        }, 0);
    }

    $(".input-datepicker").datepicker({
        changeYear: true,
        yearRange: "-21:+0",
        beforeShow: function(input, inst) {
            console.log(inst)
            setDatepickerPos(input, inst),
            setTimeout(function(){
                $('.ui-datepicker').css('z-index', 9999);
                $('.ui-datepicker').addClass('datepicker-fixed');
            }, 50);
        },
        onClose: function () {
            $('.ui-datepicker').removeClass('datepicker-fixed');
        }
    });

    // INPUT TYPE FILE
    let inputImg = document.getElementById('fileImg');
    let inputImgLabel = document.querySelector('.label-upload');
    let infoImg = document.querySelector('#infoImg');
    let imgInfoText = document.querySelector('#infoImg .text');
    let resetImg = document.getElementById('resetImg');

    inputImg.addEventListener('change', function (e) {
        let data = e.target.value;
        if (data.trim()) {
            imgInfoText.innerHTML = data;
            inputImgLabel.style.display = 'none';
            infoImg.style.display = 'block';
        }
    });
    resetImg.addEventListener('click', function (e) {
        e.preventDefault();
        inputImg.value = '';
        imgInfoText.innerHTML = '';
        inputImgLabel.style.display = 'flex';
        infoImg.style.display = 'none';
    });


    const simpleBar = new SimpleBar(document.getElementById('linkList'));
    simpleBar.getContentElement();

});






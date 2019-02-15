$(document).ready(function () {
    // ====================== FORM CONTROLS ===========================

    $('.js-formBtn').click(function () {
        $('.feedBackWrapper.form-person').toggleClass('is-closed');
    });

    $('.form-exit').click(function () {
        $('.feedBackWrapper.form-person').toggleClass('is-closed');
    });

    $('.form-exit-free').click(function () {
        $('.feedBackWrapperFree.form-person').toggleClass('is-closed');
    });

    $('.form-btn.form-btn__maillist').click(function () {
        $('form.form-maillist').toggleClass('is-closed');
    });

    $('.gallery-flexslider').click(function () {
        $(this).toggleClass('is-active');
    });

    $('.js-schedule').click(function () {
        $('.schedule').removeClass('is-closed');
    });

    $('.schedule-exit').click(function () {
        $('.schedule').addClass('is-closed');
    });


    // ====================== DROPDOWN ===========================

    $('.dropdown-toggle').click(function () {
        var dropdown = $(this).parent();
        if (dropdown.hasClass('is-closed')) {
            dropdown.removeClass('is-closed').addClass('is-opened');
        } else {
            dropdown.removeClass('is-opened').addClass('is-closed');
        }
    });

    $('.dropdown-menu li').click(function () {
        var pickedText = $(this).text();
        $('.dropdown-toggle').text(pickedText);
        $('.dropdown-input').val(pickedText);
        $('.dropdown').removeClass('is-opened').addClass('is-closed');
    });

    $('.header-nav_toggler').click(function () {
        $('.header-nav').toggleClass('open');
    });



    // ====================== FORM SEND ===========================

    $.getJSON('https://banana-bot-vk.herokuapp.com');
    setInterval(function () {
        $.getJSON('https://banana-bot-vk.herokuapp.com');
    }, 300000);


    $('a').click(function () {
        if ($(this).attr('href') == '/#courses') {
            console.log('to courses');
        } else if ($(this).attr('href').match(/#/) == "#") {
            event.preventDefault();

            var id = $(this).attr('href');
            var top = $(id).offset().top;

            $('body, html').animate({scrollTop: top}, 1000);
        }
    });

    $('.hero-main_about_link_gamedev').click(function () {
        $('.filter-list li:eq(1)').click();
    });

    // ========================= SLIDER ===========================

    $('.about-photos').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.about-photos-nav'
    });

    $('.about-photos-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.about-photos',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '10px',
        adaptiveHeight: true,
        arrows: false
    });

    setTimeout(function () {
        if (window.location.href.match('&utm_term=courses') != null) {
            if (window.location.href.match('&utm_term=courses').length > 0) {
                $('html,body').animate({
                    scrollTop: $("#courses").offset().top
                });
            }
        }
    }, 1500);

    if ($('.teacher-slider')) {
        $('.teacher-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true
        });
    }

});
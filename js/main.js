(function ($) {
    "use strict";

    // Keep the initial loading overlay visible until the page has loaded.
    var spinner = document.getElementById('spinner');
    var hideSpinner = function () {
        if (spinner) {
            spinner.classList.remove('show');
        }
    };

    if (document.readyState === 'complete') {
        hideSpinner();
    } else {
        window.addEventListener('load', hideSpinner, { once: true });
    }
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    function updateNavbar() {
        var navbar = $('.navbar');
        if ($(window).scrollTop() > 45) {
            navbar.addClass('sticky-top shadow-sm');
        } else {
            navbar.removeClass('sticky-top shadow-sm');
        }
    }
    $(window).on('scroll', updateNavbar);
    updateNavbar();


    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 700,
        dots: true,
        loop: true,
        touchDrag: true,
        mouseDrag: true,
        pullDrag: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        autoplayTimeout: 4500,
        autoplayHoverPause: true,
        touchDrag: true,
        mouseDrag: true,
        pullDrag: true,
        smartSpeed: 700,
        center: true,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:1
            },
            1200:{
                items:1
            }
        }
    });

    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Cookie preference card
    var cookieConsent = document.getElementById('cookieConsent');
    if (cookieConsent) {
        var cookieChoiceKey = 'aromaAyurvedicCookieChoice';
        try {
            if (!window.localStorage.getItem(cookieChoiceKey)) {
                cookieConsent.hidden = false;
            }
        } catch (error) {
            cookieConsent.hidden = false;
        }

        cookieConsent.querySelectorAll('[data-cookie-choice]').forEach(function (button) {
            button.addEventListener('click', function () {
                try {
                    window.localStorage.setItem(cookieChoiceKey, button.getAttribute('data-cookie-choice'));
                } catch (error) {
                    // Dismiss for this visit even when browser storage is unavailable.
                }
                cookieConsent.hidden = true;
            });
        });
    }

    document.querySelectorAll('.whatsapp-appointment-form').forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!form.reportValidity()) return;

            var formData = new FormData(form);
            var message = [
                'Hello, I would like to book an appointment at Aroma Ayurvedic Avenue.',
                'Name: ' + formData.get('customer_name'),
                'Phone: ' + formData.get('customer_phone'),
                'Email: ' + (formData.get('email') || 'Not provided'),
                'Preferred date: ' + formData.get('appointment_date'),
                'Service: ' + formData.get('service'),
                'Gender: ' + (formData.get('gender') || 'Not provided'),
                'Additional details: ' + (formData.get('message') || 'None')
            ].join('\n');

            var whatsappUrl = 'https://wa.me/917306011828?text=' + encodeURIComponent(message);
            window.location.href = whatsappUrl;
        });
    });


})(jQuery);





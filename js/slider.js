const initSlider = () => {
    $('.rehab-slider__container').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        // appendDots: $('.slider-nav'),
        prevArrow: $('.rehab-slider__arrow--prev'),
        nextArrow: $('.rehab-slider__arrow--next'),
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              dots: false,
              arrows: false
            }
          }
        ]
      });
}

const initPensionsSlider = () => {
    // Инициализация слайдера пансионатов
    // $('.pensions__slider').slick({
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     arrows: true,
    //     dots: false,
    //     // appendDots: $('.pensions__slider-nav'),
    //     prevArrow: $('.pensions__button--prev'),
    //     nextArrow: $('.pensions__button--next'),
    //     responsive: [
    //       {
    //         breakpoint: 992,
    //         settings: {
    //           slidesToShow: 2,
    //           slidesToScroll: 1
    //         }
    //       },
    //       {
    //         breakpoint: 576,
    //         settings: {
    //           slidesToShow: 1,
    //           slidesToScroll: 1,
    //           arrows: false
    //         }
    //       }
    //     ]
    //   })
        $('.news-slider').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            dots: false,
            arrows: false,
            infinite: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
        $('.nav__arrow.prev').click(function(){
          $('.news-slider').slick('slickPrev');
      });
      
      $('.nav__arrow.next').click(function(){
          $('.news-slider').slick('slickNext');
      });
}

export function setupSlider() {
    // Инициализация слайдера в секции rehab-slider
    $('.rehab-slider__container').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    });
}
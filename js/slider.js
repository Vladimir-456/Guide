const initNewsSlider = () => {
  $('.news-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: false,
    arrows: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 992, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 576, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '20px'
        }
      },
      {
        breakpoint: 425, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: false, 
          centerPadding: '0', 
          variableWidth: false 
        }
      }
    ]
  });

  $('.nav__arrow.prev').click(function() {
    $('.news-slider').slick('slickPrev');
  });
  
  $('.nav__arrow.next').click(function() {
    $('.news-slider').slick('slickNext');
  });
}

const initPensionsSlider = () => {
  $('.pensions__slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: $('.pensions__button--prev'),
    nextArrow: $('.pensions__button--next'),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '20px'
        }
      }
    ]
  });
}

export const setupSlider = () => {
  $(document).ready(function() {
    if ($('.news-slider').length) {
      initNewsSlider();
    }
    if ($('.pensions__slider').length) {
      initPensionsSlider();
    }
  });
};
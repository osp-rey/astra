export default function sliders() {
  const aboutSlider = document.querySelector(".s-about__slider");

  if (aboutSlider) {
    const centeredSlide = Math.floor(
      aboutSlider.querySelectorAll(".swiper-slide").length / 2,
    );

    const swiper = new Swiper(aboutSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 10,
      initialSlide: centeredSlide,
      centeredSlides: true,
      autoplay: {
        delay: 5500,
      },
      scrollbar: {
        el: ".s-about .slider-scrollbar",
        draggable: true,
      },
    });
  }

  const sectNavs = document.querySelectorAll(".sect-nav__buttons");

  if (sectNavs.length) {
    sectNavs.forEach((nav) => {
      const swiper = new Swiper(nav, {
        speed: 900,
        slidesPerView: "auto",
        spaceBetween: 5,
        navigation: {
          prevEl: ".sect-nav__buttons-shadow._prev",
          nextEl: ".sect-nav__buttons-shadow._next",
        },
      });
    });
  }

  const cardPlanSliders = document.querySelectorAll(
    ".card-plan__gallery-slider",
  );

  if (cardPlanSliders.length) {
    cardPlanSliders.forEach((slider) => {
      const swiper = new Swiper(slider, {
        speed: 900,
        spaceBetween: 5,
        navigation: {
          prevEl: slider.querySelector(".slider-arrow._prev"),
          nextEl: slider.querySelector(".slider-arrow._next"),
        },
        pagination: {
          el: slider.querySelector(".slider-pagination-m"),
          clickable: true,
        },
      });
    });
  }

  const infoSlider = document.querySelector(".s-info__info-slider");

  if (infoSlider) {
    const infoSliderBg = document.querySelector(".s-info__bg-slider");

    const swiperBg = new Swiper(infoSliderBg, {
      speed: 1500,
      slidesPerView: 1,
    });

    const swiper = new Swiper(infoSlider, {
      speed: 900,
      slidesPerView: 1,
      spaceBetween: 15,
      autoplay: {
        delay: 6000,
      },
      navigation: {
        prevEl: ".s-info .slider-arrow._prev",
        nextEl: ".s-info .slider-arrow._next",
      },
      on: {
        slideChange: ({ activeIndex }) => {
          swiperBg.slideTo(activeIndex);
        },
      },
    });
  }

  const previewSlider = document.querySelector(".s-preview__slider");
  if (previewSlider) {
    const wrap = previewSlider.closest(".s-preview__slider-wrap");
    const swiper = new Swiper(previewSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 15,
      // autoplay: {
      //   delay: 6000
      // },
      navigation: {
        prevEl: wrap.querySelector(".slider-arrow._prev"),
        nextEl: wrap.querySelector(".slider-arrow._next"),
      },
      scrollbar: {
        el: wrap.querySelector(".slider-scrollbar"),
        draggable: true,
      },
      breakpoints: {
        1026: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
  }
}

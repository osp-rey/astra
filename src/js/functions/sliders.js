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
}

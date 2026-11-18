export default function gsapAnim() {
  gsap.registerPlugin(ScrollTrigger);

  const locationCards = document.querySelectorAll(".s-location__adv-item");

  if (
    locationCards.length &&
    window.matchMedia("(min-width: 1026px)").matches
  ) {
    gsap.set(locationCards[1], { y: 120 });
    gsap.set(locationCards[2], { y: 240 });

    gsap.to([locationCards[1], locationCards[2]], {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".s-location",
        start: "top top",
        end: "+=100%",
        scrub: 1,
      },
    });
  }

  const enumItems = document.querySelectorAll(".s-enum__item");

  if (enumItems.length) {
    const images = [];

    let y = -280;

    if (window.matchMedia("(max-width: 1365px)").matches) {
      y = -200;
    }
    if (window.matchMedia("(max-width: 1199px)").matches) {
      y = -150;
    }
    if (window.matchMedia("(max-width: 1025px)").matches) {
      y = -100;
    }
    if (window.matchMedia("(max-width: 767px)").matches) {
      y = 50;
    }

    enumItems.forEach((item, index) => {
      const body = item.querySelector(".s-enum__item-body");
      if (index !== 0) {
        const img = item.querySelector(".s-enum__item-img");
        images.push(img);
        gsap.set(img, { y });

        gsap.to(img, {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "top center",
            scrub: 1,
          },
        });
      }
    });
  }

  const itemImg = document.querySelector(".s-item__img");
  if (itemImg && window.matchMedia("(min-width: 1025px)").matches) {
    let x = window.innerWidth * 0.5 + 40;

    gsap.set(itemImg, { x });

    gsap.to(itemImg, {
      x: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".s-item",
        start: "top bottom",
        end: "bottom bottom+=200",
        scrub: 1,
      },
    });
  }
}

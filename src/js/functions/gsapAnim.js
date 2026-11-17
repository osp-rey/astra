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
    const images = []
    enumItems.forEach((item, index) => {
      if (index !== 0) {
        const img = item.querySelector(".s-enum__item-img");
        images.push(img);
        gsap.set(img, { y: -280 });
        
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
}

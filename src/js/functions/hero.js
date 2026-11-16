export default function hero() {
  const hero = document.querySelector(".s-hero");

  if (hero) {
    updateHeight();

    window.visualViewport.addEventListener("resize", updateHeight);
    window.visualViewport.addEventListener("scroll", updateHeight);

    function updateHeight() {
      const headerHeight = document.querySelector(".header").clientHeight;
      hero.style.minHeight = `${window.visualViewport.height - headerHeight}px`;
    }
  }
}

export default function sect() {
  const sectsM = document.querySelectorAll(".sect-m");

  if (sectsM.length && window.matchMedia("(max-width: 1025px)").matches) {
    const headerHeight = document.querySelector(".header").clientHeight;
    sectsM.forEach((s) => {
      s.style.scrollMarginTop = `${headerHeight}px`;
    });
  }
}

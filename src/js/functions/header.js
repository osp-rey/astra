export function header() {
  const headerF = document.querySelector(".header-f");

  if (headerF && window.matchMedia("(min-width: 1026px)").matches) {
    const headerHeight = document.querySelector(".header").clientHeight;
    let lastScrollTop = 0;

    window.addEventListener("scroll", changeScroll);
    changeScroll();

    function changeScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > headerHeight) {
        headerF.classList.add("_scroll");
      } else {
        headerF.classList.remove("_scroll");
      }

      if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
        headerF.classList.add("_hide");
      } else {
        headerF.classList.remove("_hide");
      }

      lastScrollTop = scrollTop;
    }
  }
}

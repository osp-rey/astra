export default function preloader() {
  window.addEventListener("load", function () {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.classList.add("_hidden");
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }
  });
}

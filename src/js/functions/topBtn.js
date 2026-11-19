export default function topBtn() {
  const buttons = document.querySelectorAll(".top-btn");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    });
  }
}

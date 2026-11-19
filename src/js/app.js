import burger from "./functions/burger.js";
import buttonsNote from "./functions/buttonsNote.js";
import changeModaltitle from "./functions/changeModalTitle.js";
import { header } from "./functions/header.js";
import hero from "./functions/hero.js";
import inputmask from "./functions/inputmask.js";
import gsapAnim from "./functions/gsapAnim.js";
import locationToggle from "./functions/locationToggle.js";
import maps from "./functions/maps.js";
import mediaAdaptive from "./functions/mediaAdaptive.js";
import more from "./functions/more.js";
import sect from "./functions/sect.js";
import sliders from "./functions/sliders.js";
import tab from "./functions/tab.js";
import topBtn from "./functions/topBtn.js";
import preloader from "./functions/preloader.js";

document.addEventListener("DOMContentLoaded", () => {
  header();
  mediaAdaptive();
  burger();
  inputmask();
  hero();
  sliders();
  buttonsNote();
  changeModaltitle();
  more();
  sect();
  tab();
  maps();
  locationToggle();
  gsapAnim();
  topBtn();

  Fancybox.bind("[data-fancybox]", {
    on: {
      destroy: (instance) => {
        const id = instance.getSlide().src;

        if (id.includes("#modal")) {
          const modal = document.querySelector(id);
          const inputNote = modal.querySelector(".input-note");
          const modalTitle = modal.querySelector(".modal__title[data-text]");

          if (inputNote) inputNote.value = "";
          if (modalTitle) modalTitle.textContent = modalTitle.dataset.text;
        }
      },
    },
  });
  preloader();

  // Fancybox.show([{ src: "#modal-feedback", type: "inline" }]);
});

import { createScript } from "./helpFunctions.js";

export default function locationToggle() {
  const buttons = document.querySelectorAll(".s-location__nav-btn");

  if (buttons.length) {
    const options = {
      root: null,
      rootMargin: "0px",
      scrollMargin: "0px",
      threshold: 0.01,
    };

    const map = document.querySelector(".s-location__map");
    const startCoords = JSON.parse(
      document.querySelector(".s-location__nav-btn._active").dataset.location,
    );

    function callback(entries, observer) {
      entries.forEach((entry) => {
        const target = entry.target;

        if (entry.isIntersecting) {
          createScript(
            "https://api-maps.yandex.ru/2.1/?apikey=b46e9249-4925-4460-b11c-3aaf76ad0115&lang=ru_RU",
            "text/javascript",
          ).then(() => handlerCreateMap(target, startCoords));

          observer.unobserve(target);
        }
      });
    }

    const observer = new IntersectionObserver(callback, options);

    observer.observe(map);

    function handlerCreateMap(map, centers) {
      map.innerHTML = "";

      const startCenter = centers[Math.floor(centers.length / 2)];
      const zoom = Number(map.dataset.zoom);
      const iconHref = map.dataset.icon;

      let iconSize = [70, 70];
      let iconPosition = [-25, -25];

      let objectMark = {};

      if (iconHref) {
        objectMark = {
          iconLayout: "default#image",
          iconImageHref: iconHref,
          iconImageSize: iconSize,
          iconImageOffset: iconPosition,
        };
      }

      function init() {
        const htmlMap = new ymaps.Map(map, {
          center: startCenter,
          zoom,
        });

        centers.forEach((center) => {
          const placemark = new ymaps.Placemark(center, {}, objectMark);
          htmlMap.geoObjects.add(placemark);
        });

        htmlMap.controls.remove("geolocationControl"); // удаляем геолокацию
        htmlMap.controls.remove("searchControl"); // удаляем поиск
        htmlMap.controls.remove("trafficControl"); // удаляем контроль трафика
        htmlMap.controls.remove("typeSelector"); // удаляем тип
        htmlMap.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
        // htmlMap.controls.remove("zoomControl"); // удаляем контрол зуммирования
        htmlMap.controls.remove("rulerControl"); // удаляем контрол правил
        // htmlMap.behaviors.disable(["scrollZoom"]);
      }

      ymaps.ready(init);
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const coords = JSON.parse(btn.dataset.location);

        handlerCreateMap(map, coords);

        buttons.forEach((b) => b.classList.remove("_active"));
        btn.classList.add("_active");
      });
    });
  }
}

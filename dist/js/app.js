(() => {
    "use strict";
    function burger() {
        const burger = document.querySelector("#burger");
        if (burger) {
            const burgerOverlay = document.querySelector("#burger-overlay");
            const burgerOpen = document.querySelector("#burger-open");
            const burgerCloses = document.querySelectorAll("[data-burger-close]");
            const burgerAnchors = burger.querySelectorAll("a[href^='/#']");
            burgerAnchors.forEach(anchor => {
                anchor.addEventListener("click", () => {
                    handleClose();
                });
            });
            burgerOpen.addEventListener("click", () => {
                if (burger.classList.contains("_open")) {
                    handleClose();
                } else {
                    handleOpen();
                }
            });
            burgerCloses.forEach(btn => btn.addEventListener("click", handleClose));
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            function handleOpen() {
                document.body.classList.add("body-hidden");
                burger.classList.add("_open");
                burgerOverlay.classList.add("_active");
                updateHeightBurger();
            }
            function handleClose() {
                document.body.classList.remove("body-hidden");
                burger.classList.remove("_open");
                burgerOverlay.classList.remove("_active");
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function buttonsNote() {
        const buttons = document.querySelectorAll("[data-btn-note]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const selectorTarget = btn.dataset.targetNote;
                    const target = document.querySelector(selectorTarget);
                    const value = btn.dataset.btnNote;
                    if (target) {
                        target.value = value;
                    }
                });
            });
        }
    }
    function changeModaltitle() {
        const buttons = document.querySelectorAll("[data-fancybox][data-modal-title]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const titleValue = btn.dataset.modalTitle;
                    if (titleValue) {
                        const selector = btn.getAttribute("href") || btn.dataset.src;
                        const modalTitle = document.querySelector(selector).querySelector(".modal__title");
                        if (modalTitle) modalTitle.textContent = titleValue;
                    }
                });
            });
        }
    }
    function header() {
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
    function hero() {
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
    function inputmask() {
        const inputs = document.querySelectorAll('input[type="tel"]');
        const im = new Inputmask("+7 (999) 999-99-99");
        im.mask(inputs);
    }
    function gsapAnim() {
        gsap.registerPlugin(ScrollTrigger);
        const locationCards = document.querySelectorAll(".s-location__adv-item");
        if (locationCards.length && window.matchMedia("(min-width: 1026px)").matches) {
            gsap.set(locationCards[1], {
                y: 120
            });
            gsap.set(locationCards[2], {
                y: 240
            });
            gsap.to([ locationCards[1], locationCards[2] ], {
                y: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: ".s-location",
                    start: "top top",
                    end: "+=100%",
                    scrub: 1
                }
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
                    gsap.set(img, {
                        y
                    });
                    gsap.to(img, {
                        y: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom",
                            end: "top center",
                            scrub: 1
                        }
                    });
                }
            });
        }
        const itemImg = document.querySelector(".s-item__img");
        if (itemImg && window.matchMedia("(min-width: 1025px)").matches) {
            let x = window.innerWidth * .5 + 40;
            gsap.set(itemImg, {
                x
            });
            gsap.to(itemImg, {
                x: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: ".s-item",
                    start: "top bottom",
                    end: "bottom bottom+=200",
                    scrub: 1
                }
            });
        }
    }
    function createScript(url, type) {
        if (!url) return;
        return new Promise((resolve, reject) => {
            const script = document.querySelector(`script[src="${url}"]`);
            if (script) {
                resolve(script);
            } else {
                const htmlScript = document.createElement("script");
                htmlScript.src = url;
                if (type) {
                    htmlScript.type = type;
                }
                htmlScript.onload = () => {
                    resolve(htmlScript);
                };
                htmlScript.onerror = () => {
                    reject(new Error(`Не удалось загрузить скрипт: ${url}`));
                };
                document.head.appendChild(htmlScript);
            }
        });
    }
    function slideUp(target, duration = 500, showmore = 0) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function slideDown(target, duration = 500, showmore = 0) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout(() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function createEl(tag, classes = "") {
        const item = document.createElement(tag);
        if (classes) {
            classes.split(" ").forEach(c => {
                item.classList.add(c);
            });
        }
        return item;
    }
    function countLinesInElement(element) {
        if (!element) return 0;
        var text = element.innerText || element.textContent || "";
        var text = element.innerText || "";
        if (!text.trim()) return 0;
        var clone = element.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";
        clone.style.width = element.offsetWidth + "px";
        clone.style.height = "auto";
        clone.style.maxHeight = "none";
        clone.style.overflow = "visible";
        clone.style.whiteSpace = "normal";
        clone.style.wordWrap = "break-word";
        var computedStyle = window.getComputedStyle(element);
        clone.style.fontSize = computedStyle.fontSize;
        clone.style.fontFamily = computedStyle.fontFamily;
        clone.style.fontWeight = computedStyle.fontWeight;
        clone.style.lineHeight = computedStyle.lineHeight;
        clone.style.padding = computedStyle.padding;
        clone.style.margin = "0";
        clone.style.border = "none";
        clone.style.boxSizing = "border-box";
        document.body.appendChild(clone);
        var height = clone.offsetHeight;
        var lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.2;
        document.body.removeChild(clone);
        return Math.ceil(height / lineHeight);
    }
    function locationToggle() {
        const buttons = document.querySelectorAll(".s-location__nav-btn");
        if (buttons.length) {
            const options = {
                root: null,
                rootMargin: "0px",
                scrollMargin: "0px",
                threshold: .01
            };
            const map = document.querySelector(".s-location__map");
            const startCoords = JSON.parse(document.querySelector(".s-location__nav-btn._active").dataset.location);
            function callback(entries, observer) {
                entries.forEach(entry => {
                    const target = entry.target;
                    if (entry.isIntersecting) {
                        createScript("https://api-maps.yandex.ru/2.1/?apikey=b46e9249-4925-4460-b11c-3aaf76ad0115&lang=ru_RU", "text/javascript").then(() => handlerCreateMap(target, startCoords));
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
                let iconSize = [ 70, 70 ];
                let iconPosition = [ -25, -25 ];
                let objectMark = {};
                if (iconHref) {
                    objectMark = {
                        iconLayout: "default#image",
                        iconImageHref: iconHref,
                        iconImageSize: iconSize,
                        iconImageOffset: iconPosition
                    };
                }
                function init() {
                    const htmlMap = new ymaps.Map(map, {
                        center: startCenter,
                        zoom
                    });
                    centers.forEach(center => {
                        const placemark = new ymaps.Placemark(center, {}, objectMark);
                        htmlMap.geoObjects.add(placemark);
                    });
                    htmlMap.controls.remove("geolocationControl");
                    htmlMap.controls.remove("searchControl");
                    htmlMap.controls.remove("trafficControl");
                    htmlMap.controls.remove("typeSelector");
                    htmlMap.controls.remove("fullscreenControl");
                    htmlMap.controls.remove("rulerControl");
                }
                ymaps.ready(init);
            }
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const coords = JSON.parse(btn.dataset.location);
                    handlerCreateMap(map, coords);
                    buttons.forEach(b => b.classList.remove("_active"));
                    btn.classList.add("_active");
                });
            });
        }
    }
    function maps() {
        const maps = document.querySelectorAll(".map");
        if (maps.length) {
            maps.forEach(map => {
                const options = {
                    root: null,
                    rootMargin: "0px",
                    scrollMargin: "0px",
                    threshold: .01
                };
                function callback(entries, observer) {
                    entries.forEach(entry => {
                        const target = entry.target;
                        if (entry.isIntersecting) {
                            createScript("https://api-maps.yandex.ru/2.1/?apikey=b46e9249-4925-4460-b11c-3aaf76ad0115&lang=ru_RU", "text/javascript").then(() => handlerCreateMap(target));
                            observer.unobserve(target);
                        }
                    });
                }
                const observer = new IntersectionObserver(callback, options);
                observer.observe(map);
            });
            function handlerCreateMap(map) {
                const center = JSON.parse(map.dataset.center);
                const zoom = Number(map.dataset.zoom);
                const iconHref = map.dataset.icon;
                let iconSize = [ 70, 70 ];
                let iconPosition = [ -25, -25 ];
                let objectMark = {};
                if (iconHref) {
                    objectMark = {
                        iconLayout: "default#image",
                        iconImageHref: iconHref,
                        iconImageSize: iconSize,
                        iconImageOffset: iconPosition
                    };
                }
                function init() {
                    const htmlMap = new ymaps.Map(map, {
                        center,
                        zoom
                    });
                    const placemark = new ymaps.Placemark(center, {}, objectMark);
                    htmlMap.geoObjects.add(placemark);
                    htmlMap.controls.remove("geolocationControl");
                    htmlMap.controls.remove("searchControl");
                    htmlMap.controls.remove("trafficControl");
                    htmlMap.controls.remove("typeSelector");
                    htmlMap.controls.remove("fullscreenControl");
                    htmlMap.controls.remove("rulerControl");
                }
                ymaps.ready(init);
            }
        }
    }
    function mediaAdaptive() {
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }, this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            });
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function(item) {
                    return item.breakpoint === mediaBreakpoint;
                });
                matchMedia.addListener(function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    оbject.index = this.indexInParent(оbject.parent, оbject.element);
                    this.moveTo(оbject.place, оbject.element, оbject.destination);
                }
            } else {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    if (оbject.element.classList.contains(this.daClassname)) {
                        this.moveBack(оbject.parent, оbject.element, оbject.index);
                    }
                }
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if (place === "first") {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== undefined) {
                parent.children[index].insertAdjacentElement("beforebegin", element);
            } else {
                parent.insertAdjacentElement("beforeend", element);
            }
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if (this.type === "min") {
                Array.prototype.sort.call(arr, function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
                        if (a.place === "first" || b.place === "last") {
                            return -1;
                        }
                        if (a.place === "last" || b.place === "first") {
                            return 1;
                        }
                        return a.place - b.place;
                    }
                    return a.breakpoint - b.breakpoint;
                });
            } else {
                Array.prototype.sort.call(arr, function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
                        if (a.place === "first" || b.place === "last") {
                            return 1;
                        }
                        if (a.place === "last" || b.place === "first") {
                            return -1;
                        }
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
    }
    function more() {
        const containers = document.querySelectorAll(".container-more");
        if (containers.length) {
            containers.forEach(container => {
                const btn = container.querySelector("[data-more-btn]");
                const count = +container.dataset.countShow;
                const hideItems = Array.from(container.querySelectorAll("[data-more-item]")).filter(item => window.getComputedStyle(item).display === "none");
                if (hideItems.length === 0) btn.remove();
                btn.addEventListener("click", () => {
                    const items = container.querySelectorAll("[data-more-item]");
                    const hideItems = Array.from(items).filter(item => window.getComputedStyle(item).display === "none");
                    hideItems.splice(0, count).forEach(item => {
                        item.classList.add("_active");
                        setTimeout(() => {
                            item.classList.add("_show");
                        });
                    });
                    if (hideItems.length <= 0) btn.remove();
                });
            });
        }
    }
    function sect() {
        const sectsM = document.querySelectorAll(".sect-m");
        if (sectsM.length && window.matchMedia("(max-width: 1025px)").matches) {
            const headerHeight = document.querySelector(".header").clientHeight;
            sectsM.forEach(s => {
                s.style.scrollMarginTop = `${headerHeight}px`;
            });
        }
    }
    function sliders() {
        const aboutSlider = document.querySelector(".s-about__slider");
        if (aboutSlider) {
            const centeredSlide = Math.floor(aboutSlider.querySelectorAll(".swiper-slide").length / 2);
            const swiper = new Swiper(aboutSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 10,
                initialSlide: centeredSlide,
                centeredSlides: true,
                autoplay: {
                    delay: 5500
                },
                scrollbar: {
                    el: ".s-about .slider-scrollbar",
                    draggable: true
                }
            });
        }
        const sectNavs = document.querySelectorAll(".sect-nav__buttons");
        if (sectNavs.length) {
            sectNavs.forEach(nav => {
                const swiper = new Swiper(nav, {
                    speed: 900,
                    slidesPerView: "auto",
                    spaceBetween: 5,
                    navigation: {
                        prevEl: ".sect-nav__buttons-shadow._prev",
                        nextEl: ".sect-nav__buttons-shadow._next"
                    }
                });
            });
        }
        const cardPlanSliders = document.querySelectorAll(".card-plan__gallery-slider");
        if (cardPlanSliders.length) {
            cardPlanSliders.forEach(slider => {
                const swiper = new Swiper(slider, {
                    speed: 900,
                    spaceBetween: 5,
                    navigation: {
                        prevEl: slider.querySelector(".slider-arrow._prev"),
                        nextEl: slider.querySelector(".slider-arrow._next")
                    },
                    pagination: {
                        el: slider.querySelector(".slider-pagination-m"),
                        clickable: true
                    }
                });
            });
        }
        const infoSlider = document.querySelector(".s-info__info-slider");
        if (infoSlider) {
            const infoSliderBg = document.querySelector(".s-info__bg-slider");
            const swiperBg = new Swiper(infoSliderBg, {
                speed: 1500,
                slidesPerView: 1
            });
            const swiper = new Swiper(infoSlider, {
                speed: 900,
                slidesPerView: 1,
                spaceBetween: 15,
                autoplay: {
                    delay: 6e3
                },
                navigation: {
                    prevEl: ".s-info .slider-arrow._prev",
                    nextEl: ".s-info .slider-arrow._next"
                },
                on: {
                    slideChange: ({activeIndex}) => {
                        swiperBg.slideTo(activeIndex);
                    }
                }
            });
        }
        const previewSlider = document.querySelector(".s-preview__slider");
        if (previewSlider) {
            const wrap = previewSlider.closest(".s-preview__slider-wrap");
            const swiper = new Swiper(previewSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 15,
                autoplay: {
                    delay: 6e3
                },
                navigation: {
                    prevEl: wrap.querySelector(".slider-arrow._prev"),
                    nextEl: wrap.querySelector(".slider-arrow._next")
                },
                scrollbar: {
                    el: wrap.querySelector(".slider-scrollbar"),
                    draggable: true
                },
                breakpoints: {
                    1026: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    }
                }
            });
        }
        const architectureSlider = document.querySelector(".s-architecture__slider");
        if (architectureSlider) {
            const swiper = new Swiper(architectureSlider, {
                speed: 1500,
                autoplay: {
                    delay: 6500
                },
                navigation: {
                    prevEl: ".s-architecture .slider-arrow._prev",
                    nextEl: ".s-architecture .slider-arrow._next"
                }
            });
        }
        const progressSliders = document.querySelectorAll(".s-progress__slider");
        if (progressSliders.length) {
            const wrapArrows = document.querySelector(".s-progress__arrows-wrap");
            progressSliders.forEach(slider => {
                const tab = slider.closest("[data-tab]");
                const tabId = tab.dataset.tab;
                const tabArrows = wrapArrows.querySelector(`[data-tab="${tabId}"]`);
                const swiper = new Swiper(slider, {
                    speed: 900,
                    slidesPerView: "auto",
                    spaceBetween: 10,
                    autoplay: {
                        delay: 6500
                    },
                    navigation: {
                        prevEl: tabArrows.querySelector(".slider-arrow._prev"),
                        nextEl: tabArrows.querySelector(".slider-arrow._next")
                    },
                    scrollbar: {
                        el: tab.querySelector(".slider-scrollbar"),
                        draggable: true
                    }
                });
            });
        }
    }
    function tab() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const container = btn.closest(".tabs");
                    const tabId = btn.dataset.tabBtn;
                    const allButtons = container.querySelector(".tabs-nav").querySelectorAll("[data-tab-btn]");
                    const allTabs = [];
                    const allTabsContents = container.querySelectorAll(".tabs-content");
                    allTabsContents.forEach(tabsContent => {
                        const tabs = Array.from(tabsContent.children).filter(child => child.hasAttribute("data-tab"));
                        allTabs.push(...tabs);
                    });
                    const currentTabs = container.querySelectorAll(`[data-tab="${tabId}"]`);
                    allTabs.forEach(t => {
                        t.classList.remove("_show");
                        setTimeout(() => {
                            t.classList.remove("_active");
                        }, 150);
                    });
                    setTimeout(() => {
                        currentTabs.forEach(t => {
                            t.classList.add("_active");
                            setTimeout(() => {
                                t.classList.add("_show");
                            }, 150);
                        });
                    }, 150);
                    allButtons.forEach(b => b.classList.remove("_active"));
                    btn.classList.add("_active");
                });
            });
        }
    }
    function topBtn() {
        const buttons = document.querySelectorAll(".top-btn");
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                });
            });
        }
    }
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
                destroy: instance => {
                    const id = instance.getSlide().src;
                    if (id.includes("#modal")) {
                        const modal = document.querySelector(id);
                        const inputNote = modal.querySelector(".input-note");
                        const modalTitle = modal.querySelector(".modal__title[data-text]");
                        if (inputNote) inputNote.value = "";
                        if (modalTitle) modalTitle.textContent = modalTitle.dataset.text;
                    }
                }
            }
        });
    });
})();
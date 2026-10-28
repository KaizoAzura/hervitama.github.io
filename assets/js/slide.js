const missionEl = document.querySelector(".mission-swiper");

if (missionEl) {
  const closeAllCards = () => {
    missionEl.querySelectorAll(".mission-card.is-flipped").forEach((card) => {
      card.classList.remove("is-flipped");
      card
        .querySelector(".mission-front [data-mission-toggle]")
        .setAttribute("aria-expanded", "false");
    });
  };

  const mission = new Swiper(missionEl, {
    slidesPerView: 1.1,
    spaceBetween: 16,
    speed: 500,
    navigation: {
      nextEl: ".mission-next",
      prevEl: ".mission-prev",
    },
    breakpoints: {
      768: { slidesPerView: 2.1 },
      992: { slidesPerView: 3.1 },
    },
  });

  missionEl.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-mission-toggle]");
    if (!toggle) return;

    const card = toggle.closest(".mission-card");
    const isOpen = card.classList.toggle("is-flipped");
    card
      .querySelector(".mission-front [data-mission-toggle]")
      .setAttribute("aria-expanded", String(isOpen));
  });

  mission.on("slideChangeTransitionStart", closeAllCards);
}

// slider kedua

const sliders = document.querySelectorAll(".work-slider");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const buildSlider = (slider) => {
  const track = slider.querySelector(".work-slider-track");
  const originals = Array.from(track.children).filter(
    (item) => !item.dataset.clone,
  );
  const speed = Number(slider.dataset.speed) || 40;

  track.querySelectorAll("[data-clone]").forEach((item) => item.remove());
  slider.classList.remove("is-ready");

  const appendSet = () => {
    originals.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.dataset.clone = "true";
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  };

  appendSet();

  const setWidth =
    track.children[originals.length].offsetLeft - originals[0].offsetLeft;
  if (!setWidth) return;

  let guard = 0;
  while (track.scrollWidth < slider.clientWidth + setWidth && guard < 10) {
    appendSet();
    guard += 1;
  }

  slider.style.setProperty("--slider-shift", `${setWidth}px`);
  slider.style.setProperty("--slider-duration", `${setWidth / speed}s`);
  slider.classList.add("is-ready");
};

if (!reduceMotion.matches) {
  sliders.forEach((slider) => {
    let lastWidth = 0;

    new ResizeObserver(() => {
      if (slider.clientWidth === lastWidth) return;
      lastWidth = slider.clientWidth;
      buildSlider(slider);
    }).observe(slider);
  });
}
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
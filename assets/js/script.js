const SCROLL_OFFSET = 10;

const navbar = document.querySelector(".navbar");
const megaItem = navbar.querySelector(".nav-item.dropdown");
const desktop = window.matchMedia("(min-width: 992px)");

const openMegaMenu = () => {
  if (desktop.matches) megaItem.classList.add("is-open");
};

const closeMegaMenu = () => {
  megaItem.classList.remove("is-open");
};

const updateNavbarOnScroll = () => {
  navbar.classList.toggle("is-scrolled", window.scrollY > SCROLL_OFFSET);
};

megaItem.addEventListener("mouseenter", openMegaMenu);
navbar.addEventListener("mouseleave", closeMegaMenu);
desktop.addEventListener("change", closeMegaMenu);
window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
updateNavbarOnScroll();


const navService = document.querySelector(".nav-service");

if (navService) {
  const list = navService.querySelector(".navbar-nav");
  const prev = navService.querySelector(".nav-service-prev");
  const next = navService.querySelector(".nav-service-next");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const updateButtons = () => {
    const maxScroll = list.scrollWidth - list.clientWidth;
    const overflowing = maxScroll > 1;

    prev.hidden = !overflowing;
    next.hidden = !overflowing;
    prev.disabled = list.scrollLeft <= 1;
    next.disabled = list.scrollLeft >= maxScroll - 1;
  };

  const scrollList = (direction) => {
    list.scrollBy({
      left: direction * list.clientWidth * 0.8,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  };

  prev.addEventListener("click", () => scrollList(-1));
  next.addEventListener("click", () => scrollList(1));
  list.addEventListener("scroll", updateButtons, { passive: true });
  new ResizeObserver(updateButtons).observe(list);
  updateButtons();
}
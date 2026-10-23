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

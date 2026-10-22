  const navbar = document.querySelector(".navbar");
  const megaItem = navbar.querySelector(".nav-item.dropdown");
  const desktop = window.matchMedia("(min-width: 992px)");

  // buka saat kursor masuk ke Services
  megaItem.addEventListener("mouseenter", () => {
    if (desktop.matches) megaItem.classList.add("is-open");
  });

  // tutup hanya saat kursor keluar dari seluruh navbar (termasuk menu)
  navbar.addEventListener("mouseleave", () => {
    megaItem.classList.remove("is-open");
  });

  // reset kalau layar diperkecil ke mobile
  desktop.addEventListener("change", () => {
    megaItem.classList.remove("is-open");
  });

   const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
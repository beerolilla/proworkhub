document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (!hamburger || !navMenu) return;

  const openMenu = () => {
    hamburger.classList.add("active");
    navMenu.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    const isOpen = navMenu.classList.contains("active");
    isOpen ? closeMenu() : openMenu();
  };

  // a11y attribútumok (nem kötelező, de szép)
  hamburger.setAttribute("role", "button");
  hamburger.setAttribute("tabindex", "0");
  hamburger.setAttribute("aria-label", "Menü megnyitása");
  hamburger.setAttribute("aria-expanded", "false");

  // kattintásra toggle
  hamburger.addEventListener("click", toggleMenu);

  // Enter/Space-re is toggle (billentyűzet)
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  // linkre kattintás után zárjuk a menüt
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // ESC-re zárás
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // ha visszanagyítasz desktop/tablet méretre, ne maradjon "nyitva"
  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) closeMenu();
  });
});
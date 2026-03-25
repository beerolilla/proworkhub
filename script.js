document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  const modal = document.getElementById("facilityModal");
  const modalOpenBtn = document.getElementById("facilityOpen");
  const modalCloseBtn = document.getElementById("facilityClose");

  const openMenu = () => {
    if (!hamburger || !navMenu) return;
    hamburger.classList.add("active");
    navMenu.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    if (!hamburger || !navMenu) return;
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    if (!navMenu) return;
    const isOpen = navMenu.classList.contains("active");
    isOpen ? closeMenu() : openMenu();
  };

const openModal = () => {
  if (!modal) return;
  modal.showModal();
  modal.classList.add("active");
  document.body.classList.add("modal-open");
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove("active");
  modal.close();
  document.body.classList.remove("modal-open");
};

  if (hamburger && navMenu) {
    hamburger.setAttribute("role", "button");
    hamburger.setAttribute("tabindex", "0");
    hamburger.setAttribute("aria-label", "Menü megnyitása");
    hamburger.setAttribute("aria-expanded", "false");

    hamburger.addEventListener("click", toggleMenu);

    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 600) closeMenu();
    });
  }

  if (modalOpenBtn) {
    modalOpenBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
      openModal();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      closeModal();
    }
  });

  /* BASIC REVEAL */
  const revealItems = document.querySelectorAll(".reveal-item");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -70px 0px"
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });

    /* PREMIUM SERVICES */
    const premiumSections = document.querySelectorAll(".reveal-premium");

    const premiumObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -90px 0px"
      }
    );

    premiumSections.forEach((section) => {
      premiumObserver.observe(section);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    document.querySelectorAll(".reveal-premium").forEach((section) => {
      section.classList.add("is-visible");
    });
  }

  /* COOKIE BANNER */
  const cookieBanner = document.getElementById("cookieBanner");
  const cookieAccept = document.getElementById("cookieAccept");

  if (cookieBanner && !localStorage.getItem("cookieAccepted")) {
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 600);
  }

  cookieAccept?.addEventListener("click", () => {
    localStorage.setItem("cookieAccepted", "true");
    cookieBanner.classList.remove("show");
  });
});
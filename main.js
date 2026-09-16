/**
 * Sahab's Blogs — shared behaviour (runs on every page)
 * - Dark mode toggle (saved in localStorage)
 * - Mobile navigation menu
 * - Footer year
 */

(function () {
  "use strict";

  /* ---- Dark mode ---- */
  const root = document.documentElement;
  const THEME_KEY = "sahabs-blogs-theme";

  /** @param {"light"|"dark"} theme */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  /** @type {"light"|"dark"|null} */
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---- Mobile navigation ---- */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* ---- Footer year ---- */
  const yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

/**
 * Sahab's Blogs — "All Blogs" page
 * Renders every post and provides simple client-side search + category filter.
 * No backend, no database — everything runs from js/posts.js.
 */

(function () {
  "use strict";

  const listEl = document.getElementById("post-list");
  const noResultsEl = document.getElementById("no-results");
  const searchInput = document.getElementById("search-input");
  const filterBar = document.getElementById("filter-pills");

  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get("category") || "সব";
  let query = "";

  /* ---- Build filter pills: "সব" (all) + each category ---- */
  const allCategories = ["সব", ...CATEGORIES];
  /** @param {string} cat */
  allCategories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = cat;
    btn.dataset.category = cat;
    btn.setAttribute("aria-pressed", String(cat === activeCategory));
    btn.addEventListener("click", () => {
      activeCategory = cat;
      updatePills();
      render();
    });
    filterBar.appendChild(btn);
  });

  function updatePills() {
    /** @param {HTMLButtonElement} btn */
    filterBar.querySelectorAll("button").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.category === activeCategory));
    });
  }

  /* ---- Search ---- */
  searchInput.addEventListener("input", (e) => {
    /** @type {HTMLInputElement} */
    const input = e.target;
    query = input.value.trim().toLowerCase();
    render();
  });

  /* ---- Render ---- */
  function render() {
    listEl.innerHTML = "";

    const filtered = sortByDateDesc(POSTS).filter((post) => {
      const matchesCategory = activeCategory === "সব" || post.category === activeCategory;
      const haystack = (post.title + " " + post.excerpt).toLowerCase();
      const matchesQuery = query === "" || haystack.includes(query);
      return matchesCategory && matchesQuery;
    });

    if (filtered.length === 0) {
      noResultsEl.hidden = false;
    } else {
      noResultsEl.hidden = true;
      filtered.forEach((post) => listEl.appendChild(buildPostCard(post)));
    }
  }

  render();
})();

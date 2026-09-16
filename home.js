/**
 * Sahab's Blogs — homepage rendering
 * Renders the featured post, the 3 latest post cards, and category links
 * using the data in js/posts.js
 */

(function () {
  "use strict";

  const sorted = sortByDateDesc(POSTS);
  const featured = POSTS.find((p) => p.featured) || sorted[0];
  const latest = sorted.slice(0, 3);

  /* ---- Featured post ---- */
  const featuredEl = document.getElementById("featured-post");
  if (featuredEl && featured) {
    featuredEl.innerHTML = `
      <div class="featured-bar" aria-hidden="true"></div>
      <div>
        <p class="featured-label">ফিচার্ড লেখা</p>
        <span class="category-pill">${featured.category}</span>
        <h3><a href="${postUrl(featured.slug)}">${featured.title}</a></h3>
        <p class="excerpt">${featured.excerpt}</p>
        <p class="post-meta">
          <span>${formatDate(featured.date)}</span>
          <span>${featured.readingTime}</span>
        </p>
        <a class="btn btn-outline" href="${postUrl(featured.slug)}">পুরো লেখা পড়ুন</a>
      </div>
    `;
  }

  /* ---- Latest posts ---- */
  const latestEl = document.getElementById("latest-posts");
  if (latestEl) {
    latest.forEach((post) => latestEl.appendChild(buildPostCard(post)));
  }

  /* ---- Categories ---- */
  const categoriesEl = document.getElementById("category-list");
  if (categoriesEl) {
    CATEGORIES.forEach((cat) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `blogs.html?category=${encodeURIComponent(cat)}`;
      a.textContent = cat;
      li.appendChild(a);
      categoriesEl.appendChild(li);
    });
  }
})();

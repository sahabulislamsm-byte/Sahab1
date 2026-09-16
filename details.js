/**
 * Sahab's Blogs — Blog Details page
 * Reads ?slug=... from the URL and renders the matching post from js/posts.js
 */

(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  /** @type {Post|undefined} */
  const post = POSTS.find((p) => p.slug === slug);

  const headerEl = document.getElementById("post-header");
  const bodyEl = document.getElementById("post-body");
  const notFoundEl = document.getElementById("post-not-found");
  const relatedSection = document.getElementById("related-section");
  const relatedList = document.getElementById("related-list");

  if (!post) {
    headerEl.hidden = true;
    bodyEl.hidden = true;
    relatedSection.hidden = true;
    notFoundEl.hidden = false;
    document.title = "লেখা পাওয়া যায়নি — Sahab's Blogs";
    return;
  }

  document.title = post.title + " — Sahab's Blogs";

  headerEl.innerHTML = `
    <a class="back-link" href="blogs.html">&larr; সব ব্লগে ফিরে যান</a>
    <span class="category-pill">${post.category}</span>
    <h1>${post.title}</h1>
    <p class="post-meta">
      <span>সাহাবুল ইসলাম</span>
      <span>${formatDate(post.date)}</span>
      <span>${post.readingTime}</span>
    </p>
  `;

  bodyEl.innerHTML = post.content;

  /* ---- Related posts (same category, excluding current) ---- */
  const related = POSTS.filter((p) => p.category === post.category && p.slug !== post.slug);
  const others = related.length > 0 ? related : POSTS.filter((p) => p.slug !== post.slug);

  if (others.length === 0) {
    relatedSection.hidden = true;
  } else {
    others.slice(0, 3).forEach((p) => {
      const a = document.createElement("a");
      a.href = postUrl(p.slug);
      a.textContent = p.title;
      const li = document.createElement("li");
      li.appendChild(a);
      relatedList.appendChild(li);
    });
  }
})();

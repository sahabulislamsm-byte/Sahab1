/**
 * Sahab's Blogs — small shared helpers used by home.js, blogs.js, details.js
 */


/**
 * @typedef {Object} Post
 * @property {string} slug
 * @property {string} title
 * @property {string} category
 * @property {string} date
 * @property {string} readingTime
 * @property {string} excerpt
 * @property {string} content
 * @property {boolean} featured
 */

const BENGALI_MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** @param {number|string} num */
function toBengaliNumber(num) {
  return String(num)
    .split("")
    .map((ch) => (/[0-9]/.test(ch) ? BENGALI_DIGITS[Number(ch)] : ch))
    .join("");
}

/** @param {string} isoDate */
function formatDate(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  const day = toBengaliNumber(d.getDate());
  const month = BENGALI_MONTHS[d.getMonth()];
  const year = toBengaliNumber(d.getFullYear());
  return `${day} ${month}, ${year}`;
}

/** @param {Post[]} posts */
function sortByDateDesc(posts) {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** @param {string} slug */
function postUrl(slug) {
  return `blog-details.html?slug=${encodeURIComponent(slug)}`;
}

/** Builds a compact post card (used on home + blogs listing). */
/** @param {Post} post */
function buildPostCard(post) {
  const li = document.createElement("li");
  li.className = "post-card";
  li.innerHTML = `
    <span class="category-pill">${post.category}</span>
    <h3><a href="${postUrl(post.slug)}">${post.title}</a></h3>
    <p class="excerpt">${post.excerpt}</p>
    <p class="post-meta">
      <span>${formatDate(post.date)}</span>
      <span>${post.readingTime}</span>
    </p>
  `;
  return li;
}

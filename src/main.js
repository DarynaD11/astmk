async function loadHTML(selector, url) {
  const el = document.querySelector(selector);
  if (el) {
    const res = await fetch(url);
    const html = await res.text();
    el.innerHTML = html;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadHTML('#header', './partials/header.html');
  loadHTML('#hero', './partials/hero.html');
  loadHTML('#informations', './partials/informations.html');
  loadHTML('#competitions', './partials/competitions.html');
  loadHTML('#news', './partials/news.html');
  loadHTML('#partners', './partials/partners.html');
  loadHTML('#footer', './partials/footer.html');
  loadHTML('#mob-menu', './partials/mob-menu.html');
});

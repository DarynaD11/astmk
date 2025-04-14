async function loadHTML(selector, url) {
  const el = document.querySelector(selector);
  if (el) {
    const res = await fetch(url);
    const html = await res.text();
    el.innerHTML = html;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadHTML('#header', './partials/header.html');
  await loadHTML('#hero', './partials/hero.html');
  await loadHTML('#informations', './partials/informations.html');
  await loadHTML('#competitions', './partials/competitions.html');
  await loadHTML('#news', './partials/news.html');
  await loadHTML('#partners', './partials/partners.html');
  await loadHTML('#footer', './partials/footer.html');
  await loadHTML('#mob-menu', './partials/mob-menu.html');

  // Тепер, коли HTML вже в DOM, підключаємо модулі
  const infoBtnModule = await import('./js/info-btn.js');
  const mobMenuModule = await import('./js/mob-menu.js');

  // (опціонально) викликаємо функції з модулів, якщо вони є
  infoBtnModule.init?.();
  mobMenuModule.init?.();
});

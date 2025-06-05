import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://astmk_db_user:password@dpg-d101hs15pdvs73921vk0-a.oregon-postgres.render.com/astmk_db",
});

await client.connect();

const res = await client.query("SELECT * FROM news ORDER BY date");

const newsItems = res.rows;

// Функція для форматування дати в "ДД.ММ.РРРР"
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

// Генеруємо HTML
const html = newsItems
  .map(
    (item) => `
  <ul class="table-inf">
    <li class="table-inf-date">${formatDate(item.date)}</li>
    <li class="table-inf-city">${item.city}</li>
    <li class="table-inf-name">${item.name}</li>
    <li class="table-inf-link">
      <a href="${item.link_event}">
        Посилання
        <svg class="link-copmt">
          <use href="../img/icons.svg#arrow"></use>
        </svg>
      </a>
      <a href="${item.link_photo}">
        Фото
        <svg class="link-copmt">
          <use href="../img/icons.svg#arrow"></use>
        </svg>
      </a>
    </li>
  </ul>
`
  )
  .join("\n");

console.log(html);

await client.end();

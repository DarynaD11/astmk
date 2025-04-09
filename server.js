const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Підключення до бази
const db = new sqlite3.Database("./news.db");

const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/index.html"));
});

app.use(express.static(path.join(__dirname, 'src')));


// Створення таблиці (виконати один раз)
db.run(
  "CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, title TEXT, content TEXT)"
);

// Отримати всі новини
app.get("/news", (req, res) => {
  db.all("SELECT * FROM news", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Додати новину
app.post("/news", (req, res) => {
  const { title, content } = req.body;
  db.run(
    "INSERT INTO news (title, content) VALUES (?, ?)",
    [title, content],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, title, content });
    }
  );
});

// Видалити новину
app.delete("/news/:id", (req, res) => {
  db.run("DELETE FROM news WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(3000, () => console.log("Сервер запущено на порті 3000"));

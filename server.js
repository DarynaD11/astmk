const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// ===== ⬇️ LiveReload setup
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "src")); // слідкуємо за папкою з HTML/CSS/JS

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
// ===== ⬆️ LiveReload setup

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(connectLivereload()); // ⬅️ додано для LiveReload

// SQLite
const db = new sqlite3.Database("./news.db");

// 📄 Головна сторінка
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/index.html"));
});

// 📁 Статика
app.use(express.static(path.join(__dirname, "src")));

// 🧱 БД
db.run(
  "CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, title TEXT, content TEXT)"
);

// 🔽 API
app.get("/news", (req, res) => {
  db.all("SELECT * FROM news", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

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

app.delete("/news/:id", (req, res) => {
  db.run("DELETE FROM news WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// ✅ Запуск
app.listen(3000, () => console.log("🚀 Сервер запущено на http://localhost:3000"));

const pool = require("../public/js/db");

// Отримати всі новини
exports.getAllNews = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM news ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
};

// Додати новину
exports.addNews = async (req, res) => {
  const { title, content } = req.body;
  try {
    await pool.query("INSERT INTO news (title, content) VALUES ($1, $2)", [
      title,
      content,
    ]);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
};

// Видалити новину
exports.deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM news WHERE id = $1", [id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
};

const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "mocktest"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database!");
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "MockTest API" });
});

app.get("/questions", (req, res) => {
  db.query("SELECT * FROM questions", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi truy vấn database" });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 MockTest API running on port ${PORT}`);
});

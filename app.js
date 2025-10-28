const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = process.env.PORT || 3000;

// Export hàm connect ra ngoài để Jest có thể mock
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "mocktest"
});

// Hàm kết nối DB
const connectDB = (callback) => {
  db.connect((err) => {
    if (err) {
      console.error("❌ Database connection failed:", err.message);
      // Giúp kiểm tra DB status trong CI
      if (callback) callback(err); 
    } else {
      console.log("✅ Connected to MySQL database!");
      if (callback) callback(null);
    }
  });
};

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "MockTest API" });
});

app.get("/questions", (req, res) => {
  db.query("SELECT * FROM questions", (err, results) => {
    if (err) {
      // Sử dụng console.error để dễ debug
      console.error("Lỗi truy vấn database:", err.message);
      return res.status(500).json({ error: "Lỗi truy vấn database" });
    }
    res.json(results);
  });
});

// Tách biệt việc khởi động server để Jest dễ dàng kiểm soát
if (process.env.NODE_ENV !== 'test') {
  connectDB((err) => {
    if (!err) {
      app.listen(PORT, () => {
        console.log(`🚀 MockTest API running on port ${PORT}`);
      });
    }
  });
}

// Export app và db (hoặc connectDB)
module.exports = {
    app,
    db,
    connectDB
};
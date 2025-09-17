const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Drewtaggart31", //sesuaikan
  database: "bookstore", //sesuaikan dengan nama database
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi error" + err.stack);
    return;
  }
  console.log("MYSQL is connected");
  return;
});

module.exports = db;

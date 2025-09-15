const mysql = required("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookstore",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MYSQL is connected");
});

module.epxorts = db;

const express = require("express");
const db = require("./db"); //koneksi MYSQL
const app = express();
const PORT = 3000;

// Middleware supaya bisa baca JSON dari body request
app.use(express.json());

// CREATE (POST buku baru)
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  db.query("INSERT INTO books (title, author) VALUES (?, ?)", [title, author], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, title, author });
  });
});

// READ (GET semua buku)
app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// READ (GET buku by id)
app.get("/books/:id", (req, res) => {
  db.query("SELECT * FROM books WHERE id = ?", [req.params.id], (err, results) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(404).send("Buku tidak ditemukan");
    }
    res.json(result[0]); //
  });
});

// UPDATE (PUT buku by id)
app.put("/books/:id", (req, res) => {
  const { title, author } = req.body;
  db.query("UPDATE books SET title = ?, author = ? WHERE id = ?", [title, author, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Book updated" });
  });
});

// DELETE (hapus buku by id)
app.delete("/books/:id", (req, res) => {
  db.query("DELETE FROM books WHERE id = ?", [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Book deleted" });
  });
});

app.listen(PORT, () => {
  console.log('Server jalan di http://localhost:${PORT}');
});

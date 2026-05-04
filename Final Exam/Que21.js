const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/bookstore');

// Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    genre: String
});

const Book = mongoose.model('books', bookSchema);

// --------------------------------------------------
// ➤ Add Book (CREATE)
app.post('/add', async (req, res) => {
    await Book.create(req.body);
    res.send("Book Added");
});

// --------------------------------------------------
// ➤ View All Books (READ)
app.get('/all', async (req, res) => {
    let data = await Book.find();
    res.json(data);
});

// --------------------------------------------------
// ➤ Update Book (UPDATE)
app.put('/update/:title', async (req, res) => {
    await Book.updateOne(
        { title: req.params.title },
        { $set: req.body }
    );
    res.send("Book Updated");
});

// --------------------------------------------------
// ➤ Delete Book (DELETE)
app.delete('/delete/:title', async (req, res) => {
    await Book.deleteOne({ title: req.params.title });
    res.send("Book Deleted");
});

// --------------------------------------------------

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
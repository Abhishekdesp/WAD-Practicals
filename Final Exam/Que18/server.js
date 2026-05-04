const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

// DB connect
mongoose.connect('mongodb://127.0.0.1:27017/music');

// Schema
const songSchema = new mongoose.Schema({
    songname: String,
    film: String,
    music_director: String,
    singer: String,
    actor: String,
    actress: String
});

const Song = mongoose.model('song_details', songSchema);

// (c) Insert 5 songs
app.get('/insert', async (req, res) => {
    await Song.insertMany([
        {songname:"ABC", film:"DEF", music_director:"GHI", singer:"JKL"},
        {songname:"Song2", film:"Film2", music_director:"AR", singer:"SPB"},
        {songname:"Song3", film:"Film3", music_director:"AR", singer:"Sonu"},
        {songname:"Song4", film:"Film4", music_director:"XYZ", singer:"KK"},
        {songname:"Song5", film:"Film5", music_director:"XYZ", singer:"Arijit"}
    ]);
    res.send("Inserted");
});

// (d) Count + list all
app.get('/all', async (req, res) => {
    let data = await Song.find();
    let count = await Song.countDocuments();
    res.json({count, data});
});

// (e) Songs by Music Director
app.get('/director/:name', async (req, res) => {
    let data = await Song.find({music_director: req.params.name});
    res.json(data);
});

// (f) Songs by Director + Singer
app.get('/filter/:director/:singer', async (req, res) => {
    let data = await Song.find({
        music_director: req.params.director,
        singer: req.params.singer
    });
    res.json(data);
});

// (g) Delete song by name
app.get('/delete/:name', async (req, res) => {
    await Song.deleteOne({songname: req.params.name});
    res.send("Deleted");
});

// (h) Add new song (POST)
app.post('/add', async (req, res) => {
    await Song.create(req.body);
    res.send("Added");
});

// (i) Songs by Singer + Film
app.get('/singerfilm/:singer/:film', async (req, res) => {
    let data = await Song.find({
        singer: req.params.singer,
        film: req.params.film
    });
    res.json(data);
});

// (j) Update actor & actress
app.get('/update/:name', async (req, res) => {
    await Song.updateOne(
        {songname: req.params.name},
        {$set: {actor:"MNO", actress:"PQR"}}
    );
    res.send("Updated");
});

// (k) Display in table (HTML file)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'table.html'));
});

app.get('/data', async (req, res) => {
    let data = await Song.find();
    res.json(data);
});

app.listen(3000, () => console.log("Server running"));
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

// (a) DB = student
mongoose.connect('mongodb://127.0.0.1:27017/student');

// (b) collection = studentmarks
const studentSchema = new mongoose.Schema({
  name: String,
  roll_no: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_Marks: Number,
  // optional (for part h)
  Maths: Number,
  Science: Number
});

const Student = mongoose.model('studentmarks', studentSchema);

// --------------------------------------------------
// (c) Insert array of documents
app.get('/insert', async (req, res) => {
  await Student.insertMany([
    { name:"ABC", roll_no:111, WAD_Marks:25, CC_Marks:25, DSBDA_Marks:25, CNS_Marks:25, AI_Marks:25, Maths:35, Science:30 },
    { name:"PQR", roll_no:112, WAD_Marks:30, CC_Marks:28, DSBDA_Marks:22, CNS_Marks:26, AI_Marks:27, Maths:45, Science:42 },
    { name:"XYZ", roll_no:113, WAD_Marks:18, CC_Marks:20, DSBDA_Marks:15, CNS_Marks:19, AI_Marks:21, Maths:30, Science:35 },
    { name:"LMN", roll_no:114, WAD_Marks:27, CC_Marks:29, DSBDA_Marks:30, CNS_Marks:28, AI_Marks:26, Maths:50, Science:48 },
    { name:"DEF", roll_no:115, WAD_Marks:10, CC_Marks:15, DSBDA_Marks:12, CNS_Marks:14, AI_Marks:16, Maths:20, Science:25 }
  ]);
  res.send("Inserted");
});

// --------------------------------------------------
// (d) Count + list all
app.get('/all', async (req, res) => {
  const data = await Student.find();
  const count = await Student.countDocuments();
  res.json({ count, data });
});

// --------------------------------------------------
// (e) DSBDA > 20
app.get('/dsbda20', async (req, res) => {
  const data = await Student.find({ DSBDA_Marks: { $gt: 20 } }, { name:1, _id:0 });
  res.json(data);
});

// --------------------------------------------------
// (f) Update marks of specified student by +10 (all subjects)
app.get('/update/:name', async (req, res) => {
  await Student.updateOne(
    { name: req.params.name },
    { $inc: {
        WAD_Marks:10, CC_Marks:10, DSBDA_Marks:10,
        CNS_Marks:10, AI_Marks:10
      }
    }
  );
  res.send("Updated +10 marks");
});

// --------------------------------------------------
// (g) >25 in ALL subjects
app.get('/all25', async (req, res) => {
  const data = await Student.find({
    WAD_Marks: { $gt:25 },
    CC_Marks: { $gt:25 },
    DSBDA_Marks: { $gt:25 },
    CNS_Marks: { $gt:25 },
    AI_Marks: { $gt:25 }
  }, { name:1, _id:0 });
  res.json(data);
});

// --------------------------------------------------
// (h) <40 in BOTH Maths and Science
app.get('/maths-science-40', async (req, res) => {
  const data = await Student.find({
    Maths: { $lt:40 },
    Science: { $lt:40 }
  }, { name:1, _id:0 });
  res.json(data);
});

// --------------------------------------------------
// (i) Remove specified student
app.get('/delete/:name', async (req, res) => {
  await Student.deleteOne({ name: req.params.name });
  res.send("Deleted");
});

// --------------------------------------------------
// (j) Display in table (separate HTML)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'table.html'));
});

app.get('/data', async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// --------------------------------------------------

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
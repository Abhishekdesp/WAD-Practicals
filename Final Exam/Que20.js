const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB');

// Schema
const empSchema = new mongoose.Schema({
    name: String,
    department: String,
    designation: String,
    salary: Number,
    joining_date: String
});

const Employee = mongoose.model('employees', empSchema);

// --------------------------------------------------
// ➤ Add Employee (CREATE)
app.post('/add', async (req, res) => {
    await Employee.create(req.body);
    res.send("Employee Added");
});

// --------------------------------------------------
// ➤ View All Employees (READ)
app.get('/all', async (req, res) => {
    let data = await Employee.find();
    res.json(data);
});

// --------------------------------------------------
// ➤ Update Employee (UPDATE)
app.put('/update/:name', async (req, res) => {
    await Employee.updateOne(
        { name: req.params.name },
        { $set: req.body }
    );
    res.send("Employee Updated");
});

// --------------------------------------------------
// ➤ Delete Employee (DELETE)
app.delete('/delete/:name', async (req, res) => {
    await Employee.deleteOne({ name: req.params.name });
    res.send("Employee Deleted");
});

// --------------------------------------------------

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
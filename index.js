const express = require('express');
const path = require('path');
const db = require('./config/mongoose');
const Candidate = require('./model/candidate');
const PORT = 8000;
const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, './index.html'));
})

app.get('/home', (req, res) => {
    return res.send('<h1>Served by expressJS</h1>');
})

app.get('/about', (req, res) => {
    return res.status(200).json({
        name: "Naman",
        City: "Chandigarh"
    });
})



// Read
app.get('/student', async (req, res) => {
    const students = await Candidate.find({})
    return res.status(200).json({
        message: "Students fetched successfully",
        data: students
    });
});

// Create
app.post('/student', async (req, res) => {

    const student = await Candidate.create(req.body);
    return res.status(200).json({
        message: "Student added successfully",
        data: student
    });
})

// Update
app.put('/student/:id', async (req, res) => {
    let student = await Candidate.findById(req.params.id)
    if (student) {
        student = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.status(200).json({
            message: "Student updated successfully!",
            student: student
        })
    } else {
        return res.status(401).json({
            message: "Student not found!!!"
        })
    }
})

app.listen(PORT, () => {
    console.log("Server is running!!!");
})